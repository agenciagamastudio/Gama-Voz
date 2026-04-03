# ADR-005: Estrutura de Pastas Target

**Status:** Accepted
**Data:** 2026-02-22
**Agente:** @architect (Aria)

## Contexto

A estrutura atual (`src/components/` flat com 23 arquivos) funciona para MVP mas escala mal. Sem separação por feature/domínio, componentes de domínios diferentes convivem no mesmo nível.

## Decisão

**Migração gradual para Feature-Based Structure.**

### Estrutura Target

```
src/
├── features/
│   ├── auth/              (LoginPage, SignUpPage, AuthContext)
│   ├── diagnostico/       (DiagnosticoDeValorCalculator, gapLossLogic)
│   ├── pricing/           (PricingCalculator, PricingPlans, CargoSalarioManager)
│   ├── proposals/         (ProposalPreview, ShareProposal, ProposalContext)
│   ├── reports/           (ReportGenerator, ValueReportPreview, reportLogic)
│   ├── admin/             (AdminDashboard, PromoCodesManager)
│   └── onboarding/        (SmartOnboarding, LandingPage)
├── shared/
│   ├── components/        (ds/Button, ds/Input, BottomNav, ImpactChart)
│   ├── context/           (ToastContext, PointsContext)
│   ├── hooks/             (useLocalStorage)
│   └── utils/             (supabase.js, pdfExport, marketData)
├── styles/
│   └── (global CSS only)
├── App.jsx
├── Layout.jsx
└── main.jsx
```

### Migração

- **NÃO migrar tudo de uma vez** — executa-se por feature conforme stories
- **Ordem sugerida:** shared/ primeiro → auth/ → diagnostico/ → pricing/ → proposals/ → reports/ → admin/
- Feature folder criada quando story de refactor for executada

## Consequências

- ✅ Localidade de mudança — features isoladas
- ✅ Facilita ownership por desenvolvedor
- ✅ Imports mais claros e rastreáveis
- ⚠️ Período transitório com estrutura híbrida
- ⚠️ Requer atualização de imports em cada migração de feature

## Nota sobre src_backup_design_revision/

Esta pasta não deve ser versionada a longo prazo. Criar uma story para:
1. Extrair qualquer código útil que não esteja em `src/`
2. Remover a pasta completamente do repositório
