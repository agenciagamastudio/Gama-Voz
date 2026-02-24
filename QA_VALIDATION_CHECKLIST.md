# QA Validation Checklist — Post-Deployment Testing

**Test Environment:** https://gama-calculadora-app.vercel.app
**Date:** 2026-02-24
**Status:** ⏳ READY FOR EXECUTION

---

## 🧪 **PHASE 1: Authentication Flows**

### Test 1: Login with "Remember Email"
- [ ] Navigate to `/login`
- [ ] Enter: `prontoatendimentogama@gmail.com`
- [ ] Enter password
- [ ] Check "Lembrar minha conta"
- [ ] Click "Entrar no Sistema"
- [ ] ✅ Should redirect to home
- [ ] Logout
- [ ] Navigate back to `/login`
- [ ] ✅ Email should be pre-filled
- [ ] ✅ "Lembrar conta" should be checked

### Test 2: Signup with Password Validation
- [ ] Navigate to `/signup`
- [ ] Enter email: `testuser@gmail.com`
- [ ] Enter weak password: `test` (5 chars)
- [ ] ✅ Should show "❌ Fraca" and block submit
- [ ] Enter strong password: `Test123!@#` (10 chars + uppercase + number + symbol)
- [ ] ✅ Should show "✅ Forte"
- [ ] Enter different confirmation: `Different123`
- [ ] ✅ Should show "❌ Senhas não conferem"
- [ ] Enter matching confirmation
- [ ] ✅ Should show "✅ Senhas conferem"
- [ ] Click "Criar Conta"
- [ ] ✅ Should receive confirmation email
- [ ] ✅ Should be able to confirm and login

### Test 3: Admin Access
- [ ] Login with: `prontoatendimentogama@gmail.com`
- [ ] Navigate to `/admin`
- [ ] ✅ Should NOT show "ACESSO NEGADO"
- [ ] ✅ Should show Admin Dashboard
- [ ] Navigate to `/promo-codes`
- [ ] ✅ Should NOT show "Acesso Negado: Área Restrita ao Mestre"
- [ ] ✅ Should show Promo Codes Manager

---

## 🔐 **PHASE 2: Security Validation**

### Test 4: RLS Policies (Data Privacy)
- **Prerequisites:** RLS migration must be applied in Supabase
- [ ] Create a user account: `user1@test.com`
- [ ] Login as user1, create a report
- [ ] Create another user account: `user2@test.com`
- [ ] Login as user2
- [ ] ✅ user2 should NOT see user1's report
- [ ] ✅ user2 should ONLY see their own reports
- [ ] Repeat for proposals table

### Test 5: Email Whitelist (Signup Restrictions)
- **Prerequisites:** Email Whitelist must be DISABLED in Supabase
- [ ] Try signup with: `newuser@example.com`
- [ ] ✅ Should succeed (not blocked by whitelist)
- [ ] Confirm email and login
- [ ] ✅ Should be able to access application

### Test 6: CORS Configuration
- **Prerequisites:** CORS must include `https://gama-calculadora-app.vercel.app`
- [ ] Open browser DevTools → Network tab
- [ ] Perform any action requiring Supabase call
- [ ] ✅ Should NOT see CORS errors in console
- [ ] ✅ API calls should complete successfully

---

## 📊 **PHASE 3: Feature Validation**

### Test 7: Core Features
- [ ] **Calculadora:** Can create, view, delete calculations
- [ ] **Diagnóstico de Valor:** Can generate value analysis
- [ ] **Export PDF:** Can export reports as PDF
- [ ] **Save Companies:** Can save company data
- [ ] **History:** Can view calculation history

### Test 8: UI/UX Quality
- [ ] **Responsive:** App works on mobile (320px), tablet (768px), desktop (1440px)
- [ ] **Animations:** Smooth fade-in transitions for pages
- [ ] **Loading States:** Shows loading indicators during API calls
- [ ] **Error Messages:** Clear error messages displayed properly
- [ ] **Visual Variety:** Components don't look repetitive

---

## ⚡ **PHASE 4: Performance**

### Test 9: Bundle & Performance
- [ ] Run Lighthouse in Chrome DevTools
  - [ ] LCP (Largest Contentful Paint) < 2.5s ✅
  - [ ] FCP (First Contentful Paint) < 1.8s ✅
  - [ ] CLS (Cumulative Layout Shift) < 0.1 ✅
- [ ] Verify PDF export doesn't freeze UI
- [ ] Check build bundle size < 500KB gzip

### Test 10: Load Testing
- [ ] Rapidly create 10+ calculations
- [ ] ✅ Should handle without errors
- [ ] Switch pages quickly multiple times
- [ ] ✅ Should not show stale data

---

## ✅ **PHASE 5: Sign-Off**

### Final Checklist
- [ ] All Phase 1 tests pass (Auth)
- [ ] All Phase 2 tests pass (Security)
- [ ] All Phase 3 tests pass (Features)
- [ ] All Phase 4 tests pass (Performance)
- [ ] No console errors in browser DevTools
- [ ] No Supabase errors in application
- [ ] Admin functionality works
- [ ] Regular user functionality works

### Results
```
Pass Rate: __/50 tests passed
Status: [ ] READY FOR PRODUCTION
        [ ] NEEDS FIXES
```

### Issues Found
```
1. Issue:
   Steps:
   Expected:
   Actual:
   Severity: [ ] Critical [ ] High [ ] Medium [ ] Low

2. Issue:
   ...
```

---

## 📋 **Manual Configuration Steps Required**

### Step 1: Supabase Dashboard — Email Whitelist
```
1. Go to: https://app.supabase.com
2. Select project: gama-calculadora-app
3. Authentication → Sign In / Providers
4. Look for "Allow new users to sign up"
5. Ensure it's ENABLED (toggle ON)
6. Look for "Disallow sign ups by default" → DISABLE if present
7. Save changes
```

### Step 2: Supabase Dashboard — CORS
```
1. Settings → API
2. Find "CORS Allowed Origins"
3. Add: https://gama-calculadora-app.vercel.app
4. Save
```

### Step 3: Supabase Dashboard — Apply RLS
```
1. SQL Editor
2. Copy-paste contents from: supabase/migrations/001_apply_rls_policies.sql
3. Click "Run"
4. Verify: SELECT tablename, rowsecurity FROM pg_tables...
   Should show: reports=ON, proposals=ON
```

### Step 4: Confirm Admin Email
```
1. Users section
2. Find: prontoatendimentogama@gmail.com
3. Verify "Confirmed at" is populated
4. If not: Click "Resend confirmation email" or manually confirm
```

---

## 🎯 **Success Criteria**

| Criteria | Status |
|----------|--------|
| Login/Signup working | ⏳ PENDING |
| Admin access functional | ⏳ PENDING |
| Email remembered in localStorage | ⏳ PENDING |
| Password validation enforced | ⏳ PENDING |
| RLS preventing data exposure | ⏳ PENDING |
| CORS configured | ⏳ PENDING |
| Email whitelist disabled | ⏳ PENDING |
| Build < 500KB | ✅ 173.74 KB gzip |
| Zero console errors | ⏳ PENDING |

---

**Next Step:** Execute all tests above and report results!
