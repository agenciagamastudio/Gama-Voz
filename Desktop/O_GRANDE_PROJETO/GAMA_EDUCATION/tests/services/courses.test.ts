import request from 'supertest';
import app from '../../src/server.js';

describe('Courses API — Story 3.1', () => {
  let authToken: string;

  beforeAll(async () => {
    const res = await request(app)
      .post('/auth/signup')
      .send({ name: 'Test User', email: `test-${Date.now()}@gama.com`, password: 'senha123' });
    authToken = res.body.token;
  });

  // ── GET /api/v1/courses ──────────────────────────────────────────────────
  describe('GET /api/v1/courses', () => {
    it('returns both cursinhos', async () => {
      const res = await request(app).get('/api/v1/courses');
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(2);
      const slugs = res.body.map((c: any) => c.slug);
      expect(slugs).toContain('git-github');
      expect(slugs).toContain('ia-clickup');
    });

    it('each course has required fields', async () => {
      const res = await request(app).get('/api/v1/courses');
      res.body.forEach((c: any) => {
        expect(c).toHaveProperty('slug');
        expect(c).toHaveProperty('title');
        expect(c).toHaveProperty('description');
        expect(c).toHaveProperty('total_modules');
        expect(c).toHaveProperty('total_lessons');
      });
    });

    it('git-github has 3 modules and 12 lessons', async () => {
      const res = await request(app).get('/api/v1/courses');
      const git = res.body.find((c: any) => c.slug === 'git-github');
      expect(git.total_modules).toBe(3);
      expect(git.total_lessons).toBe(12);
    });

    it('ia-clickup has 3 modules and 17 lessons', async () => {
      const res = await request(app).get('/api/v1/courses');
      const ia = res.body.find((c: any) => c.slug === 'ia-clickup');
      expect(ia.total_modules).toBe(3);
      expect(ia.total_lessons).toBe(17);
    });
  });

  // ── GET /api/v1/courses/:slug ────────────────────────────────────────────
  describe('GET /api/v1/courses/:slug', () => {
    it('returns git-github with modules and lessons', async () => {
      const res = await request(app).get('/api/v1/courses/git-github');
      expect(res.status).toBe(200);
      expect(res.body.slug).toBe('git-github');
      expect(res.body.modules).toHaveLength(3);
      expect(res.body.modules[0].lessons.length).toBeGreaterThanOrEqual(6);
    });

    it('returns ia-clickup with modules and lessons', async () => {
      const res = await request(app).get('/api/v1/courses/ia-clickup');
      expect(res.status).toBe(200);
      expect(res.body.slug).toBe('ia-clickup');
      expect(res.body.modules).toHaveLength(3);
    });

    it('returns 404 for unknown slug', async () => {
      const res = await request(app).get('/api/v1/courses/nao-existe');
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error');
    });
  });

  // ── GET /api/v1/courses/:slug/lessons/:lessonId ──────────────────────────
  describe('GET /api/v1/courses/:slug/lessons/:lessonId', () => {
    it('returns lesson with content_markdown', async () => {
      const res = await request(app)
        .get('/api/v1/courses/git-github/lessons/licao-1-1-git-vs-github');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('content_markdown');
      expect(typeof res.body.content_markdown).toBe('string');
      expect(res.body.content_markdown.length).toBeGreaterThan(300);
    });

    it('returned lesson has all required fields', async () => {
      const res = await request(app)
        .get('/api/v1/courses/git-github/lessons/licao-1-2-setup');
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        id: 'licao-1-2-setup',
        title: expect.any(String),
        order: expect.any(Number),
        duration_minutes: expect.any(Number),
        module_title: expect.any(String),
        module_order: expect.any(Number),
      });
    });

    it('returns 404 for unknown lesson', async () => {
      const res = await request(app)
        .get('/api/v1/courses/git-github/lessons/nao-existe');
      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Lesson not found');
    });

    it('works for ia-clickup lessons', async () => {
      const res = await request(app)
        .get('/api/v1/courses/ia-clickup/lessons/ia-licao-1-1');
      expect(res.status).toBe(200);
      expect(res.body.content_markdown.length).toBeGreaterThan(100);
    });
  });

  // ── GET /api/v1/courses/:slug/progress (auth) ────────────────────────────
  describe('GET /api/v1/courses/:slug/progress', () => {
    it('returns 401 without token', async () => {
      const res = await request(app).get('/api/v1/courses/git-github/progress');
      expect(res.status).toBe(401);
    });

    it('returns empty completed_lesson_ids for fresh user', async () => {
      const res = await request(app)
        .get('/api/v1/courses/git-github/progress')
        .set('Authorization', `Bearer ${authToken}`);
      expect(res.status).toBe(200);
      expect(res.body.completed_lesson_ids).toEqual([]);
    });
  });

  // ── POST /api/v1/courses/:slug/lessons/:lessonId/complete ────────────────
  describe('POST /api/v1/courses/:slug/lessons/:lessonId/complete', () => {
    it('returns 401 without token', async () => {
      const res = await request(app)
        .post('/api/v1/courses/git-github/lessons/licao-1-1-git-vs-github/complete');
      expect(res.status).toBe(401);
    });

    it('credits 50 XP on first completion', async () => {
      const res = await request(app)
        .post('/api/v1/courses/git-github/lessons/licao-1-3-primeiro-repo/complete')
        .set('Authorization', `Bearer ${authToken}`);
      expect(res.status).toBe(200);
      expect(res.body.xp_awarded).toBe(50);
      expect(res.body.already_completed).toBe(false);
    });

    it('awards 0 XP on duplicate completion', async () => {
      await request(app)
        .post('/api/v1/courses/git-github/lessons/licao-1-4-add-commit/complete')
        .set('Authorization', `Bearer ${authToken}`);

      const res = await request(app)
        .post('/api/v1/courses/git-github/lessons/licao-1-4-add-commit/complete')
        .set('Authorization', `Bearer ${authToken}`);
      expect(res.status).toBe(200);
      expect(res.body.xp_awarded).toBe(0);
      expect(res.body.already_completed).toBe(true);
    });

    it('completed lesson appears in progress endpoint', async () => {
      await request(app)
        .post('/api/v1/courses/git-github/lessons/licao-1-5-push/complete')
        .set('Authorization', `Bearer ${authToken}`);

      const progress = await request(app)
        .get('/api/v1/courses/git-github/progress')
        .set('Authorization', `Bearer ${authToken}`);

      expect(progress.body.completed_lesson_ids).toContain('licao-1-5-push');
    });

    it('returns 404 for unknown lesson', async () => {
      const res = await request(app)
        .post('/api/v1/courses/git-github/lessons/nao-existe/complete')
        .set('Authorization', `Bearer ${authToken}`);
      expect(res.status).toBe(404);
    });
  });
});
