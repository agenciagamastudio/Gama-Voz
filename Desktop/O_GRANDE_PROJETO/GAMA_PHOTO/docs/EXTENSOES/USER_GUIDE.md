# 📖 User Guide — Actions Extension for Lightroom Classic

**Como usar a extensão para criar e executar actions em batch**

---

## 🎯 O Que É?

**Actions Extension** é um plugin para Lightroom Classic que permite:

1. **Criar actions** — Juntar múltiplos ajustes (exposure, saturação, etc) em 1 "action"
2. **Executar em batch** — Aplicar a ação a 100 fotos de uma vez (não 1 por 1)
3. **Reutilizar** — Salvar actions para usar depois com outras fotos

### Analogia
É como o painel **Actions** do Photoshop, mas para Lightroom (que não tinha nativo).

---

## 🚀 Quick Start (5 minutos)

### 1. Instalar Plugin

```
File → Plugins → Actions Extension → [menu appears]
```

Se não aparecer, ver [DEVELOPMENT.md](DEVELOPMENT.md) seção "Setup Local".

### 2. Criar Sua Primeira Action

```
File → Plugins → Actions Extension → Create Action
```

Aparecerá dialog:
```
┌─────────────────────────────────────┐
│ Create New Action                   │
├─────────────────────────────────────┤
│ Action Name: [Vibrant Portrait____] │
│ Action Type: [Develop Settings▼]    │
│                                     │
│ STEPS:                              │
│ ┌─────────────────────────────────┐ │
│ │ Setting: [Vibrance ▼]           │ │
│ │ Operation: [Set to ▼]           │ │
│ │ Value: [25___________]          │ │
│ │ [+ Add Step] [Remove]           │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ Setting: [Shadows ▼]            │ │
│ │ Operation: [Set to ▼]           │ │
│ │ Value: [-15__________]          │ │
│ │ [+ Add Step] [Remove]           │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [Save Action] [Cancel]              │
└─────────────────────────────────────┘
```

### 3. Usar Action em Batch

Selecione fotos:
```
1. Library view
2. Select multiple photos (Ctrl+Click ou Cmd+Click)
3. File → Plugins → Actions Extension → Execute Batch
```

Dialog:
```
┌─────────────────────────────────────┐
│ Execute Batch Action                │
├─────────────────────────────────────┤
│ Action: [Vibrant Portrait ▼]        │
│ Photos selected: 42                 │
│ [▓▓▓▓░░░░░] 40%                     │
│                                     │
│ Processing: IMG_001.RAW             │
│ Status: ✅ Success                   │
│ [Execute] [Cancel]                  │
└─────────────────────────────────────┘
```

Pronto! 42 fotos recebem os mesmos ajustes automaticamente.

---

## 📚 Complete Workflow

### Cenário 1: Quick Preset (5 min)

```
📸 Você tem 50 fotos de retrato
🎯 Quer aplicar: vibrance +25, shadows -15, highlights -10

STEPS:
1. Select 50 photos
2. Create Action "Quick Portrait"
   - Vibrance: 25
   - Shadows: -15
   - Highlights: -10
3. Execute Batch
4. Done! ✅ (30 segundos de processamento)
```

### Cenário 2: Template Reutilizável (ongoing)

```
📸 Você tem cliente "ACME Corp" que sempre quer mesmo look
🎯 Quer economizar tempo

STEPS:
1. Create Action "ACME Brand Color"
   - Calibration: +5
   - Vibrance: +20
   - Saturation: +15
   - Color cast fix (blue channel -10)

2. Save in "Library" (fica salvo forever)

LATER (próxima sessão):
1. Import novas fotos "ACME Corp"
2. Select all
3. Execute Batch → "ACME Brand Color"
4. Done! ✅
```

### Cenário 3: Export Batch (futura feature)

```
📸 50 fotos já editadas
🎯 Quer exportar todas em 3 resoluções diferentes

Create Action "Export Web"
  - Resize: 1920x1080
  - Format: JPEG
  - Quality: 85
  - Location: ~/Desktop/Web/

Execute Batch on 50 photos
→ 50 imagens exportadas em paralelo
```

---

## 🎨 Available Settings

### Develop Settings (Exposição, Cor, Tom)

| Setting | Range | Typical Use |
|---------|-------|------------|
| **Exposure** | -5 to +5 | Brightness overall |
| **Contrast** | -100 to +100 | Punch/flatten |
| **Highlights** | -100 to +100 | Bright areas |
| **Shadows** | -100 to +100 | Dark areas |
| **Whites** | -100 to +100 | White clipping |
| **Blacks** | -100 to +100 | Black clipping |
| **Vibrance** | -100 to +100 | Colorful without oversaturate |
| **Saturation** | -100 to +100 | Chromatic intensity |
| **Temperature** | 2000 to 50000 K | Warmth/coolness |
| **Tint** | -100 to +100 | Magenta/green cast |
| **Clarity** | -100 to +100 | Midtone contrast |
| **Dehaze** | -100 to +100 | Atmospheric haze |

### Operations

| Operation | Example | Use |
|-----------|---------|-----|
| **Set to** | Exposure = 2.0 | Replace valor |
| **Add** | Vibrance += 25 | Incrementar |
| **Multiply** | Saturation *= 1.1 | Percentual aumento |

---

## 🗂️ Manage Actions Library

### View All Actions

```
File → Plugins → Actions Extension → Manage Actions
```

Dialog mostra:
```
┌────────────────────────────────────┐
│ Actions Library                    │
├────────────────────────────────────┤
│ ☑ Vibrant Portrait                │
│ ☑ High Contrast B&W               │
│ ☐ Faded Warm                      │
│ ☑ Mobile Web Export               │
│                                    │
│ [Edit] [Delete] [Duplicate] [New] │
└────────────────────────────────────┘
```

### Edit Action

Click ação → [Edit] → dialog abre (mesmo que Create)

### Delete Action

Click ação → [Delete] → Confirm

### Disable Action (Uncheck)

Ações desabilitadas não aparecem no "Execute Batch" dropdown.
(Útil para manter biblioteca limpa sem deletar actions antigas)

---

## ⚙️ Settings & Configuration

### Location of Actions

Salvas em:

**macOS:**
```
~/Library/Application Support/Adobe/Lightroom/Plugins/ActionsExtension/actions/
```

**Windows:**
```
C:\Users\[YourUsername]\AppData\Roaming\Adobe\Lightroom\Plugins\ActionsExtension\actions\
```

Each action is a `.json` file.

### Manual Editing (Advanced)

Você pode editar actions.json diretamente:

```json
{
  "id": "action_vibrant_portrait_001",
  "name": "Vibrant Portrait",
  "steps": [
    { "setting": "vibrance", "value": 25, "operation": "set" },
    { "setting": "shadows", "value": -15, "operation": "set" }
  ]
}
```

(Restart Lightroom para recarregar)

---

## 🚨 Troubleshooting

### Plugin não aparece no menu

**Solução:**
1. Verificar se Info.lua está no plugin folder
2. Restart Lightroom (quit completamente)
3. Check plugin folder permissions

### Action não salvou

**Solução:**
1. Check disk space
2. Verify `actions/` folder existe
3. Check file permissions (writable)

### Batch execution crashes

**Solução:**
1. Try com fewer photos primeiro (e.g., 5)
2. Check action JSON is valid
3. Look for invalid setting names
4. Try cada step individualmente

### Photos not updating

**Solução:**
1. Refresh Develop panel (click photo twice)
2. Check if operation value is valid for setting
3. Try "Set to" operation (menos ambíguo que Add/Multiply)

---

## 💡 Tips & Tricks

### Tip 1: Batch Test
Create test action com 1 step → Test em 3 photos → Expand depois

### Tip 2: Undo Works
Batch execution usa standard Lightroom undo
```
Edit → Undo Batch Action
```

### Tip 3: Before/After
Use Lightroom's split view (Y key) after batch to see changes

### Tip 4: Action Library Backup
```
File → Export Catalog...
```
Inclui seu actions.json na backup

### Tip 5: Performance
Para 1000+ fotos:
- Batch em chunks de 100 (permite UI responsiveness)
- Use simpler actions (menos steps = mais rápido)
- Feche paletas desnecessárias (reduz render)

---

## 📝 Common Actions Templates

### Preset 1: Vibrant Portrait
```
- Vibrance: +25
- Shadows: -15
- Highlights: -5
- Saturation: +10
```

### Preset 2: High Contrast B&W
```
- Vibrance: 0
- Saturation: -100 (converts to B&W)
- Contrast: +30
- Clarity: +20
```

### Preset 3: Faded Warm
```
- Exposure: +0.5
- Temperature: +500 (warmer)
- Vibrance: -20 (less color)
- Highlights: +15
- Shadows: +5
```

### Preset 4: Mobile Web (Export)
```
- Exposure: 0
- Resize: 1920px (longest edge)
- Format: JPEG
- Quality: 85%
```

### Preset 5: Archive (grayscale)
```
- Saturation: -100
- Exposure: 0
- Clarity: -5 (softer)
```

---

## 🔗 Related Documents

- [ARCHITECTURE.md](ARCHITECTURE.md) — How it works (technical)
- [DEVELOPMENT.md](DEVELOPMENT.md) — How to extend it
- [API_REFERENCE.md](API_REFERENCE.md) — Lua API details

---

## 📞 Support

### Bugs
1. Check debug log: `File → Plugins → Actions Extension → Show Debug Log`
2. Note error message + steps to reproduce
3. Save debug log (File → Save)

### Feature Requests
Think about workflow and how action would help.
Examples:
- "Add support for keyword tags" → Create action type "Metadata"
- "Batch export with multiple formats" → Extend action types

### Questions
See [FAQ](#faq) below.

---

## FAQ

**Q: Can I use actions from Photoshop directly?**  
A: No. Photoshop actions are different format. But you can recreate them step-by-step.

**Q: How many photos can I batch process at once?**  
A: Tested up to 500. Beyond that, use chunks of 100.

**Q: Can I batch process RAW + JPEG in same action?**  
A: Yes. Action works on any photo format.

**Q: Are actions stored in Lightroom catalog or outside?**  
A: Outside. They're in plugin folder (survives catalog rebuilds).

**Q: Can I share actions with others?**  
A: Yes! Just copy `.json` file from `actions/` folder to their plugin folder.

**Q: What if Lightroom crashes mid-batch?**  
A: Undo will only undo up to crash point. Just re-run action on remaining photos.

**Q: Can I edit actions while batch is running?**  
A: No. Lightroom UI will be locked during execution.

---

**Last Updated:** 2026-04-28  
**Version:** 1.0.0 (MVP)
