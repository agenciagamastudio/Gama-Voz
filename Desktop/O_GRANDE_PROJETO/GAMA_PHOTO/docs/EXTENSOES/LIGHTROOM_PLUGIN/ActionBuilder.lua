-- ActionBuilder.lua
-- Dialog to create and edit actions

local ActionBuilder = {}

-- Import dependencies
local Utils = require("Utils")
local LR = require("LightroomAPI")
local ActionRegistry = require("ActionRegistry")

-- Valid Lightroom develop settings
local DEVELOP_SETTINGS = {
  "Exposure",
  "Contrast",
  "Highlights",
  "Shadows",
  "Whites",
  "Blacks",
  "Clarity",
  "Vibrance",
  "Saturation",
  "Temperature",
  "Tint",
  "Hue",
  "Saturation_Red",
  "Saturation_Green",
  "Saturation_Blue",
  "Luminance_Red",
  "Luminance_Green",
  "Luminance_Blue",
}

-- Show dialog to create new action
function ActionBuilder.showCreateDialog()
  local properties = LrBinding.makePropertyTable(nil)
  properties.actionName = ""
  properties.actionDescription = ""
  properties.steps = {}
  
  local view = {
    bind_to_object = properties,
    
    title = "Create Action",
    size = { width = 600, height = 500 },
    
    {
      title = "Action Details",
      fill_horizontal = 1,
      
      {
        title = "Action Name",
        value = bind("actionName"),
      },
      
      {
        title = "Description (optional)",
        value = bind("actionDescription"),
        height_in_lines = 3,
      },
    },
    
    {
      title = "Steps",
      fill_horizontal = 1,
      fill_vertical = 1,
      
      {
        header = { "Setting", "Value" },
        width_in_chars = { 20, 20 },
        height_in_lines = 10,
        bind_to_object = bind("steps"),
      },
    },
    
    {
      fill_horizontal = 1,
      
      {
        title = "Add Step",
        action = function()
          ActionBuilder._addStep(properties)
        end,
      },
      
      {
        title = "Remove Step",
        action = function()
          ActionBuilder._removeStep(properties)
        end,
      },
    },
    
    {
      fill_horizontal = 1,
      
      {
        title = "Save Action",
        action = function()
          ActionBuilder._saveAction(properties)
        end,
      },
      
      {
        title = "Cancel",
        action = function()
          LR.dismissDialog()
        end,
      },
    },
  }
  
  LR.showDialog("Create Action", view, properties)
end

-- Add a step to the action
function ActionBuilder._addStep(properties)
  if not properties.steps then
    properties.steps = {}
  end
  
  table.insert(properties.steps, {
    setting = DEVELOP_SETTINGS[1] or "Exposure",
    value = 0,
  })
end

-- Remove last step
function ActionBuilder._removeStep(properties)
  if properties.steps and #properties.steps > 0 then
    table.remove(properties.steps)
  end
end

-- Save action to registry
function ActionBuilder._saveAction(properties)
  -- Validate
  if not properties.actionName or properties.actionName == "" then
    LR.showError("Validation Error", "Action name is required")
    return
  end
  
  if not properties.steps or #properties.steps == 0 then
    LR.showError("Validation Error", "At least one step is required")
    return
  end
  
  -- Create action object
  local action = {
    id = Utils.generateId("action"),
    name = properties.actionName,
    description = properties.actionDescription or "",
    steps = properties.steps,
    created = os.time(),
  }
  
  -- Validate action
  if not Utils.validateAction(action) then
    LR.showError("Validation Error", "Invalid action structure")
    return
  end
  
  -- Save
  local ok = ActionRegistry.save(action)
  if ok then
    LR.showInfo("Success", "Action '" .. action.name .. "' created successfully")
    LR.dismissDialog()
  else
    LR.showError("Save Failed", "Could not save action. Check logs.")
  end
end

-- Show dialog to edit existing action
function ActionBuilder.showEditDialog(actionId)
  local action = ActionRegistry.load(actionId)
  if not action then
    LR.showError("Error", "Action not found")
    return
  end
  
  local properties = LrBinding.makePropertyTable(nil)
  properties.actionName = action.name
  properties.actionDescription = action.description or ""
  properties.steps = Utils.deepCopy(action.steps)
  properties.originalId = actionId
  
  local view = {
    bind_to_object = properties,
    
    title = "Edit Action: " .. action.name,
    size = { width = 600, height = 500 },
    
    {
      title = "Action Details",
      fill_horizontal = 1,
      
      {
        title = "Action Name",
        value = bind("actionName"),
      },
      
      {
        title = "Description",
        value = bind("actionDescription"),
        height_in_lines = 3,
      },
    },
    
    {
      title = "Steps",
      fill_horizontal = 1,
      fill_vertical = 1,
      
      {
        header = { "Setting", "Value" },
        width_in_chars = { 20, 20 },
        height_in_lines = 10,
        bind_to_object = bind("steps"),
      },
    },
    
    {
      fill_horizontal = 1,
      
      {
        title = "Add Step",
        action = function()
          ActionBuilder._addStep(properties)
        end,
      },
      
      {
        title = "Remove Step",
        action = function()
          ActionBuilder._removeStep(properties)
        end,
      },
    },
    
    {
      fill_horizontal = 1,
      
      {
        title = "Save Changes",
        action = function()
          ActionBuilder._updateAction(properties)
        end,
      },
      
      {
        title = "Cancel",
        action = function()
          LR.dismissDialog()
        end,
      },
    },
  }
  
  LR.showDialog("Edit Action", view, properties)
end

-- Update existing action
function ActionBuilder._updateAction(properties)
  if not properties.actionName or properties.actionName == "" then
    LR.showError("Validation Error", "Action name is required")
    return
  end
  
  if not properties.steps or #properties.steps == 0 then
    LR.showError("Validation Error", "At least one step is required")
    return
  end
  
  local action = {
    id = properties.originalId,
    name = properties.actionName,
    description = properties.actionDescription or "",
    steps = properties.steps,
    created = os.time(),
  }
  
  if not Utils.validateAction(action) then
    LR.showError("Validation Error", "Invalid action structure")
    return
  end
  
  local ok = ActionRegistry.save(action)
  if ok then
    LR.showInfo("Success", "Action '" .. action.name .. "' updated successfully")
    LR.dismissDialog()
  else
    LR.showError("Update Failed", "Could not update action. Check logs.")
  end
end

return ActionBuilder
