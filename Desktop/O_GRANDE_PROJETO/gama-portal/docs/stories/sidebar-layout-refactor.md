# STORY-SIDEBAR-LAYOUT: Refactor RootLayout to Flex Container

**Status:** Ready
**Story ID:** STORY-SIDEBAR-LAYOUT
**Epic:** EPIC-SIDEBAR-REFACTOR (Critical)
**Complexity:** M (2-3h)
**Sprint:** Gama Portal Phase 2 (Pre-Phase)

---

## 📋 Story Overview

**Title:** Refactor RootLayout to Flex Container — Remove Fixed Sidebar Positioning

**Description:** 
Currently, the sidebar uses `position: fixed`, causing layout shift and pushing all main content down. This story refactors the RootLayout to use a flex container, integrating the sidebar as part of the natural page flow.

**User Story:**
As a **user visiting Gama Portal**, I want the **sidebar to be part of the page layout** so that **content flows naturally and the layout doesn't shift when the page loads**.

---

## ✅ Acceptance Criteria

- [ ] RootLayout uses flex container (display: flex)
- [ ] Sidebar removed from `position: fixed`
- [ ] Main content area uses `flex-1` to fill space
- [ ] No layout shift on page load
- [ ] Desktop (md:) shows sidebar visible on left
- [ ] Mobile (<sm:) hides sidebar or shows as overlay
- [ ] All existing pages render without regression
- [ ] Responsive at all breakpoints (sm, md, lg, xl)

---

## 🔧 Technical Details

**Files to Modify:**
- `app/layout.tsx` (RootLayout component)
- `app/globals.css` (if needed for flex utilities)

**Current Structure (WRONG):**
```
body
├── header
├── sidebar (position: fixed)
└── main
```

**Target Structure (CORRECT):**
```
body
├── header
└── flex-container
    ├── sidebar (flex-shrink-0)
    └── main (flex-1)
```

---

## 📝 Dev Agent Record

### Tasks
- [ ] Update RootLayout to flex container
- [ ] Remove position: fixed from sidebar
- [ ] Set sidebar flex-shrink-0
- [ ] Set main content flex-1
- [ ] Test desktop layout
- [ ] Test mobile layout
- [ ] Verify no regressions

### File List
- `app/layout.tsx` (MODIFY)
- `app/globals.css` (REVIEW)

### Change Log
- 2026-04-15: Story created (critical layout fix)

---

## 🧪 CodeRabbit Integration

**Mode:** light | **Severity:** [CRITICAL, HIGH] | **Auto-Fix:** enabled

---

## 🎯 QA Gate Checklist

- [ ] RootLayout properly uses flex
- [ ] Sidebar not using position: fixed
- [ ] Layout shift doesn't occur
- [ ] Responsive at all breakpoints
- [ ] No regressions
- [ ] CodeRabbit PASS

---

## 📊 Scope

**IN:** Flex layout refactoring, remove fixed positioning, responsive behavior
**OUT:** Styling/colors (handle in EPIC-001), scrollbar (handle in STORY-001)

---

**Status:** Ready → Ready for Validation
**Created:** 2026-04-15
