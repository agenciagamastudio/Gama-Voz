# GAMA Design System V2 — Migration Guide (V1 → V2)

**Version:** 2.0.0
**Status:** Migration Ready
**Last Updated:** 2026-03-13
**Estimated Time:** 2-4 hours per project

---

## 📋 Overview

This guide helps you migrate from GAMA Design System V1 (single-brand) to V2 (multi-brand).

**What's Changing:**
- ✅ Single brand → 4 brands (+ unlimited future brands)
- ✅ Hardcoded colors → Dynamic CSS variables
- ✅ Manual theme switching → Automatic via context
- ✅ Component duplication → Universal components
- ✅ Old tokens.css → New brand-configs/ structure

**What's NOT Changing:**
- ✅ Component API (props, interface)
- ✅ Component names and locations
- ✅ HTML/CSS output (visually identical)
- ✅ Tailwind class names

---

## 🚀 Quick Start (30 minutes)

### Step 1: Update Layout (5 min)

**Before (V1):**
```tsx
// src/app/layout.tsx
export default function RootLayout() {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  )
}
```

**After (V2):**
```tsx
import { BrandProvider } from '@/context/BrandContext'

export default function RootLayout() {
  return (
    <html>
      <body>
        <BrandProvider>
          {children}
        </BrandProvider>
      </body>
    </html>
  )
}
```

### Step 2: Update Imports (5 min)

**Before (V1):**
```typescript
// Direct color imports (no longer needed)
import { BRAND_PRIMARY, BRAND_DARK } from '@/styles/colors'

export function MyComponent() {
  return <button style={{ backgroundColor: BRAND_PRIMARY }} />
}
```

**After (V2):**
```typescript
import { useBrand } from '@/hooks/useBrand'

export function MyComponent() {
  const { colors } = useBrand()
  return <button style={{ backgroundColor: colors.primary }} />
}
```

### Step 3: Verify Tests Pass (10 min)

```bash
npm run typecheck  # TypeScript check
npm run lint       # Linting
npm test           # Unit tests
npm run dev        # Manual verification
```

### Step 4: Test Brand Switching (10 min)

1. Open http://localhost:3006
2. Click brand dropdown (sidebar footer)
3. Switch between all 4 brands
4. Verify all colors change correctly
5. Refresh page → brand persists ✅

---

## 📊 Migration Checklist

### Pre-Migration (Week 1)

- [ ] Review this guide completely
- [ ] Read ARCHITECTURE-V2.md (understand the system)
- [ ] Backup current V1 code (git tag)
- [ ] Identify custom colors/tokens in your project
- [ ] List all hardcoded colors to migrate
- [ ] Review component color usage

### During Migration (Week 2-3)

- [ ] Update layout.tsx with BrandProvider
- [ ] Replace hardcoded colors with useBrand() hook
- [ ] Update component imports (remove old color constants)
- [ ] Update Tailwind classes (if using brand color classes)
- [ ] Run linter: `npm run lint`
- [ ] Run type checker: `npm run typecheck`
- [ ] Run tests: `npm test`

### Post-Migration (Week 4)

- [ ] Manual QA testing (all brands, all devices)
- [ ] Accessibility testing (color contrast)
- [ ] Cross-browser testing
- [ ] Performance testing (Lighthouse)
- [ ] Update team documentation
- [ ] Deploy to staging
- [ ] Get sign-off before production

---

## 🔄 Component Migration Patterns

### Pattern 1: Hardcoded Colors

**V1 (Before):**
```tsx
export function Button() {
  return (
    <button style={{ backgroundColor: '#88CE11', color: '#FFFFFF' }}>
      Click me
    </button>
  )
}
```

**V2 (After):**
```tsx
import { useBrand } from '@/hooks/useBrand'

export function Button() {
  const { colors } = useBrand()
  return (
    <button style={{ backgroundColor: colors.primary, color: colors.text }}>
      Click me
    </button>
  )
}
```

### Pattern 2: CSS Classes (Tailwind)

**V1 (Before):**
```tsx
// tailwind.config.js had hardcoded brand color
colors: {
  'gama-primary': '#88CE11',
  'gama-dark': '#161616',
}

// Component used:
<button className="bg-gama-primary text-gama-dark" />
```

**V2 (After):**
```tsx
// tailwind.config.ts now uses CSS vars:
colors: {
  'gama-primary': 'var(--color-primary)',
  'gama-dark': 'var(--color-dark)',
}

// Component works exactly the same:
<button className="bg-gama-primary text-gama-dark" />
// But now it switches brands dynamically ✨
```

### Pattern 3: Dark Mode Colors

**V1 (Before):**
```tsx
<div style={{
  backgroundColor: isDark ? '#161616' : '#FFFFFF',
  color: isDark ? '#FFFFFF' : '#161616'
}}>
```

**V2 (After):**
```tsx
import { useBrand } from '@/hooks/useBrand'

export function MyComponent() {
  const { colors } = useBrand()
  return (
    <div style={{
      backgroundColor: colors.dark,
      color: colors.text
    }}>
```

---

## 📁 File Migration Map

### Removed (V1)
```
src/styles/
├── colors.ts              ❌ DELETE (use useBrand instead)
├── brands.ts              ❌ DELETE (use brand-configs instead)
└── old-tokens.css         ❌ DELETE (use design-tokens/tokens.css)
```

### Updated (V1 → V2)
```
src/app/
├── layout.tsx             ✏️ Add BrandProvider
└── globals.css            ✏️ Import new tokens.css

src/components/
├── atoms/Button.tsx       ✏️ Replace hardcoded colors
├── molecules/Card.tsx     ✏️ Replace hardcoded colors
└── platform/SideNav.tsx   ✏️ Already updated

tailwind.config.ts         ✏️ Check CSS vars mapped (likely OK)
```

### Added (V1 → V2)
```
src/hooks/
└── useBrand.ts            ✨ NEW (use this!)

src/context/
└── BrandContext.tsx       ✨ NEW (provides brand data)

src/utils/
└── tokenToCSSVar.ts       ✨ NEW (handles CSS var conversion)

brand-configs/             ✨ NEW (4 brands with configs)
design-tokens/             ✨ NEW (base tokens)
```

---

## 🔍 Finding Colors to Migrate

### Step 1: Find All Color References

```bash
# Search for hex colors
grep -r "#[0-9A-F]\{6\}" src/ --include="*.tsx" --include="*.ts"

# Search for rgb colors
grep -r "rgb(" src/ --include="*.tsx" --include="*.ts"

# Search for color constants
grep -r "BRAND_\|COLOR_\|DARK_" src/ --include="*.tsx" --include="*.ts"
```

### Step 2: Create Migration List

```
Component: Button.tsx
❌ Line 15: backgroundColor: '#88CE11'  → colors.primary
❌ Line 16: color: '#FFFFFF'           → colors.text
❌ Line 20: borderColor: '#A8E030'     → colors.primary_light

Component: Card.tsx
❌ Line 8: backgroundColor: '#272727'  → colors.surface
❌ Line 9: color: '#FFFFFF'            → colors.text
```

### Step 3: Migrate One by One

```tsx
// For each color, replace:
// #88CE11 → colors.primary
// #A8E030 → colors.primary_light
// #6BA60D → colors.primary_dark
// #161616 → colors.dark
// #272727 → colors.surface
// #FFFFFF → colors.text
// #A1A1AA → colors.text_secondary
// #10B981 → colors.success
// #F59E0B → colors.warning
// #E11D48 → colors.error
// #3B82F6 → colors.info
```

---

## 🧪 Testing Checklist

### Unit Tests
- [ ] All components render without errors
- [ ] useBrand() hook returns expected tokens
- [ ] Brand switching updates colors
- [ ] localStorage persists brand choice

### Integration Tests
- [ ] Brand switching works app-wide
- [ ] All components update when brand changes
- [ ] No memory leaks on repeated switching
- [ ] No console errors or warnings

### Visual Tests
- [ ] All 4 brands display correctly
- [ ] Colors match design tokens
- [ ] Responsive design still works
- [ ] Mobile sidebar works with all brands
- [ ] Dark mode works with all brands

### Accessibility Tests
- [ ] Color contrast 4.5:1 minimum
- [ ] Keyboard navigation still works
- [ ] Screen reader still functions
- [ ] Focus indicators still visible

### Performance Tests
- [ ] Lighthouse score 90+
- [ ] Brand switch < 100ms
- [ ] No bundle size increase
- [ ] No memory leaks

---

## ⚠️ Common Migration Issues

### Issue 1: Colors Don't Update

**Symptom:** Brand switching works but colors don't change

**Solution:**
1. Check that BrandProvider wraps your app in layout.tsx
2. Verify you're using `useBrand()` hook
3. Run `npm run dev` to restart
4. Check browser console for errors

**Debug:**
```typescript
const { colors } = useBrand()
console.log('Current colors:', colors)
```

### Issue 2: TypeScript Errors

**Symptom:** `colors.primary is not a property of BrandTokens`

**Solution:**
1. Make sure useBrand import is correct:
   ```typescript
   import { useBrand } from '@/hooks/useBrand'
   ```
2. Verify you're calling it from a client component
3. Check that BrandContext is exported correctly

### Issue 3: Tailwind Classes Don't Change

**Symptom:** `bg-gama-primary` doesn't change with brand

**Solution:**
1. Verify tailwind.config.ts maps to CSS vars:
   ```typescript
   'gama-primary': 'var(--color-primary)'
   ```
2. Check that CSS vars are set on `<html>` element
3. Run `npm run build` to rebuild Tailwind
4. Clear `.next` folder: `rm -rf .next && npm run dev`

### Issue 4: Component Props Stopped Working

**Symptom:** Component color prop no longer works

**Solution:**
- V2 uses context for colors (automatic)
- Remove any color props from parent
- Colors come from `useBrand()` inside component

**Before:**
```tsx
<Button color="primary" />
```

**After:**
```tsx
<Button />  {/* Color comes from useBrand() inside Button */}
```

---

## 📊 Migration Timeline

### Timeline A: Small Project (1-2 components)
- **Duration:** 2-4 hours
- **Steps:**
  1. Update layout.tsx (30 min)
  2. Find and replace colors (1 hour)
  3. Test all brands (1 hour)
  4. Deploy (30 min)

### Timeline B: Medium Project (5-10 components)
- **Duration:** 1-2 days
- **Steps:**
  1. Plan migration (1 hour)
  2. Update layout.tsx (30 min)
  3. Migrate components (4-6 hours)
  4. Test and verify (2-3 hours)
  5. Deploy (1 hour)

### Timeline C: Large Project (20+ components)
- **Duration:** 3-5 days
- **Steps:**
  1. Plan migration (2 hours)
  2. Update infrastructure (2 hours)
  3. Migrate components in batches (8-10 hours)
  4. Comprehensive testing (4-6 hours)
  5. Staging/production deploy (2 hours)

---

## 🎯 Success Criteria

### Technical Success
- ✅ All TypeScript errors resolved
- ✅ All tests passing
- ✅ Linter clean (npm run lint)
- ✅ Type checker clean (npm run typecheck)
- ✅ No console errors/warnings

### Functional Success
- ✅ All 4 brands display correctly
- ✅ Brand switching works in real-time
- ✅ Brand preference persists after refresh
- ✅ Responsive design works on all brands
- ✅ Mobile and desktop both work

### Quality Success
- ✅ Accessibility tests pass (WCAG AA)
- ✅ Performance tests pass (Lighthouse 90+)
- ✅ Cross-browser compatible
- ✅ No memory leaks
- ✅ QA sign-off obtained

---

## 📞 Support

### Getting Help

| Question | Answer |
|----------|--------|
| How do I use useBrand()? | See README-V2.md "Using Brands in Your Code" |
| Where are design tokens? | See brand-configs/{brand}/tokens.json |
| How do CSS vars work? | See ARCHITECTURE-V2.md "CSS Variables" |
| What about dark mode? | V2 is dark-first, supports light variants |
| Can I keep V1 colors? | Create a new brand with V1 tokens in brand-configs/ |

### Escalation

1. **Developer question:** Check README-V2.md, ARCHITECTURE-V2.md
2. **Technical issue:** Ask @dev or @architect
3. **Design question:** See BRAND-GUIDELINES.md
4. **Team guidance:** Ask @pm

---

## ✅ Post-Migration

### Deploy to Production
1. Merge PR to main
2. Deploy to production
3. Monitor for 24 hours
4. Celebrate! 🎉

### Update Documentation
- [ ] Team README updated
- [ ] Onboarding docs updated
- [ ] Component library docs updated
- [ ] Design guidelines shared

### Team Training
- [ ] Share this migration guide
- [ ] Show brand switching demo
- [ ] Explain useBrand() hook
- [ ] Answer team questions

---

## 📚 Full Documentation

| Document | When to Read |
|----------|-------------|
| README-V2.md | Before starting migration |
| ARCHITECTURE-V2.md | Understanding how V2 works |
| BRAND-GUIDELINES.md | For design consistency |
| BRAND-QUICK-REFERENCE.md | Quick brand reference |
| START-HERE-V2.md | Onboarding after migration |

---

## 🎉 You're Done!

After migration:
- ✅ Single codebase supports 4 brands
- ✅ Colors update dynamically
- ✅ Components are universal
- ✅ Brand switching works instantly
- ✅ Ready for future brands (unlimited)

---

**Status:** ✅ Migration Ready

**Estimated Time:** 2-4 hours
**Difficulty:** Low-Medium
**Impact:** High (90% less code duplication)

---

*Ready to migrate? Start with Step 1 (Update Layout) above.*

*Need help? See Support section or contact @dev.*

---

*GAMA Design System V2 — Migrate with confidence.*
