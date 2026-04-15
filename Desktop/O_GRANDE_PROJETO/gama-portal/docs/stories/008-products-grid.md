# STORY-008: Products Showcase Grid

**Epic:** EPIC-002-HOMEPAGE-REDESIGN
**Story ID:** STORY-008-PRODUCTS-GRID
**Complexity:** M (2-3h)
**Priority:** HIGH
**Status:** Draft

---

## 📋 Summary

Display 6 featured products in responsive grid with hover animations and links to product documentation.

---

## ✅ Acceptance Criteria

```gherkin
Given the Products Showcase section
When visitor scrolls to reach it
Then they should see:

Feature: Section Display
  Scenario: Products grid layout
    Given desktop view (1024px+)
    When section renders
    Then show:
      - Heading: "Nossos Produtos" (36px, bold, white)
      - 6 product cards in 3-column grid
      - Each card contains:
        - Icon/logo (48px)
        - Product name (18px, bold, white)
        - Short description (12px, gray-400, 1-2 lines)
        - Link arrow or "Saiba Mais"
      - "Ver Todos (18 Produtos)" button at bottom
        - Links to /docs/catalogo

Feature: Card Hover Effects (Desktop)
  Scenario: Card hover interaction
    Given user hovers over product card
    When hovering
    Then card should:
      - Scale up 1.05x
      - Glow effect (shadow with primary color #88CE11)
      - Text color shift (description → primary green)
      - Border highlight or glow
      - Smooth transition (0.2-0.3s)
      - Cursor change to pointer

Feature: Responsive Grid
  Scenario: Tablet view (768px)
    Given viewport 768px
    Then grid should be:
      - 2 columns (2x3 layout)
      - Proper spacing
      - Cards readable

  Scenario: Mobile view (375px)
    Given viewport 375px
    Then grid should be:
      - 1 column (single column stack)
      - Full width cards
      - Touch-friendly (44px+ tap targets)

Feature: Product Selection
  Scenario: Featured products display
    Given 6 featured products (out of 18)
    Then each should have:
      - Relevant icon (Material Symbols or Lucide)
      - Name accurate
      - Description clear (max 100 chars)
      - Correct link to product docs

Feature: Click Behavior
  Scenario: Card click
    Given user clicks product card
    When clicked
    Then navigate to product documentation page
    (e.g., /docs/{product-id})

  Scenario: "Ver Todos" button
    Given "Ver Todos (18 Produtos)" button visible
    When clicked
    Then navigate to /docs/catalogo
```

---

## ✅ Definition of Done

- [ ] 6 product cards display in grid
- [ ] Grid responsive (3/2/1 columns)
- [ ] Card hover effects work smooth
- [ ] Links navigate correctly
- [ ] Touch targets ≥44px on mobile
- [ ] Icons/logos optimized
- [ ] Text contrast WCAG AA
- [ ] NO console errors
- [ ] TypeScript passes
- [ ] Lint passes

---

**Story Owner:** @pm
**Developer:** @dev
**QA:** @qa
