# STORY-006: Hero Section + Brand Narrative

**Epic:** EPIC-002-HOMEPAGE-REDESIGN
**Story ID:** STORY-006-HERO-SECTION
**Complexity:** M (2-3h)
**Priority:** HIGH
**Status:** Ready (Validated by @po, Implemented by @dev, Passed QA)

---

## 📋 Summary

Create impactful hero section on homepage that immediately communicates Gama brand with animated background and clear CTAs.

---

## ✅ Acceptance Criteria

```gherkin
Given a visitor arrives at / (homepage)
When the page loads
Then they should see:

Feature: Hero Section Display
  Scenario: Initial page load shows hero
    Given the browser width is desktop (1024px+)
    When the page finishes loading
    Then the hero section should display:
      - Full viewport height (100vh) OR 80vh
      - Navigation bar at top (logo + nav links)
      - Centered headline: "O Futuro da Automação IA é Aqui"
        - Font: bold/black (font-weight: 700+)
        - Size: 48px+ desktop, 28px+ mobile
        - Color: white text
      - Tagline below: "Grupo Gama: Projetos IA que Transformam"
        - Font: medium (font-weight: 500)
        - Size: 20px+ desktop, 14px+ mobile
        - Color: gray-300 (#a1a1aa)
      - 2 CTA buttons:
        - Primary: "Explorar Produtos" (green #88CE11, black text)
        - Secondary: "Ver Documentação" (outline, green border)
      - Animated background:
        - Gradient that shifts color on scroll/time
        - OR morphing shapes (not too busy)
        - Subtle, not distracting

Feature: Responsiveness
  Scenario: Mobile view (375px)
    Given viewport width is 375px
    When page renders
    Then hero should:
      - Stack vertically (headline, tagline, buttons)
      - Font sizes reduced (28px headline, 14px tagline)
      - Buttons full width (or side-by-side if fit)
      - Readable without horizontal scroll

  Scenario: Tablet view (768px)
    Given viewport width is 768px
    When page renders
    Then hero should:
      - Properly spaced
      - Buttons visible and clickable (touch-friendly)
      - Text readable

Feature: Interactivity
  Scenario: Button hover effects (desktop)
    Given user hovers over "Explorar Produtos" button
    When hovering
    Then button should:
      - Scale slightly (1.05x)
      - Glow effect (shadow with primary color)
      - Cursor change to pointer
      - Smooth transition (0.2-0.3s)

  Scenario: CTA button clicks
    Given user clicks "Explorar Produtos"
    When clicked
    Then navigate to /docs/catalogo

    Given user clicks "Ver Documentação"
    When clicked
    Then navigate to /docs

Feature: Animation
  Scenario: Background animation
    Given the hero section has animated background
    When page loads
    Then animation should:
      - Be subtle (not flashing, not seizure-inducing)
      - Not interfere with text readability
      - Run smoothly (60fps, no jank)
      - NOT require autoplay video or heavy JavaScript
```

---

## 📂 File List

### Files to Create/Modify
- Create hero section component (or update homepage)
- Update global styles if needed

### Files to Reference
- `app/globals.css` — Design system colors
- Navigation component

---

## ✅ Definition of Done

- [ ] Hero section renders at 100vh or 80vh height
- [ ] Headline and tagline positioned correctly
- [ ] CTA buttons clickable and link correctly
- [ ] Hover effects work smoothly
- [ ] Responsive at 375px, 768px, 1024px, 1440px
- [ ] Background animation runs smooth (60fps)
- [ ] NO console errors
- [ ] NO accessibility violations
- [ ] TypeScript passes
- [ ] Lint passes

---

**Story Owner:** @pm
**Developer:** @dev
**QA:** @qa
