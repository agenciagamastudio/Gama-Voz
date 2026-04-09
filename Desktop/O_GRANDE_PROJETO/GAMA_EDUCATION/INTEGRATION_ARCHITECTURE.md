# GAMA Stack Integrado — Arquitetura de Integração
## Visão: Um Dia na Vida do Usuário

### Morning Flow (Fluxo Matinal)

```
7:00 AM — Usuario acorda
   ↓
GAMA JARVIS (Voice Conversation)
  └─ Usuário inicia conversa com Matheus (Clone IA)
  └─ Discute pensamentos, ideias, contexto de hoje
  └─ Jarvis colhe 15-20 inputs sobre mental state

   ↓
GAMA NORD (Vocational Discovery Engine)
  └─ Analisa inputs do Jarvis
  └─ Mapeia: Energia, Foco, Necessidade
  └─ Descobre: "Hoje você está melhor para ARQUITETURA"
  └─ Fornece: Recomendação de blocos de tempo

   ↓
GAMA EDUCATION (Personalized Learning + Clone Profile)
  └─ Carrega dashboard personalizado baseado em NORD
  └─ Mostra tópicos recomendados para ARQUITETURA
  └─ Exibe Clone Profile:
       • Foto + Email + Informações básicas
       • Behavioral Analysis (PREHD/SONHAR/Brain Warfare)
       • Personalidade Traits (Autonomy, Innovation, Leadership)
       • Daily Strength Assessment
       • Recomendações de estudo para hoje
  └─ Usuário aprende com conteúdo personalizado
  └─ Ganha XP/Badges conforme progride

   ↓
8:00 AM — Execução
  └─ Usuário começa o dia com clareza
  └─ Sabe exatamente qual é a área de foco
  └─ Tem conteúdo educacional pronto para esse foco
```

---

## Componentes Principais

### 1. GAMA_EDUCATION Backend (Express.js)
**Responsabilidade:** Orquestração, autenticação, persistência

#### Endpoints Novos (para integração)
```
POST /api/v1/integration/jarvis-input
  Input: Conversação do Jarvis
  Output: { jarvisSessionId, inputCount }

GET /api/v1/integration/nord-recommendation/{userId}
  Input: userId
  Output: { recommendedTopic, focusArea, timeBlocks, confidence }

GET /api/v1/user/clone-profile/{userId}
  Input: userId
  Output: CloneProfile (comportamento, traits, dailyStrength)

POST /api/v1/education/personalize
  Input: { userId, focusArea, nordData }
  Output: { recommendedTopics[], curatedLessons[] }
```

#### Database Extensions
```sql
-- Jarvis Integration
CREATE TABLE jarvis_sessions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  session_date TIMESTAMP,
  inputs JSONB, -- 15-20 inputs conversacionais
  energy_level INT, -- 1-10
  focus_area TEXT,
  mental_state TEXT,
  created_at TIMESTAMP
);

-- Nord Recommendations
CREATE TABLE nord_recommendations (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  jarvis_session_id UUID REFERENCES jarvis_sessions(id),
  recommended_topic VARCHAR(100),
  focus_area VARCHAR(100),
  confidence_score FLOAT,
  time_blocks JSONB, -- [9-11am, 2-4pm, etc]
  created_at TIMESTAMP
);

-- Clone Profile Extensions
CREATE TABLE user_behavioral_profile (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  prehd_score INT, -- Precisão, Responsabilidade, Engajamento, Humanidade, Dinamismo
  sonhar_score INT, -- Senso de oportunidade, Ousadia, Navegação de incerteza, Humanidade, Aprendizado, Resultado
  brain_warfare_score INT, -- Ataque, Defesa, Suporte
  daily_strength_area VARCHAR(100), -- Area de maior força hoje
  personality_traits JSONB, -- {autonomy, innovation, leadership, documentation}
  updated_at TIMESTAMP
);
```

### 2. GAMA JARVIS Integration
**Localização:** `/GAMA_JARVIS` (já funcional)
**Integração:** Enviar inputs para Education backend

```typescript
// hooks/useJarvisIntegration.ts
async function submitJarvisSession(inputs: string[]) {
  // 1. Salva inputs em local storage
  // 2. Envia para backend: POST /api/v1/integration/jarvis-input
  // 3. Recebe: { jarvisSessionId }
  // 4. Dispara: useNordRecommendation()
}
```

### 3. GAMA NORD Integration
**Localização:** `/GAMA_NORT` (Discovery Engine)
**Função:** Análise e recomendação

```typescript
// hooks/useNordRecommendation.ts
async function getNordRecommendation(jarvisSessionId: string) {
  // 1. Aguarda Jarvis completion
  // 2. Chama: GET /api/v1/integration/nord-recommendation/{userId}
  // 3. Recebe: { recommendedTopic, focusArea, timeBlocks }
  // 4. Salva em localStorage para Education
  // 5. Redireciona para GAMA_EDUCATION
}
```

### 4. GAMA EDUCATION Frontend Updates
**Localização:** `/GAMA_EDUCATION/frontend`

#### Dashboard Layout (com Design System Nativo)
```
┌─────────────────────────────────────────────────┐
│ GAMA EDUCATION — Morning Dashboard              │ (#88CE11)
├──────────────┬──────────────────────────────────┤
│ Clone        │ Today's Focus: ARCHITECTURE      │
│ Profile      │                                  │
│              │ Recomendação NORD                │
│  [Avatar]    │ ✓ Timing: 9-11am, 2-4pm         │
│  Email       │ ✓ Topics ready                   │
│  Level 42    │                                  │
│  Autonomy: ▓▓▓▓▓▒▒ 75%                         │
│  Innovation: ▓▓▓▓▒▒▒ 68%                       │
│  Leadership: ▓▓▓▓▓▓▒ 78%                       │
│              │                                  │
│  TRAITS:     │ HOJE:                            │
│  • Async     │ □ Distributed Systems (60min)    │
│  • Visual    │ □ Microservices Patterns (45min) │
│  • Logical   │ □ Kubernetes Deep Dive (90min)   │
│              │                                  │
│  DAILY:      │ XP EARNED: 125 / 500             │
│  Strength: A │ BADGES: 🏆 Architecture Expert   │
│              │         🌟 Week Streak x2        │
└──────────────┴──────────────────────────────────┘
```

#### Components
```
CloneProfileCard
  ├─ Avatar
  ├─ BasicInfo
  ├─ BehavioralAnalysis (PREHD/SONHAR/BrainWarfare)
  ├─ PersonalityTraits (Autonomy, Innovation, Leadership, Documentation)
  ├─ DailyStrengthAssessment
  └─ SpecialtiesDisplay

NordRecommendationPanel
  ├─ FocusAreaDisplay
  ├─ ConfidenceScore
  ├─ TimeBlocksScheduler
  └─ RecommendedTopicsCarousel

PersonalizedLessonsList
  ├─ LessonCard (baseado em focusArea)
  ├─ EstimatedTime
  ├─ XPReward
  └─ CompletionTracker
```

### 5. Neo4j Knowledge Graph Extensions
```
// Nós novos
MATCHER (topic:Topic)-[r:RECOMMENDED_FOR]->(trait:Trait)
CREATE INDEX ON (trait:Trait)
CREATE CONSTRAINT ON (trait:Trait.name) ASSERT trait.name IS UNIQUE

// Relacionamentos novos
(User)-[:HAD_JARVIS_SESSION]->(JarvisSession)
(JarvisSession)-[:GENERATED_RECOMMENDATION]->(NordRecommendation)
(NordRecommendation)-[:SUGGESTS_TOPIC]->(Topic)
(User)-[:HAS_STRENGTH_IN]->(Topic)
(User)-[:PERSONALITY_TYPE]->(Trait)
```

---

## Fluxo de Implementação (Paralelo)

### Fase 1: Backend Orquestração (1-2 dias)
- [ ] Criar endpoints `/integration/jarvis-input` e `/integration/nord-recommendation`
- [ ] Criar tabelas: `jarvis_sessions`, `nord_recommendations`, `user_behavioral_profile`
- [ ] Implementar lógica de scoring (comportamental, personality traits)
- [ ] Integrar Neo4j queries para recomendação de tópicos

### Fase 2: Frontend Dashboard (2-3 dias)
- [ ] CloneProfileCard com design system nativo
- [ ] NordRecommendationPanel
- [ ] PersonalizedLessonsList
- [ ] Integração com hooks (useJarvisIntegration, useNordRecommendation)

### Fase 3: Persistência de Estado (1 dia)
- [ ] LocalStorage para dados Jarvis
- [ ] SessionStorage para NORD recommendation
- [ ] Redux/Context para estado da lesson

### Fase 4: Testing & Polish (1-2 dias)
- [ ] Testes e2e do flow Jarvis→NORD→Education
- [ ] Performance optimization
- [ ] Design refinements (GAMA nativo)

---

## Dados de Exemplo

### Jarvis Input
```json
{
  "session_id": "jarvis-2026-04-09",
  "user_id": "user-123",
  "inputs": [
    "Acordei com energia alta",
    "Tenho 4 horas livres de manhã",
    "Estou com dúvida em arquitetura distribuída",
    "Prefiro aprender com exemplos práticos",
    "Gosto de resolver problemas reais"
  ],
  "energy_level": 8,
  "mental_state": "focused_and_optimistic"
}
```

### Nord Recommendation
```json
{
  "user_id": "user-123",
  "recommended_topic": "Distributed Systems Architecture",
  "focus_area": "Architecture",
  "confidence_score": 0.89,
  "time_blocks": ["09:00-11:00", "14:00-16:00"],
  "rationale": "Energia alta + dúvida específica + preferência por prática = Arquitetura Distribuída é ideal"
}
```

### Clone Profile
```json
{
  "user_id": "user-123",
  "avatar_url": "matheus.jpg",
  "email": "matheus@gama.ai",
  "level": 42,
  "xp": 3450,
  "behavioral_profile": {
    "prehd": {
      "precisao": 8,
      "responsabilidade": 7,
      "engajamento": 9,
      "humanidade": 6,
      "dinamismo": 8
    },
    "sonhar": {
      "senso_oportunidade": 9,
      "ousadia": 8,
      "navegacao_incerteza": 7,
      "humanidade": 6,
      "aprendizado": 9,
      "resultado": 8
    },
    "brain_warfare": {
      "ataque": 7,
      "defesa": 8,
      "suporte": 6
    }
  },
  "personality_traits": {
    "autonomy": 0.95,
    "innovation": 0.88,
    "leadership": 0.82,
    "documentation": 0.65
  },
  "daily_strength_area": "Architecture",
  "specialties": ["Distributed Systems", "Microservices", "Cloud Native"]
}
```

---

## Success Metrics

✅ Usuário consegue fazer morning flow completo (Jarvis→NORD→Education) em <10 min
✅ Dashboard carrega em <2s
✅ Clone profile é visível e atualizado
✅ Recomendações NORD têm 80%+ de relevância
✅ Usuário completa 60%+ dos tópicos recomendados
✅ Engagement aumenta 40%+ vs sem integração

---

## Próximas Sessões

1. **Sessão Atual:** Criar arquitetura + começar implementação backend
2. **Sessão +1:** Implementar endpoints + testes
3. **Sessão +2:** Frontend dashboard + integração
4. **Sessão +3:** E2E tests + refinement + deploy

---

**Status:** 📋 Planning (pronto para implementação)
**Prioridade:** 🔴 CRITICAL (core user experience)
**Esforço:** ~7-10 dias (1-2 devs)
