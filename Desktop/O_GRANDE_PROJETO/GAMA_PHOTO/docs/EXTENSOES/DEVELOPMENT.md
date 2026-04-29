# 🛠️ Development Guide — Lightroom Actions Extension

**Setup, Build, Test, Deploy localmente**

---

## 📋 Prerequisites

### Software
- **Lightroom Classic** (2020.1 ou superior)
- **Text Editor** (VS Code, Sublime, ou qualquer editor Lua)
- **Git** (para versionamento)

### Knowledge
- Lua 5.1 (básico — loops, tables, functions)
- JSON (estrutura de dados)
- Lightroom UI concepts (dialogs, buttons)

---

## ⚙️ Setup Local

### 1. Clone/Setup Repository

```bash
# No GAMA_PHOTO/docs/EXTENSOES/
mkdir -p LIGHTROOM_PLUGIN/actions
cd LIGHTROOM_PLUGIN

# Criar arquivo Info.lua inicial
cat > Info.lua << 'EOF'
return {
  name = "Actions Extension for Lightroom",
  version = "1.0.0",
  author = "GAMA Photo",
  description = "Create and execute batch actions on photos",
  
  menu = {
    { title = "Create Action", action = "createActionDialog" },
    { title = "Manage Actions", action = "manageActionsDialog" },
    { title = "Execute Batch", action = "executeBatchDialog" },
  },
  
  modules = {
    "ActionRegistry.lua",
    "ActionBuilder.lua",
    "BatchExecutor.lua",
    "LightroomAPI.lua",
  }
}
EOF
```

### 2. Install Plugin to Lightroom

**macOS:**
```bash
# Copy plugin folder
cp -r LIGHTROOM_PLUGIN ~/Library/Application\ Support/Adobe/Lightroom/Plugins/ActionsExtension

# Create actions directory
mkdir -p ~/Library/Application\ Support/Adobe/Lightroom/Plugins/ActionsExtension/actions
```

**Windows:**
```cmd
REM Copy plugin folder
xcopy LIGHTROOM_PLUGIN "C:\Users\%USERNAME%\AppData\Roaming\Adobe\Lightroom\Plugins\ActionsExtension" /E /I

REM Create actions directory
mkdir "C:\Users\%USERNAME%\AppData\Roaming\Adobe\Lightroom\Plugins\ActionsExtension\actions"
```

**Linux (se suportado):**
```bash
cp -r LIGHTROOM_PLUGIN ~/.config/Adobe/Lightroom/Plugins/ActionsExtension
mkdir -p ~/.config/Adobe/Lightroom/Plugins/ActionsExtension/actions
```

### 3. Restart Lightroom

```
File → Plugins → Actions Extension → [menu items should appear]
```

---

## 🔨 Development Workflow

### 1. Create Module File

Exemplo: criar `ActionRegistry.lua`

```lua
-- ActionRegistry.lua
-- Gerencia actions (load, save, delete)

local ActionRegistry = {}

function ActionRegistry.save(action)
  -- Save to JSON
end

function ActionRegistry.load(actionId)
  -- Load from JSON
end

return ActionRegistry
```

### 2. Add to Info.lua

```lua
modules = {
  "ActionRegistry.lua",  -- Adicionar
  "ActionBuilder.lua",
  "BatchExecutor.lua",
  "LightroomAPI.lua",
}
```

### 3. Test in Lightroom

```
File → Plugins → Actions Extension → [menu item]
```

### 4. Debug with Logging

Use `LrLogger` (nativo Lightroom):

```lua
local logger = import 'Logging'.namespace('ActionsExtension')

function ActionRegistry.save(action)
  logger:info("Saving action: " .. action.name)
  
  if not action.name then
    logger:error("Action has no name!")
    return false
  end
  
  -- Save logic
  logger:info("Action saved successfully")
  return true
end
```

Ver logs via:
```
File → Plugins → Actions Extension → Show Debug Log
```

---

## 📝 Module Checklist

| Module | Responsibility | Status |
|--------|----------------|--------|
| **Info.lua** | Plugin manifest, menu items | 🔲 TODO |
| **ActionRegistry.lua** | Load/save actions from disk | 🔲 TODO |
| **ActionBuilder.lua** | UI for creating actions | 🔲 TODO |
| **BatchExecutor.lua** | Apply action to multiple photos | 🔲 TODO |
| **LightroomAPI.lua** | Wrapper for Lightroom SDK | 🔲 TODO |
| **Utils.lua** | Helper functions | 🔲 TODO |

---

## 🧪 Testing Strategy

### Unit Test (Manual)
```lua
-- Test ActionRegistry
local action = {
  name = "Test Action",
  steps = { { setting = "exposure", value = 1.0 } }
}

ActionRegistry.save(action)
local loaded = ActionRegistry.load(action.id)

assert(loaded.name == "Test Action", "Save/load failed")
```

### Integration Test (Manual in Lightroom)
```
1. Open Lightroom
2. Select 3 test photos
3. Create action "Test" via UI
4. Execute action on 3 photos
5. Verify all 3 photos have new settings
6. Undo (should revert)
```

### Edge Cases to Test
- ✅ Empty actions list
- ✅ Invalid JSON file
- ✅ No photos selected
- ✅ Lightroom quit mid-batch
- ✅ Corrupted action file

---

## 📦 Lua Syntax Reference

### Basic Structure
```lua
-- Comment
local myTable = {
  name = "value",
  count = 42,
  items = { "a", "b", "c" }
}

-- Functions
function myFunction(param)
  print("Hello " .. param)
  return true
end

-- Tables with functions
local MyModule = {}

function MyModule.doSomething()
  return "Done"
end

return MyModule
```

### Common Lightroom Patterns
```lua
-- Import module
local logger = import 'Logging'.namespace('MyPlugin')

-- Active catalog
local catalog = LrApplication.activeCatalog()

-- Selected photos
local selectedPhotos = catalog:getActiveSourceSelections()

-- Dialog
local result = LrDialogs.askForActionWithAltView(
  "Title",
  "Message",
  { action = "OK", default = true, cancel = "Cancel" }
)

-- Update photo metadata
for _, photo in ipairs(selectedPhotos) do
  photo:getDeveloper().exposure = photo:getDeveloper().exposure + 1
end
```

---

## 🐛 Common Issues & Fixes

### Issue: "Plugin not appearing in menu"
**Fix:**
1. Verify Info.lua is valid Lua (no syntax errors)
2. Restart Lightroom completely
3. Check plugin folder permissions (readable)

### Issue: "Lua error: attempt to index nil"
**Fix:**
1. Add logging to identify which line fails
2. Check table keys (typos in field names)
3. Verify JSON parsing returned valid object

### Issue: "Photos not updating"
**Fix:**
1. Use `catalog:withWriteAccessDo()` for batch updates
2. Verify setting name matches Lightroom API (case-sensitive)
3. Check value is valid for setting (e.g., exposure -5 to +5)

### Issue: "UI dialog freezes"
**Fix:**
1. Don't use busy loops without `LrTasks.yield()`
2. Wrap long operations in `LrTasks.startAsyncTask()`
3. Use `showProgress()` to give feedback

---

## 📚 Lightroom SDK Documentation

**Official References:**
- [Adobe Lightroom SDK Guide](https://developer.adobe.com/lightroom-classic/)
- [Lua API Reference](https://developer.adobe.com/lightroom-classic/docs/reference/)

**Useful SDK Classes:**
- `LrApplication` — Access active catalog, photos
- `LrDialogs` — Show dialogs, alerts
- `LrTasks` — Async operations
- `LrFileUtils` — Read/write files
- `LrLogger` — Logging

---

## 🚀 Build & Deploy

### Local Development
```bash
# Edit in place
nano ActionRegistry.lua

# Test in Lightroom (File → Plugins → ...)
# See logs in debug console
```

### Release Package
```bash
# Create zip for distribution
zip -r ActionsExtension_v1.0.0.zip LIGHTROOM_PLUGIN/

# Share with users (or upload to Adobe Exchange)
```

---

## 📋 Phase 1 Implementation Checklist

- [ ] Info.lua created + menu items working
- [ ] ActionRegistry.lua save/load actions
- [ ] ActionBuilder.lua UI for creating actions
- [ ] Verify action can be saved to disk
- [ ] Load and display saved action
- [ ] Test with 5 actions

**Acceptance Criteria:**
- User can create action with 3 steps
- Action is saved to `actions/` folder
- Action survives Lightroom restart
- No crashes or errors in debug log

---

**Next:** See `USER_GUIDE.md` for how users will use the extension  
**Reference:** See `API_REFERENCE.md` for detailed Lua API docs

---

**Last Updated:** 2026-04-28
