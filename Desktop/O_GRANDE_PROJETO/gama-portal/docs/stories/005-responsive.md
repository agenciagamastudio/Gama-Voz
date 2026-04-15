# STORY-005: Responsive Design (Desktop Expand, Mobile Collapse)

**Epic:** EPIC-001-SIDEBAR-INTEGRATION
**Story ID:** STORY-005-RESPONSIVE
**Complexity:** M (1-2h)
**Priority:** HIGH
**Status:** Draft
**Blocked By:** STORY-002, STORY-003, STORY-004 (all previous stories)

---

## 📋 Summary

Ensure sidebar and main content layout responds correctly across all device breakpoints (mobile, tablet, desktop) with no layout shift and proper touch/mouse interactions.

---

## ✅ Acceptance Criteria

### Criterion 1: Desktop Behavior (≥1024px)
```gherkin
Given the layout at desktop width (1024px+)
When the page renders
Then the sidebar should:
  - Be visible (NOT hidden) ✅
  - Show w-20 (collapsed) by default ✅
  - Expand to w-72 on hover (mouse) ✅
  - Expand to w-72 when pinned ✅
  - Pin button visible and functional ✅
  - Main content flex-1 (grows) ✅
  - NO layout shift when sidebar expands/collapses ✅
```

### Criterion 2: Tablet Behavior (768px-1023px)
```gherkin
Given the layout at tablet width (768px-1023px)
When the page renders
Then the sidebar should:
  - Show w-20 (icon only) by default ✅
  - Expand to w-72 on mouse hover ✅
  - Collapse back on mouse leave ✅
  - Pin button visible (optional) ✅
  - Touch-friendly icons (44px min tap target) ✅
  - Main content adjusts (flex-1) ✅
```

### Criterion 3: Mobile Behavior (<768px)
```gherkin
Given the layout at mobile width (<768px)
When the page renders
Then the sidebar should either:
  - Be hidden (display: none) ✅
  - OR show as drawer/hamburger menu ✅
  
And the main content should:
  - Take full width (flex-1 of viewport) ✅
  - NOT be overlaid by sidebar ✅
  - NO horizontal scroll ✅
  - Touch targets 44px minimum ✅
```

### Criterion 4: Scrollbar Layout Shift
```gherkin
Given the page with custom scrollbar (Story 1)
When content scrolls and scrollbar appears/disappears
Then the layout should:
  - NOT shift horizontally (no reflow) ✅
  - Maintain consistent spacing ✅
  - Use scroll-padding if needed ✅
```

### Criterion 5: Touch Responsiveness
```gherkin
Given the mobile/tablet layout
When user interacts via touch
Then:
  - Tap targets ≥44px × 44px ✅
  - Double-tap zoom disabled (if intended) ✅
  - Smooth scrolling works ✅
  - NO horizontal scroll ✅
```

### Criterion 6: Breakpoint Testing
```gherkin
Given the responsive layout
When I test at these widths:
  - 375px (iPhone SE)
  - 414px (iPhone 12)
  - 768px (iPad)
  - 1024px (iPad Pro / desktop)
  - 1440px (desktop)
  - 1920px (wide desktop)
Then the layout should:
  - Render correctly ✅
  - Adjust properly ✅
  - NO overflow/jank ✅
  - All interactive elements work ✅
```

### Criterion 7: Performance on Mobile
```gherkin
Given the mobile layout
When the page loads
Then performance should be:
  - Load time <80ms ✅
  - Scroll FPS ≥60 ✅
  - NO jank on hover/expand ✅
  - Smooth animations ✅
```

---

## 📂 File List

### Files to Modify
- `app/components/CatalogSidebar.tsx` — Add responsive classes
- `app/docs/catalogo/page.tsx` — Add responsive wrapper if needed

### Testing Devices
- iPhone SE (375px)
- iPhone 12/13 (414px)
- iPad (768px)
- Desktop (1024px+)

---

## 💭 Development Notes

- **Breakpoints:** Use Tailwind (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)
- **Hidden classes:** hidden / md:flex / lg:flex for conditional display
- **Touch targets:** min 44px × 44px (iOS Human Interface Guidelines)
- **Scroll behavior:** scroll-behavior: smooth on html element
- **Testing tools:** Chrome DevTools, real mobile device, responsive design tester

---

## ✅ Definition of Done (DoD)

- [ ] Desktop (1024px+): sidebar visible, expandable, pinnable
- [ ] Tablet (768px-1023px): sidebar w-20 default, expandable on hover
- [ ] Mobile (<768px): sidebar hidden OR drawer shown
- [ ] Main content flex-1 at all breakpoints
- [ ] NO horizontal scroll at any width
- [ ] NO layout shift when scrollbar appears
- [ ] Tested at 5+ breakpoints (375px, 414px, 768px, 1024px, 1440px)
- [ ] Tested on real mobile device (not just browser DevTools)
- [ ] Touch targets ≥44px
- [ ] TypeScript passes
- [ ] Lint passes
- [ ] Zero console errors
- [ ] Performance: <80ms load, ≥60fps scroll

---

**Story Owner:** @pm
**Developer:** @dev
**QA:** @qa
