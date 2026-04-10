# GAMA Design System V2 — Quick Start

**Version:** 2.0.0
**Status:** ✅ Production Ready
**Updated:** 2026-03-13

---

## 🎨 What is V2?

A **dynamic multi-brand design system** that supports 4+ visual identities from a single codebase:

- ✅ **Gama Studio** — Green neon (#88CE11)
- ✅ **Gama TV** — Broadcast blue (#0066FF)
- ✅ **Gama Rádio** — Warm red (#DC2626)
- ✅ **Gama Calendários** — Purple (#8B5CF6)
- ✅ **+ Add your own brands instantly**

---

## 🚀 Getting Started (5 minutes)

### 1. Start the Dev Server

```bash
cd gama-ds-platform
npm run dev
```

Open: **http://localhost:3006**

### 2. See the Brand Switcher

- Sidebar (bottom) has a dropdown: **"Gama Studio"**
- Click to see all brands

### 3. Switch Brands

- Select **"Gama TV"** → Colors change to blue ✨
- Select **"Gama Rádio"** → Colors change to red
- Select **"Gama Calendários"** → Colors change to purple

**That's V2!** All components instantly adapt to the selected brand.

---

## 📁 Project Structure

```
brand-configs/                    ← Brand configurations
├── index.json                   ← Registry of all brands
├── gama-studio/
│   ├── brand.json              ← Metadata (name, logo)
│   └── tokens.json             ← Design tokens (colors, fonts)
├── gama-tv/
├── gama-radio/
└── gama-calendario/

src/components/                   ← Universal components
├── atoms/Button.tsx            ← Works with any brand
├── molecules/Card.tsx          ← Works with any brand
└── organisms/Modal.tsx         ← Works with any brand

src/context/BrandContext.tsx     ← Brand management
src/hooks/useBrand.ts           ← Brand data access
src/components/platform/
└── BrandSwitcher.tsx           ← Dropdown UI
```

---

## 💡 How It Works

### User selects "Gama TV"
```
BrandSwitcher → setActiveBrand('gama-tv')
      ↓
BrandContext loads /api/brands/gama-tv/tokens
      ↓
Gets JSON: { colors: { primary: '#0066FF', dark: '#0A1428', ... } }
      ↓
Applies to <html> as CSS variables:
  --color-primary: #0066FF
  --color-dark: #0A1428
  --color-surface: #1a2332
      ↓
Tailwind reads updated CSS vars:
  bg-gama-primary → var(--color-primary) = #0066FF
      ↓
All components re-render with new colors ✨
```

---

## 🎯 Key Features

### 1. Components Don't Change
```tsx
// Button.tsx
const variantStyles = {
  primary: 'bg-gama-primary text-gama-dark',  // Same code!
}
// When user switches brands, button color changes automatically
```

### 2. Universal Compatibility
```tsx
// Use in ANY project
import { Button } from '@gama-ds/components'
import { useBrand } from '@gama-ds/hooks'

export function MyComponent() {
  const brand = useBrand()
  return <Button>Dynamically themed button</Button>
}
```

### 3. Add Brands Instantly
1. Create `brand-configs/seu-novo-brand/`
2. Add `brand.json` + `tokens.json`
3. Update `brand-configs/index.json`
4. **Done!** Appears in dropdown automatically

---

## 📚 Documentation

| Doc | Purpose |
|-----|---------|
| **ARCHITECTURE-V2.md** | Complete technical design |
| **ADDING-BRANDS.md** | Step-by-step: add new brands |
| **README-V2-MULTIBRAND.md** | Overview + rationale |

---

## 🔧 Using Brands in Your Code

### Access Current Brand Tokens

```typescript
import { useBrand } from '@/hooks/useBrand'

export function MyComponent() {
  const { colors, spacing, typography } = useBrand()

  return (
    <div style={{
      backgroundColor: colors.primary,
      padding: spacing.lg,
      fontFamily: typography.font_primary
    }}>
      Dynamically themed!
    </div>
  )
}
```

### Switch Brands Programmatically

```typescript
import { useBrandSwitcher } from '@/hooks/useBrand'

export function BrandSelector() {
  const { activeBrandId, setActiveBrand, brands } = useBrandSwitcher()

  return (
    <select onChange={(e) => setActiveBrand(e.target.value)}>
      {brands.map(brand => (
        <option key={brand.id} value={brand.id}>
          {brand.name}
        </option>
      ))}
    </select>
  )
}
```

### Check Active Brand

```typescript
import { useBrandId } from '@/hooks/useBrand'

export function BrandBadge() {
  const brandId = useBrandId()

  return <span>Current brand: {brandId}</span>
}
```

---

## 🎨 Available Brands

### Gama Studio
- **Color:** Green Neon (#88CE11)
- **Use:** Agência de marketing
- **Logo:** G estilizado

### Gama TV
- **Color:** Broadcast Blue (#0066FF)
- **Use:** Publicidade em displays/TV
- **Logo:** 📺 TV icon

### Gama Rádio
- **Color:** Warm Red (#DC2626)
- **Use:** Publicidade sonora
- **Logo:** 🎙️ Radio icon

### Gama Calendários
- **Color:** Purple (#8B5CF6)
- **Use:** Gestão de agendamentos
- **Logo:** 📅 Calendar icon

---

## 🚀 Using V2 in Other Projects

### Option 1: Import Components + Use Brand

```typescript
// In your Gama TV app:
import { Button, Card } from '@gama-ds/components'
import { useBrand } from '@gama-ds/hooks'

export function Dashboard() {
  const brand = useBrand('gama-tv')

  return (
    <Card style={{ backgroundColor: brand.colors.surface }}>
      <Button>Assista Agora</Button>
    </Card>
  )
}
```

### Option 2: Tailwind Classes

```tsx
// In your Gama Rádio app:
import { Button } from '@gama-ds/components'

export function Player() {
  return (
    <div className="bg-gama-dark">
      <Button className="bg-gama-primary">
        Play
      </Button>
    </div>
  )
}
```

**Colors automatically match Gama Rádio palette! 🎙️**

---

## 🔍 API Reference

### `/api/brands`
Get all brands:
```bash
curl http://localhost:3006/api/brands

# Response:
{
  "brands": [
    { "id": "gama-studio", "name": "Gama Studio", ... },
    { "id": "gama-tv", "name": "Gama TV", ... },
    ...
  ]
}
```

### `/api/brands/[id]`
Get brand metadata:
```bash
curl http://localhost:3006/api/brands/gama-tv

# Response:
{
  "id": "gama-tv",
  "name": "Gama TV",
  "description": "Publicidade corporativa via TV",
  "logo": "/logos/gama-tv.svg",
  ...
}
```

### `/api/brands/[id]/tokens`
Get brand design tokens:
```bash
curl http://localhost:3006/api/brands/gama-tv/tokens

# Response:
{
  "colors": { "primary": "#0066FF", "dark": "#0A1428", ... },
  "typography": { "font_primary": "Poppins", ... },
  "spacing": { "xs": "4px", ... },
  ...
}
```

---

## ❓ FAQ

### Q: Can I create custom colors for a brand?

**A:** Yes! Edit `brand-configs/{id}/tokens.json` and update the colors. No code changes needed.

### Q: What if I want light mode?

**A:** V2 is dark-first. For light mode, add a variant in `tokens.json` or use CSS media queries.

### Q: Do I need to restart the server to add a brand?

**A:** No! Server detects new brands dynamically. Just refresh the page.

### Q: Can I have 20+ brands?

**A:** Yes! V2 scales infinitely. Performance stays the same.

### Q: What about mobile? Does brand switching work?

**A:** Yes! BrandSwitcher is fully responsive. Works on mobile/tablet too.

### Q: Can I override specific component colors?

**A:** Yes! Either:
1. Create brand-specific overrides in `brand-configs/{id}/components/`
2. Use inline styles with `useBrand()` hook

---

## 🐛 Troubleshooting

### Colors not changing after brand switch?
1. Open DevTools → Console (check for errors)
2. Check `<html>` has CSS variables: `--color-primary`, etc.
3. Restart server: `npm run dev`

### Brand doesn't appear in dropdown?
1. Verify `brand-configs/{id}/brand.json` exists
2. Verify `brand-configs/{id}/tokens.json` exists
3. Verify entry in `brand-configs/index.json`
4. Restart server

### API returns 404?
1. Check file paths in `brand-configs/`
2. Verify JSON is valid (use JSONLint.com)
3. Check Node.js file permissions

---

## 📊 Checklist: V2 Setup

- ✅ Server running (`npm run dev`)
- ✅ Browser opens http://localhost:3006
- ✅ Sidebar shows "Gama Studio"
- ✅ Brand Switcher dropdown visible
- ✅ Can select different brands
- ✅ Colors change when switching
- ✅ All components render correctly

---

## 🎓 Learning Path

1. **Start here:** This README (5 min)
2. **Understand:** README-V2-MULTIBRAND.md (10 min)
3. **Deep dive:** ARCHITECTURE-V2.md (20 min)
4. **Add brands:** ADDING-BRANDS.md (10 min per brand)

---

## 📞 Need Help?

- **Architecture questions?** → Read `ARCHITECTURE-V2.md`
- **Adding a brand?** → Read `ADDING-BRANDS.md`
- **Component usage?** → Check `src/components/` examples
- **API endpoints?** → Check this file's "API Reference" section

---

## 🚀 Next Steps

### For Brand Managers
1. Customize colors for your brand
2. Add your logo to `public/logos/`
3. Update brand metadata
4. Share with team

### For Developers
1. Use `useBrand()` in components
2. Reference tokens (colors, spacing, fonts)
3. Build features using universal components
4. Components auto-adapt to selected brand

### For Designers
1. Use this design system as reference
2. Create assets that match brand colors
3. Ensure designs work with all 4 brands
4. Request new brands in `brand-configs/`

---

## 📈 Version History

| Version | Changes | Date |
|---------|---------|------|
| **2.0.0** | Multi-brand architecture launch | 2026-03-13 |
| 1.0.0 | Single-brand (Gama Studio only) | 2026-03-11 |

---

## ✨ Credits

**Built with:**
- Next.js 14 (App Router)
- Tailwind CSS
- TypeScript
- React Context API

**Brands included:**
- Gama Studio — Marketing & Design
- Gama TV — Media & Broadcasting
- Gama Rádio — Audio & Broadcast
- Gama Calendários — Financial Services

---

**Status:** ✅ Production Ready
**Last Updated:** 2026-03-13
**Maintained by:** Grupo Gama

🎉 **Welcome to V2!**
