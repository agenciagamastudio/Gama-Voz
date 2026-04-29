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
      action = "createActionDialog"
    },
    {
      title = "Manage Actions",
      action = "manageActionsDialog"
    },
    {
      title = "Execute Batch",
      action = "executeBatchDialog"
    },
  },

  -- Module dependencies (will be loaded on plugin startup)
  modules = {
    "ActionRegistry.lua",
    "LightroomAPI.lua",
    "Utils.lua",
    -- Phase 2 modules:
    -- "ActionBuilder.lua",
    -- "BatchExecutor.lua",
  }
}
