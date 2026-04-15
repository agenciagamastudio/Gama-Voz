# EPIC-SIDEBAR-REFACTOR: Fix Sidebar Fixed Positioning — Critical Layout Issue

**Epic ID:** EPIC-SIDEBAR-REFACTOR
**PRD:** `docs/prd-sidebar-layout-fix.md`
**Priority:** CRITICAL (blocking homepage)
**Status:** Ready for Execution
**Timeline:** 2-3 days
**Sprint:** Gama Portal Phase 2 (Pre-Phase)

---

## 📋 Epic Overview

**Problem:** Sidebar uses `position: fixed`, causing layout shift and pushing content down. Not integrated with main flex layout.

**Solution:** Refactor sidebar from fixed positioning to flex layout integration. Sidebar becomes part of natural page flow.

**Success Metric:** Sidebar appears as part of page layout, not floating. Content flows naturally.

---

## 🎯 Epic Objectives

✅ Remove `position: fixed` from sidebar CSS
✅ Integrate sidebar into main flex container (RootLayout)
✅ Main content flows below header naturally
✅ No layout shift when page loads
✅ Responsive: sidebar visible desktop, hidden mobile
✅ Homepage and doc pages render correctly

---

## 📊 Stories (3 Total)

### Story 1: Refactor RootLayout to Flex Container

**Story ID:** STORY-SIDEBAR-LAYOUT
**Complexity:** M (2-3h)
**Status:** Ready to Create
**Type:** Layout Refactoring

**Acceptance Criteria:**
- [ ] RootLayout uses flex container structure
- [ ] Sidebar removed from fixed positioning
- [ ] Main content area uses flex-1
- [ ] No layout shift on page load
- [ ] Desktop (md:) shows sidebar visible
- [ ] Mobile (<sm:) shows sidebar hidden or overlay

---

### Story 2: Test Homepage with Fixed Sidebar

**Story ID:** STORY-HOMEPAGE-LAYOUT-TEST
**Complexity:** S (1h)
**Status:** Ready to Create
**Type:** Testing/Validation

**Acceptance Criteria:**
- [ ] Homepage renders without layout shift
- [ ] Sidebar and main content both visible on desktop
- [ ] Main content flows naturally below header
- [ ] No content displacement
- [ ] Responsive at all breakpoints
- [ ] No console errors

---

### Story 3: Test Documentation Pages with Fixed Sidebar

**Story ID:** STORY-DOCS-LAYOUT-TEST
**Complexity:** S (1h)
**Status:** Ready to Create
**Type:** Testing/Validation

**Acceptance Criteria:**
- [ ] All /docs/* pages render correctly
- [ ] Sidebar visible on desktop
- [ ] Content flows naturally
- [ ] No layout shift
- [ ] Responsive design working
- [ ] No regressions

---

## 🚀 Execution Plan

### Phase 1: Implementation (2-3h)
1. Create STORY-SIDEBAR-LAYOUT
2. @dev implements flex layout refactoring
3. @qa validates layout changes

### Phase 2: Testing (2h)
1. Create STORY-HOMEPAGE-LAYOUT-TEST
2. Validate homepage rendering
3. Verify responsive behavior

### Phase 3: Documentation Testing (1h)
1. Create STORY-DOCS-LAYOUT-TEST
2. Validate all doc pages
3. Final QA gate

---

## Quality Gates

- **CodeRabbit:** CRITICAL/HIGH issues fixed, zero blocker issues
- **QA Gate:** All 7 checks PASS
- **Responsive Testing:** Desktop, tablet, mobile all verified
- **Regression Testing:** No broken pages

---

## Critical Note

**This epic MUST be completed before:**
- EPIC-001 (Sidebar Integration styling)
- EPIC-002 (Homepage Redesign)
- Any styling changes to sidebar

**Reason:** Layout structure is the foundation. Styling depends on layout being correct first.

---

## Dependencies

**Blocks:**
- EPIC-001: Sidebar Integration (styling)
- EPIC-002: Homepage Redesign
- All doc pages that depend on sidebar

**Blocked By:**
- None

---

**Status:** Ready for Story Creation
**Next:** Delegate to @sm for story creation
