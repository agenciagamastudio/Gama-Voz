# A11y Fixes Checklist — Phase 6 Remediation

**Status:** 🔴 AWAITING @dev IMPLEMENTATION
**Audit Date:** 2026-03-13
**Due:** Within 48 hours (BLOCKER)

---

## Fix Checklist

### FIX #1: Escape Key Handler — HIGH ⚠️
- [ ] **Open:** DrawerNav.tsx
- [ ] **Find:** Line 139-162 (handleKeyDown function)
- [ ] **Add:** Escape handler BEFORE Tab handler
- [ ] **Test:** Open drawer → Press Escape → Drawer closes ✓
- [ ] **Test:** Focus management still works (Tab/Shift+Tab)
- [ ] **Test:** No keyboard errors in console
- **Estimated Time:** 5 minutes
- **Code Reference:** See A11Y_AUDIT_REPORT_PHASE6.md "Fix #1"

---

### FIX #2: aria-expanded on Hamburger — MEDIUM ⚠️
- [ ] **Open:** SideNav.tsx
- [ ] **Find:** Line 136-142 (hamburger button)
- [ ] **Add:** `aria-expanded={isDrawerOpen}`
- [ ] **Import/Pass:** Need access to `isDrawerOpen` state (via context)
- [ ] **Test:** Screen reader announces "button closed" / "button open"
- [ ] **Test:** State changes trigger announcement
- [ ] **Test:** No type errors
- **Estimated Time:** 2 minutes
- **Code Reference:** See A11Y_AUDIT_REPORT_PHASE6.md "Fix #2"
- **Note:** Must check if `isDrawerOpen` is available in SideNav component

---

### FIX #3: aria-expanded on Nav Groups — MEDIUM ⚠️
- [ ] **Open:** DrawerNav.tsx
- [ ] **Find:** NavGroup component, line 82-91 (button)
- [ ] **Add:** `aria-expanded={isOpen}`
- [ ] **Test:** Screen reader announces "button collapsed" / "button expanded"
- [ ] **Test:** Chevron rotation matches announcement
- [ ] **Test:** No type errors
- **Estimated Time:** 5 minutes
- **Code Reference:** See A11Y_AUDIT_REPORT_PHASE6.md "Fix #3"

---

### FIX #4: Reference Links Semantics — HIGH ⚠️
- [ ] **Open:** DrawerNav.tsx
- [ ] **Find:** Lines 236-248 (Reference Section)
- [ ] **Choose Option:**
  - [ ] **Option A:** Add real href paths (if endpoints exist)
  - [ ] **Option B:** Convert `<a>` to `<button>` with onClick handlers
  - [ ] **Option C:** Use `<a href="..." target="_blank">`
- [ ] **Test:** Links navigate OR buttons fire handlers
- [ ] **Test:** Accessible name still present (text content visible)
- [ ] **Test:** No broken links (404 errors)
- **Estimated Time:** 10 minutes
- **Code Reference:** See A11Y_AUDIT_REPORT_PHASE6.md "Fix #4"
- **Decision:** Confirm with @pm which approach aligns with product intent

---

### FIX #5: Hamburger Touch Target Size — LOW (OPTIONAL) ⚠️
- [ ] **Open:** SideNav.tsx
- [ ] **Find:** Line 138 (hamburger button className)
- [ ] **Change:** `w-10 h-10` → `w-11 h-11`
- [ ] **Test:** Button appears larger on mobile
- [ ] **Test:** Touch target is now 44×44px minimum
- **Estimated Time:** 1 minute
- **Code Reference:** See A11Y_AUDIT_REPORT_PHASE6.md "Fix #5"
- **Note:** Optional but recommended for consistency

---

### FIX #6: prefers-reduced-motion Support — MEDIUM ⚠️
- [ ] **Open:** globals.css (or tailwind.config.ts)
- [ ] **Add:** Media query for prefers-reduced-motion
- [ ] **Test:** DevTools → Rendering → Emulate CSS media feature prefers-reduced-motion: reduce
- [ ] **Test:** Drawer opens/closes INSTANTLY (no animation)
- [ ] **Test:** Other transitions respect preference
- **Estimated Time:** 10 minutes
- **Code Reference:** See A11Y_AUDIT_REPORT_PHASE6.md "Fix #6"
- **Option:** Use Tailwind `motion-safe:` utilities if preferred

---

## Verification Checklist (Before Re-Audit)

### Code Changes
- [ ] All 6 fixes implemented
- [ ] No TypeScript errors (`npm run typecheck`)
- [ ] No ESLint warnings (`npm run lint`)
- [ ] No console errors (browser DevTools)
- [ ] Files saved and formatted

### Manual Testing
- [ ] **Keyboard:**
  - [ ] Tab navigation cycles correctly
  - [ ] Shift+Tab reverses cycle
  - [ ] Escape closes drawer (FIX #1)
  - [ ] Focus visible on all interactive elements

- [ ] **Screen Reader (NVDA/JAWS on Windows, VoiceOver on Mac):**
  - [ ] Drawer announced as "navigation landmark"
  - [ ] Close button announced with label
  - [ ] Hamburger announces state (open/closed) — FIX #2
  - [ ] Nav groups announce state (expanded/collapsed) — FIX #3
  - [ ] Reference section links are navigable — FIX #4

- [ ] **Touch:**
  - [ ] Hamburger button easily tappable (44×44 or close) — FIX #5
  - [ ] Drawer swipe gesture works
  - [ ] Close button easily tappable

- [ ] **Motion:**
  - [ ] Enable "Reduce motion" in OS settings
  - [ ] Drawer opens/closes INSTANTLY (no animation) — FIX #6
  - [ ] Other animations respect preference

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## Re-Audit Process

After implementing all fixes:

1. **Commit Changes**
   ```bash
   git add src/components/platform/DrawerNav.tsx
   git add src/components/platform/SideNav.tsx
   git add src/app/globals.css
   git commit -m "a11y: fix WCAG AA issues #1-6 [GAMA-A11Y-PHASE6]"
   ```

2. **Submit for Re-Audit**
   - Tag @a11y-eng for re-review
   - Mention fixes applied
   - Provide testing evidence (screenshot/video if helpful)

3. **Quick Re-Audit** (15 minutes)
   - @a11y-eng verifies each fix
   - Runs same WCAG AA checklist
   - Issues updated issue report

4. **Gate Decision**
   - ✅ PASS → Proceed to Phase 7 (Performance)
   - ❌ FAIL → Document issues, iterate

---

## Fixing Tips

- **Escape Handler:** Use existing keydown listener, don't create new one
- **aria-expanded:** Must reflect current state; update on state change
- **Reference Links:** Check product spec for intended behavior first
- **Touch Size:** Use Tailwind classes (w-11 = 44px in default config)
- **Reduced Motion:** Works with both CSS media queries AND Tailwind utilities

---

## Questions? Document Here

```
[ ] Question 1: Are reference links supposed to download or navigate?
    Answer: ______________________________

[ ] Question 2: Is isDrawerOpen available in SideNav context?
    Answer: ______________________________

[ ] Question 3: Should hamburger size change break responsive design?
    Answer: ______________________________
```

---

## Sign-Off

**Developer:** _____________________ **Date:** _______

**Reviewed By:** @a11y-eng (Sara) **Date:** _______

---

*Phase 6 Remediation Checklist — GAMA Design System*
*All fixes MUST be complete before proceeding to Phase 7*
