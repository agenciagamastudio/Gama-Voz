-- ProgressUI.lua
-- Progress dialog with real-time updates for batch execution

local LR = import 'LightroomSDK'

local ProgressUI = {}

-- Module state
ProgressUI.state = {
  current = 0,
  total = 0,
  filename = "",
  cancelled = false
}

-- Update progress in real-time
function ProgressUI.updateProgress(percentage, current, total, filename)
  ProgressUI.state.current = current
  ProgressUI.state.total = total
  ProgressUI.state.filename = filename or ""

  -- Yield to allow UI update
  if LR.yieldFromMainThread then
    LR.yieldFromMainThread()
  end
end

-- Show progress dialog
function ProgressUI.showProgressDialog()
  local result = LR.showDialog {
    title = "Executando Ação em Lote",
    contents = {
      f:column {
        f:row {
          f:static_text {
            title = "Progresso:",
            width = 100,
          },
          f:static_text {
            title = LrView.bind('progress_text'),
            width = 200,
          }
        },

        f:spacer {
          height = 10,
        },

        f:row {
          f:static_text {
            title = "Foto atual:",
            width = 100,
          },
          f:static_text {
            title = LrView.bind('current_filename'),
            width = 300,
          }
        },

        f:spacer {
          height = 10,
        },

        f:row {
          f:slider {
            value = LrView.bind('progress_value'),
            min_value = 0,
            max_value = 100,
            width = 400,
          }
        },

        f:spacer {
          height = 10,
        },

        f:row {
          f:push_button {
            title = "Cancelar",
            action = function()
              ProgressUI.state.cancelled = true
            end,
            width = 100,
          }
        }
      }
    }
  }

  return result
end

-- Format progress text (e.g., "5 of 20")
function ProgressUI.getProgressText()
  return string.format("%d of %d", ProgressUI.state.current, ProgressUI.state.total)
end

-- Get progress value (0-100)
function ProgressUI.getProgressValue()
  if ProgressUI.state.total == 0 then
    return 0
  end
  return math.floor((ProgressUI.state.current / ProgressUI.state.total) * 100)
end

-- Get current filename
function ProgressUI.getCurrentFilename()
  return ProgressUI.state.filename or "(processando...)"
end

-- Check if user clicked cancel
function ProgressUI.isCancelled()
  return ProgressUI.state.cancelled
end

-- Reset state
function ProgressUI.reset()
  ProgressUI.state = {
    current = 0,
    total = 0,
    filename = "",
    cancelled = false
  }
end

return ProgressUI
