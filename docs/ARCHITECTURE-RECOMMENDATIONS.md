# Architecture Recommendations & Tool Stack
## GAMA Calculadora - Production Readiness

**Current State:** 36% ready for 100+ features
**Target State:** 85% ready (6-8 weeks)
**Investment Level:** Medium (team of 2-3 developers)

---

## 1. RECOMMENDED TOOL STACK

### 1.1 State Management: Zustand

**Why Zustand vs Alternatives:**

| Tool | Pros | Cons | For App |
|------|------|------|---------|
| **Context API** (current) | Built-in | No devtools, deep nesting, boilerplate | ❌ Outgrown it |
| **Redux** | Powerful, ecosystem | Too much boilerplate for this size | ❌ Overkill |
| **Jotai** | Atomic, lightweight | Still experimental | ⚠️ Possible in future |
| **Zustand** ✅ | Simple, tiny, devtools | Fewer plugins than Redux | ✅ Perfect fit |
| **TanStack Query** | Server state MGMT | Not for client state | ⚠️ Use alongside Zustand |
| **Recoil** | Atomic | Facebook-backed but less stable | ❌ Avoid |

**Zustand Installation:**
```bash
npm install zustand immer
```

**Why Immer Middleware:**
- Immutability without verbose syntax
- Zustand + Immer = Redux convenience without boilerplate

### 1.2 Data Validation: Zod

**Why Zod vs Alternatives:**

| Tool | Pros | Cons | For App |
|------|------|------|---------|
| **No library** (current) | Zero deps | Code duplication | ❌ Doesn't scale |
| **Yup** | Popular, easy | Slower, not TS-first | ⚠️ Consider for API |
| **Joi** | Powerful | Backend-focused, verbose | ❌ Overkill |
| **Zod** ✅ | TS-first, small, composable | Newer ecosystem | ✅ Best for frontend |
| **Valibot** | Lighter than Zod | Fewer integrations | ⚠️ Newer alternative |

**Zod Installation:**
```bash
npm install zod
```

### 1.3 Server State Management: TanStack Query

**When to use:** API calls, caching, background sync

**Installation:**
```bash
npm install @tanstack/react-query
```

**Example pattern:**
```javascript
// Instead of:
const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);

useEffect(() => {
  const load = async () => {
    setLoading(true);
    const res = await fetch('/api/companies');
    setData(await res.json());
    setLoading(false);
  };
  load();
}, []);

// Use:
const { data, isLoading } = useQuery({
  queryKey: ['companies'],
  queryFn: () => fetch('/api/companies').then(r => r.json()),
});
```

**Why:**
- ✅ Caching (don't refetch same data)
- ✅ Background refetching
- ✅ Automatic deduplication
- ✅ Better loading/error states
- ✅ Devtools for debugging

### 1.4 TypeScript Gradual Migration

**Current:** 100% JavaScript (JSX files)
**Target:** Gradual migration (JSDoc → TypeScript)

**Phase 1 (Week 1-2): Setup TypeScript**
```bash
npm install -D typescript @types/react @types/react-dom @types/node
npx tsc --init
```

**tsconfig.json:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": false,
    "allowJs": true,
    "checkJs": false,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./src",
    "paths": {
      "@/*": ["./*"],
      "@components/*": ["./components/*"],
      "@features/*": ["./features/*"],
      "@hooks/*": ["./hooks/*"],
      "@services/*": ["./services/*"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

**Phase 2 (Week 3): JSDoc Typing (No .ts files yet)**
```javascript
// Before
function useForm(schema, onSubmit) {
  // ...
}

// After (JSDoc)
/**
 * @param {Object} schema - Zod schema
 * @param {Function} onSubmit - Submission handler
 * @returns {{formData, errors, isSubmitting, handleChange, handleSubmit}}
 */
function useForm(schema, onSubmit) {
  // ...
}
```

**Phase 3 (Week 4+): Gradual .tsx Migration**
- Start with lowest-risk files (utilities, hooks)
- Then move to components
- Set `strict: false` initially, gradually enable rules

### 1.5 Testing Infrastructure

**Install Testing Tools:**
```bash
npm install -D vitest @testing-library/react @testing-library/user-event @testing-library/dom jsdom
npm install -D @vitest/ui @vitest/coverage-v8
```

**vitest.config.js:**
```javascript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.d.ts',
        '**/*.stories.js',
      ],
    },
  },
});
```

**Example Test:**
```javascript
// src/hooks/usePricingForm.test.js
import { renderHook, act } from '@testing-library/react';
import { usePricingForm } from './usePricingForm';

describe('usePricingForm', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => usePricingForm());
    expect(result.current.formState.clientName).toBe('');
  });

  it('should update form state on input change', () => {
    const { result } = renderHook(() => usePricingForm());

    act(() => {
      result.current.handleInputChange({
        target: { name: 'clientName', value: 'Acme Corp' },
      });
    });

    expect(result.current.formState.clientName).toBe('Acme Corp');
  });

  it('should add feature to form', () => {
    const { result } = renderHook(() => usePricingForm());

    act(() => {
      result.current.handleAddFeature({
        id: 1,
        title: 'Feature 1',
        hours: 10,
      });
    });

    expect(result.current.formState.features).toHaveLength(1);
  });
});
```

**Run Tests:**
```bash
npm run test                    # Run all tests
npm run test:watch             # Watch mode
npm run test:coverage          # Coverage report
npm run test:ui                # Visual dashboard
```

### 1.6 Component Documentation: Storybook

**Install Storybook:**
```bash
npx storybook@latest init
```

**Example Story:**
```javascript
// src/components/ds/Button.stories.jsx
import Button from './Button';

export default {
  component: Button,
  title: 'Components/Button',
  tags: ['autodocs'],
};

export const Primary = {
  args: {
    children: 'Click me',
    variant: 'primary',
    size: 'medium',
  },
};

export const Secondary = {
  args: {
    children: 'Click me',
    variant: 'secondary',
    size: 'medium',
  },
};

export const Loading = {
  args: {
    children: 'Loading...',
    variant: 'primary',
    disabled: true,
  },
};

export const Small = {
  args: {
    children: 'Small',
    variant: 'primary',
    size: 'small',
  },
};
```

**Run Storybook:**
```bash
npm run storybook
```

### 1.7 Accessibility Testing: axe DevTools

**Install:**
```bash
npm install -D @axe-core/react
```

**Integration with Tests:**
```javascript
// In test setup
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('button should not have accessibility violations', async () => {
  const { container } = render(
    <Button>Click me</Button>
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### 1.8 Code Quality: ESLint + Prettier

**Install:**
```bash
npm install -D eslint prettier eslint-config-prettier eslint-plugin-react eslint-plugin-react-hooks
```

**.eslintrc.json:**
```json
{
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ],
  "plugins": ["react", "react-hooks"],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "warn",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

**Add to package.json:**
```json
{
  "scripts": {
    "lint": "eslint src --fix",
    "format": "prettier --write src",
    "type-check": "tsc --noEmit"
  }
}
```

---

## 2. FOLDER STRUCTURE (Recommended)

```
src/
├── app/
│   ├── App.jsx                    # Root component
│   ├── Layout.jsx                 # Main layout
│   ├── providers.jsx              # Context/store setup
│   └── routes.jsx                 # Route definitions
│
├── features/                      # Feature modules
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginPage.jsx
│   │   │   └── SignUpPage.jsx
│   │   ├── hooks/
│   │   │   ├── useLogin.js
│   │   │   └── useSignUp.js
│   │   ├── services/
│   │   │   └── authService.js
│   │   ├── schemas/
│   │   │   └── authSchemas.js
│   │   ├── types/
│   │   │   └── auth.d.ts
│   │   └── __tests__/
│   │       └── authService.test.js
│   │
│   ├── pricing/
│   │   ├── components/
│   │   │   ├── PricingCalculator.jsx
│   │   │   ├── PricingForm.jsx
│   │   │   ├── FeaturesTable.jsx
│   │   │   └── PricingResults.jsx
│   │   ├── hooks/
│   │   │   ├── usePricingForm.js
│   │   │   └── usePricingCalculation.js
│   │   ├── services/
│   │   │   └── companiesService.js
│   │   ├── schemas/
│   │   │   └── pricingSchemas.js
│   │   └── __tests__/
│   │       └── usePricingForm.test.js
│   │
│   ├── diagnostico/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── schemas/
│   │
│   └── ...
│
├── shared/                        # Reusable across features
│   ├── components/
│   │   ├── ds/                    # Design system
│   │   │   ├── atoms/
│   │   │   │   ├── Button/
│   │   │   │   │   ├── Button.jsx
│   │   │   │   │   ├── Button.module.css
│   │   │   │   │   ├── Button.test.js
│   │   │   │   │   └── Button.stories.js
│   │   │   │   ├── Input/
│   │   │   │   ├── Badge/
│   │   │   │   └── ...
│   │   │   ├── molecules/
│   │   │   │   ├── Card/
│   │   │   │   ├── Modal/
│   │   │   │   └── ...
│   │   │   └── organisms/
│   │   │       ├── Navigation/
│   │   │       └── ...
│   │   └── ui/                    # Page layouts
│   │       └── PageLayout.jsx
│   ├── hooks/
│   │   ├── useAsync.js
│   │   ├── useDebounce.js
│   │   ├── useForm.js
│   │   ├── useLocalStorage.js
│   │   └── __tests__/
│   │       └── useForm.test.js
│   ├── services/
│   │   ├── supabase.js
│   │   └── errorHandler.js
│   ├── utils/
│   │   ├── formatters.js
│   │   ├── validators.js
│   │   └── helpers.js
│   └── types/
│       └── common.d.ts
│
├── store/
│   ├── appStore.js                # Zustand store
│   ├── slices/
│   │   ├── authSlice.js
│   │   ├── pointsSlice.js
│   │   └── uiSlice.js
│   └── __tests__/
│       └── appStore.test.js
│
├── config/
│   ├── constants.js
│   ├── environment.js
│   └── supabase.js
│
├── styles/
│   ├── designTokens.js
│   ├── globals.css
│   └── variables.css
│
└── main.jsx
```

---

## 3. CODE ORGANIZATION PRINCIPLES

### 3.1 Single Responsibility Principle

**Bad:**
```javascript
// Component doing too much
function PricingCalculator() {
  // 1. Manages form state
  const [formState, setFormState] = useState(...);

  // 2. Handles API calls
  useEffect(() => {
    supabase.from('companies').select(...);
  }, []);

  // 3. Performs calculations
  const total = calculate(formState);

  // 4. Renders UI
  return <div>...</div>;
}
```

**Good:**
```javascript
// 1. Service handles API
const companiesService = { load: async () => {...} };

// 2. Hook manages state
function useSavedCompanies() { /* ... */ }

// 3. Hook handles calculation
function usePricingCalculation(formState) { /* ... */ }

// 4. Component only renders
function PricingCalculator() {
  const { companies } = useSavedCompanies();
  const calculation = usePricingCalculation(formState);
  return <div>{/* simple render */}</div>;
}
```

### 3.2 Component Size Guidelines

| Type | Max Size | Example |
|------|----------|---------|
| Atom | 100 LOC | Button, Input, Badge |
| Molecule | 150 LOC | Card, Form, Modal |
| Organism | 250 LOC | Calculator, Dashboard |
| Page | 300 LOC | Login, Profile |

**If a component exceeds limits:**
1. Break into smaller components
2. Extract logic to custom hooks
3. Create a container component

### 3.3 File Naming Conventions

- **Components:** PascalCase (Button.jsx, LoginPage.jsx)
- **Hooks:** camelCase (useForm.js, useAsync.js)
- **Services:** camelCase (authService.js, companiesService.js)
- **Tests:** .test.js or .spec.js (Button.test.js)
- **Stories:** .stories.jsx (Button.stories.jsx)

### 3.4 Import Organization

```javascript
// 1. External dependencies
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// 2. Shared components
import { Button, Input } from '@/shared/components/ds';

// 3. Feature-specific imports
import { PricingForm } from './PricingForm';
import { usePricingForm } from '../hooks/usePricingForm';

// 4. Services
import { companiesService } from '../services/companiesService';

// 5. Styles
import styles from './PricingCalculator.module.css';

// 6. Types
import type { Company } from '../types/company';
```

---

## 4. PERFORMANCE OPTIMIZATION CHECKLIST

### 4.1 Component Optimization

- [ ] Use `React.memo()` for presentational components
- [ ] Use `useMemo()` for expensive calculations
- [ ] Use `useCallback()` for event handlers passed to children
- [ ] Lazy load routes with `lazy()` and `Suspense`
- [ ] Split code bundles for each feature module

### 4.2 State Management Optimization

- [ ] Don't store derived state in store
- [ ] Use selector functions to avoid unnecessary renders
- [ ] Normalize state shape (avoid nested objects)
- [ ] Batch state updates in Zustand

### 4.3 API Optimization

- [ ] Use TanStack Query for caching
- [ ] Implement request deduplication
- [ ] Use pagination for large lists
- [ ] Implement infinite scroll for feeds
- [ ] Debounce search/filter requests

### 4.4 Bundle Optimization

- [ ] Check bundle size with `npm run build`
- [ ] Use dynamic imports for heavy libraries
- [ ] Remove unused dependencies
- [ ] Configure tree-shaking in build tools

---

## 5. SECURITY CHECKLIST

### 5.1 Authentication & Authorization

- [ ] Validate all inputs on frontend and backend
- [ ] Store auth tokens securely (httpOnly cookies)
- [ ] Implement CSRF protection
- [ ] Refresh tokens before expiration
- [ ] Logout on token expiration

### 5.2 Data Protection

- [ ] Sanitize user input to prevent XSS
- [ ] Use parameterized queries to prevent SQL injection
- [ ] Encrypt sensitive data in transit (HTTPS)
- [ ] Validate API responses on frontend
- [ ] Implement Rate Limiting on backend

### 5.3 Supabase Security

- [ ] Configure Row Level Security (RLS)
- [ ] Use authenticated API keys, not anon keys in production
- [ ] Implement proper JWT handling
- [ ] Audit Supabase logs regularly
- [ ] Use environment variables for secrets

---

## 6. DEPLOYMENT ARCHITECTURE

### 6.1 Development Environment

```bash
npm run dev          # Vite dev server
npm run lint         # ESLint + Prettier
npm run type-check   # TypeScript check
npm run test         # Run tests
npm run storybook    # Component library
```

### 6.2 Production Build

```bash
npm run build        # Vite production build
npm run preview      # Preview production build locally
```

### 6.3 CI/CD Pipeline (GitHub Actions)

```yaml
name: CI/CD

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test
      - run: npm run build

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm run build
      - uses: netlify/actions/cli@master
        with:
          args: deploy --prod --dir=dist
        env:
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
```

---

## 7. MIGRATION TIMELINE

### Week 1: Setup & Foundational Changes
- **Day 1-2:** Setup Zustand, configure TypeScript
- **Day 3-4:** Create AppStore, migrate Auth + Points
- **Day 5:** Update App.jsx providers, remove old contexts

### Week 2: Service Layer & Hooks
- **Day 1-2:** Extract Supabase calls to services
- **Day 3-4:** Create custom hooks (useForm, useAsync, etc)
- **Day 5:** Update major components to use services

### Week 3-4: Component Refactoring
- **Week 3:** Break down PricingCalculator
- **Week 4:** Break down DiagnosticoCalculator + others

### Week 5: Validation & Forms
- **Day 1-2:** Setup Zod
- **Day 3-4:** Create schemas
- **Day 5:** Update forms

### Week 6: Component Library
- **Day 1-2:** Setup Storybook
- **Day 3-4:** Document existing components
- **Day 5:** Create missing components (Card, Modal, etc)

### Week 7: Testing
- **Day 1-2:** Setup Vitest
- **Day 3-4:** Write tests for hooks + services
- **Day 5:** Write tests for components

### Week 8: TypeScript & Cleanup
- **Day 1-2:** Migrate critical files to .tsx
- **Day 3-4:** Add JSDoc types to remaining files
- **Day 5:** Final QA + documentation

---

## 8. TEAM STRUCTURE & RESPONSIBILITIES

### For a team of 3 developers:

**Developer 1 (Architecture Lead)**
- Week 1-2: Zustand setup, AppStore, service layer
- Week 3-5: Refactoring giant components
- Week 6-8: Testing infrastructure, TypeScript

**Developer 2 (Feature Development)**
- Week 1-2: Parallel feature work
- Week 3-5: Component refactoring assistance
- Week 6-8: Component library expansion

**Developer 3 (DevOps/QA)**
- Week 1-2: ESLint, Prettier, CI/CD setup
- Week 3-5: Testing as components are refactored
- Week 6-8: Documentation, performance optimization

---

## 9. MONITORING & METRICS

### Track These Metrics

| Metric | Current | Target | Timeline |
|--------|---------|--------|----------|
| Bundle Size | TBD | < 400KB | Week 8 |
| Test Coverage | 0% | > 70% | Week 7 |
| Lighthouse Score | TBD | > 90 | Week 8 |
| Component Count | 2 | > 30 | Week 6 |
| Average Component Size | 350 LOC | < 150 LOC | Week 5 |
| Type Coverage | 0% | > 50% | Week 8 |

---

## 10. POST-LAUNCH ROADMAP

**Once refactoring is complete (Week 9+):**

### Short-term (Weeks 9-12)
- [ ] Add PWA support (service workers, offline)
- [ ] Implement dark mode theme switching
- [ ] Add analytics (Posthog, Mixpanel)
- [ ] Implement feature flags (LaunchDarkly)

### Medium-term (Months 4-6)
- [ ] Implement internationalization (i18n)
- [ ] Add advanced caching strategies
- [ ] Implement real-time features (WebSockets)
- [ ] Setup A/B testing framework

### Long-term (Months 7-12)
- [ ] Migrate to micro-frontends (Module Federation)
- [ ] Implement collaborative editing
- [ ] Add AI-powered features
- [ ] Scale to 500+ features with plugin system

---

## SUMMARY

**Investment Required:**
- **Time:** 6-8 weeks for team of 3
- **Effort:** ~600 developer hours
- **Cost:** ~$30-50K (depending on team location)

**Expected Benefits:**
- ✅ 85% readiness for 100+ features
- ✅ 50% reduction in bugs from better types + tests
- ✅ 40% faster feature development
- ✅ Improved developer experience + onboarding
- ✅ Production-grade architecture

**Risk Level:** Low (refactoring with backward compatibility)

---

**Document Version:** 1.0
**Last Updated:** 2026-02-22
**Next Review:** After Phase 1 completion (Week 2)
