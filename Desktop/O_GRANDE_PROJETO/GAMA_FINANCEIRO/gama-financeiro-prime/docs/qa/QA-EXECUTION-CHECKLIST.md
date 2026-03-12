# QA Execution Checklist - Reports & Analysis Page
## GAMA Financeiro Prime - Sprint 1

**Agent:** @qa
**Status:** ⏳ READY TO EXECUTE (Awaiting Task 1-3 Completion)
**Date Created:** 2026-03-10

---

## Phase 0: Pre-Execution Setup

When Tasks 1-3 are marked COMPLETE, execute immediately:

### Step 0.1: Environment Check (2 minutes)
```bash
cd /c/Users/Usuario/Desktop/O_GRANDE_PROJETO/GAMA_FINANCEIRO/gama-financeiro-prime

# Verify node version
node --version
# Should be 18+ for React 19 compatibility

# Install dependencies (fresh)
npm install

# Verify all devDependencies installed
npm list
```

**✅ Check:** No errors in install
**✅ Check:** node_modules exists
**✅ Check:** package-lock.json present

---

## Phase 1: Static Analysis (15 minutes)

### Step 1.1: TypeScript Compilation
```bash
npm run typecheck
```

**✅ Check:** 0 TypeScript errors
**⚠️ If errors:**
- Document in QA report
- Severity: **CRITICAL** (block merge)
- Notify @dev immediately

**Recording:**
```
TypeScript Check: [ ] PASS [ ] FAIL
  Errors: _____
  Warnings: _____
```

### Step 1.2: Linting Check
```bash
npm run lint
```

**✅ Check:** 0 critical/major linting errors
**⚠️ If errors:**
- Check if auto-fixable: `npm run lint -- --fix`
- Document remaining issues
- Severity: **HIGH** (auto-fixable), **MEDIUM** (manual)

**Recording:**
```
Linting Check: [ ] PASS [ ] FAIL
  Errors: _____
  Warnings: _____
  Auto-fixed: _____
```

### Step 1.3: Build Check
```bash
npm run build
```

**✅ Check:** Build completes without errors
**✅ Check:** No warnings about unused code/deps
**⚠️ If errors:**
- Build fails = **CRITICAL**
- Warnings = **MEDIUM** (document as tech debt)

**Recording:**
```
Build Check: [ ] PASS [ ] FAIL
  Output: [copy relevant lines]
  Build time: _____s
```

### Step 1.4: Security Audit
```bash
npm audit
```

**✅ Check:** "0 vulnerabilities" or document known issues
**Severity Mapping:**
- Critical vulnerabilities = **CRITICAL** (block)
- High = **HIGH** (document)
- Medium/Low = **MEDIUM/LOW** (tech debt)

**Recording:**
```
Security Audit: [ ] PASS [ ] FAIL
  Critical: [ ] 0 [ ] Found: _____
  High: [ ] 0 [ ] Found: _____
  Medium: [ ] 0 [ ] Found: _____
  Low: [ ] 0 [ ] Found: _____
```

---

## Phase 2: Dev Server Startup (5 minutes)

### Step 2.1: Start Development Server
```bash
npm run dev

# Server should output:
# ▲ Next.js [version]
#   ✓ Ready in [time]
#   ✓ Compiled [file]
#
# ➜  Local:        http://localhost:3000
```

**✅ Check:** Server starts without errors
**✅ Check:** "Ready" status appears
**⚠️ If fails:**
- Severity: **CRITICAL**
- Check error message in terminal
- Notify @dev

**Recording:**
```
Dev Server: [ ] STARTED [ ] FAILED
  Time to ready: _____ms
  Port: 3000
  Error (if any): _____
```

### Step 2.2: Keep Server Running
```
Leave terminal running with: npm run dev
Open new terminal for next steps
```

---

## Phase 3: Browser Testing (60 minutes)

### Step 3.1: Page Load Test (5 minutes)

```
Open browser: http://localhost:3000/reports
```

**Visual Inspection:**
- [ ] Page renders without blank screen
- [ ] No flashing/flickering
- [ ] Layout stable after 2 seconds
- [ ] Sidebar visible and correct
- [ ] Main content area visible

**Console Check (F12 → Console):**
- [ ] No JavaScript errors (red X)
- [ ] No console.error() calls
- [ ] No 404 errors for resources
- [ ] No warnings about deprecation

**Recording:**
```
Page Load: [ ] PASS [ ] FAIL
  Load time: _____ms
  Console errors: [ ] 0 [ ] Found: _____
  Sidebar correct: [ ] YES [ ] NO
```

### Step 3.2: Tab Navigation Test (10 minutes)

**Test Tab 1: Relatórios**
```
1. Click "Relatórios" tab
2. Wait 300ms for transition
3. Verify:
   [ ] Tab highlights in #88CE11 (Gama Green)
   [ ] Content changes below tabs
   [ ] No console errors
   [ ] Previous tab is not highlighted
   [ ] Sidebar item "Relatórios & Análise" visible
```

**Test Tab 2: Caixa (Cash)**
```
1. Click "Caixa" tab
2. Verify:
   [ ] Tab becomes active
   [ ] Content changes
   [ ] Color #88CE11
   [ ] No errors
   [ ] Smooth transition
```

**Test Tab 3: Equipe (Team)**
```
1. Click "Equipe" tab
2. Verify same as above
   [ ] Tab active
   [ ] Content different
   [ ] Color correct
   [ ] Smooth transition
```

**Retest Tab Switch Back**
```
1. Click "Relatórios" again
2. Verify:
   [ ] Content returns to original
   [ ] No duplicate elements
   [ ] State clean (no residual data)
```

**Recording:**
```
Tab Navigation: [ ] PASS [ ] FAIL
  Relatórios tab: [ ] ACTIVE [ ] INACTIVE [ ] ERROR
  Caixa tab: [ ] ACTIVE [ ] INACTIVE [ ] ERROR
  Equipe tab: [ ] ACTIVE [ ] INACTIVE [ ] ERROR
  Tab color (#88CE11): [ ] CORRECT [ ] INCORRECT
  Transition smooth: [ ] YES [ ] NO
```

### Step 3.3: Design System Compliance (15 minutes)

**Color Check (DevTools Inspector → Computed Styles)**

Primary Buttons/Highlights:
```
1. Inspect active tab or primary button
2. Check background-color in Computed Styles
3. Verify: rgb(136, 206, 17) = #88CE11
```
- [ ] #88CE11 correct

Background Colors:
```
1. Inspect main container
2. Verify: rgb(10, 10, 10) = #0A0A0A or
           rgb(26, 26, 26) = #1A1A1A
```
- [ ] Dark backgrounds correct

Text Colors:
```
1. Inspect paragraph/span
2. Verify: rgb(255, 255, 255) = #FFFFFF (primary)
           rgb(161, 161, 170) = #A1A1AA (secondary)
```
- [ ] Text colors correct

Border Colors:
```
1. Inspect card borders
2. Verify: rgba(255, 255, 255, 0.1) ≈ white/10
```
- [ ] Border colors correct

**Typography Check**

Titles/Headlines:
```
1. Find page title or section heading
2. Check font-family: should be "Poppins"
3. Check font-weight: should be 700+ (bold)
4. Check font-size: should be 24px or larger
```
- [ ] Font: Poppins
- [ ] Weight: 700+
- [ ] Size: 24px+

Body Text:
```
1. Find paragraph text
2. Check font-family: "Poppins"
3. Check font-weight: 500 (medium)
4. Check font-size: 16px
```
- [ ] Font: Poppins
- [ ] Weight: 500
- [ ] Size: 16px

Code/Data:
```
1. Find any financial data or code blocks
2. Check font-family: "JetBrains Mono"
3. Check font-size: 14px
```
- [ ] Font: JetBrains Mono (if used)
- [ ] Size: 14px

**Spacing Check**

Padding (Card/Component):
```
1. Inspect card padding (DevTools → Box Model)
2. Verify padding values are multiples of 4px:
   Valid: 4px, 8px, 12px, 16px, 24px, 32px, 48px
```
- [ ] Padding: 4px multiples
- [ ] Gap between elements: 4px multiples

Margin:
```
1. Check margins are also 4px multiples
```
- [ ] Margins: 4px multiples

Border Radius:
```
1. Check border-radius values:
   Valid: 8px (buttons), 12px (cards), 16px (large cards)
```
- [ ] Border radius: 8px, 12px, or 16px

**Recording:**
```
Design System: [ ] PASS [ ] FAIL
  Colors:
    [ ] Primary #88CE11 correct
    [ ] Dark background #0A0A0A/#1A1A1A correct
    [ ] Text #FFFFFF/#A1A1AA correct
    [ ] Borders white/10 correct
  Typography:
    [ ] Titles: Poppins 700+
    [ ] Body: Poppins 500, 16px
    [ ] Code: JetBrains Mono (if applicable)
  Spacing:
    [ ] Padding: 4px multiples
    [ ] Gaps: 4px multiples
    [ ] Border radius: 8/12/16px
```

### Step 3.4: Responsive Design Test (15 minutes)

**Test Mobile 375px**
```
1. Open Chrome DevTools (F12)
2. Click "Toggle device toolbar" (Ctrl+Shift+M)
3. Set to iPhone 12 (375x812) or custom 375x667
4. Reload page (Ctrl+R)
5. Verify:
   [ ] Layout stacks vertically
   [ ] Tabs stack or scroll horizontally
   [ ] Text is readable (no overflow)
   [ ] No horizontal scrollbar
   [ ] Images scaled down
   [ ] Touch targets ≥ 44px

   Tab area:
   [ ] Can see and click each tab
   [ ] Active tab highlighted
   [ ] No tabs cut off

   Content:
   [ ] Full width utilized
   [ ] Padding appropriate (not too much/little)
   [ ] Cards stack nicely
```

**Test Tablet 768px**
```
1. Toggle device toolbar: iPad (768x1024)
2. Reload page
3. Verify:
   [ ] Two-column layout works (if applicable)
   [ ] Tabs visible horizontally
   [ ] Content well-spaced
   [ ] Images larger
   [ ] Professional appearance

   Layout:
   [ ] Content not stretched
   [ ] Sidebar visible or accessible
   [ ] Good whitespace balance
```

**Test Desktop 1920px**
```
1. Set custom viewport: 1920x1080
2. Reload page
3. Verify:
   [ ] Full width optimized
   [ ] Multi-column layout working
   [ ] Sidebar + main content balanced
   [ ] No single line overly wide (< 100 chars)
   [ ] Professional full-screen appearance

   Content:
   [ ] Maximum width reasonable
   [ ] Not stretched too thin
   [ ] Good use of space
```

**Recording:**
```
Responsive Design: [ ] PASS [ ] FAIL
  375px (Mobile):
    [ ] Single column
    [ ] Text readable
    [ ] No horizontal scroll
  768px (Tablet):
    [ ] Proper spacing
    [ ] Two-column possible
  1920px (Desktop):
    [ ] Full width optimized
    [ ] Multi-column works
```

### Step 3.5: Interaction & Functionality (10 minutes)

**Hover States**
```
1. Hover over buttons
   [ ] Color changes (brightness increase)
   [ ] Cursor changes to pointer
   [ ] Transition smooth (no jump)

2. Hover over tab not active
   [ ] Background color changes
   [ ] Cursor changes to pointer
   [ ] Smooth transition

3. Hover over card (if applicable)
   [ ] Border color changes (to white/20)
   [ ] Shadow increases
   [ ] Smooth transition
```

**Click/Interaction**
```
1. Click buttons
   [ ] Handler fires (observable change)
   [ ] No lag or freeze
   [ ] No errors in console

2. Click tabs
   [ ] Content changes immediately
   [ ] Active state updates
   [ ] Smooth transition
   [ ] No layout shift (CLS)

3. Scroll content
   [ ] Smooth scrolling
   [ ] No jank (60fps)
   [ ] Scrollbar visible/hidden as expected
```

**Data Display** (if applicable)
```
1. Check if tables/data displayed
   [ ] Headers visible
   [ ] Rows render
   [ ] Numbers format correctly
   [ ] No overlapping text
   [ ] Columns align

2. Check if charts displayed (Recharts)
   [ ] Chart renders
   [ ] Labels visible
   [ ] Legend present
   [ ] Responsive
   [ ] No console errors
```

**Recording:**
```
Interactions: [ ] PASS [ ] FAIL
  Hover states:
    [ ] Buttons change
    [ ] Tabs highlight
    [ ] Smooth transitions
  Click handlers:
    [ ] Tab switch works
    [ ] Content updates
    [ ] No errors
  Data display:
    [ ] Tables render correctly
    [ ] Charts visible
    [ ] Numbers format properly
```

### Step 3.6: Performance Testing (10 minutes)

**Lighthouse Audit**
```
1. Open Chrome DevTools (F12)
2. Click "Lighthouse" tab
3. Select "Mobile" (or Desktop)
4. Click "Analyze page load"
5. Wait for report (30-60 seconds)
6. Record scores:
```

**Target Scores:**
- [ ] Performance: > 80
- [ ] Accessibility: > 90
- [ ] Best Practices: > 90
- [ ] SEO: > 90

**Core Web Vitals Section:**
- [ ] FCP (First Contentful Paint): < 1.5s
- [ ] LCP (Largest Contentful Paint): < 2.5s
- [ ] CLS (Cumulative Layout Shift): < 0.1

**If scores low:**
```
Document issues from "Opportunities" section:
  [ ] Unused JavaScript
  [ ] Minify CSS/JS
  [ ] Defer offscreen images
  [ ] Modern image formats
  [ ] etc.

Severity:
  Lighthouse > 80 = PASS
  Lighthouse 70-80 = MEDIUM concern
  Lighthouse < 70 = HIGH concern
```

**Runtime Performance Check**
```
1. DevTools → Performance tab
2. Click record (red dot)
3. Click a tab
4. Click stop
5. Analyze flame chart:
   [ ] Long tasks < 50ms
   [ ] No red blocks
   [ ] Smooth profile
   [ ] Main thread responsive
```

**Memory Check** (optional)
```
1. DevTools → Memory tab
2. Take heap snapshot
3. Look for detached DOM nodes
4. Check for memory leaks
```

**Recording:**
```
Performance: [ ] PASS [ ] FAIL
  Lighthouse Scores:
    [ ] Performance: _____
    [ ] Accessibility: _____
    [ ] Best Practices: _____
    [ ] SEO: _____
  Core Web Vitals:
    [ ] FCP: _____ ms (target < 1500ms)
    [ ] LCP: _____ ms (target < 2500ms)
    [ ] CLS: _____ (target < 0.1)
  Runtime:
    [ ] Smooth 60fps
    [ ] No long tasks
    [ ] Memory stable
```

### Step 3.7: Accessibility Check (5 minutes)

**Keyboard Navigation**
```
1. Refresh page
2. Press Tab key repeatedly
3. Verify:
   [ ] Focus visible (outline/highlight around element)
   [ ] Focus order logical (left→right, top→bottom)
   [ ] Tab highlights each button/link
   [ ] No keyboard traps (can always Tab out)
   [ ] Shift+Tab goes backwards

4. On buttons/tabs:
   [ ] Press Enter to activate
   [ ] Press Space to activate
   [ ] Both work correctly

5. Check focus styles:
   [ ] Blue ring or clear highlight
   [ ] High contrast
   [ ] Not hard to see
```

**Screen Reader (Optional)**
```
If using NVDA, JAWS, or Narrator:
1. Enable screen reader
2. Tab through page
3. Verify:
   [ ] Button text read aloud
   [ ] Tab labels announced
   [ ] Headings recognized
   [ ] Form labels associated
```

**Color Contrast (axe DevTools or manual)**
```
1. Install axe DevTools extension (if not installed)
2. Click axe icon → Scan page
3. Check for violations:
   [ ] No color contrast failures
   [ ] All text > 4.5:1 contrast
   [ ] Large text > 3:1 contrast

Manual check:
- #FFFFFF on #0A0A0A = ✅ Pass
- #88CE11 on #0A0A0A = ✅ Pass (test both directions)
```

**Recording:**
```
Accessibility: [ ] PASS [ ] FAIL
  Keyboard Navigation:
    [ ] Tab order logical
    [ ] Focus visible
    [ ] No traps
    [ ] Enter/Space work
  Screen Reader:
    [ ] Text announced correctly
    [ ] Headings recognized
    [ ] Labels associated
  Color Contrast:
    [ ] All text ≥ 4.5:1
    [ ] No axe violations
```

---

## Phase 4: Acceptance Criteria Verification (10 minutes)

### AC Check 1: Page Load
- [ ] Page /reports loads
- [ ] No JavaScript errors
- [ ] No broken resources

### AC Check 2: Tab Navigation
- [ ] Tabs visible (Relatórios | Caixa | Equipe)
- [ ] Clicking tab changes content
- [ ] Active tab highlighted (#88CE11)
- [ ] Transitions smooth

### AC Check 3: Sidebar
- [ ] "Relatórios & Análise" visible in Sidebar
- [ ] Highlighted as current page
- [ ] Style matches design system

### AC Check 4: Design System
- [ ] Colors: #88CE11, #0A0A0A, #1A1A1A, #FFFFFF, #A1A1AA
- [ ] Typography: Poppins (bold titles), Poppins (body), JetBrains Mono (code)
- [ ] Spacing: 4px multiples
- [ ] Border radius: 8px, 12px, 16px

### AC Check 5: Responsive
- [ ] Mobile 375px: single column, text readable
- [ ] Tablet 768px: two-column possible
- [ ] Desktop 1920px: full width optimized

**Recording:**
```
Acceptance Criteria: [ ] ALL PASS [ ] SOME FAIL

  AC 1 (Page Load): [ ] PASS [ ] FAIL
    Issues: _____

  AC 2 (Tab Nav): [ ] PASS [ ] FAIL
    Issues: _____

  AC 3 (Sidebar): [ ] PASS [ ] FAIL
    Issues: _____

  AC 4 (Design): [ ] PASS [ ] FAIL
    Issues: _____

  AC 5 (Responsive): [ ] PASS [ ] FAIL
    Issues: _____
```

---

## Phase 5: Issue Compilation (10 minutes)

### Categorize All Found Issues

**CRITICAL** (must fix):
- [ ] Page doesn't load
- [ ] TypeScript errors
- [ ] 2+ AC not met
- [ ] Security vulnerability
- [ ] Memory leak

**HIGH** (should fix):
- [ ] Major feature broken
- [ ] 1 AC not met
- [ ] Design system deviation > 20%
- [ ] Performance issue

**MEDIUM** (document as debt):
- [ ] Minor design deviation
- [ ] Accessibility concern
- [ ] Code smell
- [ ] Documentation incomplete

**LOW** (nice to have):
- [ ] Typo
- [ ] Style preference
- [ ] Future enhancement

### Document Each Issue

For every issue found:
```
Issue #N:
  Category: [Code | Design | Performance | Security | A11y]
  Severity: [CRITICAL | HIGH | MEDIUM | LOW]
  Component: [name]
  Description: [what's wrong]
  Steps to Reproduce: [how to see it]
  Expected: [what should happen]
  Actual: [what actually happens]
  Evidence: [screenshot/link]
  Recommendation: [how to fix]
```

---

## Phase 6: Report Generation (30 minutes)

Create file: `docs/qa/QA-REPORT-SPRINT1.md`

**Template:**
```markdown
# QA Gate Report - Reports & Analysis Page
**Date:** [today]
**Tested By:** @qa
**Feature:** Relatórios & Análise Page

## Executive Summary
[1 paragraph on overall quality]

## Gate Decision: [PASS | CONCERNS | FAIL | WAIVED]

## Checks Summary
| Check | Result | Notes |
|-------|--------|-------|
| Code Review | PASS/FAIL | [notes] |
| Unit Tests | N/A | [notes] |
| AC Met | PASS/FAIL | [notes] |
| No Regression | PASS | [notes] |
| Performance | PASS/FAIL | [notes] |
| Security | PASS | [notes] |
| Documentation | PASS/FAIL | [notes] |

## Acceptance Criteria
- [x] Page load
- [x] Tab navigation
- [x] Sidebar
- [x] Design system
- [x] Responsive

## Issues Found
### CRITICAL (0)
[list or none]

### HIGH (N)
[list]

### MEDIUM (N)
[list]

### LOW (N)
[list]

## Performance Metrics
- Lighthouse: ____
- FCP: ____ms
- LCP: ____ms
- CLS: ____

## Recommendations
1. [if issues found]
2. [improvement opportunities]

## Sign-Off
**Verdict:** [PASS | CONCERNS | FAIL | WAIVED]
**Approved By:** @qa
**Date:** [date]
**Next Step:** [Proceed to @devops | Return to @dev | Escalate]
```

---

## Phase 7: Sign-Off Decision

### Pass Criteria (VERDICT = PASS)
```
✅ All 7 checks PASS
✅ 0 CRITICAL issues
✅ 0-1 HIGH issues (and documented)
✅ All AC met
✅ Lighthouse ≥ 80
✅ No security vulnerabilities
```
**Action:** Approve, proceed to @devops

### Concerns Criteria (VERDICT = CONCERNS)
```
✅ 4-6 checks PASS
⚠️ 1-2 HIGH issues (but fixable)
⚠️ MEDIUM issues documented
✅ All critical AC met
✅ Lighthouse 70-80
✅ No critical security issues
```
**Action:** Approve with observations, document as tech debt

### Fail Criteria (VERDICT = FAIL)
```
❌ 2+ checks FAIL
❌ 2+ CRITICAL issues
❌ 2+ HIGH issues
❌ 2+ AC not met
❌ Lighthouse < 70
❌ Security vulnerability
```
**Action:** Return to @dev with specific feedback

---

## Final Checklist

Before submitting report:

- [ ] Created QA-REPORT-SPRINT1.md
- [ ] All issues documented
- [ ] Severity assigned to each
- [ ] Evidence collected (screenshots if possible)
- [ ] Verdict decided
- [ ] Sign-off completed
- [ ] Next step documented
- [ ] Report saved to `/docs/qa/`

---

## Upon Completion

1. **If PASS or CONCERNS:**
   - Notify @devops: "QA PASS - ready for push"
   - Include link to report
   - Provide list of MEDIUM issues for tech debt tracker

2. **If FAIL:**
   - Notify @dev with specific feedback
   - Include severity and reproduction steps
   - Provide recommendations
   - Schedule re-review after fixes

3. **Document in Story:**
   - Update story file with QA verdict
   - Link to QA-REPORT-SPRINT1.md
   - Log in Change Log section

---

**Checklist Complete**
Ready to execute upon Task 1-3 completion.

Estimated total QA time: **2-3 hours**

Agent: @qa
Status: ✅ READY
