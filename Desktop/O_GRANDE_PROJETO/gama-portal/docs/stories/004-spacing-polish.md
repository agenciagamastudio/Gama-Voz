# STORY-004: Refine Spacing & Padding (Natural Breathing)

**Epic:** EPIC-001-SIDEBAR-INTEGRATION
**Story ID:** STORY-004-SPACING
**Complexity:** S (1-2h)
**Priority:** HIGH
**Status:** Draft
**Blocked By:** STORY-002, STORY-003 (previous stories)

---

## 📋 Summary

Refine internal padding and spacing in sidebar to create natural "breathing room" around elements, following Gama Design System spacing scale (multiples of 4px).

---

## ✅ Acceptance Criteria

### Criterion 1: Sidebar Padding
```gherkin
Given the CatalogSidebar internal spacing
When the sidebar is expanded (w-72)
Then padding should be:
  - Horizontal: px-3 (12px on each side) ✅
  - Vertical: py-4 (16px top/bottom) ✅
  - NOT px-4 or px-8 (too wide)
  - NOT py-2 or py-6 (too tight or wide)
  
And spacing follows 4px grid:
  - 4px (px-1)
  - 8px (px-2)
  - 12px (px-3) ✅
  - 16px (px-4)
  - 24px (px-6)
  - 32px (px-8)
```

### Criterion 2: Vertical Section Spacing
```gherkin
Given the sections (Status, Categories)
When I examine the space between sections
Then the spacing should be:
  - space-y-6 (24px gap between sections) ✅
  - NOT space-y-8 (32px, too wide)
  - NOT space-y-4 (16px, too tight)
```

### Criterion 3: Button Padding
```gherkin
Given the status/category buttons
When I inspect the button padding
Then padding should be:
  - Vertical: py-3 (12px top/bottom) ✅
  - Horizontal: px-3 (12px left/right) ✅
  - Creates balanced tap target
  - Breathing room around text/icon
```

### Criterion 4: Icon + Text Spacing
```gherkin
Given icon and text in category buttons
When I examine the gap
Then spacing should be:
  - gap-3 (12px between icon and text) ✅
  - NOT gap-2 (8px, too tight)
  - NOT gap-4 (16px, too wide)
```

### Criterion 5: Badge/Count Spacing
```gherkin
Given the product count badges
When I inspect badge styling
Then padding should be:
  - px-2 py-1 (8px horizontal, 4px vertical) ✅
  - Compact but readable
  - Proper balance with button size
```

### Criterion 6: Collapsed Mode Spacing
```gherkin
Given the sidebar in collapsed state (w-20)
When I inspect the spacing
Then:
  - Padding maintained (px-3 py-3) ✅
  - Icons centered ✅
  - NO cramped appearance ✅
  - Touch targets still adequate (min 44px) ✅
```

### Criterion 7: Natural Breathing Feel
```gherkin
Given the complete sidebar
When I view it visually
Then the overall feel should be:
  - Elements have space to "breathe"
  - NOT cramped, NOT loose
  - Balanced, professional appearance
  - Consistent with Gama Design System
```

---

## 📂 File List

### Files to Modify
- `app/components/CatalogSidebar.tsx` — Adjust padding/spacing classes

### Reference
- `app/globals.css` — Spacing tokens

---

## ✅ Definition of Done (DoD)

- [ ] All padding uses multiples of 4px (px-1, px-2, px-3, px-4, px-6, px-8)
- [ ] NO arbitrary spacing (7px, 11px, 13px, etc)
- [ ] Sidebar padding: px-3
- [ ] Button padding: py-3 px-3
- [ ] Section gaps: space-y-6
- [ ] Icon-text gap: gap-3
- [ ] Badge padding: px-2 py-1
- [ ] TypeScript passes
- [ ] Lint passes
- [ ] Zero console errors
- [ ] Mobile tested (not too cramped)
- [ ] User confirms: "Breathing room feels natural"

---

**Story Owner:** @pm
**Developer:** @dev
**QA:** @qa
