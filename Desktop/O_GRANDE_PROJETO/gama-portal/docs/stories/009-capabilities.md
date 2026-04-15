# STORY-009: Capabilities Section + Morphing Icons

**Epic:** EPIC-002-HOMEPAGE-REDESIGN
**Story ID:** STORY-009-CAPABILITIES
**Complexity:** M (2-3h)
**Priority:** HIGH
**Status:** Draft
**Blocked By:** STORY-007

---

## 📋 Summary

Showcase 4-5 key Gama capabilities with morphing icon animations on scroll and hover.

---

## ✅ Acceptance Criteria

```gherkin
Given the Capabilities section
When visitor scrolls past products
Then they should see:

Feature: Section Display
  Scenario: Capabilities showcase
    Given section visible
    When rendered
    Then show:
      - Heading: "Nossas Capacidades" (36px, bold, white)
      - 4-5 capability cards in responsive layout
      - Each card contains:
        - Icon (48px, Material Symbols or Lucide)
        - Title: e.g., "Automação IA"
        - Description: 1-2 lines
      - Cards displayed in grid (2x2 or 2x3)

Feature: Morphing Icon Animation
  Scenario: Icon morphs on hover
    Given capability card with icon
    When user hovers over card
    Then icon should:
      - Transform/morph to related icon (smooth SVG transition)
      - Duration: 0.4s
      - Example: gear → gears (automation)
      - Color shift: white → primary green (#88CE11)

Feature: Scroll-Triggered Reveal
  Scenario: Cards appear on scroll
    Given cards not in viewport initially
    When user scrolls to section
    Then each card should:
      - Fade in (opacity 0→1)
      - Slide up (Y: 30px → 0)
      - Staggered (0.15s between each)
      - Duration: 0.6s

Feature: Capability Content
  Scenarios for each capability:
    - AI Automation (icon: gear/magic)
    - Real-time Processing (icon: lightning/zap)
    - Enterprise Scale (icon: building/network)
    - Easy Integration (icon: link/plug)
    - Custom Solutions (icon: settings/wrench)

Feature: Responsive Layout
  Scenario: Desktop (1024px+)
    - 5 capabilities in grid layout
    - Balanced spacing

  Scenario: Tablet (768px)
    - 2-3 capabilities per row
    - Responsive wrapping

  Scenario: Mobile (375px)
    - 1 capability per row
    - Cards stack vertically
    - Full width with padding
```

---

## ✅ Definition of Done

- [ ] 4-5 capability cards display
- [ ] Icons render correctly
- [ ] Morphing animation smooth (0.4s)
- [ ] Scroll-triggered reveal works
- [ ] Responsive grid layout
- [ ] Hover effects work
- [ ] Text readable
- [ ] NO console errors
- [ ] TypeScript passes
- [ ] Lint passes

---

**Story Owner:** @pm
**Developer:** @dev
**QA:** @qa
