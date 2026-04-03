# Vercel Deployment Guide — GAMA Calculadora

**Status:** Ready to deploy  
**Date:** 2026-02-23  
**Build:** Production-ready

---

## ✅ Pre-Deployment Checklist

- [x] Build passing (npm run build)
- [x] Tests passing (33/33)
- [x] Git commits clean
- [x] vercel.json created
- [x] Environment variables documented
- [x] Supabase migrations ready (apply separately)

---

## 🚀 STEP 1: GitHub Repository

### If not on GitHub yet:
```bash
cd gama-calculadora-app

# Initialize git (if needed)
git init
git add .
git commit -m "initial: GAMA Calculadora production-ready"

# Create repo on GitHub and push
git remote add origin https://github.com/YOUR_USERNAME/gama-calculadora.git
git branch -M main
git push -u origin main
```

### If already on GitHub:
```bash
git remote -v
# Should show your repo

git push origin develop  # Push current branch
```

---

## 🔧 STEP 2: Connect to Vercel

### Option A: Via Vercel Dashboard (Recommended)
1. Go to: https://vercel.com
2. Login with GitHub account
3. Click "Add New..." → "Project"
4. Select "gama-calculadora" repository
5. Click "Import"
6. Framework: "Vite" (auto-detected)
7. Build command: `npm run build` (pre-filled)
8. Output directory: `dist` (pre-filled)

### Option B: Via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to staging
vercel --prod
```

---

## 🔐 STEP 3: Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables:

**Add these 2 variables:**

| Name | Value | Source |
|------|-------|--------|
| `VITE_SUPABASE_URL` | `https://qnphnhlrvujhqeamszha.supabase.co` | From .env |
| `VITE_SUPABASE_ANON_KEY` | `sb_publishable_DU5-HUSwTzZa4fH8zOaYMw_ZH0GakUJ` | From .env |

**How to add:**
1. Vercel Dashboard → Project
2. Settings → Environment Variables
3. Add variable
4. Name: `VITE_SUPABASE_URL`
5. Value: (paste from .env)
6. Select: "Production" (for main branch)
7. Save
8. Repeat for `VITE_SUPABASE_ANON_KEY`

---

## 📋 STEP 4: Git Branches Configuration

In Vercel → Project Settings → Git:

**Production Branch:** `main`  
**Preview Branches:** `develop`, `feature/*`

This means:
- Push to `main` → Automatic production deploy
- Push to `develop` → Preview URL (not public)
- Push to `feature/*` → Preview URL (not public)

---

## ✅ STEP 5: First Deployment

### Via Dashboard
1. Go to Vercel → Project
2. You should see "Deploying..." (if auto-deploy enabled)
3. Wait for "Ready" status
4. Click "Visit" to see live site

### Via CLI
```bash
vercel --prod   # Deploy to production
vercel          # Deploy to preview
```

---

## 🧪 STEP 6: Verify Deployment

After deployment, test:

```bash
# 1. Check if site loads
curl https://gama-calculadora.vercel.app/

# 2. Check environment variables
# Open DevTools Console
# Should see Supabase URL in network requests

# 3. Test signup flow
# Try to create account
# Should sync with Supabase

# 4. Check for errors
# Open DevTools → Console
# Should be clean (except third-party warnings)
```

---

## 📊 Deployment Matrix

| Environment | Branch | Auto-Deploy | URL |
|-------------|--------|------------|-----|
| **Production** | `main` | Yes | `gama-calculadora.vercel.app` |
| **Staging** | `develop` | Optional | `gama-calculadora-develop.vercel.app` |
| **Preview** | `feature/*` | On PR | `gama-calculadora-pr-123.vercel.app` |

---

## 🔄 Deploy Workflow (Going Forward)

```
1. Work on feature branch
   git checkout -b feature/new-feature

2. Make changes & commit
   git add .
   git commit -m "feat: add new feature"

3. Push to GitHub
   git push origin feature/new-feature

4. Create Pull Request
   - Vercel auto-creates preview URL
   - Test on staging
   - Review QA results

5. Merge to develop
   - Vercel deploys to develop URL
   - Team tests

6. Merge to main
   - Vercel auto-deploys to production
   - Live! 🚀
```

---

## 🛠️ Troubleshooting

### Build fails
- Check: `npm run build` passes locally
- Check: All dependencies installed
- Check: Environment variables set
- Check: Node version (18+ recommended)

### Blank page on production
- Open DevTools → Console
- Check for JavaScript errors
- Check: Supabase variables correct
- Check: dist folder generated correctly

### Supabase not connecting
- Verify: `VITE_SUPABASE_URL` correct
- Verify: `VITE_SUPABASE_ANON_KEY` correct
- Check: Supabase project is online
- Check: Network requests in DevTools

### pdfExport chunk error
- This is a warning, not an error
- Fix (optional): Use dynamic imports
- For now: Safe to ignore

---

## 📞 Support

**Vercel Docs:** https://vercel.com/docs  
**Supabase Docs:** https://supabase.com/docs  
**Vite Docs:** https://vitejs.dev/

---

## ✅ Deployment Complete!

Once live on Vercel:

1. Share URL with team
2. Run smoke tests
3. Monitor performance
4. Continue with 8-week refactoring sprint

---

**Deployed by:** GAMA Calculadora  
**Status:** Ready for production  
**Confidence:** 95%

