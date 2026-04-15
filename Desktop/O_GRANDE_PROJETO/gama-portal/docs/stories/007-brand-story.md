# STORY-007: Brand Story Section (Who We Are)

**Epic:** EPIC-002-HOMEPAGE-REDESIGN
**Story ID:** STORY-007-BRAND-STORY
**Complexity:** M (2-3h)
**Priority:** HIGH
**Status:** Draft
**Blocked By:** STORY-006

---

## 📋 Summary

Implement brand story section that communicates Gama's mission, vision, and values through scroll-triggered animations.

---

## ✅ Acceptance Criteria

```gherkin
Given the Brand Story section below hero
When visitor scrolls down to reach it
Then they should see:

Feature: Section Content
  Scenario: Brand story display
    Given section is visible
    When rendered
    Then display:
      - Heading: "Quem Somos" (48px, bold, white)
      - Brand narrative (150-200 words, readable)
      - Text color: gray-300
      - 3 pillar cards arranged below text:
        - Mission card (with icon)
        - Vision card (with icon)
        - Values card (with icon)

Feature: Scroll-Triggered Animation
  Scenario: Text fades in on scroll
    Given section not yet in viewport
    When user scrolls down to section
    Then text should:
      - Fade in smoothly (opacity 0→1)
      - Slide in from left (translate X: -50px → 0)
      - Duration: 0.6s
      - Easing: ease-out
      - Each paragraph staggered (not all at once)

  Scenario: Pillar cards reveal on scroll
    Given 3 pillar cards below text
    When user continues scrolling
    Then each card should:
      - Fade in + slide up (Y: 50px → 0)
      - Staggered timing (0.2s between each)
      - Smooth, not jarring

Feature: Pillar Cards
  Scenario: Mission card
    Given mission card visible
    When rendered
    Then show:
      - Icon (abstract, relevant to "mission")
      - Title: "Missão"
      - Description: 2-3 lines about Gama's mission
      - Hover effect: scale 1.05, glow

  Scenario: Vision card
    Similar to mission, but for vision

  Scenario: Values card
    Similar to mission, but for values

Feature: Background Animation
  Scenario: Parallax or morphing background
    Given section has animated background
    When user scrolls
    Then background should:
      - Move slower than content (parallax)
      - OR morph shapes subtly
      - NOT be distracting
      - Enhance, not detract from content

Feature: Responsiveness
  Scenario: Mobile layout (375px)
    Given viewport 375px
    When section renders
    Then:
      - Text stacked vertically
      - Pillar cards stacked (1 column)
      - Font sizes reduced but readable
      - NO horizontal scroll

  Scenario: Tablet layout (768px)
    Given viewport 768px
    Then:
      - Pillar cards in 3 columns (or responsive)
      - Proper spacing maintained

  Scenario: Desktop layout (1024px+)
    Given viewport 1024px+
    Then:
      - Text full width (max 800px container)
      - Pillar cards in 3-column grid
      - Balanced spacing
```

---

## 📂 File List

### Files to Create/Modify
- Create/update BrandStory component
- Update homepage layout

### Reference
- `app/globals.css` for colors, fonts

---

## ✅ Definition of Done

- [ ] Section displays correctly (heading + text + pillars)
- [ ] Scroll-triggered animations work smooth (60fps)
- [ ] Pillar cards have icons + text
- [ ] Hover effects on cards work
- [ ] Responsive at 375px, 768px, 1024px
- [ ] NO console errors
- [ ] Text contrast WCAG AA
- [ ] TypeScript passes
- [ ] Lint passes

---

**Story Owner:** @pm
**Developer:** @dev
**QA:** @qa
