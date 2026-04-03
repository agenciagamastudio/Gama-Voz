# Design System & Architecture Review
## GAMA Calculadora App

**Revisão Completa:** 2026-02-22
**Status:** Análise Arquitetural Completa
**Target:** 100% clareza em patterns, state management e escalabilidade

---

## SUMÁRIO EXECUTIVO

O gama-calculadora-app possui uma arquitetura **funcional mas não-escalável** para 100+ features. O design system é minimalista (apenas Button + Input atoms) e o state management sofre de **duplicação severa** entre 5 contexts independentes. A aplicação está madura para refatoração estrutural antes de crescimento significativo.

**Recomendação:** Implementar consolidação de contexts, criar padrão de componentes reutilizáveis (library de patterns), e padronizar persistência de dados.

---

## 1. MAPA DE COMPONENTES E HIERARQUIA

### 1.1 Estrutura Física

```
src/
├── components/
│   ├── ds/                          (Design System Atoms)
│   │   ├── Button.jsx              (Button simples, variant + size)
│   │   └── Input.jsx               (Input simples + label + error)
│   │
│   ├── Pages/Features (Organisms)
│   │   ├── LoginPage.jsx           (90 linhas)
│   │   ├── SignUpPage.jsx          (88 linhas)
│   │   ├── LandingPage.jsx         (215 linhas)
│   │   ├── UserProfile.jsx         (292 linhas)
│   │   ├── UserSettings.jsx        (143 linhas)
│   │   ├── AdminDashboard.jsx      (231 linhas)
│   │   ├── SmartOnboarding.jsx     (158 linhas)
│   │   ├── PricingPlans.jsx        (128 linhas)
│   │   └── PromoCodesManager.jsx   (108 linhas)
│   │
│   ├── Calculators (Organisms - Estateful)
│   │   ├── PricingCalculator.jsx   (659 linhas) **GIGANTE**
│   │   ├── DiagnosticoDeValorCalculator.jsx (786 linhas) **GIGANTE**
│   │   ├── CargoSalarioManager.jsx (262 linhas)
│   │   └── HistoryWithSavedFilters.jsx (498 linhas)
│   │
│   ├── Data Viz & Export
│   │   ├── ImpactChart.jsx         (58 linhas)
│   │   ├── ValueReportPreview.jsx  (189 linhas)
│   │   ├── ProposalPreview.jsx     (206 linhas)
│   │   ├── ReportGenerator.jsx     (103 linhas)
│   │   └── ShareProposal.jsx       (109 linhas)
│   │
│   ├── Utility
│   │   ├── WhatsappConfirmation.jsx (114 linhas)
│   │   ├── AdvancedFilters.jsx     (258 linhas)
│   │   └── BottomNav.jsx           (42 linhas)
│
├── context/                         (State Management)
│   ├── AuthContext.jsx             (192 linhas) - User auth + profile
│   ├── PointsContext.jsx           (239 linhas) - Points system
│   ├── ProposalContext.jsx         (33 linhas)  - Proposal data
│   ├── ValueReportContext.jsx      (31 linhas)  - Report data
│   └── ToastContext.jsx            (40 linhas)  - Toast notifications
│
├── hooks/
│   └── useLocalStorage.js          (Standard hook)
│
├── logic/
│   ├── calculosDeValor.js
│   ├── gapLossLogic.js
│   └── reportLogic.js
│
├── utils/
│   ├── supabase.js                 (Backend integration)
│   ├── marketData.js
│   ├── pdfExport.js
│   └── reportExport.js
│
├── styles/
│   ├── designTokens.js             (Color, spacing, typography)
│   └── index.css
│
├── App.jsx                         (Root routing + provider nesting)
└── Layout.jsx                      (Main layout + navigation - GIGANTE: 20KB)
```

**Total de linhas:** ~4.700 LOC (muito agrupado em 3 componentes gigantes)

### 1.2 Hierarquia de Componentes

```
App
├── ToastProvider
│   └── AuthProvider
│       └── PointsProvider
│           └── ProposalProvider
│               └── ValueReportProvider
│                   └── BrowserRouter
│                       ├── LoginPage
│                       ├── SignUpPage
│                       ├── LandingPage
│                       └── ProtectedRoute
│                           └── Layout
│                               ├── Navigation (Menu Lateral)
│                               ├── Breadcrumb
│                               ├── Routes
│                               │   ├── /onboarding → SmartOnboarding
│                               │   ├── /pricing → PricingCalculator
│                               │   ├── /diagnostico → DiagnosticoDeValorCalculator
│                               │   ├── /cargo-salario → CargoSalarioManager
│                               │   ├── /history → HistoryWithSavedFilters
│                               │   ├── /proposal → ProposalPreview
│                               │   ├── /report → ValueReportPreview
│                               │   ├── /profile → UserProfile
│                               │   ├── /settings → UserSettings
│                               │   ├── /admin → AdminDashboard
│                               │   └── /promo → PromoCodesManager
│                               └── BottomNav
```

---

## 2. STATE MANAGEMENT ANALYSIS

### 2.1 Context Map & Data Flow

| Context | Purpose | Size | Persistência | Sincronização |
|---------|---------|------|--------------|---|
| **AuthContext** | User auth + profile | 192L | Supabase + localStorage | Real-time on auth change |
| **PointsContext** | Points system | 239L | Supabase + state | Fire-and-forget sync |
| **ProposalContext** | Proposal data | 33L | localStorage only | useEffect hook |
| **ValueReportContext** | Report data | 31L | localStorage only | useEffect hook |
| **ToastContext** | Toast notifications | 40L | Memory only | Auto-dismiss 3s |

**Total state management code:** 535 linhas

### 2.2 Duplicação de Padrões

Cada Context repete o mesmo padrão:

```javascript
// PADRÃO REPETIDO 4x (Proposal, ValueReport, Points, Auth)

// 1. CreateContext
const XyzContext = createContext();

// 2. Provider com useState
export const XyzProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem('key-name');
    return saved ? JSON.parse(saved) : defaultValue;
  });

  // 3. useEffect para persistência
  useEffect(() => {
    if (state) {
      localStorage.setItem('key-name', JSON.stringify(state));
    }
  }, [state]);

  // 4. Update function
  const updateState = (data) => setState(data);

  // 5. Provider com value object
  return (
    <XyzContext.Provider value={{ state, updateState }}>
      {children}
    </XyzContext.Provider>
  );
};

// 6. Hook customizado
export const useXyz = () => useContext(XyzContext);
```

**Problema:** Esta duplicação viola DRY. Cada novo context exige ~30 linhas boilerplate.

### 2.3 Problemas Identificados

#### Problema 1: Nenhuma Consolidação de Dados Correlatos
- **Auth** armazena: currentUser, profile, loading, profileLoading
- **Points** armazena: balance, lastRecharged, redeemedCodes, promoCodes
- **Proposal** armazena: proposalData
- **ValueReport** armazena: reportData

Não há **relação clara** entre esses contextos. Exemplo: Proposal deveria estar ligado ao usuário (AuthContext) e aos pontos gastos (PointsContext), mas estão isolados.

#### Problema 2: Duplicação de Persistência
- **AuthContext** → localStorage + Supabase
- **PointsContext** → localStorage + Supabase (fire-and-forget)
- **ProposalContext** → localStorage only
- **ValueReportContext** → localStorage only
- **ToastContext** → memory only

Não há camada unificada de persistência. Cada context reinventa a roda.

#### Problema 3: Falta de Loading States Globais
- AuthContext tem `loading` e `profileLoading` (inconsistente)
- PointsContext não expõe `loading`
- Proposal/ValueReport não expõem `loading`
- Não há forma de saber se a app está em estado "hydrating"

#### Problema 4: Sem Cache Invalidation Strategy
- Quando um usuário atualiza perfil, os contexts não sincronizam
- Quando um código promo é redimido, a UI não reflete automaticamente
- Toast notifications são ephemeral mas não há feedback de erro de persistência

### 2.4 Data Dependencies

```
AuthContext (currentUser, profile)
    ↓
PointsContext (depends on currentUser for Supabase sync)
    ↓
ProposalContext (should depend on currentUser for ownership)
    ↓
ValueReportContext (should depend on currentUser for ownership)
    ↓
ToastContext (notifies all changes)
```

**Implementação atual:** Apenas AuthContext → PointsContext (useAuth hook)
**Esperado:** Relações bidirecionais com invalidação em cascata

---

## 3. DESIGN SYSTEM ANALYSIS

### 3.1 Design Tokens (Bem Implementado)

```javascript
// src/styles/designTokens.js

export const colors = {
  primary: '#007bff',
  secondary: '#6c757d',
  success: '#28a745',
  danger: '#dc3545',
  // ... 8 cores base bem documentadas
};

export const typography = {
  fontFamily: 'Arial, sans-serif',
  fontSize: { small, base, medium, large, h1, h2, h3 },
  fontWeight: { light, normal, medium, semibold, bold },
  lineHeight: { base: 1.5, heading: 1.2 },
};

export const spacing = {
  none: '0',
  xxs: '0.25rem',
  xs: '0.5rem',
  sm: '0.75rem',
  // ... até xxl: '3rem'
};

export const shadows = { none, sm, md, lg, xl };

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
};
```

**Qualidade:** ⭐⭐⭐⭐ Excelente. Tokens bem estruturados, escaláveis.

### 3.2 Atomic Components (Minimalista)

#### Button.jsx
```javascript
const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',    // variant support
  size = 'medium',         // size support
  disabled = false,
  ...props
}) => {
  const classes = `ds-button ds-button--${variant} ds-button--${size}`;
  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
};
```

**Problemas:**
- Sem `icon`, `loading`, `asChild` props
- Sem documentação de variants (only `primary` mentioned)
- Sem TypeScript (sem props typing)
- Sem accessibility attributes (aria-*, role)

#### Input.jsx
```javascript
const Input = ({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  ...props
}) => {
  return (
    <div className="ds-input-group">
      {label && <label htmlFor={id} className="ds-label">{label}</label>}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`ds-input ${error ? 'ds-input--error' : ''}`}
        {...props}
      />
      {error && <p className="ds-input-error-message">{error}</p>}
    </div>
  );
};
```

**Problemas:**
- Sem `disabled`, `readonly` props
- Sem `helperText`, `successMessage` props
- Sem TypeScript
- Sem accessibility (aria-invalid, aria-describedby)

### 3.3 Component Library Gaps

**Atom Components Faltando:**
- Badge
- Tag
- Alert
- Progress
- Skeleton
- Divider
- Text/Paragraph (typography component)

**Molecule Components Faltando:**
- Card
- Modal/Dialog
- Dropdown/Select
- DatePicker
- Checkbox Group
- Radio Group
- Tooltip
- Popover
- Stepper

**Organism Components Faltando:**
- Form (com validação)
- Table (com sorting, pagination)
- Navigation (Header, Sidebar)
- Footer
- Page Layout Template

**Current Implementations:** Button + Input only (~30 LOC total)

### 3.4 Tailwind vs Custom CSS

A app usa **Tailwind CSS** em toda a UI (visto em ToastContext, Layout, etc.):

```jsx
// ToastContext
<div className={`
  pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md border animate-in slide-in-from-right-10 duration-300
  ${toast.type === 'success' ? 'bg-[#0a0a0a]/90 border-primary/30 text-primary' : 'bg-[#0a0a0a]/90 border-red-500/30 text-red-500'}
`}
>
```

**Inconsistência:**
- Design tokens definidos em `designTokens.js` (CSS variables)
- UI implementada com Tailwind utility classes
- Não há sincronização entre os dois

**Recomendação:** Escolher um caminho: Tailwind com tokens via `tailwind.config.js` OR CSS variables com BEM classes.

---

## 4. ESCALABILIDADE ASSESSMENT

### 4.1 Readiness Score para 100+ Features

| Critério | Score | Status | Impacto |
|----------|-------|--------|--------|
| State Management | 2/5 | ❌ Crítico | Sem consolidação, duplicação severa |
| Component Library | 1/5 | ❌ Crítico | Apenas 2 atoms, sem padrão |
| Documentation | 1/5 | ❌ Crítico | Zero documentação de padrões |
| Code Organization | 3/5 | ⚠️ Médio | Estrutura OK, mas componentes gigantes |
| Testing Infrastructure | 1/5 | ❌ Crítico | Apenas 1 arquivo .test.js |
| TypeScript Coverage | 0/5 | ❌ Crítico | 100% JavaScript, sem types |
| CSS Architecture | 2/5 | ❌ Crítico | Tailwind + custom CSS misturado |
| API Integration | 3/5 | ⚠️ Médio | Supabase bem estruturado, sem patterns |
| Error Handling | 2/5 | ❌ Crítico | Sem try-catch patterns, toasts only |
| Performance | 3/5 | ⚠️ Médio | Lazy loading em App.jsx, sem optimization |

**Readiness para 100+ features: 18/50 = 36% ❌**

### 4.2 Escalability Bottlenecks

#### 1. State Management (CRÍTICO)
**Problema:** Cada nova feature exige novo Context

**Exemplo:** Adicionar "Templates" feature
```javascript
// Novo context exigido
const TemplatesContext = createContext();

export const TemplatesProvider = ({ children }) => {
  const [templates, setTemplates] = useState(() => {
    const saved = localStorage.getItem('gama-templates');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (templates.length > 0) {
      localStorage.setItem('gama-templates', JSON.stringify(templates));
    }
  }, [templates]);

  // ... CRUD operations
};

// App.jsx precisa envolver TemplatesProvider
// Layout.jsx precisa importar useTemplates()
// Todos os contexts ficam num nesting profundo
```

**Impacto:** Com 20 features, teríamos 25 contexts, 25 custom hooks, nesting infernal.

#### 2. Componentes Gigantes (CRÍTICO)

**PricingCalculator.jsx (659 linhas):**
- ~80% lógica estateful
- Mistura UI, validação, persistência, Supabase sync
- Impossível de testar isoladamente

**DiagnosticoDeValorCalculator.jsx (786 linhas):**
- ~85% lógica estateful
- Múltiplos cálculos complexos inline
- Sem separação de concerns

**Solução necessária:** Quebrar em componentes menores + lógica compartilhada

#### 3. Falta de Padrão de Formulários (CRÍTICO)

Cada componente reimplementa validação:

```javascript
// No PricingCalculator
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormState(prev => ({ ...prev, [name]: value }));
};

// No UserProfile
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};

// No UserSettings
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setSettings(prev => ({ ...prev, [name]: value }));
};
```

**Duplicação:** Mesma lógica 3+ vezes. Com 100 features, teríamos N variações.

#### 4. Falta de Data Validation Library

Sem schema validation (ex: Zod, Yup). Validações espalhadas pela UI.

---

## 5. CURRENT PATTERNS vs BEST PRACTICES

### 5.1 Pattern: Context API for State

**Implementação Atual:**
```javascript
// AuthContext.jsx
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  // ... more state
};
```

**Best Practice (com 100+ features):**
```javascript
// Usar Redux, Zustand, ou Jotai em vez de Context
// Ou consolidar contexts em camada única

import { create } from 'zustand';

const useAppStore = create((set) => ({
  currentUser: null,
  profile: null,
  loading: true,

  setCurrentUser: (user) => set({ currentUser: user }),
  setProfile: (profile) => set({ profile }),

  // Persistência integrada
  persist: {
    name: 'app-store',
    storage: localStorage,
  },
}));
```

**Quando é Context API apropriado:**
- Theme switching (infrequent updates)
- Language/i18n (infrequent updates)
- Auth status (infrequent updates)

**Quando não é:**
- Entity CRUD (frequent updates)
- Form state (frequent micro-updates)
- Points/balance (frequent updates)

### 5.2 Pattern: localStorage Persistence

**Implementação Atual:**
```javascript
// Repetido em 4 contexts
const [state, setState] = useState(() => {
  const saved = localStorage.getItem('key-name');
  return saved ? JSON.parse(saved) : defaultValue;
});

useEffect(() => {
  localStorage.setItem('key-name', JSON.stringify(state));
}, [state]);
```

**Best Practice:**
```javascript
// Usar library como zustand/persist ou immer
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({ /* state */ }),
    { name: 'app-storage', storage: localStorage }
  )
);

// Ou: Custom hook reutilizável
function usePersistedState(key, initialValue) {
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

// Uso
const [data, setData] = usePersistedState('proposal', null);
```

### 5.3 Pattern: Async Data Fetching

**Implementação Atual (PointsContext):**
```javascript
useEffect(() => {
  if (!currentUser) return;

  const loadFromSupabase = async () => {
    const { data: pointsData } = await supabase
      .from('user_points')
      .select('balance, last_recharged')
      .eq('user_id', currentUser.id)
      .single();

    if (pointsData) {
      setBalance(pointsData.balance);
      setLastRecharged(pointsData.last_recharged);
    }
  };

  loadFromSupabase();
}, [currentUser]);
```

**Problemas:**
- Sem error handling
- Sem timeout
- Sem loading state
- Sem cache invalidation

**Best Practice:**
```javascript
// Usar TanStack Query (React Query)
import { useQuery, useMutation } from '@tanstack/react-query';

function usePoints(userId) {
  return useQuery({
    queryKey: ['user-points', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_points')
        .select('balance, last_recharged')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}

// Uso
const { data, isLoading, error } = usePoints(currentUser?.id);
```

### 5.4 Pattern: Component Composition

**Implementação Atual (Grandes Componentes):**
```javascript
// PricingCalculator.jsx (659 linhas)
function PricingCalculator() {
  // 150+ linhas de state
  const [formState, setFormState] = useState(...);
  const [savedCompanies, setSavedCompanies] = useState(...);
  // ...

  // 200+ linhas de efeitos e callbacks
  useEffect(() => { /* ... */ }, []);
  const handleInputChange = () => { /* ... */ };
  const handleSaveCompany = () => { /* ... */ };
  // ...

  // 300+ linhas de JSX em uma única return()
  return (
    <div>
      {/* Formulário */}
      {/* Tabela */}
      {/* Modais */}
      {/* Cálculos */}
    </div>
  );
}
```

**Best Practice:**
```javascript
// Dividir em componentes menores
function PricingCalculator() {
  const { formState, handleInputChange } = usePricingForm();
  const { companies, addCompany } = useSavedCompanies();

  return (
    <div>
      <PricingForm state={formState} onChange={handleInputChange} />
      <SavedCompaniesList companies={companies} onAdd={addCompany} />
      <PricingResults {...formState} />
    </div>
  );
}

// Componentes menores e testáveis
function PricingForm({ state, onChange }) {
  // ~100 linhas de JSX + lógica específica
}

function SavedCompaniesList({ companies, onAdd }) {
  // ~80 linhas de JSX + lógica de lista
}

function PricingResults({ clientName, features, rate }) {
  // ~60 linhas de cálculo e exibição
}

// Custom hooks para lógica reutilizável
function usePricingForm() {
  const [formState, setFormState] = useState(...);
  const handleInputChange = (e) => { /* ... */ };
  return { formState, handleInputChange };
}
```

### 5.5 Pattern: Error Handling

**Implementação Atual:**
```javascript
// AuthContext
const login = async (email, password) => {
  setLoading(true);
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  setLoading(false);

  if (error) {
    addToast(`Erro ao fazer login: ${error.message}`, 'error');
    return false;
  }
  // ...
};
```

**Problemas:**
- Toasts como único mecanismo de feedback
- Sem logging estruturado
- Sem retry logic
- Sem error boundaries

**Best Practice:**
```javascript
// Error boundaries
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}

// Com retry
async function fetchWithRetry(fn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await delay(1000 * Math.pow(2, i)); // exponential backoff
    }
  }
}

// Logging estruturado
const logger = {
  info: (msg, data) => console.log(`[INFO] ${msg}`, data),
  error: (msg, error) => console.error(`[ERROR] ${msg}`, error),
  warn: (msg, data) => console.warn(`[WARN] ${msg}`, data),
};
```

---

## 6. RECOMMENDED REFACTORING ROADMAP

### 6.1 Phase 1: State Management Consolidation (2-3 sprints)

**Goal:** Consolidar 5 contexts em 2-3 contextos semanticamente agrupados

**Step 1: Create Unified AppStore**
```javascript
// src/context/AppStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAppStore = create(
  persist(
    (set, get) => ({
      // Auth state
      currentUser: null,
      profile: null,
      authLoading: false,
      setCurrentUser: (user) => set({ currentUser: user }),
      setProfile: (profile) => set({ profile }),

      // Points state
      pointsBalance: 0,
      lastRecharged: null,
      redeemedCodes: new Set(),
      setPointsBalance: (balance) => set({ pointsBalance: balance }),
      spendPoints: (amount) => {
        const state = get();
        if (state.pointsBalance >= amount) {
          set({ pointsBalance: state.pointsBalance - amount });
          return true;
        }
        return false;
      },

      // Proposal state
      proposalData: null,
      setProposalData: (data) => set({ proposalData: data }),

      // Report state
      reportData: null,
      setReportData: (data) => set({ reportData: data }),
    }),
    {
      name: 'gama-app-store',
      storage: localStorage,
      partialize: (state) => ({
        // Persist apenas dados não-sensitive
        proposalData: state.proposalData,
        reportData: state.reportData,
        pointsBalance: state.pointsBalance,
      }),
    }
  )
);
```

**Step 2: Create Service Layer**
```javascript
// src/services/authService.js
import { supabase } from '../utils/supabase';
import { useAppStore } from '../context/AppStore';

export const authService = {
  login: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    // Atualiza store
    useAppStore.setState({
      currentUser: data.user,
      authLoading: false
    });

    return data.user;
  },

  // ... signup, logout, etc
};

// src/services/pointsService.js
export const pointsService = {
  loadUserPoints: async (userId) => {
    const { data, error } = await supabase
      .from('user_points')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;

    useAppStore.setState({
      pointsBalance: data.balance,
      lastRecharged: data.last_recharged,
    });
  },

  spendPoints: async (userId, amount) => {
    const store = useAppStore.getState();
    if (store.pointsBalance < amount) throw new Error('Insufficient points');

    // Optimistic update
    store.setPointsBalance(store.pointsBalance - amount);

    // Backend sync
    const { error } = await supabase
      .from('user_points')
      .update({ balance: store.pointsBalance - amount })
      .eq('user_id', userId);

    if (error) {
      // Rollback
      store.setPointsBalance(store.pointsBalance);
      throw error;
    }
  },
};
```

**Step 3: Migrate Existing Contexts**
- Manter backward compatibility com custom hooks (useAuth, usePoints, etc)
- Gradualmente substituir Context imports por AppStore imports
- Deprecate old contexts após migração completa

### 6.2 Phase 2: Component Library & Design System (3-4 sprints)

**Goal:** Criar library de 20+ componentes reutilizáveis

**Structure:**
```
src/components/ds/
├── atoms/
│   ├── Button/
│   │   ├── Button.jsx
│   │   ├── Button.stories.jsx
│   │   ├── Button.test.jsx
│   │   └── Button.module.css
│   ├── Input/
│   ├── Badge/
│   ├── Chip/
│   ├── Text/
│   ├── Icon/
│   └── Spinner/
│
├── molecules/
│   ├── Card/
│   ├── Modal/
│   ├── Toast/
│   ├── Dropdown/
│   ├── Form/
│   └── SearchBar/
│
├── organisms/
│   ├── Navigation/
│   ├── Sidebar/
│   ├── Header/
│   ├── Table/
│   └── DataGrid/
│
└── hooks/
    ├── useFormField.js
    ├── useAsync.js
    ├── useDebounce.js
    └── useClickOutside.js
```

**Start with:**
1. Enhance Button & Input (add missing props, a11y, types)
2. Create Form component (handles validation)
3. Create Card, Modal, Dropdown
4. Create hooks library

**Documentation:**
- Storybook setup (one story per component)
- Accessibility checklist (WCAG 2.1 AA)
- TypeScript types for all components

### 6.3 Phase 3: Form System & Validation (2-3 sprints)

**Goal:** Centralizar validação e lógica de formulários

```javascript
// src/hooks/useForm.js
import { useCallback, useState } from 'react';
import { z } from 'zod'; // ou yup

export function useForm(schema, onSubmit) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for this field
    setErrors(prev => ({ ...prev, [name]: undefined }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validated = schema.parse(formData);
      await onSubmit(validated);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors);
      } else {
        throw error;
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, schema, onSubmit]);

  return { formData, errors, isSubmitting, handleChange, handleSubmit };
}

// Uso
const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres'),
});

function LoginForm() {
  const { formData, errors, handleChange, handleSubmit } = useForm(
    loginSchema,
    async (data) => {
      await authService.login(data.email, data.password);
    }
  );

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email?.[0]}
      />
      <Input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password?.[0]}
      />
      <Button type="submit">Login</Button>
    </form>
  );
}
```

### 6.4 Phase 4: Break Down Giant Components (2-3 sprints)

**PricingCalculator.jsx (659L → 4 files)**
```
src/features/pricing/
├── PricingCalculator.jsx (150L - orchestrator)
├── PricingForm.jsx (150L - form UI)
├── SavedCompanies.jsx (120L - list UI)
├── PricingResults.jsx (100L - results display)
├── usePricingCalculator.js (100L - logic hook)
└── schemas.js (20L - validation)
```

**DiagnosticoDeValorCalculator.jsx (786L → 6 files)**
```
src/features/diagnostico/
├── DiagnosticoCalculator.jsx (100L - orchestrator)
├── DiagnosticoForm.jsx (150L - form UI)
├── DiagnosticoResults.jsx (150L - results)
├── ImpactAnalysis.jsx (100L - analysis UI)
├── useDiagnostico.js (150L - logic)
├── calculationEngine.js (100L - pure logic)
└── schemas.js (30L - validation)
```

---

## 7. IMMEDIATE ACTIONS (Next 1-2 Weeks)

### 7.1 Quick Wins (No Breaking Changes)

1. **Create DataPersistenceLayer** (~1 dia)
   - Extract common localStorage logic
   - Centralize key naming convention
   - Add version control for stored data

2. **Add TypeScript Support** (~2-3 dias)
   - Create tsconfig for gradual migration
   - Add JSDoc types to existing components
   - No breaking changes, parallel support

3. **Create Storybook Setup** (~1 dia)
   - Document existing Button + Input
   - Template for new components
   - Set accessibility tests

4. **Extract Supabase Service Layer** (~1 dia)
   - Move all supabase calls to services/
   - Centralize error handling
   - Easier to test and mock

### 7.2 Medium-Term (Next Sprint)

1. **Consolidate Auth + Points Contexts** (~3 dias)
   - Create useAppStore (Zustand)
   - Migrate AuthContext → useAppStore
   - Migrate PointsContext → useAppStore
   - Keep backward-compatible hooks

2. **Create Form Hook** (~2 dias)
   - useForm with validation
   - Reusable across all forms
   - With error handling

3. **Document Design System** (~2 dias)
   - Component API documentation
   - Usage patterns guide
   - Accessibility checklist

---

## 8. ARCHITECTURE DECISION RECORDS (ADRs)

### ADR-1: Move to Zustand for State Management

**Status:** RECOMMENDED (not yet implemented)

**Context:**
Current Context API setup with 5 separate contexts causes:
- Code duplication (localStorage sync pattern repeated 4x)
- Deep provider nesting in App.jsx
- No built-in devtools support
- Harder to manage async operations

**Decision:**
Migrate to Zustand for all non-theme state (Auth, Points, Proposals, Reports)

**Alternatives Considered:**
- Redux: Too much boilerplate for current app scale
- Recoil: Still experimental
- Context API: Current pain points would multiply with 100+ features
- TanStack Query: Good for server state, not ideal for all client state

**Consequences:**
- ✅ Reduced code duplication
- ✅ Better performance (fine-grained subscriptions)
- ✅ Devtools integration
- ⚠️ New dependency to manage
- ⚠️ Team learning curve

---

### ADR-2: Split Giant Components into Modules

**Status:** RECOMMENDED

**Context:**
PricingCalculator (659L) and DiagnosticoDeValorCalculator (786L) are too large to:
- Test effectively
- Understand quickly
- Modify safely
- Reuse parts of

**Decision:**
Create feature-based module structure:
```
src/features/
├── pricing/
│   ├── components/
│   ├── hooks/
│   ├── schemas/
│   └── services/
├── diagnostico/
│   ├── components/
│   ├── hooks/
│   ├── schemas/
│   └── services/
```

**Consequences:**
- ✅ Components < 150 LOC each
- ✅ Testable in isolation
- ✅ Clear separation of concerns
- ⚠️ More files to navigate
- ⚠️ Requires refactoring effort

---

### ADR-3: Adopt Zod for Runtime Validation

**Status:** RECOMMENDED

**Context:**
No schema validation library. Forms validate ad-hoc in component logic.

**Decision:**
Use Zod for all input validation (forms, API responses, localStorage data)

**Example:**
```javascript
// schemas.js
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const pricingSchema = z.object({
  clientName: z.string().min(1),
  projectName: z.string().min(1),
  selectedComplexity: z.enum(['Baixa', 'Média', 'Alta']),
  features: z.array(z.object({
    id: z.number(),
    title: z.string(),
    hours: z.number().positive(),
  })),
});
```

**Consequences:**
- ✅ Type-safe validation
- ✅ Reusable across frontend + backend
- ✅ Better error messages
- ⚠️ New dependency

---

## 9. COMPONENT ORGANIZATION BEST PRACTICES

### 9.1 File Naming Convention

```
Feature-based (recommended for 100+ features):

src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm.jsx
│   │   │   ├── SignUpForm.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── hooks/
│   │   │   ├── useLogin.js
│   │   │   └── useSignUp.js
│   │   ├── services/
│   │   │   └── authService.js
│   │   ├── schemas/
│   │   │   └── authSchemas.js
│   │   └── types/
│   │       └── auth.d.ts
│   │
│   ├── pricing/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── ...
│   │
│   └── diagnostico/
│       ├── components/
│       ├── hooks/
│       └── ...
│
├── shared/
│   ├── components/
│   │   ├── ds/          (Design system - reusable)
│   │   └── ui/          (Page-level layouts)
│   ├── hooks/
│   ├── utils/
│   └── services/
│
└── config/
    ├── providers.jsx    (Root context/store setup)
    └── routes.jsx       (Route definitions)
```

### 9.2 Component Template

```javascript
// src/features/{feature}/components/{Component}.jsx
import React from 'react';
import PropTypes from 'prop-types';
import styles from './{Component}.module.css';

/**
 * {Component} - Brief description
 *
 * @param {Object} props
 * @param {string} props.title - Title text
 * @param {function} props.onAction - Callback when action triggered
 * @returns {React.ReactElement}
 */
export function {Component}({ title, onAction }) {
  const handleClick = () => {
    onAction?.();
  };

  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <button onClick={handleClick}>Action</button>
    </div>
  );
}

{Component}.propTypes = {
  title: PropTypes.string.isRequired,
  onAction: PropTypes.func,
};

{Component}.defaultProps = {
  onAction: undefined,
};

export default {Component};
```

---

## 10. SUMMARY & RECOMMENDATIONS

### Current State
- ✅ Good design tokens (designTokens.js)
- ✅ Functional but not scalable state management
- ✅ Minimal atomic component library (2/20 needed)
- ✅ No testing infrastructure
- ✅ No TypeScript
- ✅ 3 giant components (659L, 786L, 20KB)
- ✅ No error boundaries
- ✅ Inconsistent persistence patterns

### Top 5 Blocking Issues for 100+ Features

1. **Context API duplication** → Migrate to Zustand (1-2 weeks)
2. **Giant components** → Break into modules (2-3 weeks)
3. **No form validation library** → Adopt Zod (3-4 days)
4. **Minimal component library** → Build 20+ components (3-4 weeks)
5. **No TypeScript** → Gradual migration (ongoing)

### Investment Required

| Task | Effort | Impact | Priority |
|------|--------|--------|----------|
| State consolidation (Zustand) | 5d | HIGH | 1 |
| Break giant components | 6d | HIGH | 2 |
| Form system + Zod | 4d | HIGH | 3 |
| Component library expansion | 10d | HIGH | 4 |
| TypeScript migration | 15d | MEDIUM | 5 |
| Testing infrastructure | 8d | MEDIUM | 6 |
| Documentation | 5d | MEDIUM | 7 |

**Total: ~6-8 weeks for full readiness for 100+ features**

---

## 11. REFERENCES & RESOURCES

### Design System
- [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)
- [Design Tokens Format](https://design-tokens.github.io/community-group/format/)
- [Storybook Best Practices](https://storybook.js.org/docs/react/workflows/publish)

### State Management
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [TanStack Query](https://tanstack.com/query/)
- [React Context Pitfalls](https://kentcdodds.com/blog/how-to-use-react-context-effectively)

### Architecture
- [Feature-First Architecture](https://www.jamesqquick.com/blog/feature-folders-in-react)
- [Component Composition Patterns](https://www.patterns.dev/posts/container-presentational-pattern/)
- [Clean Code in React](https://piotrwitek.github.io/react-redux-typescript-guide/)

### Validation
- [Zod Schema Validation](https://zod.dev/)
- [Form Libraries Comparison](https://react-hook-form.com/form-builder)

### Testing
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Component Testing Strategies](https://vitest.dev/guide/)

---

**Document Generated:** 2026-02-22
**Review Level:** Comprehensive Architectural Analysis
**Next Review:** After Phase 1 completion (4-6 weeks)
