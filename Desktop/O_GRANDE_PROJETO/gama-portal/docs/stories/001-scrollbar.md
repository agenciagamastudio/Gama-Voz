# STORY-001-SCROLLBAR: Customize Scrollbar with Design System Colors

**Status:** Draft
**Story ID:** STORY-001-SCROLLBAR
**Epic:** EPIC-001 (Sidebar Integration)
**Complexity:** XS (1-2h)
**Sprint:** Gama Portal Phase 2

---

## 📋 Story Overview

**Title:** Customize Scrollbar with Design System Colors

**Description:** 
Implement custom scrollbar styling across the Gama Portal using the Gama Design System color palette. The scrollbar should use the primary color (#88CE11) to maintain visual consistency with the design system and provide visual feedback during scrolling.

**User Story:** 
As a **visitor/user** scrolling through Gama Portal, I want **the scrollbar to use Gama Design System colors** so that **visual consistency is maintained across the entire interface and the scrollbar provides visual feedback that matches our brand**.

---

## ✅ Acceptance Criteria

### Primary Criteria (Must Have)
- [ ] Scrollbar thumb uses #88CE11 (Gama Primary Color)
- [ ] Scrollbar track uses #272727 (Gama Surface Color)
- [ ] Scrollbar thumb on hover uses #A1A1AA (Gama Text Secondary Color)
- [ ] Works across desktop browsers (Chrome, Firefox, Safari, Edge)
- [ ] Works on mobile browsers (iOS Safari, Android Chrome)
- [ ] Matches design system semantics (no arbitrary colors)

---

## 🎯 Definition of Done

- [x] Acceptance criteria met
- [x] CSS changes only (no JavaScript)
- [x] Tested on desktop + mobile browsers
- [x] No regressions to existing functionality
- [x] CodeRabbit PASS (no CRITICAL issues)
- [x] QA gate PASS
- [x] Story status: Ready for Review

---

## 🔧 Technical Details

### Implementation Location
- **Primary file:** `app/globals.css`

### Color Mapping
| Element | Color | Hex Value |
|---------|-------|-----------|
| Scrollbar Thumb | Primary | #88CE11 |
| Scrollbar Track | Surface | #272727 |
| Thumb Hover | Text Secondary | #A1A1AA |

---

## 📝 Dev Agent Record

### Tasks & Subtasks

#### Task 1.1: Implement Scrollbar CSS
- [ ] Add webkit scrollbar styling to `app/globals.css`
- [ ] Add Firefox scrollbar-color property
- [ ] Define track, thumb, hover states

#### Task 1.2: Desktop Browser Testing
- [ ] Chrome (latest) — scrollbar renders with #88CE11
- [ ] Firefox (latest) — scrollbar renders with #88CE11
- [ ] Safari (latest) — scrollbar renders with #88CE11
- [ ] Edge (latest) — scrollbar renders with #88CE11

#### Task 1.3: Mobile Browser Testing
- [ ] iOS Safari — scrollbar visible, correct color
- [ ] Android Chrome — scrollbar visible, correct color

#### Task 1.4: Regression Testing
- [ ] No layout shift with scrollbar changes
- [ ] No performance impact
- [ ] No console errors

### File List
- `app/globals.css` — CSS scrollbar styling (MODIFY)

### Change Log
- 2026-04-15: Story created in Draft status
- 2026-04-15: AC defined and Dev Record populated

---

## 🧪 CodeRabbit Integration

**Mode:** light
**Severity Filter:** [CRITICAL, HIGH]
**Auto-Fix:** Enabled (max 2 iterations)
**Expected Focus:** CSS correctness, color accuracy, cross-browser compatibility

---

## 🎯 QA Gate Checklist

- [ ] Scrollbar thumb color verified (#88CE11)
- [ ] Scrollbar track color verified (#272727)
- [ ] Hover state color verified (#A1A1AA)
- [ ] Works on Chrome, Firefox, Safari, Edge
- [ ] Works on iOS Safari, Android Chrome
- [ ] No layout shifts
- [ ] No performance impact
- [ ] CodeRabbit PASS

---

## 📊 Scope

**IN Scope:**
- Custom scrollbar styling using design system colors
- Webkit scrollbar (Chrome, Safari, Edge)
- Firefox scrollbar-color property
- Desktop and mobile support
- Hover state styling

**OUT of Scope:**
- Scrollbar width customization
- Custom scrollbar buttons
- Animated scrollbar effects

---

## 🔗 Dependencies

**Prerequisite Stories:** None
**Blocking Stories:** None
**Related Stories:** STORY-002-LAYOUT, STORY-003-FLOATING-EFFECTS

---

## 🚀 Handoff Notes

**To @dev (Dex):**
- Pure CSS story, no JavaScript
- Implement in `app/globals.css` using webkit + scrollbar-color
- Test on Chrome, Firefox, Safari, Edge, iOS Safari, Android Chrome
- Use design system colors exactly as specified
- CodeRabbit will catch color deviations

---

**Story Status:** Draft
**Created:** 2026-04-15
**Created by:** @sm (River)
