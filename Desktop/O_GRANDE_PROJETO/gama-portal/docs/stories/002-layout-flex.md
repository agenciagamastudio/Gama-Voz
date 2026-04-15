# STORY-002: Convert Layout from Fixed to Flex Positioning

**Epic:** EPIC-001-SIDEBAR-INTEGRATION
**Story ID:** STORY-002-LAYOUT
**Complexity:** S (1-2h)
**Priority:** HIGH
**Status:** Draft
**Blockers:** None
**Blocked By:** None

---

## 📋 Summary

Convert CatalogPage layout from fixed/absolute sidebar positioning to native flex layout where sidebar and main content are siblings in a flex container. This ensures sidebar appears integrated, not floating.

---

## 📝 Description

Currently, the sidebar and main content are visually positioned to appear side-by-side, but the sidebar uses fixed/absolute positioning which makes it feel like an overlay. Converting to flex layout will make both elements true siblings in a flex container, creating proper integration.

**What needs to happen:**
1. Wrap sidebar + main in `<div className="flex">` (if not already)
2. Sidebar: `className="shrink-0"` (fixed width w-20 or w-72)
3. Main: `className="flex-1"` (grows to fill remaining space)
4. Remove any fixed positioning from sidebar
5. Remove any absolute positioning from sidebar
6. Verify no layout shift when scrollbar appears

---

## ✅ Acceptance Criteria

### Criterion 1: Flex Container Structure
```gherkin
Given the CatalogPage component
When I examine the JSX structure
Then the layout should be:
  <div className="flex pt-32">
    <CatalogSidebar className="shrink-0" />
    <main className="flex-1">
      {content}
    </main>
  </div>

And the flex container should:
  - Use display: flex
  - Have no max-width constraints (full viewport)
  - Have pt-32 (padding-top 8rem) for navigation spacing
```

### Criterion 2: Sidebar Integration
```gherkin
Given the CatalogSidebar component
When the page renders
Then the sidebar should:
  - Have className="shrink-0" (no grow, fixed width only)
  - Width: w-20 (80px) when collapsed
  - Width: w-72 (288px) when expanded
  - NOT have position: fixed
  - NOT have position: absolute
  - NOT have z-index styling
  - Scroll independently: overflow-y-auto
```

### Criterion 3: Main Content Fill
```gherkin
Given the main content area
When the sidebar is collapsed or expanded
Then the main element should:
  - Have className="flex-1" (grow to fill remaining space)
  - Adjust width automatically based on sidebar width
  - Maintain proper spacing (px-6 for padding)
  - Scroll independently: overflow-y-auto if needed
```

### Criterion 4: No Layout Shift
```gherkin
Given the flex layout on desktop
When a scrollbar appears in main content
Then the layout should:
  - NOT shift horizontally
  - Maintain consistent spacing on both sides
  - NOT show/hide scrollbar with layout jank
  - Use scroll-behavior: smooth consistently
```

### Criterion 5: Desktop Responsiveness
```gherkin
Given the flex layout at different desktop widths
When viewing at 1024px, 1440px, 1920px
Then the layout should:
  - Adjust properly at each breakpoint
  - Sidebar remains visible and functional
  - Main content scales appropriately
  - NO horizontal scrolling at any width
```

### Criterion 6: Mobile/Tablet Responsiveness
```gherkin
Given the flex layout on tablet (768px)
When the sidebar is collapsed (w-20)
Then the layout should:
  - Show icon-only sidebar
  - Content takes most space
  - NO overflow or jank
  
Given the flex layout on mobile (<768px)
When the page renders
Then the layout should either:
  - Hide sidebar (display: none)
  - OR show hamburger menu (drawer)
  - Content takes full width
  - NO horizontal scroll
```

---

## 📂 File List

### Files to Modify
- `app/docs/catalogo/page.tsx` — Update layout structure
- `app/components/CatalogSidebar.tsx` — Remove fixed positioning if present
- `app/globals.css` — Add any flex utilities if needed

### Files to Reference
- `app/docs/conceitos/workflows/page.tsx` — Example of flex layout (if exists)

---

## 🔗 Dependencies

- None (can start immediately)
- Depends on: Story 1 optional (scrollbar can be done in parallel)

---

## 💭 Development Notes

- **CSS Framework:** Tailwind flex utilities
- **Key Classes:** 
  - `flex` — display: flex
  - `shrink-0` — flex-shrink: 0 (no shrinking)
  - `flex-1` — flex: 1 (grow to fill)
  - `pt-32` — padding-top for navigation spacing
- **No Breaking Changes:** Both components already exist, just restructuring parent

---

## ✅ Definition of Done (DoD)

- [ ] Layout structure uses `<div className="flex">`
- [ ] Sidebar has `shrink-0` and fixed width (w-20/w-72)
- [ ] Main has `flex-1`
- [ ] NO fixed positioning on sidebar
- [ ] NO absolute positioning on sidebar
- [ ] NO z-index on sidebar
- [ ] TypeScript typecheck passes
- [ ] Lint passes
- [ ] Zero console errors
- [ ] Tested at 5 breakpoints (375px, 414px, 768px, 1024px, 1440px)
- [ ] User confirms: "Sidebar looks integrated, not floating"

---

## 📌 Change Log

| Date | Author | Change |
|------|--------|--------|
| 2026-04-15 | @pm | Story created |

---

**Story Owner:** @pm
**Developer:** @dev
**QA:** @qa
