import request from 'supertest';
import app from '../../src/server.js';

describe('Certificates API — Story 3.2', () => {
  let authToken: string;
  let userId: string;
  let otherToken: string;

  const GIT_SLUG = 'git-github';
  const GIT_LESSONS = [
    'licao-1-1-git-vs-github',
    'licao-1-2-setup',
    'licao-1-3-primeiro-repo',
    'licao-1-4-add-commit',
    'licao-1-5-push',
    'licao-1-6-branches',
    'licao-2-1-pull-request',
    'licao-2-2-criar-pr',
    'licao-2-3-feedback',
    'licao-3-1-git-log',
    'licao-3-2-desfazer',
    'licao-3-3-merge-rebase',
  ];

  beforeAll(async () => {
    const ts = Date.now();
    const res = await request(app)
      .post('/auth/signup')
      .send({ name: 'Aluna Teste', email: `cert-${ts}@gama.com`, password: 'senha123' });
    authToken = res.body.token;
    userId = res.body.user.id;

    const other = await request(app)
      .post('/auth/signup')
      .send({ name: 'Outro User', email: `other-${ts}@gama.com`, password: 'senha123' });
    otherToken = other.body.token;
  });

  // ── GET /api/v1/certificates — sem certificados ──────────────────────────
  describe('GET /api/v1/certificates — empty state', () => {
    it('returns empty array when user has no certificates', async () => {
      const res = await request(app)
        .get('/api/v1/certificates')
        .set('Authorization', `Bearer ${authToken}`);
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });

    it('requires authentication — 401 without token', async () => {
      const res = await request(app).get('/api/v1/certificates');
      expect(res.status).toBe(401);
    });
  });

  // ── POST /complete — detecção de curso concluído ─────────────────────────
  describe('POST /complete — course completion detection', () => {
    it('returns course_completed: false for non-final lessons', async () => {
      const res = await request(app)
        .post(`/api/v1/courses/${GIT_SLUG}/lessons/${GIT_LESSONS[0]}/complete`)
        .set('Authorization', `Bearer ${authToken}`);
      expect(res.status).toBe(200);
      expect(res.body.course_completed).toBe(false);
      expect(res.body).not.toHaveProperty('certificate_id');
    });

    it('completes all 12 git-github lessons and emits certificate on last', async () => {
      // Mark lessons 2-11 (lesson 1 already marked in prev test)
      for (const lid of GIT_LESSONS.slice(1, 11)) {
        await request(app)
          .post(`/api/v1/courses/${GIT_SLUG}/lessons/${lid}/complete`)
          .set('Authorization', `Bearer ${authToken}`);
      }
      // Final lesson
      const res = await request(app)
        .post(`/api/v1/courses/${GIT_SLUG}/lessons/${GIT_LESSONS[11]}/complete`)
        .set('Authorization', `Bearer ${authToken}`);
      expect(res.status).toBe(200);
      expect(res.body.course_completed).toBe(true);
      expect(res.body).toHaveProperty('certificate_id');
      expect(typeof res.body.certificate_id).toBe('string');
    });

    it('does NOT emit duplicate certificate on repeated complete call', async () => {
      const first = await request(app)
        .post(`/api/v1/courses/${GIT_SLUG}/lessons/${GIT_LESSONS[11]}/complete`)
        .set('Authorization', `Bearer ${authToken}`);
      const second = await request(app)
        .post(`/api/v1/courses/${GIT_SLUG}/lessons/${GIT_LESSONS[11]}/complete`)
        .set('Authorization', `Bearer ${authToken}`);
      expect(second.body.course_completed).toBe(true);
      expect(second.body.certificate_id).toBe(first.body.certificate_id);
    });
  });

  // ── GET /api/v1/certificates — com certificado ───────────────────────────
  describe('GET /api/v1/certificates — with certificate', () => {
    it('returns certificate after course completion', async () => {
      const res = await request(app)
        .get('/api/v1/certificates')
        .set('Authorization', `Bearer ${authToken}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      const cert = res.body[0];
      expect(cert.course_slug).toBe(GIT_SLUG);
      expect(cert.course_title).toBe('Git/GitHub');
      expect(cert).toHaveProperty('id');
      expect(cert).toHaveProperty('issued_at');
      expect(cert.download_url).toBe(`/api/v1/certificates/${cert.id}/download`);
    });

    it('other user sees empty list (isolation)', async () => {
      const res = await request(app)
        .get('/api/v1/certificates')
        .set('Authorization', `Bearer ${otherToken}`);
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });
  });

  // ── GET /api/v1/certificates/:id/download ────────────────────────────────
  describe('GET /api/v1/certificates/:id/download', () => {
    let certId: string;

    beforeAll(async () => {
      const res = await request(app)
        .get('/api/v1/certificates')
        .set('Authorization', `Bearer ${authToken}`);
      certId = res.body[0].id;
    });

    it('returns PDF with correct Content-Type', async () => {
      const res = await request(app)
        .get(`/api/v1/certificates/${certId}/download`)
        .set('Authorization', `Bearer ${authToken}`);
      expect(res.status).toBe(200);
      expect(res.headers['content-type']).toContain('application/pdf');
    });

    it('returns Content-Disposition with filename', async () => {
      const res = await request(app)
        .get(`/api/v1/certificates/${certId}/download`)
        .set('Authorization', `Bearer ${authToken}`);
      expect(res.headers['content-disposition']).toContain('attachment');
      expect(res.headers['content-disposition']).toContain('certificado-git-github');
    });

    it('returns 404 for non-existent certificate', async () => {
      const res = await request(app)
        .get('/api/v1/certificates/00000000-0000-0000-0000-000000000000/download')
        .set('Authorization', `Bearer ${authToken}`);
      expect(res.status).toBe(404);
    });

    it('returns 404 when other user tries to download (ownership check)', async () => {
      const res = await request(app)
        .get(`/api/v1/certificates/${certId}/download`)
        .set('Authorization', `Bearer ${otherToken}`);
      expect(res.status).toBe(404);
    });

    it('requires authentication — 401 without token', async () => {
      const res = await request(app)
        .get(`/api/v1/certificates/${certId}/download`);
      expect(res.status).toBe(401);
    });
  });

  // ── AC6 — Regressão Zero ─────────────────────────────────────────────────
  describe('AC6 — Regression Zero (Story 3.1 contracts)', () => {
    it('GET /api/v1/courses still returns 2 courses', async () => {
      const res = await request(app).get('/api/v1/courses');
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(2);
    });

    it('GET /api/v1/courses/git-github/progress still works', async () => {
      const res = await request(app)
        .get('/api/v1/courses/git-github/progress')
        .set('Authorization', `Bearer ${authToken}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('completedLessonIds');
    });

    it('POST /complete for non-final lesson still awards XP', async () => {
      const ts = Date.now();
      const signupRes = await request(app)
        .post('/auth/signup')
        .send({ name: 'XP Test', email: `xp-${ts}@gama.com`, password: 'senha123' });
      const token = signupRes.body.token;

      const res = await request(app)
        .post(`/api/v1/courses/${GIT_SLUG}/lessons/${GIT_LESSONS[0]}/complete`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.xp_awarded).toBe(50);
      expect(res.body.course_completed).toBe(false);
    });
  });
});
