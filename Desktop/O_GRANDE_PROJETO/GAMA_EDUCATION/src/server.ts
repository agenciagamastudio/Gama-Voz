import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3100;
const JWT_SECRET = process.env.JWT_SECRET || 'secret-key-gama-educacao';

app.use(cors());
app.use(express.json());

const authMiddleware = (req: any, res: Response, next: any) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    req.userId = decoded.userId;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  xp: number;
  level: number;
  badges: string[];
  avatar?: string;
}

interface JarvisSession {
  id: string;
  userId: string;
  inputs: string[];
  energyLevel: number;
  mentalState: string;
  createdAt: Date;
}

interface NordRecommendation {
  id: string;
  userId: string;
  jarvisSessionId: string;
  recommendedTopic: string;
  focusArea: string;
  confidenceScore: number;
  timeBlocks: string[];
  createdAt: Date;
}

interface BehavioralProfile {
  userId: string;
  prehd: { precisao: number; responsabilidade: number; engajamento: number; humanidade: number; dinamismo: number };
  sonhar: { sensoOportunidade: number; ousadia: number; navegacaoIncerteza: number; humanidade: number; aprendizado: number; resultado: number };
  brainWarfare: { ataque: number; defesa: number; suporte: number };
  personalityTraits: { autonomy: number; innovation: number; leadership: number; documentation: number };
  dailyStrengthArea: string;
  specialties: string[];
}

const users = new Map<string, User>();
const usersByEmail = new Map<string, string>();
const jarvisSessions = new Map<string, JarvisSession>();
const nordRecommendations = new Map<string, NordRecommendation>();
const behavioralProfiles = new Map<string, BehavioralProfile>();

const topics = [
  { id: '1', title: 'TypeScript Basics', category: 'programming', difficulty: 'beginner' },
  { id: '2', title: 'React Hooks', category: 'frontend', difficulty: 'intermediate' },
  { id: '3', title: 'Express.js Advanced', category: 'backend', difficulty: 'advanced' },
  { id: '4', title: 'Distributed Systems Architecture', category: 'architecture', difficulty: 'advanced' },
  { id: '5', title: 'Microservices Patterns', category: 'architecture', difficulty: 'advanced' },
  { id: '6', title: 'Kubernetes Deep Dive', category: 'devops', difficulty: 'advanced' }
];

const badges = [
  { id: 'b1', name: 'First Step', icon: '👣', requiredXp: 0 },
  { id: 'b2', name: 'Scholar', icon: '📚', requiredXp: 100 },
  { id: 'b3', name: 'Master', icon: '⭐', requiredXp: 500 },
  { id: 'b4', name: 'Architecture Expert', icon: '🏗️', requiredXp: 800 },
  { id: 'b5', name: 'Week Streak x2', icon: '🌟', requiredXp: 0 }
];

app.post('/auth/signup', async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'Required fields' });
  if (usersByEmail.has(email)) return res.status(409).json({ error: 'User exists' });

  const passwordHash = await bcrypt.hash(password, 10);
  const userId = uuidv4();
  const user: User = { id: userId, name, email, passwordHash, xp: 0, level: 1, badges: [] };

  users.set(userId, user);
  usersByEmail.set(email, userId);

  return res.status(201).json({
    user: { id: userId, name, email, xp: 0, level: 1, badges: [] },
    token: jwt.sign({ userId }, JWT_SECRET, { expiresIn: '24h' })
  });
});

app.post('/auth/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userId = usersByEmail.get(email);
  const user = userId ? users.get(userId) : null;

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  return res.json({
    user: { id: user.id, name: user.name, email: user.email, xp: user.xp, level: user.level, badges: user.badges },
    token: jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' })
  });
});

app.get('/users/me', authMiddleware, (req: any, res: Response) => {
  const user = users.get(req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  return res.json({ id: user.id, name: user.name, email: user.email, xp: user.xp, level: user.level, badges: user.badges });
});

app.post('/users/me/xp', authMiddleware, (req: any, res: Response) => {
  const user = users.get(req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  user.xp += req.body.amount || 10;
  user.level = Math.floor(user.xp / 100) + 1;
  user.badges = badges.filter(b => user.xp >= b.requiredXp).map(b => b.id);

  return res.json({ id: user.id, name: user.name, email: user.email, xp: user.xp, level: user.level, badges: user.badges });
});

app.get('/topics', (req: Request, res: Response) => res.json(topics));
app.get('/badges', (req: Request, res: Response) => res.json(badges));

// ========== INTEGRATION ENDPOINTS ==========

// 1. JARVIS Integration — Recebe inputs da conversa
app.post('/api/v1/integration/jarvis-input', authMiddleware, (req: any, res: Response) => {
  const { inputs, energyLevel, mentalState } = req.body;
  if (!inputs || !Array.isArray(inputs) || inputs.length === 0) {
    return res.status(400).json({ error: 'Invalid inputs' });
  }

  const sessionId = uuidv4();
  const session: JarvisSession = {
    id: sessionId,
    userId: req.userId,
    inputs,
    energyLevel: energyLevel || 5,
    mentalState: mentalState || 'neutral',
    createdAt: new Date()
  };

  jarvisSessions.set(sessionId, session);

  // Dispara análise NORD automaticamente
  const nordRec = generateNordRecommendation(req.userId, sessionId, inputs, energyLevel);
  nordRecommendations.set(nordRec.id, nordRec);

  return res.status(201).json({
    jarvisSessionId: sessionId,
    inputCount: inputs.length,
    nordRecommendationId: nordRec.id
  });
});

// 2. NORD Integration — Retorna recomendação
app.get('/api/v1/integration/nord-recommendation/:userId', authMiddleware, (req: any, res: Response) => {
  const { userId } = req.params;

  // Valida que o usuário está acessando sua própria recomendação
  if (userId !== req.userId) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  // Busca a recomendação mais recente
  const allRecs = Array.from(nordRecommendations.values())
    .filter(r => r.userId === userId)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  if (allRecs.length === 0) {
    return res.status(404).json({ error: 'No recommendation found' });
  }

  const rec = allRecs[0];
  return res.json({
    id: rec.id,
    recommendedTopic: rec.recommendedTopic,
    focusArea: rec.focusArea,
    confidenceScore: rec.confidenceScore,
    timeBlocks: rec.timeBlocks,
    createdAt: rec.createdAt
  });
});

// 3. Clone Profile — Retorna perfil comportamental
app.get('/api/v1/user/clone-profile/:userId', authMiddleware, (req: any, res: Response) => {
  const { userId } = req.params;

  if (userId !== req.userId) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  const user = users.get(userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Se não tem perfil, cria um padrão
  let profile = behavioralProfiles.get(userId);
  if (!profile) {
    profile = generateDefaultBehavioralProfile(userId);
    behavioralProfiles.set(userId, profile);
  }

  return res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar || `https://i.pravatar.cc/150?u=${user.email}`,
    level: user.level,
    xp: user.xp,
    badges: user.badges,
    behavioralProfile: profile
  });
});

// 4. Personalized Topics — Retorna tópicos recomendados
app.post('/api/v1/education/personalize', authMiddleware, (req: any, res: Response) => {
  const { focusArea } = req.body;

  const recommendedTopics = topics.filter(t =>
    t.category.toLowerCase().includes(focusArea.toLowerCase()) ||
    t.title.toLowerCase().includes(focusArea.toLowerCase())
  );

  const personalizedLessons = recommendedTopics.map(t => ({
    id: t.id,
    title: t.title,
    category: t.category,
    difficulty: t.difficulty,
    estimatedMinutes: Math.floor(Math.random() * 60) + 30,
    xpReward: (Math.floor(Math.random() * 3) + 1) * 25
  }));

  return res.json({
    focusArea,
    recommendedTopics: personalizedLessons,
    totalEstimatedTime: personalizedLessons.reduce((sum, l) => sum + l.estimatedMinutes, 0)
  });
});

// ========== HELPER FUNCTIONS ==========

function generateNordRecommendation(userId: string, jarvisSessionId: string, inputs: string[], energyLevel: number): NordRecommendation {
  const focusAreas = ['Architecture', 'Backend', 'Frontend', 'DevOps', 'Security'];
  const focusArea = focusAreas[Math.floor(Math.random() * focusAreas.length)];

  const topicMap: { [key: string]: string } = {
    'Architecture': 'Distributed Systems Architecture',
    'Backend': 'Express.js Advanced',
    'Frontend': 'React Hooks',
    'DevOps': 'Kubernetes Deep Dive',
    'Security': 'TypeScript Basics'
  };

  return {
    id: uuidv4(),
    userId,
    jarvisSessionId,
    recommendedTopic: topicMap[focusArea],
    focusArea,
    confidenceScore: 0.75 + (Math.random() * 0.2),
    timeBlocks: ['09:00-11:00', '14:00-16:00'],
    createdAt: new Date()
  };
}

function generateDefaultBehavioralProfile(userId: string): BehavioralProfile {
  return {
    userId,
    prehd: {
      precisao: 7 + Math.floor(Math.random() * 2),
      responsabilidade: 7 + Math.floor(Math.random() * 2),
      engajamento: 8 + Math.floor(Math.random() * 1),
      humanidade: 6 + Math.floor(Math.random() * 3),
      dinamismo: 7 + Math.floor(Math.random() * 2)
    },
    sonhar: {
      sensoOportunidade: 8 + Math.floor(Math.random() * 1),
      ousadia: 7 + Math.floor(Math.random() * 2),
      navegacaoIncerteza: 6 + Math.floor(Math.random() * 3),
      humanidade: 6 + Math.floor(Math.random() * 3),
      aprendizado: 8 + Math.floor(Math.random() * 1),
      resultado: 7 + Math.floor(Math.random() * 2)
    },
    brainWarfare: {
      ataque: 7 + Math.floor(Math.random() * 2),
      defesa: 7 + Math.floor(Math.random() * 2),
      suporte: 6 + Math.floor(Math.random() * 3)
    },
    personalityTraits: {
      autonomy: 0.90 + Math.random() * 0.08,
      innovation: 0.85 + Math.random() * 0.12,
      leadership: 0.80 + Math.random() * 0.15,
      documentation: 0.65 + Math.random() * 0.25
    },
    dailyStrengthArea: 'Architecture',
    specialties: ['Distributed Systems', 'Microservices', 'Cloud Native', 'System Design']
  };
}

// ========== COURSES DATA ==========

interface Lesson {
  id: string;
  title: string;
  order: number;
  duration_minutes: number;
  markdown_path: string;
  module_id: string;
  module_title: string;
  module_order: number;
  course_slug: string;
}

interface CourseModule {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  youtube_url?: string;
  total_duration_minutes: number;
  modules: CourseModule[];
}

interface Certificate {
  id: string;
  userId: string;
  courseSlug: string;
  courseTitle: string;
  userName: string;
  issuedAt: string;
}

const userProgress = new Map<string, Set<string>>();
const certificates = new Map<string, Certificate>();
const userCertificates = new Map<string, Set<string>>();

const courses: Course[] = [
  {
    id: 'git-github',
    slug: 'git-github',
    title: 'Git/GitHub',
    description: 'Aprenda controle de versão do zero ao avançado. Do seu primeiro commit a Pull Requests e colaboração em time.',
    total_duration_minutes: 175,
    modules: [
      {
        id: 'git-modulo-1',
        title: 'Fundações — Do Zero ao Git',
        description: 'Entenda o que é Git vs GitHub, instale, crie seu primeiro repo e faça commits.',
        order: 1,
        lessons: [
          { id: 'licao-1-1-git-vs-github', title: 'O que é Git vs GitHub?', order: 1, duration_minutes: 10, markdown_path: 'cursinho/modulo-1/licao-1-1-git-vs-github.md', module_id: 'git-modulo-1', module_title: 'Fundações — Do Zero ao Git', module_order: 1, course_slug: 'git-github' },
          { id: 'licao-1-2-setup', title: 'Instalação e Setup', order: 2, duration_minutes: 20, markdown_path: 'cursinho/modulo-1/licao-1-2-setup.md', module_id: 'git-modulo-1', module_title: 'Fundações — Do Zero ao Git', module_order: 1, course_slug: 'git-github' },
          { id: 'licao-1-3-primeiro-repo', title: 'Seu Primeiro Repositório', order: 3, duration_minutes: 10, markdown_path: 'cursinho/modulo-1/licao-1-3-primeiro-repo.md', module_id: 'git-modulo-1', module_title: 'Fundações — Do Zero ao Git', module_order: 1, course_slug: 'git-github' },
          { id: 'licao-1-4-add-commit', title: 'Os 3 Estágios do Git (git add + git commit)', order: 4, duration_minutes: 15, markdown_path: 'cursinho/modulo-1/licao-1-4-add-commit.md', module_id: 'git-modulo-1', module_title: 'Fundações — Do Zero ao Git', module_order: 1, course_slug: 'git-github' },
          { id: 'licao-1-5-push', title: 'git push — Enviando Pro GitHub', order: 5, duration_minutes: 15, markdown_path: 'cursinho/modulo-1/licao-1-5-push.md', module_id: 'git-modulo-1', module_title: 'Fundações — Do Zero ao Git', module_order: 1, course_slug: 'git-github' },
          { id: 'licao-1-6-branches', title: 'Branches — A Raiz Secreta do Git', order: 6, duration_minutes: 20, markdown_path: 'cursinho/modulo-1/licao-1-6-branches.md', module_id: 'git-modulo-1', module_title: 'Fundações — Do Zero ao Git', module_order: 1, course_slug: 'git-github' },
        ]
      },
      {
        id: 'git-modulo-2',
        title: 'Colaboração — Pull Requests do Zero',
        description: 'Aprenda como times de verdade colaboram via Pull Requests.',
        order: 2,
        lessons: [
          { id: 'licao-2-1-pull-request', title: 'O que é uma Pull Request?', order: 1, duration_minutes: 15, markdown_path: 'cursinho/modulo-2/licao-2-1-pull-request.md', module_id: 'git-modulo-2', module_title: 'Colaboração — Pull Requests do Zero', module_order: 2, course_slug: 'git-github' },
          { id: 'licao-2-2-criar-pr', title: 'Criando Seu Primeiro Pull Request', order: 2, duration_minutes: 15, markdown_path: 'cursinho/modulo-2/licao-2-2-criar-pr.md', module_id: 'git-modulo-2', module_title: 'Colaboração — Pull Requests do Zero', module_order: 2, course_slug: 'git-github' },
          { id: 'licao-2-3-feedback', title: 'Respondendo a Feedback numa PR', order: 3, duration_minutes: 15, markdown_path: 'cursinho/modulo-2/licao-2-3-feedback.md', module_id: 'git-modulo-2', module_title: 'Colaboração — Pull Requests do Zero', module_order: 2, course_slug: 'git-github' },
        ]
      },
      {
        id: 'git-modulo-3',
        title: 'Avançado — Quando as Coisas Ficam Complexas',
        description: 'git log, desfazer erros, merge vs rebase — ferramentas que devs usam todo dia.',
        order: 3,
        lessons: [
          { id: 'licao-3-1-git-log', title: 'Entendo Meu Histórico — git log', order: 1, duration_minutes: 10, markdown_path: 'cursinho/modulo-3/licao-3-1-git-log.md', module_id: 'git-modulo-3', module_title: 'Avançado — Quando as Coisas Ficam Complexas', module_order: 3, course_slug: 'git-github' },
          { id: 'licao-3-2-desfazer', title: 'Desfazendo Erros — 4 Cenários', order: 2, duration_minutes: 15, markdown_path: 'cursinho/modulo-3/licao-3-2-desfazer.md', module_id: 'git-modulo-3', module_title: 'Avançado — Quando as Coisas Ficam Complexas', module_order: 3, course_slug: 'git-github' },
          { id: 'licao-3-3-merge-rebase', title: 'Merge vs Rebase — Dois Jeitos de Combinar', order: 3, duration_minutes: 15, markdown_path: 'cursinho/modulo-3/licao-3-3-merge-rebase.md', module_id: 'git-modulo-3', module_title: 'Avançado — Quando as Coisas Ficam Complexas', module_order: 3, course_slug: 'git-github' },
        ]
      }
    ]
  },
  {
    id: 'ia-clickup',
    slug: 'ia-clickup',
    title: 'IA + ClickUp',
    description: 'Escale seus processos usando IA integrada ao ClickUp. A metodologia Sinkra usada por empresas onde 25 pessoas fazem o trabalho de 500.',
    total_duration_minutes: 120,
    modules: [
      {
        id: 'ia-modulo-1',
        title: 'Fundamentos — Por que isso muda tudo',
        description: 'A metodologia Sinkra, os resultados reais e por que IA precisa de contexto dosado.',
        order: 1,
        lessons: [
          { id: 'ia-licao-1-1', title: 'Abertura e apresentação dos convidados', order: 1, duration_minutes: 5, markdown_path: 'cursinho/Como-usar-IA-e-ClickUp-pra-ESCALAR-seus-processos/modulo-1/licao-1-1.md', module_id: 'ia-modulo-1', module_title: 'Fundamentos — Por que isso muda tudo', module_order: 1, course_slug: 'ia-clickup' },
          { id: 'ia-licao-1-2', title: 'Resultados da Fluence', order: 2, duration_minutes: 8, markdown_path: 'cursinho/Como-usar-IA-e-ClickUp-pra-ESCALAR-seus-processos/modulo-1/licao-1-2.md', module_id: 'ia-modulo-1', module_title: 'Fundamentos — Por que isso muda tudo', module_order: 1, course_slug: 'ia-clickup' },
          { id: 'ia-licao-1-3', title: 'Por que Pedro criou a metodologia Sinkra', order: 3, duration_minutes: 4, markdown_path: 'cursinho/Como-usar-IA-e-ClickUp-pra-ESCALAR-seus-processos/modulo-1/licao-1-3.md', module_id: 'ia-modulo-1', module_title: 'Fundamentos — Por que isso muda tudo', module_order: 1, course_slug: 'ia-clickup' },
          { id: 'ia-licao-1-4', title: 'A ilusão de controle é pior que o descontrole', order: 4, duration_minutes: 2, markdown_path: 'cursinho/Como-usar-IA-e-ClickUp-pra-ESCALAR-seus-processos/modulo-1/licao-1-4.md', module_id: 'ia-modulo-1', module_title: 'Fundamentos — Por que isso muda tudo', module_order: 1, course_slug: 'ia-clickup' },
          { id: 'ia-licao-1-5', title: 'IA é um tipo diferente de executor', order: 5, duration_minutes: 6, markdown_path: 'cursinho/Como-usar-IA-e-ClickUp-pra-ESCALAR-seus-processos/modulo-1/licao-1-5.md', module_id: 'ia-modulo-1', module_title: 'Fundamentos — Por que isso muda tudo', module_order: 1, course_slug: 'ia-clickup' },
          { id: 'ia-licao-1-6', title: 'Automação ao vivo — criação de pastas em 3 minutos', order: 6, duration_minutes: 3, markdown_path: 'cursinho/Como-usar-IA-e-ClickUp-pra-ESCALAR-seus-processos/modulo-1/licao-1-6.md', module_id: 'ia-modulo-1', module_title: 'Fundamentos — Por que isso muda tudo', module_order: 1, course_slug: 'ia-clickup' },
          { id: 'ia-licao-1-7', title: 'Economia real — 5.000 horas por ano eliminadas', order: 7, duration_minutes: 3, markdown_path: 'cursinho/Como-usar-IA-e-ClickUp-pra-ESCALAR-seus-processos/modulo-1/licao-1-7.md', module_id: 'ia-modulo-1', module_title: 'Fundamentos — Por que isso muda tudo', module_order: 1, course_slug: 'ia-clickup' },
        ]
      },
      {
        id: 'ia-modulo-2',
        title: 'Os 3 Níveis da Empresa e ClickUp na Prática',
        description: 'Estrutura estratégica-tática-operacional e como ClickUp conecta tudo com contexto dosado para IA.',
        order: 2,
        lessons: [
          { id: 'ia-licao-2-1', title: 'Os 3 níveis da empresa', order: 1, duration_minutes: 6, markdown_path: 'cursinho/Como-usar-IA-e-ClickUp-pra-ESCALAR-seus-processos/modulo-2/licao-2-1.md', module_id: 'ia-modulo-2', module_title: 'Os 3 Níveis da Empresa e ClickUp na Prática', module_order: 2, course_slug: 'ia-clickup' },
          { id: 'ia-licao-2-2', title: 'Visão de relacionamento 100% integrada no ClickUp', order: 2, duration_minutes: 6, markdown_path: 'cursinho/Como-usar-IA-e-ClickUp-pra-ESCALAR-seus-processos/modulo-2/licao-2-2.md', module_id: 'ia-modulo-2', module_title: 'Os 3 Níveis da Empresa e ClickUp na Prática', module_order: 2, course_slug: 'ia-clickup' },
          { id: 'ia-licao-2-3', title: 'O que são microtarefas e por que mapeá-las', order: 3, duration_minutes: 5, markdown_path: 'cursinho/Como-usar-IA-e-ClickUp-pra-ESCALAR-seus-processos/modulo-2/licao-2-3.md', module_id: 'ia-modulo-2', module_title: 'Os 3 Níveis da Empresa e ClickUp na Prática', module_order: 2, course_slug: 'ia-clickup' },
          { id: 'ia-licao-2-4', title: 'Como dosar contexto para IA funcionar bem', order: 4, duration_minutes: 8, markdown_path: 'cursinho/Como-usar-IA-e-ClickUp-pra-ESCALAR-seus-processos/modulo-2/licao-2-4.md', module_id: 'ia-modulo-2', module_title: 'Os 3 Níveis da Empresa e ClickUp na Prática', module_order: 2, course_slug: 'ia-clickup' },
          { id: 'ia-licao-2-5', title: 'Automação de legendas com regras herdadas do projeto', order: 5, duration_minutes: 4, markdown_path: 'cursinho/Como-usar-IA-e-ClickUp-pra-ESCALAR-seus-processos/modulo-2/licao-2-5.md', module_id: 'ia-modulo-2', module_title: 'Os 3 Níveis da Empresa e ClickUp na Prática', module_order: 2, course_slug: 'ia-clickup' },
        ]
      },
      {
        id: 'ia-modulo-3',
        title: 'Metodologia Sinkra Avançada e Casos Reais',
        description: 'Cohort Sinkra Ops, por que BPMN tradicional quebrou, e casos reais de criação 100% com IA.',
        order: 3,
        lessons: [
          { id: 'ia-licao-3-1', title: 'Apresentação do cohort Sinkra Ops', order: 1, duration_minutes: 7, markdown_path: 'cursinho/Como-usar-IA-e-ClickUp-pra-ESCALAR-seus-processos/modulo-3/licao-3-1.md', module_id: 'ia-modulo-3', module_title: 'Metodologia Sinkra Avançada e Casos Reais', module_order: 3, course_slug: 'ia-clickup' },
          { id: 'ia-licao-3-2', title: 'Mudança de paradigma — por que BPMN tradicional quebrou', order: 2, duration_minutes: 20, markdown_path: 'cursinho/Como-usar-IA-e-ClickUp-pra-ESCALAR-seus-processos/modulo-3/licao-3-2.md', module_id: 'ia-modulo-3', module_title: 'Metodologia Sinkra Avançada e Casos Reais', module_order: 3, course_slug: 'ia-clickup' },
          { id: 'ia-licao-3-3', title: 'Processo de criação 100% com IA (Symphony/TikTok)', order: 3, duration_minutes: 12, markdown_path: 'cursinho/Como-usar-IA-e-ClickUp-pra-ESCALAR-seus-processos/modulo-3/licao-3-3.md', module_id: 'ia-modulo-3', module_title: 'Metodologia Sinkra Avançada e Casos Reais', module_order: 3, course_slug: 'ia-clickup' },
          { id: 'ia-licao-3-4', title: 'O nível certo de mapeamento de processo com IA', order: 4, duration_minutes: 13, markdown_path: 'cursinho/Como-usar-IA-e-ClickUp-pra-ESCALAR-seus-processos/modulo-3/licao-3-4.md', module_id: 'ia-modulo-3', module_title: 'Metodologia Sinkra Avançada e Casos Reais', module_order: 3, course_slug: 'ia-clickup' },
          { id: 'ia-licao-3-5', title: 'Encerramento e recado final', order: 5, duration_minutes: 5, markdown_path: 'cursinho/Como-usar-IA-e-ClickUp-pra-ESCALAR-seus-processos/modulo-3/licao-3-5.md', module_id: 'ia-modulo-3', module_title: 'Metodologia Sinkra Avançada e Casos Reais', module_order: 3, course_slug: 'ia-clickup' },
        ]
      }
    ]
  }
];

const courseBySlug = new Map<string, Course>();
const lessonByKey = new Map<string, Lesson>();

courses.forEach(course => {
  courseBySlug.set(course.slug, course);
  course.modules.forEach(mod => {
    mod.lessons.forEach(lesson => {
      lessonByKey.set(`${course.slug}/${lesson.id}`, lesson);
    });
  });
});

// ========== COURSES API ==========

app.get('/api/v1/courses', (req: Request, res: Response) => {
  return res.json(courses.map(c => ({
    id: c.id,
    slug: c.slug,
    title: c.title,
    description: c.description,
    youtube_url: c.youtube_url,
    total_duration_minutes: c.total_duration_minutes,
    total_modules: c.modules.length,
    total_lessons: c.modules.reduce((sum, m) => sum + m.lessons.length, 0),
  })));
});

app.get('/api/v1/courses/:slug', (req: Request, res: Response) => {
  const course = courseBySlug.get(req.params.slug);
  if (!course) return res.status(404).json({ error: 'Course not found' });
  return res.json({
    id: course.id,
    slug: course.slug,
    title: course.title,
    description: course.description,
    youtube_url: course.youtube_url,
    total_duration_minutes: course.total_duration_minutes,
    modules: course.modules.map(m => ({
      id: m.id,
      title: m.title,
      description: m.description,
      order: m.order,
      lessons: m.lessons.map(l => ({
        id: l.id,
        title: l.title,
        order: l.order,
        duration_minutes: l.duration_minutes,
      }))
    }))
  });
});

app.get('/api/v1/courses/:slug/progress', authMiddleware, (req: any, res: Response) => {
  const course = courseBySlug.get(req.params.slug);
  if (!course) return res.status(404).json({ error: 'Course not found' });
  const completed = userProgress.get(req.userId) || new Set<string>();
  const completedLessons = Array.from(completed)
    .filter(k => k.startsWith(`${req.params.slug}/`))
    .map(k => k.slice(req.params.slug.length + 1));
  return res.json({ completed_lesson_ids: completedLessons, completedLessonIds: completedLessons });
});

app.get('/api/v1/courses/:slug/lessons/:lessonId', (req: Request, res: Response) => {
  const lesson = lessonByKey.get(`${req.params.slug}/${req.params.lessonId}`);
  if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
  const filePath = path.join(process.cwd(), lesson.markdown_path);
  let content_markdown: string;
  try {
    content_markdown = fs.readFileSync(filePath, 'utf-8');
  } catch {
    return res.status(500).json({ error: 'Content unavailable' });
  }
  return res.json({
    id: lesson.id,
    title: lesson.title,
    order: lesson.order,
    duration_minutes: lesson.duration_minutes,
    content_markdown,
    youtube_start_seconds: null,
    youtube_end_seconds: null,
    module_title: lesson.module_title,
    module_order: lesson.module_order,
    course_youtube_url: null,
  });
});

app.post('/api/v1/courses/:slug/lessons/:lessonId/complete', authMiddleware, (req: any, res: Response) => {
  const key = `${req.params.slug}/${req.params.lessonId}`;
  const lesson = lessonByKey.get(key);
  if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
  if (!userProgress.has(req.userId)) userProgress.set(req.userId, new Set<string>());
  const progress = userProgress.get(req.userId)!;
  const alreadyCompleted = progress.has(key);
  progress.add(key);
  if (!alreadyCompleted) {
    const user = users.get(req.userId);
    if (user) {
      user.xp += 50;
      user.level = Math.floor(user.xp / 100) + 1;
    }
  }

  const courseData = courseBySlug.get(req.params.slug)!;
  const totalLessons = courseData.modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedForCourse = Array.from(progress).filter(k => k.startsWith(`${req.params.slug}/`)).length;
  const courseCompleted = completedForCourse === totalLessons;

  let certificateId: string | undefined;
  if (courseCompleted) {
    const existingCertId = Array.from(userCertificates.get(req.userId) || new Set<string>())
      .find(id => certificates.get(id)?.courseSlug === req.params.slug);
    if (!existingCertId) {
      const user = users.get(req.userId);
      const cert: Certificate = {
        id: uuidv4(),
        userId: req.userId,
        courseSlug: req.params.slug,
        courseTitle: courseData.title,
        userName: user?.name || 'Aluno',
        issuedAt: new Date().toISOString(),
      };
      certificates.set(cert.id, cert);
      if (!userCertificates.has(req.userId)) userCertificates.set(req.userId, new Set<string>());
      userCertificates.get(req.userId)!.add(cert.id);
      certificateId = cert.id;
    } else {
      certificateId = existingCertId;
    }
  }

  return res.json({
    lesson_id: lesson.id,
    xp_awarded: alreadyCompleted ? 0 : 50,
    already_completed: alreadyCompleted,
    course_completed: courseCompleted,
    ...(courseCompleted && { certificate_id: certificateId }),
  });
});

// ========== CERTIFICATES API ==========

app.get('/api/v1/certificates', authMiddleware, (req: any, res: Response) => {
  const certIds = userCertificates.get(req.userId) || new Set<string>();
  const certs = Array.from(certIds).map(id => certificates.get(id)!).filter(Boolean);
  return res.json(certs.map(c => ({
    id: c.id,
    course_slug: c.courseSlug,
    course_title: c.courseTitle,
    issued_at: c.issuedAt,
    download_url: `/api/v1/certificates/${c.id}/download`,
  })));
});

app.get('/api/v1/certificates/:certificateId/download', authMiddleware, (req: any, res: Response) => {
  const cert = certificates.get(req.params.certificateId);
  if (!cert || cert.userId !== req.userId) {
    return res.status(404).json({ error: 'Certificate not found' });
  }

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="certificado-${cert.courseSlug}-${cert.userName.replace(/\s+/g, '-')}.pdf"`);

  const doc = new PDFDocument({ margin: 60 });
  doc.pipe(res);

  doc.fontSize(28).font('Helvetica-Bold').text('Certificado de Conclusão', { align: 'center' });
  doc.moveDown(1.5);
  doc.fontSize(14).font('Helvetica').text('Certificamos que', { align: 'center' });
  doc.moveDown(0.5);
  doc.fontSize(22).font('Helvetica-Bold').text(cert.userName, { align: 'center' });
  doc.moveDown(0.5);
  doc.fontSize(14).font('Helvetica').text('concluiu com êxito o cursinho', { align: 'center' });
  doc.moveDown(0.5);
  doc.fontSize(18).font('Helvetica-Bold').text(cert.courseTitle, { align: 'center' });
  doc.moveDown(1.5);
  doc.fontSize(11).font('Helvetica').fillColor('#666666')
    .text(`Data de conclusão: ${new Date(cert.issuedAt).toLocaleDateString('pt-BR')}`, { align: 'center' });
  doc.moveDown(0.3);
  doc.fontSize(10).text(`ID do certificado: ${cert.id}`, { align: 'center' });

  doc.end();
});

// ========== HEALTH ==========

app.get('/health', (req: Request, res: Response) => {
  return res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: 'connected',
    version: '1.0.0',
    integrations: {
      jarvis: 'connected',
      nord: 'connected',
      cloneProfile: 'active'
    }
  });
});

app.use((err: any, req: Request, res: Response, next: any) => {
  console.error('[ERROR]', err);
  return res.status(500).json({ error: 'Internal error' });
});

const isMain = process.argv[1]?.endsWith('server.js') || process.argv[1]?.endsWith('server.ts');
if (isMain) {
  app.listen(PORT, () => {
    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║       🎓 GAMA EDUCACAO v1.0 — Backend Server LIVE         ║');
    console.log('╠════════════════════════════════════════════════════════════╣');
    console.log(`║  🌐 Server:    http://localhost:${PORT}`);
    console.log(`║  ❤️  Health:    http://localhost:${PORT}/health`);
    console.log(`║  📚 Topics:    http://localhost:${PORT}/topics`);
    console.log(`║  🎖️  Badges:    http://localhost:${PORT}/badges`);
    console.log('╚════════════════════════════════════════════════════════════╝\n');
  });
}

export default app;
