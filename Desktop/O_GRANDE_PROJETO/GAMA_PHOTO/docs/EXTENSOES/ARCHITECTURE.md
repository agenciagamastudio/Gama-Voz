# 🏛️ Lightroom Classic Actions Extension — Architecture

**Data:** 2026-04-28  
**Status:** Architecture Design (Phase 0)  
**Objetivo:** Criar sistema genérico de actions para Lightroom Classic (batch processing)  
**Escopo:** MVP pessoal/interno (5-10 actions + custom action creator)

---

## 📐 System Overview

### O Problema
Lightroom Classic não possui painel "Actions" nativo como Photoshop. Processar 100 fotos com mesmos ajustes requer:
- ❌ Clicar cada foto + aplicar preset (100x repetitivo)
- ❌ Ou escrever Lua bruto (usuário não-técnico não consegue)

### A Solução
**Plugin Lightroom que permite:**
1. **Criar actions** via interface (não-código, visual ou form)
2. **Executar em batch** (aplicar 1 action a múltiplas fotos)
3. **Salvar/reutilizar** (library de actions)

### Por Quê Lua?
- ✅ Lightroom Classic SDK é **oficial Adobe + maduro** (20+ anos)
- ✅ Lua é **leve e rápido** (perfeito para batch processing)
- ✅ Integração **nativa** com Lightroom (não é wrapper/hack)
- ✅ Documentação **existe** (Adobe SDK guide + exemplos GitHub)

---

## 🏗️ Architecture Layers

```
┌─────────────────────────────────────────────────┐
│  USER INTERFACE LAYER (Lightroom Dialogs)       │
│  ├─ Action Creator Panel (visual/form builder)  │
│  ├─ Actions Library (list, edit, delete)        │
│  └─ Batch Executor UI (select photos + run)     │
└────────────────┬────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────┐
│  APPLICATION LOGIC LAYER (Lua Orchestrator)     │
│  ├─ Action Registry (load/save/validate)        │
│  ├─ Batch Executor (iterate photos + apply)     │
│  ├─ Action Compiler (form → Lua code)           │
│  └─ Error Handler (graceful failures)           │
└────────────────┬────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────┐
│  LIGHTROOM SDK LAYER (Native Integration)       │
│  ├─ Photo Catalog Interface (photos in library) │
│  ├─ Develop Settings API (exposure, color, etc) │
│  ├─ File System API (read/write metadata)       │
│  └─ Export Module (optional: batch export)      │
└─────────────────────────────────────────────────┘
```

---

## 📦 Component Architecture

### 1. **Info.lua** (Plugin Manifest)
```lua
return {
  -- Plugin metadata
  name = "Actions Extension for Lightroom",
  version = "1.0.0",
  author = "GAMA Photo",
  
  -- Menu items
  menu = {
    { title = "Create Action", action = "createActionDialog" },
    { title = "Manage Actions", action = "manageActionsDialog" },
    { title = "Execute Batch", action = "executeBatchDialog" },
  },
  
  -- Modules
  modules = {
    "ActionRegistry.lua",      -- Gerencia actions (load/save)
    "ActionBuilder.lua",       -- UI para criar actions
    "BatchExecutor.lua",       -- Executa actions em batch
    "LightroomAPI.lua",        -- Wrapper da API Lightroom
  }
}
```

### 2. **ActionRegistry.lua** (Data Management)
```lua
-- Armazena e carrega actions do disco
-- Formato: JSON (fácil editar manualmente, se necessário)
-- Location: ~/.config/Adobe/Lightroom/Plugins/ActionsExtension/actions/

-- Estrutura de uma action:
{
  id = "action_001",
  name = "Vibrant Portrait",
  description = "Aumenta saturação e reduz sombras",
  type = "develop",  -- 'develop' | 'export' | 'metadata'
  enabled = true,
  steps = [
    { 
      setting = "vibrance",
      value = 25,
      operation = "set"  -- 'set' | 'add' | 'multiply'
    },
    { 
      setting = "shadows",
      value = -15,
      operation = "set"
    },
    -- ... mais steps
  ]
}
```

### 3. **ActionBuilder.lua** (UI - Action Creator)
```lua
-- Cria ações via interface do Lightroom (dialogs + buttons)
-- Padrão: Form-based (usuário seleciona setting + valor)

function createActionDialog()
  -- Dialog windows.lua (nativo Lightroom)
  local dialog = LrDialogs.showModelessDialog(
    "Create New Action",
    -- View table (UI elements)
    {
      -- Input: nome da action
      actionName = bind("actionName"),
      -- Select: tipo (Develop, Export, Metadata)
      actionType = bind("actionType"),
      -- Table: steps editor
      stepsTable = buildStepsTable(),
      -- Buttons
      buttons = {
        ok = function() saveAction() end,
        cancel = function() dismissDialog() end,
      }
    }
  )
end

function buildStepsTable()
  -- Table interativa onde usuário:
  -- 1. Seleciona setting (combobox: exposure, vibrance, etc)
  -- 2. Seleciona operação (combobox: set, add, multiply)
  -- 3. Digita valor (input numérico)
  -- 4. Clica "Add Step" (button)
  -- 5. Preview em tempo real (optional)
end
```

### 4. **BatchExecutor.lua** (Core Logic)
```lua
-- Aplica uma action a múltiplas fotos

function executeBatch(actionId, selectedPhotos)
  local action = ActionRegistry.load(actionId)
  
  if not action.enabled then
    error("Action disabled")
  end
  
  -- Iteração sobre fotos
  local catalog = LrApplication.activeCatalog()
  local successCount = 0
  local failCount = 0
  
  for i, photo in ipairs(selectedPhotos) do
    -- Progress dialog
    showProgress(i, #selectedPhotos)
    
    -- Aplicar cada step da action
    local success = applyActionToPhoto(photo, action)
    
    if success then
      successCount = successCount + 1
    else
      failCount = failCount + 1
    end
  end
  
  -- Report final
  showReport(successCount, failCount)
end

function applyActionToPhoto(photo, action)
  -- Para cada step na action
  for _, step in ipairs(action.steps) do
    local setting = step.setting  -- e.g., "exposure"
    local value = step.value      -- e.g., 2.0
    local operation = step.operation  -- e.g., "set"
    
    -- Aplicar setting
    local newValue = computeValue(photo, setting, value, operation)
    
    -- Usar Lightroom API para atualizar
    photo:getDeveloper()[setting] = newValue
  end
  
  return true  -- ou false se error
end
```

---

## 🗄️ Data Model

### Actions Storage
```
~/.config/Adobe/Lightroom/Plugins/ActionsExtension/
├── actions.json          (array de todas as actions)
├── presets/
│   ├── preset_001.lua    (preset Lightroom nativo, se export)
│   └── preset_002.lua
└── logs/
    └── batch_*.log       (auditoria de execuções)
```

### Estrutura JSON de Action
```json
{
  "id": "action_vibrant_portrait_001",
  "name": "Vibrant Portrait",
  "description": "Aumenta vibrance, reduz sombras",
  "type": "develop",
  "category": "Portrait",
  "created": "2026-04-28T10:30:00Z",
  "enabled": true,
  "steps": [
    {
      "id": "step_001",
      "setting": "vibrance",
      "value": 25,
      "operation": "set"
    },
    {
      "id": "step_002",
      "setting": "shadows",
      "value": -15,
      "operation": "set"
    }
  ],
  "metadata": {
    "version": "1.0",
    "lastModified": "2026-04-28T10:30:00Z",
    "author": "User"
  }
}
```

---

## 🔌 API Design

### Public Interface (expostos ao usuário)
```lua
-- Executar action
LR.executeAction(actionId: string, photos: Photo[]) -> {success, error}

-- Criar action
LR.createAction(name: string, steps: Step[]) -> actionId

-- Listar actions
LR.listActions() -> Action[]

-- Editar action
LR.updateAction(actionId: string, action: Action) -> success

-- Deletar action
LR.deleteAction(actionId: string) -> success

-- Salvar action em disco
LR.saveAction(action: Action) -> success

-- Carregar action do disco
LR.loadAction(actionId: string) -> Action
```

### Internal API (componentes falam uns com os outros)
```lua
-- ActionRegistry
ActionRegistry.save(action)
ActionRegistry.load(actionId)
ActionRegistry.delete(actionId)
ActionRegistry.list()

-- BatchExecutor
BatchExecutor.execute(actionId, photos)
BatchExecutor.preview(actionId, photo)  -- opcional

-- ActionBuilder (UI)
ActionBuilder.showCreateDialog()
ActionBuilder.showEditDialog(actionId)
ActionBuilder.showListDialog()
```

---

## 🚀 Implementation Strategy

### Phase 1: Foundation (Days 1-2)
- [ ] Setup plugin scaffold (Info.lua + estrutura)
- [ ] Implement ActionRegistry (JSON load/save)
- [ ] Create LightroomAPI wrapper (abstração da SDK)
- [ ] Build ActionBuilder UI (form simples)
- **Output:** Usuário consegue criar + salvar action básica

### Phase 2: Batch Execution (Days 3-4)
- [ ] Implement BatchExecutor (loop + apply)
- [ ] Add progress dialog (feedback visual)
- [ ] Error handling (try-catch graceful)
- [ ] Test com 10+ fotos
- **Output:** Usuário consegue executar action em batch

### Phase 3: Polish (Days 5-6)
- [ ] Actions Library UI (list, edit, delete)
- [ ] Templates predefinidos (5 common actions)
- [ ] Logging + audit trail
- [ ] Documentation + user guide
- **Output:** MVP pronto para uso pessoal

### Phase 4: Future (Post-MVP)
- [ ] Advanced UI (drag-drop, preview)
- [ ] Export preset integration
- [ ] Cloud sync (se necessário)
- [ ] Distribution (Adobe Exchange)

---

## 🛠️ Tech Stack Detail

| Layer | Technology | Why | Alternative |
|-------|-----------|-----|-------------|
| **Language** | Lua 5.1 | Lightroom SDK nativo | C++ (mais complexo) |
| **UI Framework** | Lightroom SDK dialogs | Nativo, sem dependências | wxWidgets (não suportado) |
| **Data Storage** | JSON (local disk) | Humano-legível, fácil editar | SQLite (overhead) |
| **Logging** | File-based (plain text) | Simples, debugável | Syslog (overkill) |
| **Testing** | Manual (sandbox Lightroom) | SDK não tem unit test framework | Mock Lightroom (complexo) |
| **Versioning** | Semantic (1.0.0) | Padrão industria | Outro |
| **Distribution** | Local plugin folder | Pessoal/interno | Adobe Exchange (futuro) |

---

## 📊 Data Flow Diagram

```
USER SELECTS PHOTOS
        │
        ▼
USER CLICKS "EXECUTE BATCH"
        │
        ▼
BATCH EXECUTOR DIALOG (UI)
  ├─ Dropdown: Select action
  ├─ Button: "Execute"
  └─ Progress bar
        │
        ▼
BATCH EXECUTOR (Logic)
  ├─ For each photo:
  │   ├─ Load action definition
  │   ├─ For each step:
  │   │   └─ Apply develop setting
  │   └─ Save photo metadata
  └─ Show report (success/fail count)
        │
        ▼
LIGHTROOM CATALOG UPDATED
  ├─ Photo metadata saved
  ├─ Develop panel reflects changes
  └─ User can undo (standard Lightroom)
```

---

## ⚠️ Risks & Mitigation

| Risk | Severity | Mitigation |
|------|----------|-----------|
| **Lua debugging is primitive** | HIGH | Verbose logging, LrLogger namespace, manual testing |
| **Lightroom UI is slow with 1000+ photos** | MEDIUM | Batch in chunks of 100, progress callback, option to async |
| **SDK documentation is sparse** | MEDIUM | Read Adobe SDK guide PDF, study GitHub examples, trial-and-error |
| **Undo/Redo not atomic for batch** | MEDIUM | Document limitation, offer "rollback" action |
| **Performance on old machines** | LOW | Profile with smaller batches, optimize loops |
| **Plugin conflicts with other plugins** | LOW | Use unique namespace prefix (LR_ACT_*) |

---

## 🎯 Success Criteria

### MVP Phase
- ✅ User can create action via UI (5 minutes)
- ✅ User can execute action on 10 photos (< 5 seconds)
- ✅ Action is saved and reusable
- ✅ No crashes or data loss
- ✅ Error messages are clear

### Beyond MVP
- ✅ 20+ predefined actions available
- ✅ Batch sizes up to 500 photos
- ✅ Action library searchable
- ✅ Documented + shareable presets

---

## 📝 File Structure

```
GAMA_PHOTO/
├── docs/EXTENSOES/
│   ├── ARCHITECTURE.md           (este arquivo)
│   ├── LIGHTROOM_PLUGIN/
│   │   ├── Info.lua              (plugin manifest)
│   │   ├── ActionRegistry.lua    (data management)
│   │   ├── ActionBuilder.lua     (UI creator)
│   │   ├── BatchExecutor.lua     (core logic)
│   │   ├── LightroomAPI.lua      (SDK wrapper)
│   │   ├── Utils.lua             (helpers)
│   │   └── actions.json          (action library)
│   ├── DEVELOPMENT.md            (setup guide)
│   ├── USER_GUIDE.md             (how to use)
│   └── REFERENCE.md              (API docs)
```

---

## 🔄 Deployment Strategy

### Local Development
```bash
# Copy plugin folder to Lightroom plugins directory
cp -r LIGHTROOM_PLUGIN ~/Library/Application\ Support/Adobe/Lightroom/Plugins/ActionsExtension

# Or on Windows
copy LIGHTROOM_PLUGIN "C:\Users\%USERNAME%\AppData\Roaming\Adobe\Lightroom\Plugins\ActionsExtension"

# Restart Lightroom
# Plugin should appear in menu "File > Plugins > Actions Extension"
```

### Personal/Internal Use
- No signing needed (local only)
- Manual installation
- Manual backup of actions.json

### Future (Adobe Exchange)
- Code signing (Adobe process)
- Automated installation
- Version management

---

## 🎓 References

**Lightroom SDK:**
- [Adobe Lightroom Classic SDK Guide (PDF)](https://www.adobe.io/open/standards/PDFS/LightroomSDK.pdf)
- [Official Adobe Lightroom Developer Site](https://developer.adobe.com/lightroom-classic/)
- [GitHub Examples](https://github.com/Jaid/lightroom-sdk-8-examples)

**Lua in Lightroom:**
- [Sam Rambles: Writing Lightroom Classic Plugins](https://samrambles.com/guides/writing-lightroom-classic-plugins/index.html)
- [Rob Allen: Lightroom Plugin Tutorial](https://akrabat.com/writing-a-lightroom-classic-plug-in/)

**Batch Processing Pattern:**
- [Adobe SDK: Export Filter Providers](https://developer.adobe.com/lightroom-classic/)

---

## ✅ Next Steps

1. **Phase 1 Kickoff** — Setup plugin scaffold + ActionRegistry
2. **Coordinate with @dev** — Implementation begins
3. **Testing in Lightroom** — Manual QA (no automated testing framework)
4. **User feedback** — Refine UI based on first 10 actions
5. **Documentation** — Create user guide after Phase 2

---

**Arquitetura por:** Aria (Architect)  
**Data:** 2026-04-28  
**Status:** ✅ Ready for Development
