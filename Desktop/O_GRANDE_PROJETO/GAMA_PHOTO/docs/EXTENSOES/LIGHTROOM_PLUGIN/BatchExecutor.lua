-- BatchExecutor.lua
-- Execute saved actions on selected photos with progress tracking

local LR = import 'LightroomSDK'
local ActionRegistry = require('ActionRegistry')
local LightroomAPI = require('LightroomAPI')
local ProgressUI = require('ProgressUI')
local Utils = require('Utils')

local BatchExecutor = {}

-- Main batch execution entry point
function BatchExecutor.executeBatch()
  local catalog = LightroomAPI.getCatalog()
  if not catalog then
    LightroomAPI.showError("Erro", "Não foi possível acessar o catálogo")
    return
  end

  local selectedPhotos = LightroomAPI.getSelectedPhotos()
  if not selectedPhotos or #selectedPhotos == 0 then
    LightroomAPI.showError("Erro", "Selecione pelo menos uma foto")
    return
  end

  local actions = ActionRegistry.list()
  if not actions or #actions == 0 then
    LightroomAPI.showError("Erro", "Nenhuma ação salva. Crie uma ação primeiro")
    return
  end

  -- Show dialog to select action
  local selectedAction = BatchExecutor._showActionSelectDialog(actions)
  if not selectedAction then
    return
  end

  -- Load full action details
  local action = ActionRegistry.load(selectedAction.id)
  if not action then
    LightroomAPI.showError("Erro", "Não foi possível carregar a ação")
    return
  end

  -- Execute batch
  local results = BatchExecutor._executeBatchLoop(action, selectedPhotos)

  -- Show results
  BatchExecutor._showResultsDialog(results, action.name)
end

-- Show dialog for selecting which action to execute
function BatchExecutor._showActionSelectDialog(actions)
  local items = {}
  for _, action in ipairs(actions) do
    table.insert(items, {
      title = action.name,
      value = action
    })
  end

  local result = LR.showDialog {
    title = "Executar Ação em Lote",
    contents = {
      f:column {
        f:static_text {
          title = "Selecione a ação para aplicar:",
          width_in_chars = 40,
        },
        f:popup_menu {
          items = items,
          value = LrView.bind('selected_action'),
        }
      }
    }
  }

  if result == 'ok' then
    return items[1].value
  end

  return nil
end

-- Execute batch loop with progress tracking
function BatchExecutor._executeBatchLoop(action, photos)
  local results = {
    processed = 0,
    failed = 0,
    errors = {},
    action_name = action.name
  }

  local catalog = LightroomAPI.getCatalog()
  local totalPhotos = #photos

  for index, photo in ipairs(photos) do
    -- Update progress
    local progress = index / totalPhotos
    ProgressUI.updateProgress(progress, index, totalPhotos, photo:getFormattedMetadata("fileName"))

    -- Apply action to photo
    local success = BatchExecutor._applyActionToPhoto(catalog, photo, action)

    if success then
      results.processed = results.processed + 1
    else
      results.failed = results.failed + 1
      table.insert(results.errors, photo:getFormattedMetadata("fileName"))
    end
  end

  return results
end

-- Apply a single action to a photo
function BatchExecutor._applyActionToPhoto(catalog, photo, action)
  local success = pcall(function()
    LightroomAPI.withWriteAccess(function()
      if not action.steps then
        return
      end

      -- Apply each step from the action
      for _, step in ipairs(action.steps) do
        BatchExecutor._applyStep(photo, step)
      end
    end)
  end)

  return success
end

-- Apply a single develop setting step to a photo
function BatchExecutor._applyStep(photo, step)
  if not step or not step.setting or not step.value then
    return
  end

  local settingName = tostring(step.setting)
  local settingValue = step.value

  -- Convert string values to appropriate types for Lightroom
  if settingName == "Exposure" or settingName == "Contrast" or
     settingName == "Highlights" or settingName == "Shadows" or
     settingName == "Whites" or settingName == "Blacks" then
    settingValue = tonumber(settingValue) or 0
  elseif settingName == "Vibrance" or settingName == "Saturation" then
    settingValue = tonumber(settingValue) or 0
  elseif settingName == "Clarity" then
    settingValue = tonumber(settingValue) or 0
  end

  -- Apply the setting
  local developSettings = photo:getDevelopSettings()
  if developSettings then
    developSettings[settingName] = settingValue
  end
end

-- Show results summary dialog
function BatchExecutor._showResultsDialog(results, actionName)
  local message = string.format(
    "Processadas: %d fotos\nFalhadas: %d fotos\nAção: %s",
    results.processed,
    results.failed,
    actionName
  )

  if results.failed > 0 then
    message = message .. "\n\nFalhas em:"
    for _, errorFile in ipairs(results.errors) do
      message = message .. "\n• " .. errorFile
    end
  end

  LightroomAPI.showInfo("Resultado do Lote", message)
end

return BatchExecutor
