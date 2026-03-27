# Gama Financeiro

Sistema de gestão financeira corporativo da Grupo Gama.

## 🎯 Visão

Referência global em soluções de gestão financeira para PMEs e empresas estabelecidas, com tecnologia de ponta e interface intuitiva.

## ⚡ Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript
- **Styling:** Tailwind CSS
- **Design System:** Gama DS (proprietary)
- **Backend/Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Monitoring:** Sentry
- **Deployment:** Vercel

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (dev environment)

### Setup

```bash
# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local

# Run development server
npm run dev

# Open browser
open http://localhost:3000
```

### Environment Variables

See `.env.example` for required variables:
- `SUPABASE_URL` — Supabase project URL
- `SUPABASE_ANON_KEY` — Supabase anonymous key
- `NEXT_PUBLIC_SUPABASE_URL` — Public URL
- `SENTRY_DSN` — Sentry error tracking

## 📦 Available Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm start` — Start production server
- `npm run lint` — Run ESLint
- `npm run typecheck` — Run TypeScript type checking
- `npm test` — Run unit tests
- `npm run test:e2e` — Run E2E tests (Playwright)

## 📁 Project Structure

```
src/
├── app/           # Next.js app router
├── components/    # React components (atoms, molecules, organisms)
├── lib/          # Utilities, hooks, helpers
├── styles/       # Global styles
├── types/        # TypeScript types
└── ...
```

## 🔧 Development Workflow

1. **Create feature branch** → `git checkout -b feature/description`
2. **Make changes** → Code, test locally
3. **Run checks** → `npm run lint && npm run typecheck`
4. **Commit** → `git commit -m "feat: description [Story ID]"`
5. **Push & Create PR** → GitHub PR with description
6. **Review & Merge** → Automated CI/CD pipeline

## 📋 Architecture

### Story-Driven Development

All work is tracked in stories with acceptance criteria:
- `docs/stories/1.1.setup-projeto.md` — Project setup
- `docs/stories/1.2.autenticacao.md` — Authentication
- `docs/stories/1.3.schema-db.md` — Database schema
- And more...

See `docs/ARCHITECTURE.md` for detailed system design.

## 🔐 Security

- Environment variables never committed
- Supabase RLS policies enforced
- Sentry for error tracking
- No hardcoded credentials

## 📊 Monitoring

Errors and performance tracked via Sentry. Access dashboard via project settings.

## 🤝 Contributing

See `CONTRIBUTING.md` for detailed guidelines.

## 📝 License

Proprietary — Grupo Gama

---

**Last Updated:** 2026-03-26
**Maintained by:** @devops (Gage)
