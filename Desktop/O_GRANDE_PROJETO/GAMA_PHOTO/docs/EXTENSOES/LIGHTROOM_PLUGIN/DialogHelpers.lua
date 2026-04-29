-- DialogHelpers.lua
-- Reusable dialog UI components for consistent UI/UX

local LR = import 'LightroomSDK'
local DialogHelpers = {}

-- Create a text input field
function DialogHelpers.createTextInput(label, width, placeholder)
  width = width or 200
  placeholder = placeholder or ""

  return {
    title = label,
    f:text_input {
      value = LrView.bind('text_value'),
      width = width,
      height = 25,
    }
  }
end

-- Create a multi-line text area
function DialogHelpers.createTextArea(label, width, height)
  width = width or 300
  height = height or 100

  return {
    f:column {
      title = label,
      f:text_field {
        value = LrView.bind('text_value'),
        width = width,
        height = height,
        wraps = true,
      }
    }
  }
end

-- Create a dropdown/select field
function DialogHelpers.createDropdown(label, options, width)
  width = width or 200

  local items = {}
  for _, opt in ipairs(options) do
    table.insert(items, { title = opt.title, value = opt.value })
  end

  return {
    title = label,
    f:popup_menu {
      items = items,
      value = LrView.bind('selected_value'),
      width = width,
    }
  }
end

-- Create a labeled section (grouping)
function DialogHelpers.createSection(title, contents)
  return {
    f:group_box {
      title = title,
      f:column {
        contents
      }
    }
  }
end

-- Create a confirmation dialog
function DialogHelpers.showConfirmDialog(title, message, confirmText, cancelText)
  confirmText = confirmText or "Confirmar"
  cancelText = cancelText or "Cancelar"

  local result = LR.showDialog {
    title = title,
    contents = {
      f:row {
        f:static_text {
          title = message,
          width_in_chars = 40,
        }
      },
      f:row {
        f:push_button {
          title = confirmText,
          action = function(button)
            -- Closure captures button context
            button:done()
          end,
        },
        f:push_button {
          title = cancelText,
          action = function(button)
            button:cancel()
          end,
        }
      }
    }
  }

  return result == 'ok'
end

-- Create an error dialog
function DialogHelpers.showErrorDialog(title, message)
  return LR.showDialog {
    title = title or "Erro",
    contents = {
      f:row {
        f:static_text {
          title = message,
          width_in_chars = 40,
        }
      }
    }
  }
end

-- Create a success/info dialog
function DialogHelpers.showInfoDialog(title, message)
  return LR.showDialog {
    title = title or "Sucesso",
    contents = {
      f:row {
        f:static_text {
          title = message,
          width_in_chars = 40,
        }
      }
    }
  }
end

-- Create a list/table view (for displaying actions)
function DialogHelpers.createListView(items, width, height)
  width = width or 400
  height = height or 200

  return {
    f:list_view {
      bind_to_object = 'items',
      selectable = true,
      width = width,
      height = height,
      columns = {
        {
          title = "Nome",
          bind_to_key = 'name',
          width = width * 0.5,
        },
        {
          title = "Descrição",
          bind_to_key = 'description',
          width = width * 0.5,
        }
      }
    }
  }
end

-- Create action buttons group
function DialogHelpers.createButtonGroup(buttons)
  local buttonViews = {}

  for _, btn in ipairs(buttons) do
    table.insert(buttonViews, f:push_button {
      title = btn.title,
      action = btn.action,
      width = btn.width or 100,
    })
  end

  return {
    f:row(buttonViews)
  }
end

-- Create a separator line
function DialogHelpers.createSeparator()
  return {
    f:static_text {
      title = "",
      height = 10,
    }
  }
end

-- Create labeled static text (display only)
function DialogHelpers.createStaticText(label, text)
  return {
    f:row {
      f:static_text {
        title = label .. ":",
        width = 100,
      },
      f:static_text {
        title = text,
      }
    }
  }
end

-- Create checkbox
function DialogHelpers.createCheckbox(label)
  return {
    f:checkbox {
      title = label,
      value = LrView.bind('checkbox_value'),
    }
  }
end

-- Create labeled input with help text
function DialogHelpers.createInputWithHelp(label, helpText, width)
  width = width or 200

  return {
    f:column {
      f:row {
        f:static_text {
          title = label,
          width = 100,
        },
        f:text_input {
          value = LrView.bind('input_value'),
          width = width,
        }
      },
      f:row {
        f:static_text {
          title = helpText,
          text_color = { r = 0.6, g = 0.6, b = 0.6 },
          width = width + 100,
        }
      }
    }
  }
end

-- Create number input field
function DialogHelpers.createNumberInput(label, min, max, width)
  width = width or 100
  min = min or 0
  max = max or 100

  return {
    title = label,
    f:text_input {
      value = LrView.bind('number_value'),
      width = width,
      height = 25,
    }
  }
end

-- Create slider
function DialogHelpers.createSlider(label, min, max, step, width)
  width = width or 200
  step = step or 1

  return {
    title = label,
    f:slider {
      value = LrView.bind('slider_value'),
      min_value = min,
      max_value = max,
      width = width,
    }
  }
end

-- Validate input (helper for form validation)
function DialogHelpers.validateInput(value, rules)
  -- rules = { required = true, minLength = 3, maxLength = 50, pattern = "..." }

  if rules.required and (not value or value == "") then
    return false, "Campo é obrigatório"
  end

  if rules.minLength and string.len(value) < rules.minLength then
    return false, "Mínimo " .. rules.minLength .. " caracteres"
  end

  if rules.maxLength and string.len(value) > rules.maxLength then
    return false, "Máximo " .. rules.maxLength .. " caracteres"
  end

  if rules.pattern then
    if not string.match(value, rules.pattern) then
      return false, "Formato inválido"
    end
  end

  return true, ""
end

return DialogHelpers
