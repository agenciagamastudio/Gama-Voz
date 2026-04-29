-- Actions Extension for Lightroom Classic
-- Plugin manifest and entry point
-- Version 1.0.0

return {
  -- Plugin metadata
  name = "Actions Extension for Lightroom",
  version = "1.0.0",
  author = "GAMA Photo",
  description = "Create and execute batch actions on photos",

  -- Plugin type (not required, but good practice)
  type = "lua",

  -- Menu items that appear under File → Plugins
  menu = {
    {
      title = "Create Action",
      action = function() require('Main').createActionDialog() end
    },
    {
      title = "Manage Actions",
      action = function() require('Main').manageActionsDialog() end
    },
    {
      title = "Execute Batch",
      action = function() require('Main').executeBatchDialog() end
    },
  },

  -- Module dependencies (will be loaded on plugin startup)
  modules = {
    "Utils.lua",
    "LightroomAPI.lua",
    "ActionRegistry.lua",
    -- Phase 2 modules:
    "DialogHelpers.lua",
    "ActionBuilder.lua",
    "ActionManager.lua",
    -- Phase 3 modules:
    "ProgressUI.lua",
    "BatchExecutor.lua",
    "Main.lua",
  }
}
