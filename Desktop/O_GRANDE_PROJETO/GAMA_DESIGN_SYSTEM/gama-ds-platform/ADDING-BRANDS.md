# Como Adicionar Novas Brands ao V2

**Quick reference:** 10 minutos para adicionar uma nova brand completa

---

## Step 1: Criar Diretório

```bash
mkdir -p brand-configs/seu-novo-brand
```

---

## Step 2: Criar `brand.json`

Crie o arquivo `brand-configs/seu-novo-brand/brand.json`:

```json
{
  "id": "seu-novo-brand",
  "name": "Seu Novo Brand",
  "description": "Descrição clara do brand",
  "logo": "/logos/seu-novo-brand.svg",
  "website": "https://seu-novo-brand.com",
  "active": true,
  "order": 5,
  "metadata": {
    "department": "Sua Área",
    "year_founded": 2026,
    "color_scheme": "seu-esquema"
  }
}
```

**Fields explicados:**
- `id` — Único, sem espaços, lowercase, hífens OK
- `name` — Nome visível para usuários
- `description` — 1 linha, usado no dropdown do brand switcher
- `logo` — Path relativo em `public/logos/`
- `website` — URL do brand (informativo)
- `active` — `true` para aparecer no dropdown
- `order` — Números mais baixos aparecem primeiro
- `metadata` — Qualquer informação extra

---

## Step 3: Criar `tokens.json`

Crie `brand-configs/seu-novo-brand/tokens.json`.

**Opção A: Cópia adaptada**

Copie de `brand-configs/gama-studio/tokens.json` e customize as cores:

```json
{
  "id": "seu-novo-brand",
  "brand": "seu-novo-brand",
  "version": "1.0.0",
  "colors": {
    "primary": "#NNNNNNN",
    "primary_light": "#NNNNNNN",
    "primary_dark": "#NNNNNNN",
    "dark": "#NNNNNNN",
    "darker": "#NNNNNNN",
    "surface": "#NNNNNNN",
    "surface_accent": "#NNNNNNN",
    "text": "#FFFFFF",
    "text_secondary": "#NNNNNNN",
    "success": "#10B981",
    "warning": "#F59E0B",
    "error": "#E11D48",
    "info": "#3B82F6"
  },
  "typography": {
    "font_primary": "Poppins",
    "font_code": "JetBrains Mono",
    "font_weights": {
      "light": 300,
      "regular": 400,
      "medium": 500,
      "semibold": 600,
      "bold": 700,
      "extrabold": 800,
      "black": 900
    },
    "sizes": {
      "4xl": "48px",
      "3xl": "36px",
      "2xl": "24px",
      "xl": "20px",
      "lg": "18px",
      "base": "16px",
      "sm": "14px",
      "xs": "12px"
    }
  },
  "spacing": {
    "xs": "4px",
    "sm": "8px",
    "md": "12px",
    "lg": "16px",
    "xl": "24px",
    "2xl": "32px",
    "3xl": "48px",
    "4xl": "64px"
  },
  "radius": {
    "none": "0",
    "sm": "4px",
    "md": "8px",
    "lg": "12px",
    "xl": "16px",
    "2xl": "20px",
    "round": "9999px"
  },
  "shadows": {
    "sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    "md": "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    "xl": "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
  },
  "animation": {
    "duration-fast": "150ms",
    "duration-normal": "300ms",
    "duration-slow": "500ms",
    "easing-ease-in": "cubic-bezier(0.4, 0, 1, 1)",
    "easing-ease-out": "cubic-bezier(0, 0, 0.2, 1)",
    "easing-ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)"
  }
}
```

**Opção B: Template minimalista**

```json
{
  "id": "seu-novo-brand",
  "brand": "seu-novo-brand",
  "version": "1.0.0",
  "colors": {
    "primary": "#YOUR_PRIMARY_COLOR",
    "dark": "#1F1F1F",
    "surface": "#2D2D2D",
    "text": "#FFFFFF",
    "text_secondary": "#A0A0A0"
  },
  "typography": {
    "font_primary": "Poppins",
    "font_code": "JetBrains Mono"
  },
  "spacing": { "xs": "4px", "sm": "8px", "md": "12px", "lg": "16px", "xl": "24px" },
  "radius": { "sm": "4px", "md": "8px", "lg": "12px" },
  "shadows": { "sm": "0 1px 2px rgba(0,0,0,0.1)", "md": "0 4px 6px rgba(0,0,0,0.1)" },
  "animation": { "duration-normal": "300ms" }
}
```

---

## Step 4: Adicionar ao Registry

Abra `brand-configs/index.json` e adicione seu brand:

```json
{
  "version": "2.0.0",
  "description": "Multi-brand registry",
  "brands": [
    { "id": "gama-studio", "name": "Gama Studio", "order": 1, "active": true },
    { "id": "gama-tv", "name": "Gama TV", "order": 2, "active": true },
    { "id": "gama-radio", "name": "Gama Rádio", "order": 3, "active": true },
    { "id": "gama-calendario", "name": "Gama Calendários", "order": 4, "active": true },
    /* ADICIONE AQUI: */
    { "id": "seu-novo-brand", "name": "Seu Novo Brand", "order": 5, "active": true }
  ],
  "meta": {
    "created_at": "2026-03-13T19:15:00Z",
    "last_updated": "2026-03-13T19:15:00Z",
    "total_brands": 5,
    "default_brand": "gama-studio"
  }
}
```

---

## Step 5: Adicionar Logo

1. Crie ou obtenha um SVG do seu brand
2. Salve em `public/logos/seu-novo-brand.svg`
3. Certifique-se que o caminho em `brand.json` é correto

**Requisitos do SVG:**
- Tamanho recomendado: 64x64px ou maior
- Transparent background
- Formato: SVG (escalável)

---

## Step 6: Testar

1. Reinicie o servidor (ou ele faz hot-reload):
   ```bash
   # Ctrl+C para parar
   npm run dev
   ```

2. Abra http://localhost:3006

3. Clique no **Brand Switcher** (sidebar footer)

4. Seu novo brand deve aparecer na lista! ✅

5. Selecione para testar se cores mudam

---

## Troubleshooting

### Novo brand não aparece no dropdown

**Verificar:**
1. Arquivo `brand-configs/seu-novo-brand/brand.json` existe?
2. Arquivo `brand-configs/seu-novo-brand/tokens.json` existe?
3. Entrada em `brand-configs/index.json` foi adicionada?
4. Campo `"active": true` está em `index.json`?

**Solução:**
```bash
ls -la brand-configs/seu-novo-brand/
# Deve mostrar: brand.json e tokens.json

cat brand-configs/index.json | grep seu-novo-brand
# Deve mostrar a entrada
```

### Cores não mudam ao selecionar novo brand

**Verificar:**
1. DevTools → Console → Há erros?
2. DevTools → Network → `/api/brands/seu-novo-brand/tokens` retorna 200?
3. DevTools → Elements → `<html>` → tem `--color-primary`?

**Solução:**
```javascript
// No console do browser:
fetch('/api/brands/seu-novo-brand/tokens')
  .then(r => r.json())
  .then(t => console.log(t))
// Deve mostrar seu tokens.json
```

### Logo não aparece no dropdown

**Verificar:**
1. SVG existe em `public/logos/seu-novo-brand.svg`?
2. Caminho em `brand.json` é `/logos/seu-novo-brand.svg`?
3. DevTools → Network → arquivo SVG carrega?

---

## Examples: Diferentes Tipos de Brands

### Exemplo 1: Brand com Cor Neon

```json
"colors": {
  "primary": "#FF0080",  // Neon Pink
  "dark": "#0A0A0A",
  "surface": "#1A1A1A",
  "text": "#FFFFFF",
  "text_secondary": "#CCCCCC"
}
```

### Exemplo 2: Brand Corporativo (Azul)

```json
"colors": {
  "primary": "#003D82",  // Corporate Blue
  "dark": "#0F1419",
  "surface": "#1A2332",
  "text": "#FFFFFF",
  "text_secondary": "#B8BCC8"
}
```

### Exemplo 3: Brand Quente (Laranja)

```json
"colors": {
  "primary": "#FF6B35",  // Warm Orange
  "dark": "#1F1410",
  "surface": "#2D2317",
  "text": "#FFFFFF",
  "text_secondary": "#D4A574"
}
```

---

## Checklist: Nova Brand Completa

- [ ] Diretório `brand-configs/seu-novo-brand/` criado
- [ ] `brand.json` criado com metadados
- [ ] `tokens.json` criado com cores personalizadas
- [ ] Entrada adicionada a `brand-configs/index.json`
- [ ] Logo SVG salvo em `public/logos/seu-novo-brand.svg`
- [ ] Servidor reiniciado (hot-reload ou `npm run dev`)
- [ ] Brand aparece no dropdown
- [ ] Cores mudam ao selecionar
- [ ] Não há erros no console

---

## Best Practices

### 1. Cores Semânticas Consistentes

Sempre definir:
- `primary` — Cor principal (CTA, highlights)
- `dark` — Fundo escuro
- `surface` — Cards, surfaces
- `text` — Texto primário (#FFFFFF recomendado)
- `text_secondary` — Texto secundário (desabilitado, hints)

### 2. Testabilidade

Testar seu novo brand com:
- ✅ Botões (primário, secondary, ghost, danger)
- ✅ Cards e surfaces
- ✅ Texto e links
- ✅ Estados hover/active
- ✅ Dark mode (se aplicável)

### 3. Documentação

Atualize `brand.json` com `metadata` útil:
```json
"metadata": {
  "department": "Seu Departamento",
  "year_founded": 2026,
  "color_scheme": "descrevendo",
  "primary_use_case": "para quem/o quê"
}
```

---

## Exemplo Completo: Nova Brand "Gama Financeiro"

### 1. Create directory
```bash
mkdir -p brand-configs/gama-financeiro
```

### 2. Create brand.json
```json
{
  "id": "gama-financeiro",
  "name": "Gama Financeiro",
  "description": "Plataforma de gestão financeira",
  "logo": "/logos/gama-financeiro.svg",
  "website": "https://gama-financeiro.com",
  "active": true,
  "order": 5,
  "metadata": {
    "department": "Financial Services",
    "year_founded": 2026,
    "color_scheme": "finance-gold"
  }
}
```

### 3. Create tokens.json
```json
{
  "id": "gama-financeiro",
  "brand": "gama-financeiro",
  "version": "1.0.0",
  "colors": {
    "primary": "#DAA520",
    "primary_light": "#FFD700",
    "primary_dark": "#B8860B",
    "dark": "#1A1410",
    "darker": "#0F0A05",
    "surface": "#2D2317",
    "surface_accent": "#403020",
    "text": "#FFFFFF",
    "text_secondary": "#D4A574",
    "success": "#10B981",
    "warning": "#F59E0B",
    "error": "#E11D48",
    "info": "#3B82F6"
  },
  "typography": {
    "font_primary": "Poppins",
    "font_code": "JetBrains Mono",
    "font_weights": {
      "light": 300,
      "regular": 400,
      "medium": 500,
      "semibold": 600,
      "bold": 700,
      "extrabold": 800,
      "black": 900
    },
    "sizes": {
      "4xl": "48px",
      "3xl": "36px",
      "2xl": "24px",
      "xl": "20px",
      "lg": "18px",
      "base": "16px",
      "sm": "14px",
      "xs": "12px"
    }
  },
  "spacing": {
    "xs": "4px",
    "sm": "8px",
    "md": "12px",
    "lg": "16px",
    "xl": "24px",
    "2xl": "32px",
    "3xl": "48px",
    "4xl": "64px"
  },
  "radius": {
    "none": "0",
    "sm": "4px",
    "md": "8px",
    "lg": "12px",
    "xl": "16px",
    "2xl": "20px",
    "round": "9999px"
  },
  "shadows": {
    "sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    "md": "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    "xl": "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
  },
  "animation": {
    "duration-fast": "150ms",
    "duration-normal": "300ms",
    "duration-slow": "500ms",
    "easing-ease-in": "cubic-bezier(0.4, 0, 1, 1)",
    "easing-ease-out": "cubic-bezier(0, 0, 0.2, 1)",
    "easing-ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)"
  }
}
```

### 4. Update brand-configs/index.json
Adicione:
```json
{ "id": "gama-financeiro", "name": "Gama Financeiro", "order": 5, "active": true }
```

### 5. Add logo
Salve `public/logos/gama-financeiro.svg`

### 6. Restart e test ✅

---

**Status:** Pronto para adicionar infinitas brands! 🚀
