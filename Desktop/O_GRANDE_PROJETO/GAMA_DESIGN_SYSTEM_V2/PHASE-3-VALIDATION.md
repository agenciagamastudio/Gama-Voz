# Phase 3: Validação & Cleanup — Checklist

**Data Início:** 2026-04-17  
**Status:** 🔄 EM PROGRESSO  
**Objetivo:** Validar migração completa e limpar arquivos antigos

---

## ✅ Checklist de Validação

### URLs — Todas as rotas funcionam?

- [ ] `/` — Home landing page com Design System intro
- [ ] `/brand/identity` — Brand DNA + Criança Interior
- [ ] `/brand/voice` — Voice & Tone messaging
- [ ] `/brand/applications` — Case studies
- [ ] `/foundations/colors` — Paleta de cores
- [ ] `/foundations/typography` — Tipografia e escalas
- [ ] `/foundations/spacing` — Espaçamento e grid
- [ ] `/foundations/icons` — Ícones disponíveis
- [ ] `/components/atoms` — Componentes atômicos
- [ ] `/components/molecules` — Compostos
- [ ] `/components/organisms` — Complexos
- [ ] `/components/buttons` — Button variants
- [ ] `/components/inputs` — Input fields
- [ ] `/components/badges` — Badges & tags
- [ ] `/components/avatars` — Avatar components
- [ ] `/components/checkboxes` — Checkboxes
- [ ] `/components/toggles` — Toggles/Switches
- [ ] `/components/spinners` — Spinners/Loaders
- [ ] `/components/waveform` — Waveform audio visualizer
- [ ] `/tokens` — Design tokens export

### Responsividade

- [ ] Testar em Mobile (320px) — Drawer menu funciona
- [ ] Testar em Tablet (768px) — Layout adapta
- [ ] Testar em Desktop (1024px+) — Sidebar completo
- [ ] Testar sidebar smart: hover expand/collapse
- [ ] Testar sidebar pin button (stay open)
- [ ] Testar mobile drawer navigation

### Tema (Light/Dark)

- [ ] Dark mode — Cores legíveis
- [ ] Light mode — Contraste OK
- [ ] Theme toggle funciona
- [ ] Persistência (localStorage)

### Conteúdo & Design

- [ ] Criança Interior strategy visível em `/brand/identity`
- [ ] Voice & Messaging completo em `/brand/voice`
- [ ] Cores exibidas corretamente (smart contrast)
- [ ] Tipografia escala responsiva
- [ ] Componentes render sem erros
- [ ] Links internos entre pages funcionam

---

## 🗑️ Cleanup: Remover Brandbook Antigo

### Opção 1: Arquivar (Seguro)
```bash
# Criar pasta arquivo
mkdir -p ARCHIVE/

# Mover Brandbook antigo
mv gama-brandbook/ ARCHIVE/gama-brandbook-deprecated-2026-04-17-migration-complete

# Commit
git add ARCHIVE/
git commit -m "archival: Deprecated gama-brandbook moved to ARCHIVE (migrated to GAMA_DESIGN_SYSTEM_V2)"
```

**Vantagem:** Posso recuperar se necessário  
**Desvantagem:** Ocupa espaço

### Opção 2: Deletar (Irreversível)
```bash
# Remover diretório
rm -rf gama-brandbook/

# Remover do git
git rm -rf gama-brandbook/

# Commit
git commit -m "chore: Remove deprecated gama-brandbook (migrated to GAMA_DESIGN_SYSTEM_V2)"
```

**Vantagem:** Limpa repo, remove duplicação  
**Desvantagem:** Irreversível

---

## 📋 Tarefas Pendentes

1. [ ] **Validação Manual** — Abrir navegador e testar todas as URLs acima
2. [ ] **Testes Mobile** — DevTools mobile view, testar drawer
3. [ ] **QA Comparação** — Abrir Design System v Brandbook antigo lado a lado
4. [ ] **Cleanup Decision** — Escolher Arquivar ou Deletar
5. [ ] **Final Commit** — Documentar Phase 3 completa

---

## 🎯 Resultado Esperado (Phase 3 Complete)

- ✅ Todas URLs testadas no navegador
- ✅ Responsividade verificada (mobile, tablet, desktop)
- ✅ Theme toggle funcionando
- ✅ Sidebar smart funcionando (hover, pin, mobile drawer)
- ✅ Conteúdo Criança Interior visível
- ✅ Design System V2 é brandbook único
- ✅ Arquivo antigo removido/arquivado
- ✅ Documentação Phase 3 completa

---

**Status Final Esperado:**
🟢 **BRANDBOOK MIGRATION 100% COMPLETE — DS V2 IS OFFICIAL BRANDBOOK**

