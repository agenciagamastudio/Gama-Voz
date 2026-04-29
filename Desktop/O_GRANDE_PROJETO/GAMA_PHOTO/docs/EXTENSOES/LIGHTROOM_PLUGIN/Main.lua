-- Main.lua
-- Entry point and orchestrator for menu actions

local ActionRegistry = require('ActionRegistry')
local ActionBuilder = require('ActionBuilder')
local ActionManager = require('ActionManager')
local BatchExecutor = require('BatchExecutor')
local LightroomAPI = require('LightroomAPI')
local Utils = require('Utils')

local Main = {}

-- Create Action menu item handler
function Main.createActionDialog()
  local success, err = pcall(function()
    ActionBuilder.showCreateDialog()
  end)

  if not success then
    LightroomAPI.showError("Erro ao criar ação", "Falha ao abrir diálogo: " .. (err or "desconhecido"))
  end
end

-- Manage Actions menu item handler
function Main.manageActionsDialog()
  local success, err = pcall(function()
    ActionManager.showManageDialog()
  end)

  if not success then
    LightroomAPI.showError("Erro ao gerenciar ações", "Falha ao abrir diálogo: " .. (err or "desconhecido"))
  end
end

-- Execute Batch menu item handler (Phase 3)
function Main.executeBatchDialog()
  local success, err = pcall(function()
    BatchExecutor.executeBatch()
  end)

  if not success then
    LightroomAPI.showError("Erro ao executar batch", "Falha ao abrir diálogo: " .. (err or "desconhecido"))
  end
end

return Main
