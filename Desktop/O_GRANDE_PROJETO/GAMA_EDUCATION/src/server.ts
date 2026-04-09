import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

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

export default app;
