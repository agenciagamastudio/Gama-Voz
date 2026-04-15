# STORY-002-LAYOUT: Sidebar Flex Layout Integration

**Status:** Draft
**Story ID:** STORY-002-LAYOUT
**Epic:** EPIC-001 (Sidebar Integration)
**Complexity:** XS (1-2h)
**Sprint:** Gama Portal Phase 2
**Wave:** 1 (Parallel with STORY-001)

---

## 📋 Story Overview

**Title:** Sidebar Flex Layout Integration

**Description:** 
Integrate the sidebar into the main flex layout container so it appears as part of the natural page flow rather than a floating/fixed element. The main content area should expand to fill available space (flex-1) while the sidebar maintains its width.

**User Story:** 
As a **user navigating Gama Portal**, I want the **sidebar to be part of the main layout flow** so that **it appears integrated with the page content, not floating over it**.

---

## ✅ Acceptance Criteria

### Primary Criteria (Must Have)
- [ ] Sidebar part of flex container (not `position: fixed`)
- [ ] Main content area uses `flex-1` to fill available space
- [ ] No layout shift when scrolling
- [ ] Sidebar visible on desktop (md: and above)
- [ ] Sidebar collapses to mobile menu on mobile (below sm:)
- [ ] Layout is responsive (flex wraps correctly on smaller screens)

---

## 🎯 Definition of Done

- [x] Acceptance criteria met
- [x] RootLayout updated with flex structure
- [x] No layout shift on scroll
- [x] No regressions to existing pages
- [x] CodeRabbit PASS (no CRITICAL issues)
- [x] QA gate PASS (responsive + flex verified)
- [x] Story status: Ready for Review

---

## 🔧 Technical Details

### Layout Structure

**Current (WRONG):**
```
html
└── body
    ├── header
    ├── sidebar (position: fixed)
    └── main-content
```

**Target (CORRECT):**
```
html
└── body
    ├── header
    └── flex-container
        ├── sidebar (flex: 0 0 auto or min-w)
        └── main-content (flex: 1)
```

### Implementation Files
- **Primary:** `app/layout.tsx` (RootLayout component)
- **Secondary:** `app/components/Sidebar.tsx` (if needs updating)
- **CSS:** `app/globals.css` (flex utilities)

### Tailwind Classes
- Container: `flex min-h-screen`
- Sidebar: `flex-shrink-0 w-64` (or similar fixed width)
- Main: `flex-1 overflow-auto`
- Responsive: `hidden md:block` (sidebar) + mobile toggle

---

## 📝 Dev Agent Record

### Tasks & Subtasks

#### Task 2.1: Update RootLayout
- [ ] Change body to flex container (`flex min-h-screen`)
- [ ] Wrap sidebar + main-content in flex container
- [ ] Remove `position: fixed` from sidebar CSS
- [ ] Set sidebar `flex-shrink-0` or fixed width

#### Task 2.2: Test Desktop Layout
- [ ] Sidebar visible on desktop (≥768px)
- [ ] Main content fills remaining space
- [ ] No layout shift on scroll
- [ ] Flexbox renders correctly

#### Task 2.3: Test Mobile Layout
- [ ] Sidebar hidden on mobile (<768px)
- [ ] Mobile toggle button visible
- [ ] Toggle opens/closes sidebar overlay
- [ ] Main content full width on mobile

#### Task 2.4: Test Responsive Breakpoints
- [ ] sm (640px) — sidebar hidden
- [ ] md (768px) — sidebar visible
- [ ] lg (1024px) — sidebar visible
- [ ] xl (1280px) — sidebar visible

### File List
- `app/layout.tsx` — RootLayout component (MODIFY)
- `app/components/Sidebar.tsx` — Sidebar component (REVIEW, may modify)
- `app/globals.css` — Flex utilities (REVIEW)

### Change Log
- 2026-04-15: Story created in Draft status
- 2026-04-15: AC defined and layout structure planned

---

## 🧪 CodeRabbit Integration

**Mode:** light
**Severity Filter:** [CRITICAL, HIGH]
**Auto-Fix:** Enabled (max 2 iterations)
**Expected Focus:** Layout correctness, responsive design, flex container behavior

---

## 🎯 QA Gate Checklist

- [ ] Sidebar part of flex container (not fixed)
- [ ] Main content `flex-1` fills space
- [ ] No layout shift on scroll
- [ ] Responsive: sidebar hidden on mobile
- [ ] Responsive: sidebar visible on desktop
- [ ] No regressions to existing pages
- [ ] Layout valid HTML/CSS
- [ ] CodeRabbit PASS

---

## 📊 Scope

**IN Scope:**
- Change sidebar from fixed to flex layout
- Main content area expands to fill space
- Responsive sidebar visibility (hide mobile, show desktop)
- Mobile toggle button (if needed)
- Flex container structure

**OUT of Scope:**
- Sidebar styling (colors, spacing) — see STORY-003, STORY-004
- Scrollbar styling — see STORY-001
- Sidebar content changes
- Header layout changes

---

## 🔗 Dependencies

**Prerequisite Stories:** None
**Blocking Stories:** STORY-003, STORY-004, STORY-005 (all depend on this)
**Related Stories:** 
- STORY-001-SCROLLBAR (can proceed in parallel)
- STORY-003-FLOATING-EFFECTS (depends on this)
- STORY-004-SPACING (depends on this)
- STORY-005-RESPONSIVE (depends on this)

---

## 🚀 Handoff Notes

**To @dev (Dex):**
- This is layout foundation for Wave 1 — other stories depend on it
- Update `app/layout.tsx` to use flex container
- Remove `position: fixed` from sidebar
- Implement responsive hiding (md: breakpoint)
- Test on multiple breakpoints
- CodeRabbit will catch layout issues
- Don't style colors/spacing — that's separate stories

**Test Checklist:**
1. Desktop (≥768px) — sidebar visible, main content fills space
2. Mobile (<768px) — sidebar hidden or overlay
3. Scroll page — no layout shift
4. Resize browser — layout responsive at all breakpoints
5. Run CodeRabbit pre-commit review
6. Mark story complete when QA gate PASS

---

**Story Status:** Draft
**Created:** 2026-04-15
**Created by:** @sm (River)
