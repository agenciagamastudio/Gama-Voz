# QA Charts Validation — Quick Start Guide

**Ativação:** Quando Tasks 6 e 7 forem concluídas, usar este guia para execução rápida.

---

## 1️⃣ Pre-Execution Checklist

Antes de começar a validação:

```bash
# Parar servidor se rodando
npm run dev   # Ctrl+C para parar

# Instalar dependências (se necessário)
npm install

# Build para garantir que código está limpo
npm run build

# Iniciar servidor de desenvolvimento
npm run dev

# Em outro terminal, abrir DevTools
# Chrome/Edge: F12 → Elements + Console + Network + Performance
```

---

## 2️⃣ Teste Visual (5 min)

**Objetivo:** Verificar se gráficos aparecem e têm cores corretas.

### Dashboard Page
```
1. Ir para http://localhost:3000/dashboard
2. Scrollar para ver todos os 5 gráficos
3. Verificar cores:
   - Background: #0A0A0A ou #1A1A1A ✓
   - Primary: #88CE11 (verde neon) ✓
   - Text: #FFFFFF ✓
4. Sem overflow em largura? ✓
5. Títulos legíveis? ✓
6. Legendas visíveis? ✓
```

### Reports Page
```
1. Ir para http://localhost:3000/reports
2. Procurar GaugeMetas e HistoricalProfitChart
3. Verificar cores e layout
4. Scroll horizontal não necessário? ✓
```

---

## 3️⃣ Teste Interativo (5 min)

**Objetivo:** Verificar tooltips, legendas clicáveis, zoom/pan.

### Tooltips
```
1. BarChartDRE: Hover sobre barra
   → Tooltip aparece com valor? ✓
   → Desaparece ao sair? ✓

2. PieChartCustos: Hover sobre segmento
   → Tooltip com percentual? ✓

3. HistoricalProfitChart: Hover sobre ponto
   → Data + valor aparecem? ✓
```

### Legendas
```
1. Clicar em item da legenda
   → Série desaparece/reaparece? ✓
   → Cores mudam para gray (series hidden)? ✓
```

---

## 4️⃣ Teste de Dados (5 min)

**Objetivo:** Verificar valores, formatação, sem NaN/undefined.

### Console Check
```
Chrome DevTools → Console tab
1. Nenhum erro RED? ✓
2. Warnings amarelos aceitáveis:
   - "ResizeObserver loop limit exceeded" → OK
   - "React did not finish hydration" → OK (Next.js)
3. Nenhum erro de "Cannot read property"? ✓
```

### Valores Visíveis
```
1. BarChartDRE: valores em R$ (ex: R$ 1.234,56)? ✓
2. PieChartCustos: percentuais com % (ex: 45%)? ✓
3. GaugeMetas: número entre 0-100%? ✓
4. Nenhum "NaN" ou "undefined" visível? ✓
```

---

## 5️⃣ Teste Responsivo (5 min)

**Objetivo:** Verificar layout em mobile/tablet/desktop.

### DevTools Device Toggle
```
Chrome: F12 → top-left "Toggle device toolbar"

MOBILE (375px):
- 1 gráfico por linha? ✓
- Sem scroll horizontal? ✓
- Legendas não cortadas? ✓

TABLET (768px):
- 2 gráficos por linha? ✓
- Espaçamento ok? ✓

DESKTOP (1920px):
- 2-3 gráficos por linha? ✓
- Legibilidade máxima? ✓
```

---

## 6️⃣ Teste Performance (3 min)

**Objetivo:** Verificar render time e lighthouse.

### Lighthouse
```
Chrome DevTools → Lighthouse tab
1. Click "Analyze page load"
2. Aguardar ~30s
3. Verificar scores:
   - Performance > 80? ✓
   - Accessibility > 80? ✓
   - Best Practices > 80? ✓
```

### Performance Tab
```
1. DevTools → Performance tab
2. Click record
3. Reload página (Ctrl+Shift+R)
4. Stop após 5-10s
5. Verificar:
   - FCP < 1.5s? ✓
   - LCP < 2.5s? ✓
   - CLS < 0.1? ✓
```

---

## 7️⃣ Teste Acessibilidade (3 min)

**Objetivo:** Verificar ARIA, contraste, navegação keyboard.

### Axe DevTools
```
1. Instalar "Axe DevTools" Chrome extension
2. DevTools → Axe DevTools tab
3. Scan página
4. Crítico: nenhum erro RED? ✓
5. Avisos: revisar recomendações
```

### Keyboard Navigation
```
1. Clicar em gráfico
2. Tab para próximo gráfico
3. Enter abre tooltip/detalhe (se implementado)
4. Foco visível (outline)? ✓
```

---

## 8️⃣ Documento Final

**Quando acabar a validação:**

```
1. Documentar bugs encontrados em QA-CHARTS-VALIDATION.md
   Section "Bugs Encontrados"

2. Preencher checklist completo:
   [ ] Renderização Visual
   [ ] Interatividade
   [ ] Dados & Formatação
   [ ] Responsividade
   [ ] Performance
   [ ] Acessibilidade
   [ ] Bugs/Console
   [ ] Regressões

3. Preencher "Overall Result":
   - [ ] PASS
   - [ ] FAIL
   - [ ] PASS WITH CONCERNS

4. Preencher "Sign-off":
   Date, Agent, Status

5. Fazer commit:
   git add docs/qa/
   git commit -m "qa: validação gráficos Recharts [Charts-QA-Final]"
```

---

## 🎯 Tempo Total

- Visual: 5 min
- Interativo: 5 min
- Dados: 5 min
- Responsivo: 5 min
- Performance: 3 min
- Acessibilidade: 3 min
- Documentar: 5 min

**TOTAL: ~30-40 minutos**

---

## 📋 Template para Console (Copy-Paste)

Quando rodar testes no console do Chrome:

```javascript
// Verificar se gráficos foram renderizados
console.log("Gráficos no DOM:", document.querySelectorAll('[role="img"]').length);

// Verificar cores primárias
const charts = document.querySelectorAll('svg');
console.log("SVG count:", charts.length);

// Verificar erros de React
console.log("React errors:", document.querySelectorAll('[data-testid*="error"]').length);
```

---

## 🚨 Escalação

Se encontrar:

**CRITICAL Issue:**
- Crash/erro que impede página carregar
- Data visível incorreta (financial data wrong)
- Gráfico não renderiza em nenhuma viewport
→ Assignar para @dev imediatamente, bloqueador

**HIGH Issue:**
- Performance < 2s
- Accessibility score < 70
- Tooltip quebrado
→ Assignar para @dev, antes de merge

**MEDIUM Issue:**
- Warnings no console
- Legends não funcionam
- Layout ligeiramente off
→ Document in "Recomendações"

**LOW Issue:**
- Sugestões de melhoria
- Nice-to-have features
→ Backlog futuro

---

**Executar quando:** Tasks 6 e 7 completas
**Status:** READY QUANDO SIGNAL FOR DADO
**Referência:** `docs/qa/QA-CHARTS-VALIDATION.md`
