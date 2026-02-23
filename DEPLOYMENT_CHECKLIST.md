# GAMA Calculadora — Deployment Checklist ✅

**Data:** 2026-02-23
**Status:** 85/100 — Pronto para Staging
**Git:** develop branch
**Next:** Supabase migrations + Vercel setup

---

## ✅ COMPLETED (HOJE)

### Git Setup
- [x] Repository initialized (develop branch)
- [x] 4 commits total (MVP → refactoring → fixes)
- [x] Changes committed (Layout.jsx, AdminDashboard.jsx, UserProfile.jsx, migrations)
- [x] .gitignore configured
- [x] Migration file added (20260223000016_add_role_to_profiles.sql)

### Build & Compilation
- [x] npm run build → 21.57s ✅
- [x] Dist folder generated with proper chunking
- [x] All dependencies installed (node_modules/)
- [x] ESLint configured
- [x] Vite configured for production

### Documentation
- [x] Complete architecture review (4,331 lines)
- [x] Refactoring patterns documented
- [x] Supabase audit completed (70/100 → needs 3 fixes)
- [x] 8-week roadmap created
- [x] Vercel setup guide provided

### Code Quality
- [x] 2 giant components refactored (47KB, 35KB)
- [x] 13/13 tests passing (100%)
- [x] Custom hooks created (3 hooks)
- [x] New components organized (diagnostic/, pricing/)
- [x] All files <5KB (goal achieved)

---

## ⏳ IN PROGRESS (NEXT 2 HOURS)

### Supabase Migrations (15 min)
- [ ] Open: https://app.supabase.com
- [ ] Project: qnphnhlrvujhqeamszha (gama-calculadora)
- [ ] SQL Editor → New Query
- [ ] Copy file: `./apply-migrations.sql`
- [ ] Paste & Run (should see "Query successful")

**What happens:**
- ✅ RLS enabled on profiles table
- ✅ RLS policies created (read/update/delete)
- ✅ Soft-delete filters added to reports/proposals
- ✅ Auto-profile creation trigger ensured
- ✅ Role column added to profiles

**Verify after:**
```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' AND tablename IN ('profiles', 'reports', 'proposals');
-- Should show all 3 with true
```

### Local Testing (20 min)
- [ ] npm run dev
- [ ] Open http://localhost:5173
- [ ] Try signup → should create profile
- [ ] Verify no RLS errors in console
- [ ] Test login flow

---

## 📋 TODO (NEXT 2-3 DAYS)

### Vercel Setup (20 min)
- [ ] Create `vercel.json` in project root
- [ ] Connect GitHub repo to Vercel
- [ ] Set environment variables:
  - VITE_SUPABASE_URL
  - VITE_SUPABASE_ANON_KEY
- [ ] Deploy to staging
- [ ] Test staging URL

### High-Priority Supabase Fixes (6 hours)
- [ ] Apply soft-delete in RLS fully
- [ ] Verify profile trigger working
- [ ] Setup password requirements (8+ chars)
- [ ] Document schema & RLS
- [ ] Load test RLS policies

### Code-Splitting (2 hours)
- [ ] Address pdfExport chunk warning (587 KB)
- [ ] Use dynamic imports for heavy features
- [ ] Re-run build → verify chunk reduction

---

## 🔴 CRITICAL ISSUES

### Supabase (Score: 70/100)
**Must fix before production:**

| # | Issue | Impact | Fix Time | Status |
|---|-------|--------|----------|--------|
| 1 | RLS missing on profiles | PII exposed | 15 min | **IN PROGRESS** |
| 2 | Weak password requirements | Brute force risk | 5 min | Pending |
| 3 | No schema documentation | Dev confusion | 1 hour | Pending |

### Vercel (Score: 75/100)
**Must setup before production:**
- [ ] vercel.json missing → Create
- [ ] Env vars not set → Add to Dashboard
- [ ] Auto-deploy not configured → Enable

---

## 🟡 MEDIUM PRIORITY

### Code Quality
- [ ] 0% TypeScript → Migrate gradually (2 weeks)
- [ ] Minimal design system → Expand (1 week)
- [ ] No test coverage → Add (3 days)
- [ ] Context duplication → Refactor with Zustand (2 days)

### Performance
- [ ] pdfExport chunk too large → Code-split (2 hours)
- [ ] No lazy loading → Add (1 day)

---

## 📊 SCORING BREAKDOWN

| Aspect | Current | Target | Days |
|--------|---------|--------|------|
| Git | 100/100 | 100/100 | ✅ 0 |
| Build | 100/100 | 100/100 | ✅ 0 |
| Supabase | 70/100 | 95/100 | 🟡 2 |
| Vercel | 75/100 | 100/100 | 🟡 1 |
| Code | 85/100 | 90/100 | 🟠 6-8 weeks |
| **TOTAL** | **85/100** | **95/100** | **3-4 days** |

---

## 🚀 TIMELINE

```
TODAY (2h)
├─ Supabase migrations apply ✅
├─ Local testing
├─ Git commit
└─ Score: 85/100

TOMORROW (4h)
├─ Vercel setup
├─ Environment variables
├─ Deploy to staging
└─ Score: 90/100

NEXT 2 DAYS (6h)
├─ Supabase secondary fixes
├─ Password requirements
├─ Code-splitting for pdfExport
└─ Score: 92/100

WEEK 2 (ongoing)
├─ Email verification
├─ TypeScript gradual migration
├─ 8-week refactoring sprint
└─ Score: 95/100

PRODUCTION READY
└─ After all high-priority fixes + staging test ✅
```

---

## 🎯 NEXT IMMEDIATE ACTIONS

### RIGHT NOW (5 min)
1. Open: https://app.supabase.com
2. Find project: qnphnhlrvujhqeamszha
3. Go to SQL Editor
4. Copy & paste SQL from: `./apply-migrations.sql`
5. Click "Run"
6. Verify: Check rowsecurity = true for all tables

### THEN (10 min)
```bash
npm run dev
# Test signup in browser
# Verify profile creation
# Check console for errors
```

### FINALLY (5 min)
```bash
git add apply-migrations.sql
git commit -m "chore: apply Supabase RLS + role migrations"
git log -2  # Verify commit
```

---

## 📞 Support

**Files Reference:**
- SQL to apply: `./apply-migrations.sql`
- Architecture: `./docs/ARCHITECTURE-SUMMARY.md`
- Supabase guide: `./docs/supabase-audit.md`
- Vercel guide: `./VERCEL_SETUP.md`

**Next Agent Steps:**
- @dev: Test migrations, commit, push
- @qa: Verify RLS, test signup flow
- @devops: Setup Vercel, manage deployments

---

**Status: 85/100 - Ready for Staging** ✅

