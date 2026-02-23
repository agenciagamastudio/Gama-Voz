# Refactoring Patterns & Implementation Guide
## GAMA Calculadora - Scalability Initiative

**Target:** Transform from 36% to 85% readiness for 100+ features
**Timeline:** 6-8 weeks
**Phase-Based Approach**

---

## Pattern 1: Consolidate Contexts with Zustand

### Before (Current Implementation)

```javascript
// src/context/AuthContext.jsx (192L)
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { addToast } = useToast();
  const [currentUser, setCurrentUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // localStorage persistence
  useEffect(() => { /* ... */ }, []);

  // Supabase sync
  useEffect(() => { /* ... */ }, []);

  return (
    <AuthContext.Provider value={{ currentUser, profile, loading, /* ... */ }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// src/context/PointsContext.jsx (239L)
const PointsContext = createContext();

export const PointsProvider = ({ children }) => {
  const { addToast } = useToast();
  const { currentUser } = useAuth();
  const [balance, setBalance] = useState(0);
  const [lastRecharged, setLastRecharged] = useState(null);

  // Another localStorage persistence
  useEffect(() => { /* ... */ }, []);

  // Another Supabase sync
  useEffect(() => { /* ... */ }, []);

  return (
    <PointsContext.Provider value={{ balance, spendPoints, /* ... */ }}>
      {children}
    </PointsContext.Provider>
  );
};

export const usePoints = () => useContext(PointsContext);

// Problem: Repeated boilerplate + deep nesting
// <ToastProvider>
//   <AuthProvider>
//     <PointsProvider>  <!-- depends on useAuth() -->
//       <ProposalProvider>
//         <ValueReportProvider>
//           <App />
//         </ValueReportProvider>
//       </ProposalProvider>
//     </PointsProvider>
//   </AuthProvider>
// </ToastProvider>
```

### After (Zustand Implementation)

```javascript
// src/store/appStore.js (consolidates all non-theme state)
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export const useAppStore = create(
  persist(
    immer((set, get) => ({
      // ─── AUTH STATE ─────────────────────────────────────────
      auth: {
        currentUser: null,
        profile: null,
        loading: true,
        profileLoading: false,
        error: null,
      },

      setCurrentUser: (user) =>
        set((state) => {
          state.auth.currentUser = user;
        }),

      setProfile: (profile) =>
        set((state) => {
          state.auth.profile = profile;
          state.auth.profileLoading = false;
        }),

      setAuthLoading: (loading) =>
        set((state) => {
          state.auth.loading = loading;
        }),

      setAuthError: (error) =>
        set((state) => {
          state.auth.error = error;
        }),

      // ─── POINTS STATE ────────────────────────────────────────
      points: {
        balance: 0,
        lastRecharged: null,
        redeemedCodes: new Set(),
        promoCodes: {},
        initialized: false,
      },

      setPointsBalance: (balance) =>
        set((state) => {
          state.points.balance = balance;
        }),

      setLastRecharged: (date) =>
        set((state) => {
          state.points.lastRecharged = date;
        }),

      addRedeemedCode: (code) =>
        set((state) => {
          state.points.redeemedCodes.add(code);
        }),

      setPromoCodes: (codes) =>
        set((state) => {
          state.points.promoCodes = codes;
        }),

      // ─── PROPOSAL STATE ──────────────────────────────────────
      proposal: {
        data: null,
        loading: false,
        error: null,
      },

      setProposalData: (data) =>
        set((state) => {
          state.proposal.data = data;
        }),

      // ─── REPORT STATE ────────────────────────────────────────
      report: {
        data: null,
        loading: false,
        error: null,
      },

      setReportData: (data) =>
        set((state) => {
          state.report.data = data;
        }),

      // ─── COMPUTED GETTERS (for convenience) ──────────────────
      isAuthenticated: () => {
        const state = get();
        return state.auth.currentUser !== null;
      },

      canSpendPoints: (amount) => {
        const state = get();
        return state.points.balance >= amount;
      },
    })),
    {
      name: 'gama-app-store',
      storage: localStorage,
      partialize: (state) => ({
        // Only persist non-sensitive data
        points: {
          balance: state.points.balance,
          lastRecharged: state.points.lastRecharged,
          redeemedCodes: Array.from(state.points.redeemedCodes),
          promoCodes: state.points.promoCodes,
          initialized: state.points.initialized,
        },
        proposal: state.proposal,
        report: state.report,
        // Don't persist: auth (Supabase handles this)
      }),
    }
  )
);

// Migration helpers (backward compatibility)
export const useAuth = () => {
  const auth = useAppStore((state) => state.auth);
  const setCurrentUser = useAppStore((state) => state.setCurrentUser);
  const setProfile = useAppStore((state) => state.setProfile);
  const setAuthLoading = useAppStore((state) => state.setAuthLoading);

  return {
    currentUser: auth.currentUser,
    profile: auth.profile,
    loading: auth.loading,
    profileLoading: auth.profileLoading,
    setCurrentUser,
    setProfile,
    setAuthLoading,
    // Add methods from AuthContext
    login: async (email, password) => { /* ... */ },
    logout: async () => { /* ... */ },
  };
};

export const usePoints = () => {
  const points = useAppStore((state) => state.points);
  const setPointsBalance = useAppStore((state) => state.setPointsBalance);
  const addRedeemedCode = useAppStore((state) => state.addRedeemedCode);

  return {
    balance: points.balance,
    redeemedCodes: points.redeemedCodes,
    setPointsBalance,
    addRedeemedCode,
    // Add methods from PointsContext
    spendPoints: (amount) => { /* ... */ },
    redeemCode: (code) => { /* ... */ },
  };
};

export const useProposal = () => {
  const proposal = useAppStore((state) => state.proposal);
  const setProposalData = useAppStore((state) => state.setProposalData);

  return {
    proposalData: proposal.data,
    setProposalData,
  };
};

export const useValueReport = () => {
  const report = useAppStore((state) => state.report);
  const setReportData = useAppStore((state) => state.setReportData);

  return {
    reportData: report.data,
    setReportData,
  };
};
```

### Benefits

- ✅ **Single source of truth** - One store vs 5 contexts
- ✅ **No deep nesting** - Flatten App.jsx provider setup
- ✅ **Backward compatible** - Custom hooks work with old code
- ✅ **Better devtools** - Zustand DevTools shows all state
- ✅ **Fine-grained subscriptions** - Only rerender when specific slice changes
- ✅ **Easier testing** - Mock single store vs multiple contexts

### Migration Path

1. **Day 1-2:** Create `appStore.js` parallel to existing contexts
2. **Day 3-4:** Create migration hooks (`useAuth`, `usePoints`)
3. **Day 5:** Incrementally replace Context imports with store imports
4. **Day 6:** Remove old context files after all migrations complete

---

## Pattern 2: Service Layer for Async Operations

### Before (Mixed in Components)

```javascript
// src/components/PricingCalculator.jsx
function PricingCalculator() {
  const [savedCompanies, setSavedCompanies] = useState([]);
  const { currentUser } = useAuth();
  const { addToast } = useToast();

  // Async logic mixed with component state
  useEffect(() => {
    if (!currentUser) {
      const saved = localStorage.getItem('gama-saved-companies');
      setSavedCompanies(saved ? JSON.parse(saved) : []);
      return;
    }

    // Directly call Supabase in component
    const load = async () => {
      const { data, error } = await supabase
        .from('saved_companies')
        .select('id, name, hourly_rate')
        .eq('user_id', currentUser.id)
        .order('created_at', { ascending: true });

      if (!error && data) {
        setSavedCompanies(data.map(c => ({ /* ... */ })));
      }
    };

    load();
  }, [currentUser]);

  const handleSaveNewCompany = useCallback(async () => {
    // Validation spread across handler
    if (!newCompanyData.name || !newCompanyData.rate) {
      addToast('Preencha o nome e a taxa da empresa.', 'error');
      return;
    }

    // Optimistic update
    const tempId = `temp-${Date.now()}`;
    setSavedCompanies(prev => [...prev, optimistic]);

    // Supabase call
    if (!currentUser) return;

    const { data, error } = await supabase
      .from('saved_companies')
      .insert({ /* ... */ })
      .select('id')
      .single();

    if (error) {
      // Manual rollback
      setSavedCompanies(prev => prev.filter(c => c.id !== tempId));
      addToast('Error', 'error');
    }
  }, [currentUser, /* many deps */]);

  // Problem: Logic scattered across multiple useEffects + handlers
  // Hard to test, hard to reuse, hard to debug
}
```

### After (Service Layer)

```javascript
// src/services/companiesService.js
import { supabase } from '../utils/supabase';
import { useAppStore } from '../store/appStore';

class CompaniesService {
  // Load saved companies for user
  async loadUserCompanies(userId) {
    try {
      const { data, error } = await supabase
        .from('saved_companies')
        .select('id, name, hourly_rate')
        .eq('user_id', userId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      return data.map(c => ({
        id: c.id,
        name: c.name,
        rate: String(c.hourly_rate),
      }));
    } catch (error) {
      console.error('Failed to load companies:', error);
      throw error;
    }
  }

  // Create new company
  async createCompany(userId, name, hourlyRate) {
    // Validate input
    this.validateCompanyInput(name, hourlyRate);

    try {
      const { data, error } = await supabase
        .from('saved_companies')
        .insert({
          user_id: userId,
          name,
          hourly_rate: parseFloat(hourlyRate),
        })
        .select('id')
        .single();

      if (error) throw error;

      return {
        id: data.id,
        name,
        rate: String(hourlyRate),
      };
    } catch (error) {
      console.error('Failed to create company:', error);
      throw error;
    }
  }

  // Delete company
  async deleteCompany(companyId) {
    try {
      const { error } = await supabase
        .from('saved_companies')
        .delete()
        .eq('id', companyId);

      if (error) throw error;
    } catch (error) {
      console.error('Failed to delete company:', error);
      throw error;
    }
  }

  // Validation
  validateCompanyInput(name, rate) {
    if (!name?.trim()) {
      throw new Error('Nome da empresa é obrigatório');
    }
    const numRate = parseFloat(rate);
    if (isNaN(numRate) || numRate <= 0) {
      throw new Error('Taxa horária deve ser um número positivo');
    }
  }
}

export const companiesService = new CompaniesService();

// src/hooks/useSavedCompanies.js
import { useCallback, useEffect, useState } from 'react';
import { companiesService } from '../services/companiesService';
import { useAppStore } from '../store/appStore';
import { useToast } from './useToast';

export function useSavedCompanies() {
  const { addToast } = useToast();
  const { currentUser } = useAppStore((state) => state.auth);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load companies on auth change
  useEffect(() => {
    if (!currentUser?.id) {
      // Load from localStorage for non-authenticated users
      const saved = localStorage.getItem('gama-saved-companies');
      setCompanies(saved ? JSON.parse(saved) : []);
      return;
    }

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await companiesService.loadUserCompanies(currentUser.id);
        setCompanies(data);
      } catch (err) {
        setError(err.message);
        addToast(`Erro ao carregar empresas: ${err.message}`, 'error');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [currentUser?.id, addToast]);

  // Create company with optimistic update
  const addCompany = useCallback(
    async (name, rate) => {
      // Optimistic update
      const tempId = `temp-${Date.now()}`;
      const optimistic = { id: tempId, name, rate };
      setCompanies((prev) => [...prev, optimistic]);

      try {
        if (!currentUser?.id) {
          // Persist to localStorage for non-authenticated users
          localStorage.setItem(
            'gama-saved-companies',
            JSON.stringify([...companies, optimistic])
          );
          addToast('Empresa salva localmente!', 'success');
          return;
        }

        // Create on backend
        const created = await companiesService.createCompany(
          currentUser.id,
          name,
          rate
        );

        // Replace optimistic with real ID
        setCompanies((prev) =>
          prev.map((c) => (c.id === tempId ? created : c))
        );

        addToast('Empresa adicionada com sucesso!', 'success');
      } catch (err) {
        // Rollback optimistic update
        setCompanies((prev) => prev.filter((c) => c.id !== tempId));
        setError(err.message);
        addToast(`Erro ao adicionar empresa: ${err.message}`, 'error');
      }
    },
    [currentUser?.id, addToast, companies]
  );

  // Delete company
  const removeCompany = useCallback(
    async (companyId) => {
      // Optimistic delete
      const backup = companies;
      setCompanies((prev) => prev.filter((c) => c.id !== companyId));

      try {
        if (companyId.startsWith('temp-')) {
          // Local deletion
          return;
        }

        // Backend deletion
        await companiesService.deleteCompany(companyId);
        addToast('Empresa removida com sucesso!', 'success');
      } catch (err) {
        // Rollback
        setCompanies(backup);
        setError(err.message);
        addToast(`Erro ao remover empresa: ${err.message}`, 'error');
      }
    },
    [companies, addToast]
  );

  return {
    companies,
    loading,
    error,
    addCompany,
    removeCompany,
  };
}

// Usage in component - now clean and focused
function PricingCalculator() {
  const { companies, loading, addCompany, removeCompany } =
    useSavedCompanies();
  const [formState, setFormState] = useState(/* ... */);

  return (
    <div>
      <SavedCompaniesList
        companies={companies}
        loading={loading}
        onAdd={addCompany}
        onRemove={removeCompany}
      />
      <PricingForm state={formState} onChange={setFormState} />
    </div>
  );
}
```

### Benefits

- ✅ **Separation of concerns** - Service handles Supabase, hook handles state
- ✅ **Reusable across components** - Any component can use `useSavedCompanies()`
- ✅ **Testable** - Mock service layer easily
- ✅ **Error handling** - Centralized try-catch and rollback logic
- ✅ **Type safety** - Service layer can have JSDoc/TypeScript
- ✅ **Optimistic updates** - Pattern standardized and reusable

---

## Pattern 3: Break Down Giant Components

### Before (PricingCalculator - 659 lines)

```javascript
// src/components/PricingCalculator.jsx (659 lines - MONOLITH)
function PricingCalculator() {
  // ~100 lines of state declarations
  const [formState, setFormState] = useState(...);
  const [savedCompanies, setSavedCompanies] = useState(...);
  const [isModalOpen, setIsModalOpen] = useState(...);
  // ... 10+ more state vars

  // ~150 lines of useEffects
  useEffect(() => { /* load companies */ }, []);
  useEffect(() => { /* persist form */ }, []);
  useEffect(() => { /* sync localStorage */ }, []);
  // ... more effects

  // ~200 lines of handlers
  const handleInputChange = (e) => { /* ... */ };
  const handleAddFeature = () => { /* ... */ };
  const handleDeleteFeature = (id) => { /* ... */ };
  const handleSaveCompany = () => { /* ... */ };
  // ... many more

  // ~300 lines of JSX in single return
  return (
    <div>
      {/* Formulário com 100+ linhas de JSX */}
      <div>
        <input name="clientName" value={formState.clientName} />
        <input name="projectName" value={formState.projectName} />
        {/* ... */}
      </div>

      {/* Tabela com 80+ linhas de JSX */}
      <table>
        <tbody>
          {formState.features.map(feature => (
            <tr key={feature.id}>
              {/* ... */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal com 100+ linhas de JSX */}
      {isModalOpen && (
        <div>
          {/* ... */}
        </div>
      )}

      {/* Resultados com 100+ linhas de JSX */}
      <div>
        {/* Cálculos */}
      </div>
    </div>
  );
}
```

### After (Modular Structure)

```
src/features/pricing/
├── components/
│   ├── PricingCalculator.jsx      (100L - orchestrator)
│   ├── PricingForm.jsx            (150L - form UI)
│   ├── FeaturesTable.jsx          (120L - features list)
│   ├── SavedCompaniesModal.jsx    (100L - modal)
│   └── PricingResults.jsx         (80L - results display)
├── hooks/
│   ├── usePricingForm.js          (80L - form logic)
│   └── usePricingCalculation.js   (60L - calculation logic)
├── schemas/
│   └── pricingSchemas.js          (30L - validation)
├── utils/
│   └── pricingHelpers.js          (40L - helper functions)
└── services/
    └── pricingService.js          (50L - API calls)
```

#### Step 1: Extract Form Logic into Hook

```javascript
// src/features/pricing/hooks/usePricingForm.js
import { useState, useCallback } from 'react';

export function usePricingForm(initialState = {}) {
  const [formState, setFormState] = useState(() => {
    const saved = localStorage.getItem('pricingCalculatorForm');
    return saved ? JSON.parse(saved) : initialState;
  });

  // Persist form changes
  useEffect(() => {
    localStorage.setItem('pricingCalculatorForm', JSON.stringify(formState));
  }, [formState]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleAddFeature = useCallback((feature) => {
    setFormState((prev) => ({
      ...prev,
      features: [...prev.features, feature],
    }));
  }, []);

  const handleDeleteFeature = useCallback((id) => {
    setFormState((prev) => ({
      ...prev,
      features: prev.features.filter((f) => f.id !== id),
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormState(initialState);
  }, [initialState]);

  return {
    formState,
    setFormState,
    handleInputChange,
    handleAddFeature,
    handleDeleteFeature,
    resetForm,
  };
}
```

#### Step 2: Extract Calculation Logic into Hook

```javascript
// src/features/pricing/hooks/usePricingCalculation.js
import { useMemo } from 'react';

export function usePricingCalculation(formState) {
  const calculation = useMemo(() => {
    const baseHours = formState.features.reduce(
      (sum, f) => sum + f.hours,
      0
    );

    const rates = {
      'Baixa': 150,
      'Média': 250,
      'Alta': 400,
    };

    const hourlyRate =
      parseFloat(formState.customHourlyRate) ||
      rates[formState.selectedComplexity] ||
      150;

    const baseCost = baseHours * hourlyRate;
    const taxAmount = (baseCost * formState.taxesPercentage) / 100;
    const discountAmount = (baseCost * formState.discountPercentage) / 100;
    const totalCost = baseCost + taxAmount - discountAmount;

    return {
      baseHours,
      baseCost,
      hourlyRate,
      taxAmount,
      discountAmount,
      totalCost,
    };
  }, [formState]);

  return calculation;
}
```

#### Step 3: Create Presentational Components

```javascript
// src/features/pricing/components/PricingForm.jsx
import { Input, Button } from '../../../shared/components/ds';

export function PricingForm({ formState, onInputChange, onAddFeature }) {
  return (
    <form className="pricing-form">
      <div className="form-group">
        <Input
          label="Nome do Cliente"
          name="clientName"
          value={formState.clientName}
          onChange={onInputChange}
          placeholder="ex: Acme Corp"
        />
      </div>

      <div className="form-group">
        <Input
          label="Nome do Projeto"
          name="projectName"
          value={formState.projectName}
          onChange={onInputChange}
        />
      </div>

      {/* More form fields */}

      <Button onClick={onAddFeature}>+ Adicionar Feature</Button>
    </form>
  );
}
```

```javascript
// src/features/pricing/components/FeaturesTable.jsx
export function FeaturesTable({ features, onDeleteFeature, onEditFeature }) {
  return (
    <table className="features-table">
      <thead>
        <tr>
          <th>Feature</th>
          <th>Horas</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {features.map((feature) => (
          <tr key={feature.id}>
            <td>{feature.title}</td>
            <td>{feature.hours}h</td>
            <td>
              <Button onClick={() => onEditFeature(feature.id)}>Editar</Button>
              <Button onClick={() => onDeleteFeature(feature.id)}>
                Deletar
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

```javascript
// src/features/pricing/components/PricingResults.jsx
export function PricingResults({ calculation, formState }) {
  return (
    <div className="pricing-results">
      <h3>Resumo do Orçamento</h3>
      <div className="result-row">
        <span>Horas Base:</span>
        <span>{calculation.baseHours}h</span>
      </div>
      <div className="result-row">
        <span>Taxa Horária:</span>
        <span>R$ {calculation.hourlyRate.toFixed(2)}</span>
      </div>
      <div className="result-row">
        <span>Custo Base:</span>
        <span>R$ {calculation.baseCost.toFixed(2)}</span>
      </div>

      {calculation.taxAmount > 0 && (
        <div className="result-row secondary">
          <span>Impostos ({formState.taxesPercentage}%):</span>
          <span>+ R$ {calculation.taxAmount.toFixed(2)}</span>
        </div>
      )}

      {calculation.discountAmount > 0 && (
        <div className="result-row secondary">
          <span>Desconto ({formState.discountPercentage}%):</span>
          <span>- R$ {calculation.discountAmount.toFixed(2)}</span>
        </div>
      )}

      <div className="result-row total">
        <span>Total:</span>
        <span>R$ {calculation.totalCost.toFixed(2)}</span>
      </div>
    </div>
  );
}
```

#### Step 4: Orchestrator Component

```javascript
// src/features/pricing/components/PricingCalculator.jsx
import { useState } from 'react';
import { usePricingForm } from '../hooks/usePricingForm';
import { usePricingCalculation } from '../hooks/usePricingCalculation';
import { useSavedCompanies } from '../hooks/useSavedCompanies';
import { PricingForm } from './PricingForm';
import { FeaturesTable } from './FeaturesTable';
import { SavedCompaniesModal } from './SavedCompaniesModal';
import { PricingResults } from './PricingResults';

export function PricingCalculator() {
  // Orchestrate hooks
  const { formState, handleInputChange, handleAddFeature, handleDeleteFeature } =
    usePricingForm();
  const calculation = usePricingCalculation(formState);
  const { companies, addCompany, removeCompany } = useSavedCompanies();
  const [isCompaniesModalOpen, setIsCompaniesModalOpen] = useState(false);

  return (
    <div className="pricing-calculator">
      <h1>Calculadora de Preços</h1>

      <PricingForm
        formState={formState}
        onInputChange={handleInputChange}
        onAddFeature={handleAddFeature}
      />

      <FeaturesTable
        features={formState.features}
        onDeleteFeature={handleDeleteFeature}
      />

      <PricingResults calculation={calculation} formState={formState} />

      <button onClick={() => setIsCompaniesModalOpen(true)}>
        Minhas Empresas
      </button>

      {isCompaniesModalOpen && (
        <SavedCompaniesModal
          companies={companies}
          onAdd={addCompany}
          onRemove={removeCompany}
          onClose={() => setIsCompaniesModalOpen(false)}
        />
      )}
    </div>
  );
}
```

### Benefits

- ✅ **Single Responsibility** - Each component has one job
- ✅ **Reusability** - Can use FeaturesTable in other features
- ✅ **Testability** - Test PricingForm independently
- ✅ **Maintainability** - Find and change logic faster
- ✅ **Scalability** - Add new features without touching existing code
- ✅ **Performance** - Fine-grained rerendering

---

## Pattern 4: Form Validation with Zod

### Before (No Validation Library)

```javascript
// Validation scattered across component
function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Manual validation
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!email.includes('@')) {
      newErrors.email = 'Email inválido';
    }

    if (!password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (password.length < 8) {
      newErrors.password = 'Mínimo 8 caracteres';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Proceed with login
    try {
      await authService.login(email, password);
    } catch (error) {
      setErrors({ submit: error.message });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
      />
      <Input
        label="Senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
      />
      {errors.submit && <p className="error">{errors.submit}</p>}
      <Button type="submit">Login</Button>
    </form>
  );
}
```

**Problems:**
- Validation logic mixed with component
- Reusing validation requires copy-paste
- Error messages scattered
- No shared schemas

### After (Zod + Reusable Hook)

```javascript
// src/features/auth/schemas/authSchemas.js
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email inválido').min(1, 'Email obrigatório'),
  password: z
    .string()
    .min(8, 'Mínimo 8 caracteres')
    .min(1, 'Senha obrigatória'),
});

export const signupSchema = z
  .object({
    email: z.string().email('Email inválido'),
    password: z.string().min(8, 'Mínimo 8 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Senhas não conferem',
    path: ['confirmPassword'],
  });

export const pricingSchema = z.object({
  clientName: z.string().min(1, 'Nome do cliente obrigatório'),
  projectName: z.string().min(1, 'Nome do projeto obrigatório'),
  selectedComplexity: z.enum(['Baixa', 'Média', 'Alta']),
  taxesPercentage: z.number().min(0).max(100),
  discountPercentage: z.number().min(0).max(100),
  features: z.array(
    z.object({
      id: z.number(),
      title: z.string().min(1),
      hours: z.number().positive('Horas deve ser positivo'),
    })
  ),
});
```

```javascript
// src/hooks/useForm.js (reusable form hook)
import { useState, useCallback } from 'react';
import { ZodError } from 'zod';

export function useForm(schema, onSubmit, onError = null) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error for this field when user starts typing
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setSubmitError(null);

      try {
        // Validate with Zod
        const validated = schema.parse(formData);

        // Call submit handler
        await onSubmit(validated);
      } catch (error) {
        if (error instanceof ZodError) {
          // Flatten Zod errors into object
          const fieldErrors = error.flatten().fieldErrors;
          const formatted = Object.entries(fieldErrors).reduce(
            (acc, [key, messages]) => {
              acc[key] = messages?.[0]; // Take first error per field
              return acc;
            },
            {}
          );
          setErrors(formatted);
          onError?.(formatted);
        } else {
          // Other errors (network, etc)
          setSubmitError(error.message);
          onError?.(error.message);
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, schema, onSubmit, onError]
  );

  const resetForm = useCallback(() => {
    setFormData({});
    setErrors({});
    setSubmitError(null);
  }, []);

  return {
    formData,
    errors,
    isSubmitting,
    submitError,
    handleChange,
    handleSubmit,
    resetForm,
    setFormData, // Direct access for complex updates
  };
}
```

```javascript
// src/features/auth/components/LoginPage.jsx
import { useForm } from '../../../hooks/useForm';
import { loginSchema } from '../schemas/authSchemas';
import { authService } from '../services/authService';
import { Input, Button } from '../../../shared/components/ds';

export function LoginPage() {
  const { formData, errors, isSubmitting, submitError, handleChange, handleSubmit } =
    useForm(loginSchema, async (validated) => {
      // validated is typed and guaranteed valid by Zod
      await authService.login(validated.email, validated.password);
      // Redirect on success handled by authService
    });

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>

      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email || ''}
        onChange={handleChange}
        error={errors.email}
      />

      <Input
        label="Senha"
        type="password"
        name="password"
        value={formData.password || ''}
        onChange={handleChange}
        error={errors.password}
      />

      {submitError && (
        <div className="alert alert-error">{submitError}</div>
      )}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Entrando...' : 'Login'}
      </Button>
    </form>
  );
}
```

### Benefits

- ✅ **Single source of truth** - Schema defined once, reused everywhere
- ✅ **Type safety** - Zod validates and infers types
- ✅ **DRY** - No copy-paste validation
- ✅ **Better UX** - Clear error messages
- ✅ **Backend-compatible** - Use same schemas on server
- ✅ **Nested validation** - Handle complex objects (arrays, nested objects)

---

## Pattern 5: Create Reusable Hooks Library

### Common Hooks to Extract

```javascript
// src/hooks/useAsync.js
import { useCallback, useEffect, useState } from 'react';

export function useAsync(asyncFunction, immediate = true, deps = []) {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    setStatus('pending');
    setData(null);
    setError(null);
    try {
      const response = await asyncFunction();
      setData(response);
      setStatus('success');
      return response;
    } catch (error) {
      setError(error);
      setStatus('error');
      throw error;
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, data, error };
}

// Usage
function MyComponent() {
  const { status, data, error } = useAsync(
    () => companiesService.loadUserCompanies(userId),
    true // immediate
  );

  if (status === 'pending') return <div>Loading...</div>;
  if (status === 'error') return <div>Error: {error.message}</div>;
  return <div>{data.length} companies</div>;
}
```

```javascript
// src/hooks/useDebounce.js
import { useState, useEffect } from 'react';

export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// Usage
function SearchCompanies() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    // Only call API when debounced value changes
    if (debouncedSearchTerm) {
      searchService.search(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}
```

```javascript
// src/hooks/useClickOutside.js
import { useEffect, useRef } from 'react';

export function useClickOutside(callback) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback]);

  return ref;
}

// Usage
function Modal({ onClose }) {
  const modalRef = useClickOutside(onClose);
  return <div ref={modalRef}>{/* modal content */}</div>;
}
```

```javascript
// src/hooks/useLocalStorage.js (improved)
import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.warn(`Error writing localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}
```

---

## Quick Implementation Checklist

### Week 1: Setup & State Management
- [ ] Create `src/store/appStore.js` (Zustand)
- [ ] Create backward-compatible hooks in `src/hooks/`
- [ ] Update `App.jsx` to wrap with StoreProvider instead of 5 contexts
- [ ] Run tests to verify no breaking changes
- [ ] Remove old context files

### Week 2: Service Layer
- [ ] Extract Supabase calls to `src/services/`
- [ ] Create `useSavedCompanies()`, `usePoints()`, etc hooks
- [ ] Test service layer with mock Supabase
- [ ] Update components to use services

### Week 3-4: Break Down Components
- [ ] Split PricingCalculator into 5 files
- [ ] Split DiagnosticoCalculator into 6 files
- [ ] Create `usePricingForm()` hook
- [ ] Create `useDiagnosticoForm()` hook
- [ ] Update Layout.jsx if needed

### Week 5: Form & Validation
- [ ] Install Zod
- [ ] Create schema files in each feature
- [ ] Create `useForm()` hook
- [ ] Update all forms to use `useForm()`
- [ ] Document schema patterns

### Week 6: Component Library
- [ ] Enhance Button component (add icon, loading, etc)
- [ ] Enhance Input component (add validation, helpers)
- [ ] Create Card, Modal, Dropdown components
- [ ] Setup Storybook
- [ ] Document components

### Week 7-8: Polish & Testing
- [ ] Add error boundaries
- [ ] Setup unit tests (vitest + React Testing Library)
- [ ] Setup E2E tests (Playwright)
- [ ] Performance optimization (React.memo, useMemo)
- [ ] Documentation update

---

**Next Step:** Begin Week 1 with Zustand migration (highest impact, lowest risk)
