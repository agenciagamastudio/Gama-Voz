-- ActionManager.lua
-- Dialog to manage (list, edit, delete, duplicate) actions

local ActionManager = {}

-- Import dependencies
local ActionRegistry = require("ActionRegistry")
local ActionBuilder = require("ActionBuilder")
local LR = require("LightroomAPI")

-- Show dialog listing all actions
function ActionManager.showManageDialog()
  local actions = ActionRegistry.list()
  local properties = LrBinding.makePropertyTable(nil)
  properties.actionsList = actions or {}
  properties.selectedIndex = 1
  
  local view = {
    bind_to_object = properties,
    
    title = "Manage Actions",
    size = { width = 700, height = 500 },
    
    {
      title = "Saved Actions",
      fill_horizontal = 1,
      fill_vertical = 1,
      
      {
        header = { "Action", "Steps", "Created" },
        width_in_chars = { 30, 8, 15 },
        height_in_lines = 15,
        bind_to_object = bind("actionsList"),
        selection_value = bind("selectedIndex"),
      },
    },
    
    {
      title = "Actions",
      fill_horizontal = 1,
      
      {
        title = "Edit",
        action = function()
          ActionManager._editAction(properties)
        end,
      },
      
      {
        title = "Duplicate",
        action = function()
          ActionManager._duplicateAction(properties)
        end,
      },
      
      {
        title = "Delete",
        action = function()
          ActionManager._deleteAction(properties)
        end,
      },
    },
    
    {
      fill_horizontal = 1,
      
      {
        title = "Close",
        action = function()
          LR.dismissDialog()
        end,
      },
    },
  }
  
  LR.showDialog("Manage Actions", view, properties)
end

-- Edit selected action
function ActionManager._editAction(properties)
  if not properties.selectedIndex or properties.selectedIndex == 0 then
    LR.showError("Error", "No action selected")
    return
  end
  
  local selectedAction = properties.actionsList[properties.selectedIndex]
  if not selectedAction or not selectedAction.id then
    LR.showError("Error", "Could not load selected action")
    return
  end
  
  LR.dismissDialog()
  ActionBuilder.showEditDialog(selectedAction.id)
end

-- Delete selected action
function ActionManager._deleteAction(properties)
  if not properties.selectedIndex or properties.selectedIndex == 0 then
    LR.showError("Error", "No action selected")
    return
  end
  
  local selectedAction = properties.actionsList[properties.selectedIndex]
  if not selectedAction or not selectedAction.id then
    LR.showError("Error", "Could not load selected action")
    return
  end
  
  local result = LrDialogs.showQuestion(
    "Delete Action?",
    "Are you sure you want to delete '" .. selectedAction.name .. "'?",
    "Delete",
    "Cancel"
  )
  
  if result == "ok" then
    local ok = ActionRegistry.delete(selectedAction.id)
    if ok then
      LR.showInfo("Success", "Action deleted")
      -- Refresh list
      table.remove(properties.actionsList, properties.selectedIndex)
    else
      LR.showError("Delete Failed", "Could not delete action")
    end
  end
end

-- Duplicate selected action
function ActionManager._duplicateAction(properties)
  if not properties.selectedIndex or properties.selectedIndex == 0 then
    LR.showError("Error", "No action selected")
    return
  end
  
  local selectedAction = properties.actionsList[properties.selectedIndex]
  if not selectedAction or not selectedAction.id then
    LR.showError("Error", "Could not load selected action")
    return
  end
  
  -- Load original
  local original = ActionRegistry.load(selectedAction.id)
  if not original then
    LR.showError("Error", "Could not load action")
    return
  end
  
  -- Create copy
  local copy = {
    id = require("Utils").generateId("action"),
    name = original.name .. " (Copy)",
    description = original.description,
    steps = require("Utils").deepCopy(original.steps),
    created = os.time(),
  }
  
  -- Save copy
  local ok = ActionRegistry.save(copy)
  if ok then
    LR.showInfo("Success", "Action duplicated: " .. copy.name)
    -- Refresh list
    table.insert(properties.actionsList, copy)
  else
    LR.showError("Duplicate Failed", "Could not duplicate action")
  end
end

return ActionManager
