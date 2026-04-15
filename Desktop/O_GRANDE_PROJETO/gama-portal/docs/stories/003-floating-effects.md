# STORY-003: Remove Floating Effects (Shadows, Borders, Polish)

**Epic:** EPIC-001-SIDEBAR-INTEGRATION
**Story ID:** STORY-003-FLOATING-EFFECTS
**Complexity:** S (1-2h)
**Priority:** HIGH
**Status:** Draft
**Blocked By:** STORY-002 (needs flex layout first)

---

## 📋 Summary

Remove heavy shadows and oversized borders from sidebar to eliminate the "floating card" appearance. Polish styling to make sidebar appear integrated into page layout.

---

## ✅ Acceptance Criteria

### Criterion 1: Shadow Removal
```gherkin
Given the CatalogSidebar styling
When I inspect the CSS classes
Then shadows should be:
  - shadow-2xl ❌ REMOVED
  - shadow-xl ❌ REMOVED
  - shadow-lg ❌ REMOVED
  - shadow-sm ✅ OK (minimal, subtle)
  - shadow-none ✅ OK (no shadow)
  
And when I view the sidebar visually:
  - It should NOT appear to float above page
  - It should appear flat/integrated
  - NO elevation effect
```

### Criterion 2: Border Refinement
```gherkin
Given the sidebar borders
When I inspect the border classes
Then borders should be:
  - border-white/50+ ❌ REMOVED (too bright)
  - border-white/30-40 ✅ OK (subtle)
  - border-white/10-20 ✅ OK (very subtle)
  - border-[var(--gama-primary)]/30+ ✅ OK (primary accent)
  
And border thickness should be:
  - border-2, border-4 ❌ REMOVED (too thick)
  - border-1 ✅ OK (thin, subtle)
  
And borders should exist only where necessary:
  - Top border (divider from nav) ✅ OK
  - Bottom border (divider from footer) ✅ OK
  - Side borders (section dividers) ⚠️ Use sparingly
```

### Criterion 3: Hover State Polish
```gherkin
Given button hover states
When I hover over a category button
Then the interaction should:
  - Icon scale slightly (scale-110) ✅
  - Text color change (hover:text-[var(--gama-primary)]) ✅
  - Border brighten (hover:border-[var(--gama-primary)]/50) ✅
  - Shadow appear SUBTLY (shadow-sm max) ✅
  - NO sudden jarring changes ✅
```

### Criterion 4: Overall Integration Look
```gherkin
Given the complete sidebar design
When viewed on desktop
Then visually it should:
  - NOT look like a floating card/panel
  - NOT look like an overlay on the page
  - LOOK like an integrated part of the layout
  - Seamlessly blend with main content area
  - Share visual weight (not dominate)
```

---

## 📂 File List

### Files to Modify
- `app/components/CatalogSidebar.tsx` — Remove shadow/border classes

### Files to Reference
- `app/globals.css` — Design system color tokens

---

## 💭 Development Notes

- **Shadow strategy:** Use minimal shadows (shadow-sm) or none
- **Border strategy:** Use low-opacity white borders (white/10-20) for subtle dividers
- **Color references:** Use design system tokens (--gama-primary, --gama-surface)
- **Testing:** View on real device, not just screenshot (shadows look different)

---

## ✅ Definition of Done (DoD)

- [ ] All shadow-2xl/shadow-xl removed
- [ ] Border opacities reduced (white/50+ → white/10-30)
- [ ] Border thickness reduced (border-2+ → border-1)
- [ ] Hover states smooth (no sudden shadow jumps)
- [ ] Sidebar appears integrated visually
- [ ] TypeScript passes
- [ ] Lint passes
- [ ] Zero console errors
- [ ] Before/after screenshot comparison
- [ ] User confirms: "Sidebar looks integrated, not floating"

---

**Story Owner:** @pm
**Developer:** @dev
**QA:** @qa
