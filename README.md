# GAMA Calculadora App

Enterprise calculator for project pricing and diagnostics.

## Stack

- React 19.2
- Vite 7.3
- Supabase Auth + PostgreSQL
- Tailwind CSS
- Recharts for data visualization

## Quick Start

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation

```bash
git clone https://github.com/agenciagamastudio/gama-calculadora-app.git
cd gama-calculadora-app
npm install
```

### Development

```bash
npm run dev
# Abra http://localhost:5173
```

### Build

```bash
npm run build
npm run preview
```

### Tests

```bash
npm run test       # Watch mode
npm run test -- --run  # Single run
npm run lint       # ESLint
```

## Environment Variables

Create `.env.local`:

```
VITE_SUPABASE_URL=https://qnphnhlrvujhqeamszha.supabase.co
VITE_SUPABASE_ANON_KEY=your-key-here
```

## Project Structure

```
src/
├── components/      # React components
├── context/         # Context providers (Auth, Toast, etc)
├── hooks/          # Custom React hooks
├── utils/          # Utilities (Supabase, calculations)
├── styles/         # CSS/Tailwind configs
└── App.jsx        # Main app component
```

## Features

- [x] User authentication (Email/Password)
- [x] Pricing calculator
- [x] Value diagnostics
- [x] PDF export
- [x] Promo codes management (Admin)
- [x] User profiles

## Deployment

Deployed on Vercel: https://gama-calculadora-app.vercel.app

### Production Deployment

```bash
# Automated via GitHub Actions on push to main
git push origin main
# Check: https://vercel.com/agenciagamastudio/gama-calculadora-app
```

## Documentation

- [Deployment Checklist](./DEPLOYMENT_CHECKLIST.md)
- [Supabase Configuration](./SUPABASE_CHECKLIST.md)
- [Architecture Review](./ARCHITECTURE-REVIEW-COMPLETE.md)
- [Audit Report](./AUDITORIA_COMPLETA_2026-02-24.md)

## Security

- Row-Level Security (RLS) enabled on all tables
- Email confirmation required for signup
- Admin credentials: prontoatendimentogama@gmail.com
- CORS configured for https://gama-calculadora-app.vercel.app

## Support

For issues, see troubleshooting in docs/ or contact the team.

---

**Last Updated:** 2026-02-24
**Status:** Production Ready (After Phase 1 audit fixes)
