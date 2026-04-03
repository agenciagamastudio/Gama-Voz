# Quick Implementation Checklist
## GAMA Calculadora - 8-Week Refactoring Sprint

**Start Date:** _______________
**Target Completion:** _________ (8 weeks later)

---

## WEEK 1: State Management (40 hours)

### Day 1-2: Setup & Zustand
- [ ] Install `zustand` and `immer`
- [ ] Create `src/store/appStore.js`
- [ ] Implement state slices (auth, points, proposal, report)
- [ ] Test store with React DevTools

### Day 3-4: Migration Helpers
- [ ] Create `useAuth()` wrapper hook
- [ ] Create `usePoints()` wrapper hook
- [ ] Create `useProposal()` wrapper hook
- [ ] Create `useValueReport()` wrapper hook

### Day 5: Integration
- [ ] Update `App.jsx` to remove 5 context providers
- [ ] Add `StoreProvider` wrapper (if using custom provider)
- [ ] Run full test suite
- [ ] Verify all pages load without errors
- [ ] Demo to team ✅

**Deliverable:** AppStore in place, 0 breaking changes

---

## WEEK 2: Service Layer (24 hours)

### Day 1-2: Extract Services
- [ ] Create `src/services/authService.js`
- [ ] Create `src/services/companiesService.js`
- [ ] Create `src/services/pointsService.js`
- [ ] Create `src/services/supabaseHelpers.js`

### Day 3-4: Create Hooks
- [ ] Create `src/hooks/useSavedCompanies.js`
- [ ] Create `src/hooks/useAsync.js`
- [ ] Create `src/hooks/useDebounce.js`
- [ ] Update components to use services

### Day 5: Validation
- [ ] Services have error handling
- [ ] All API calls centralized
- [ ] Optimistic updates working
- [ ] Rollback on failure working

**Deliverable:** Service layer complete

---

## WEEK 3-4: Component Refactoring (48 hours)

### Week 3: PricingCalculator (659L → 5 files)
- [ ] Create `src/features/pricing/` structure
- [ ] Extract `PricingForm.jsx` (150L)
- [ ] Extract `FeaturesTable.jsx` (120L)
- [ ] Extract `PricingResults.jsx` (80L)
- [ ] Create `usePricingForm.js` hook (80L)
- [ ] Create `usePricingCalculation.js` hook (60L)
- [ ] Create schemas
- [ ] Update orchestrator (120L)
- [ ] All tests passing ✅

### Week 4: DiagnosticoDeValorCalculator (786L → 6 files)
- [ ] Create `src/features/diagnostico/` structure
- [ ] Extract components (Form, Analysis, Results)
- [ ] Create hooks (useDiagnostico, calculationEngine)
- [ ] Create schemas
- [ ] Update orchestrator
- [ ] All tests passing ✅

**Deliverable:** No components > 200L

---

## WEEK 5: Validation & Forms (32 hours)

### Day 1-2: Zod Setup
- [ ] Install `zod`
- [ ] Create schemas for auth, pricing, diagnostico
- [ ] Test schemas

### Day 3-4: useForm Hook
- [ ] Create `src/hooks/useForm.js`
- [ ] Handle Zod validation
- [ ] Support dynamic fields
- [ ] Test with LoginForm

### Day 5: Form Migration
- [ ] Update all forms to use useForm + schema
- [ ] Run all form tests ✅

**Deliverable:** All forms validated, no duplication

---

## WEEK 6: Component Library (80 hours)

### Day 1: Storybook Setup
- [ ] Install & configure Storybook
- [ ] Create Button.stories.jsx
- [ ] Create Input.stories.jsx
- [ ] Storybook running ✅

### Day 2-3: Atomic Components
- [ ] Button (enhance)
- [ ] Input (enhance)
- [ ] Badge, Chip, Text, Icon, Spinner, Divider, Alert
- [ ] Each with: component, styles, story, test

### Day 4: Molecule Components
- [ ] Card, Modal, Dropdown, Form, Tooltip, Toast
- [ ] Stories and tests for each

### Day 5: Documentation
- [ ] README for design system
- [ ] All components documented
- [ ] Accessibility checklist
- [ ] Storybook live ✅

**Deliverable:** 25+ components documented

---

## WEEK 7: Testing Infrastructure (64 hours)

### Day 1-2: Setup Vitest
- [ ] Install vitest, testing-library
- [ ] Create vitest.config.js
- [ ] Run first test ✅

### Day 3-4: Test Hooks
- [ ] useForm (5 tests)
- [ ] usePricingForm (5 tests)
- [ ] useDiagnostico (5 tests)
- [ ] useAsync, useDebounce, useSavedCompanies

### Day 5: Test Components
- [ ] Button component
- [ ] Input component
- [ ] Modal component
- [ ] Card component
- [ ] Coverage > 70% ✅

**Deliverable:** Vitest setup, 70%+ coverage

---

## WEEK 8: TypeScript & Cleanup (48 hours)

### Day 1-2: Setup TypeScript
- [ ] Install TypeScript
- [ ] Create tsconfig.json
- [ ] Configure path aliases
- [ ] No breaking changes

### Day 3-4: Migrate Critical Files
- [ ] appStore.js → appStore.ts
- [ ] useForm.js → useForm.ts
- [ ] authService.js → authService.ts
- [ ] schemas → .ts
- [ ] components → .tsx
- [ ] tsc --noEmit passes

### Day 5: Documentation & Cleanup
- [ ] Update README
- [ ] Document type conventions
- [ ] ESLint: 0 errors
- [ ] All tests passing ✅

**Deliverable:** 50%+ TypeScript coverage

---

## Final Metrics (Week 8)

| Metric | Target | Status |
|--------|--------|--------|
| Readiness Score | 85 | [ ] |
| Component Avg Size | <150L | [ ] |
| Contexts | 0 | [ ] |
| Custom Hooks | 15+ | [ ] |
| Components | 30+ | [ ] |
| Test Coverage | 70%+ | [ ] |
| TypeScript | 50%+ | [ ] |
| ESLint Errors | 0 | [ ] |

---

## Success Checklist

**By Week 8:**
- [ ] All context migration complete
- [ ] No components exceed 200L
- [ ] Zod validation everywhere
- [ ] Component library documented
- [ ] 70%+ test coverage
- [ ] 50%+ TypeScript
- [ ] CI/CD green
- [ ] 0 ESLint errors
- [ ] Ready for 100+ features

---

**Print and track daily!** 📋
