# 🗺️ Implementation Roadmap — Actions Extension

**Plano detalhado de desenvolvimento em 3 fases (6 dias)**

---

## 📊 Project Overview

| Métrica | Valor |
|---------|-------|
| **Scope** | MVP pessoal/interno |
| **Tech** | Lua 5.1 + Lightroom SDK |
| **Duration** | 6 dias (3 fases) |
| **Testing** | Manual (Lightroom UI) |
| **Deployment** | Local plugin install |

---

## 🎯 Phase 1: Foundation (Days 1-2)

### Goal
Criar estrutura básica para plugin funcionar e salvar/carregar actions.

### Tasks

#### Task 1.1: Plugin Scaffold
- **File:** `Info.lua`
- **Objective:** Menu items + module loading
- **Acceptance:**
  - ✅ Plugin appears in Lightroom menu
  - ✅ Debug log shows no errors on startup
  - ✅ 3 menu items clickable (Create, Manage, Execute)

**Code Outline:**
```lua
-- Info.lua (50 linhas)
return {
  name = "Actions Extension for Lightroom",
  version = "1.0.0",
  modules = { "ActionRegistry.lua", ... },
  menu = { { title = "Create Action", ... } }
}
```

**Estimation:** 4 horas (2h pesquisa SDK, 2h setup)

---

#### Task 1.2: ActionRegistry.lua (Data Layer)
- **File:** `ActionRegistry.lua`
- **Objective:** Save/load actions to JSON
- **Key Functions:**
  - `save(action)` → writes to disk
  - `load(actionId)` → reads from disk
  - `list()` → returns all actions
  - `delete(actionId)` → removes from disk

**Acceptance:**
- ✅ Action saved as valid JSON
- ✅ Load returns exact same data as saved
- ✅ List shows all 5 test actions
- ✅ Delete removes file from disk

**Code Outline:**
```lua
-- ActionRegistry.lua (100 linhas)
local ActionRegistry = {}

function ActionRegistry.save(action)
  local path = getActionsPath() .. action.id .. ".json"
  local json = table.tostring(action)  -- ou use JSON library
  writeFile(path, json)
end

function ActionRegistry.load(actionId)
  local path = getActionsPath() .. actionId .. ".json"
  return readJsonFile(path)
end

return ActionRegistry
```

**Estimation:** 6 horas (2h JSON parsing, 4h file I/O + error handling)

---

#### Task 1.3: LightroomAPI Wrapper
- **File:** `LightroomAPI.lua`
- **Objective:** Abstração para Lightroom SDK (menos boilerplate em BatchExecutor)
- **Key Functions:**
  - `getSelectedPhotos()` → returns photo array
  - `getPhotoDevelopSettings(photo)` → current settings
  - `setPhotoDevelopSetting(photo, setting, value)`
  - `getCatalog()`, `showProgress()`, `logError()`

**Acceptance:**
- ✅ Can retrieve 10 selected photos
- ✅ Can read exposure setting of a photo
- ✅ Can write new exposure value
- ✅ No SDK errors in debug log

**Code Outline:**
```lua
-- LightroomAPI.lua (80 linhas)
local LR = {}

function LR.getSelectedPhotos()
  local catalog = LrApplication.activeCatalog()
  return catalog:getActiveSourceSelections()
end

function LR.setPhotoDevelopSetting(photo, setting, value)
  photo:getDeveloper()[setting] = value
end

return LR
```

**Estimation:** 3 horas (SDK exploration + API design)

---

### Phase 1 Deliverable
✅ Plugin installs  
✅ Actions can be saved/loaded  
✅ SDK integration works  
✅ Ready para Phase 2 (BatchExecutor)

---

## 🎯 Phase 2: Batch Execution (Days 3-4)

### Goal
Implementar core: criar actions via UI + executar em batch de fotos.

### Tasks

#### Task 2.1: ActionBuilder.lua (UI)
- **File:** `ActionBuilder.lua`
- **Objective:** Dialog para criar/editar actions
- **Features:**
  - Input: Action name
  - Dropdown: Action type (Develop, Export, Metadata)
  - Editable table: Steps (add/remove rows)
  - Each step: Setting + Operation + Value
  - Buttons: Save, Cancel

**Acceptance:**
- ✅ Dialog opens without crashes
- ✅ User can add 5 steps
- ✅ User can remove a step
- ✅ Clicking Save triggers ActionRegistry.save()
- ✅ Action appears in list after save

**Code Outline:**
```lua
-- ActionBuilder.lua (200 linhas)
local ActionBuilder = {}

function ActionBuilder.showCreateDialog()
  local dialog = LrDialogs.showModelessDialog("Create Action", {
    actionName = bind("actionName"),
    actionType = bind("actionType"),
    stepsTable = buildStepsEditorTable(),
    buttons = {
      ok = function() saveNewAction() end,
      cancel = function() dismissDialog() end,
    }
  })
end

function buildStepsEditorTable()
  -- Iterative UI: cada step é linha na table
  -- Row: Setting combobox, Operation combobox, Value input, Remove button
end

return ActionBuilder
```

**Estimation:** 8 horas (4h UI learning curve, 4h implementation + polish)

---

#### Task 2.2: BatchExecutor.lua (Core Logic)
- **File:** `BatchExecutor.lua`
- **Objective:** Aplicar action a múltiplas fotos
- **Features:**
  - Load action from ActionRegistry
  - Iterate through selected photos
  - For each photo: apply each step sequentially
  - Progress feedback (photo counter)
  - Error handling (graceful failures)
  - Final report (success/fail count)

**Acceptance:**
- ✅ Can apply 3-step action to 10 photos in < 5 sec
- ✅ All 10 photos show correct settings (verify in Develop panel)
- ✅ Progress shows "Photo 5/10" during execution
- ✅ On error, shows which photo failed (not silent)
- ✅ Final report: "Success: 9/10, Failed: 1"

**Code Outline:**
```lua
-- BatchExecutor.lua (150 linhas)
local BatchExecutor = {}

function BatchExecutor.execute(actionId, selectedPhotos)
  local action = ActionRegistry.load(actionId)
  local successCount = 0
  
  for i, photo in ipairs(selectedPhotos) do
    showProgress(i, #selectedPhotos)
    
    if applyActionToPhoto(photo, action) then
      successCount = successCount + 1
    end
  end
  
  showReport(successCount, #selectedPhotos)
end

function applyActionToPhoto(photo, action)
  for _, step in ipairs(action.steps) do
    local setting = step.setting
    local value = step.value
    local operation = step.operation  -- 'set', 'add', 'multiply'
    
    local newValue = computeValue(
      photo:getDeveloper()[setting],
      value,
      operation
    )
    photo:getDeveloper()[setting] = newValue
  end
  return true
end

return BatchExecutor
```

**Estimation:** 6 horas (2h loop logic, 4h error handling + testing)

---

#### Task 2.3: Dialog Plumbing (Connect UI → Logic)
- **File:** Update `Info.lua` menu handlers
- **Objective:** Wire up menu clicks to dialogs
- **Handlers:**
  - "Create Action" → ActionBuilder.showCreateDialog()
  - "Execute Batch" → ActionBuilder.showExecuteDialog() (dropdown + execute button)
  - "Manage Actions" → ActionBuilder.showListDialog()

**Acceptance:**
- ✅ Click "Create Action" → shows Create dialog
- ✅ Click "Execute Batch" → shows Execute dialog with dropdown
- ✅ Selecting action in dropdown updates preview
- ✅ Click "Execute" button → triggers BatchExecutor

**Estimation:** 4 horas (2h dialog wiring, 2h testing integrations)

---

### Phase 2 Deliverable
✅ User can create action (5 steps)  
✅ User can execute action on 100 photos  
✅ Actions persist and reload  
✅ Core functionality complete (MVP viable)

---

## 🎯 Phase 3: Polish & Documentation (Days 5-6)

### Tasks

#### Task 3.1: Predefined Action Templates
- **File:** `actions/templates.json`
- **Objective:** Ship 5 common presets for users to copy/customize
- **Templates:**
  - Vibrant Portrait
  - High Contrast B&W
  - Faded Warm Vintage
  - Mobile Web Export
  - Archive (grayscale)

**Acceptance:**
- ✅ 5 template actions appear in library after fresh install
- ✅ User can execute template without editing
- ✅ Each template has correct settings (verified visually in test photos)

**Estimation:** 2 horas (1h design, 1h testing)

---

#### Task 3.2: Error Handling & Logging
- **Objective:** Graceful failures, helpful error messages
- **Features:**
  - Try-catch around applyActionToPhoto
  - LrLogger for debug output
  - User-facing error dialog (not technical jargon)
  - Log file written to `logs/` folder

**Acceptance:**
- ✅ On invalid photo, shows "Photo IMG_001 failed (reason: invalid setting)"
- ✅ Batch continues after failure (not stops)
- ✅ Debug log has full stack trace
- ✅ Log file rotates (max 10 MB)

**Estimation:** 3 horas (error scenarios + testing)

---

#### Task 3.3: Documentation
- **Files:**
  - USER_GUIDE.md ✅ (done)
  - DEVELOPMENT.md ✅ (done)
  - API_REFERENCE.md (TODO)

- **Objective:** User can self-serve (onboard without help)

**Content:**
- Quickstart (5 min to first batch)
- Complete workflow guide
- Settings reference
- Troubleshooting
- FAQ

**Acceptance:**
- ✅ USER_GUIDE follows user from install to first batch action
- ✅ All settings documented with ranges + typical use
- ✅ Troubleshooting covers top 5 common issues
- ✅ FAQ answers business logic questions

**Estimation:** 4 horas (writing + screenshots)

---

#### Task 3.4: Testing & QA
- **Objective:** MVP-ready for personal use
- **Test Scenarios:**
  1. Install on clean Lightroom → plugin appears
  2. Create action → save/reload → execute on 10 photos → ✅
  3. Batch 100 photos → no crashes, all updated
  4. Action templates work as-is (no editing needed)
  5. Error handling (invalid settings, no photos selected, etc)
  6. Undo works (Edit → Undo Batch Action)

**Acceptance:**
- ✅ All 6 test scenarios pass
- ✅ No crashes in debug log
- ✅ Performance acceptable (< 30 sec for 100 photos)
- ✅ UI is responsive (no freezes)

**Estimation:** 3 horas (test design + execution)

---

### Phase 3 Deliverable
✅ MVP complete + tested  
✅ 5 predefined actions  
✅ Full documentation  
✅ Ready para uso pessoal

---

## 📁 File Structure

```
GAMA_PHOTO/docs/EXTENSOES/
├── ARCHITECTURE.md              ✅ (done)
├── DEVELOPMENT.md               ✅ (done)
├── USER_GUIDE.md                ✅ (done)
├── IMPLEMENTATION_ROADMAP.md    ✅ (this file)
├── API_REFERENCE.md             🔲 (future)
│
└── LIGHTROOM_PLUGIN/
    ├── Info.lua                 🔲 (Phase 1.1)
    ├── ActionRegistry.lua       🔲 (Phase 1.2)
    ├── ActionBuilder.lua        🔲 (Phase 2.1)
    ├── BatchExecutor.lua        🔲 (Phase 2.2)
    ├── LightroomAPI.lua         🔲 (Phase 1.3)
    ├── Utils.lua                🔲 (Phase 2.3)
    │
    ├── actions/
    │   ├── templates.json       🔲 (Phase 3.1)
    │   └── [user actions saved here]
    │
    └── logs/
        └── [debug logs]
```

---

## 🎯 Success Metrics

### MVP (End of Phase 3)
- ✅ User installs plugin in 2 minutes
- ✅ User creates first action in 5 minutes
- ✅ User executes batch on 50 photos in < 1 minute
- ✅ All changes visible in Develop panel
- ✅ Undo works perfectly
- ✅ No crashes or data loss
- ✅ 5 templates provided (copy/paste ready)

### Beyond MVP (Future Phases)
- [ ] 500+ photo batches without UI freeze
- [ ] Custom action templates shared between users
- [ ] Export batch with multiple formats
- [ ] Lightroom CC support
- [ ] Adobe Exchange distribution

---

## 🚨 Risks & Mitigation

| Risk | Severity | Mitigation |
|------|----------|-----------|
| Lua SDK learning curve | MEDIUM | Use GitHub examples + Adobe docs heavily |
| Lightroom UI dialogs are clunky | MEDIUM | Accept limitations, focus on core logic |
| Performance with 1000+ photos | LOW | Test with 500 first, optimize if needed |
| JSON parsing buggy | LOW | Use battle-tested JSON library (if available) |
| Plugin conflicts | LOW | Use unique namespace prefix (LR_ACT_) |

---

## 📅 Timeline

| Phase | Duration | Start | End | Status |
|-------|----------|-------|-----|--------|
| Phase 1 (Foundation) | 2 days | Day 1 | Day 2 | 🔲 TODO |
| Phase 2 (Batch) | 2 days | Day 3 | Day 4 | 🔲 TODO |
| Phase 3 (Polish) | 2 days | Day 5 | Day 6 | 🔲 TODO |
| **TOTAL** | **6 days** | | | |

---

## 🎓 Knowledge Requirements

| Topic | Resource | Time |
|-------|----------|------|
| Lua 5.1 basics | Lua book or tutorial | 2h |
| Lightroom SDK | Adobe docs + examples | 4h |
| JSON parsing | Built-in or simple lib | 1h |
| Lightroom UI dialogs | SDK reference | 2h |

**Total onboarding:** ~9 hours (included in Phase 1 estimation)

---

## 🔗 Next Steps

1. **Assign @dev** → Start Phase 1 (Info.lua + ActionRegistry)
2. **Daily sync** → Check progress against tasks
3. **Phase 1 exit criteria** → Plugin installs, actions save/load
4. **Phase 2 gate** → Batch execution working on 10 test photos
5. **Phase 3 gate** → All scenarios pass, docs complete
6. **Launch** → Personal/internal use ready

---

**Created by:** @architect (Aria)  
**Date:** 2026-04-28  
**Status:** ✅ Ready for Development  
**Next Assignment:** @dev (Dex)
