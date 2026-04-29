-- ActionRegistry.lua
-- Manages action persistence (save/load/list/delete to JSON)
-- Handles all file I/O and JSON serialization

local ActionRegistry = {}

-- Logging helper
local function log(message, level)
  level = level or "info"
  local logger = import 'Logging'.namespace('ActionRegistry')
  if level == "error" then
    logger:error(message)
  elseif level == "warn" then
    logger:warn(message)
  else
    logger:info(message)
  end
end

-- Get the actions directory path
local function getActionsPath()
  -- Get plugin directory
  local pluginDir = LrPathUtils.standardizePath(LrPathUtils.parent(debug.getinfo(1).source:match("@(.*)") or ""))
  local actionsDir = LrPathUtils.child(pluginDir, "actions")

  -- Ensure directory exists
  LrFileUtils.createDirectoryIfNeeded(actionsDir)

  return actionsDir
end

-- Simple JSON encoding (minimal, handles tables and strings)
local function encodeJson(obj)
  if type(obj) == "string" then
    return '"' .. obj:gsub('"', '\\"') .. '"'
  elseif type(obj) == "number" then
    return tostring(obj)
  elseif type(obj) == "boolean" then
    return obj and "true" or "false"
  elseif type(obj) == "table" then
    local parts = {}

    -- Handle array-like tables
    local isArray = true
    for k in pairs(obj) do
      if type(k) ~= "number" then
        isArray = false
        break
      end
    end

    if isArray then
      table.insert(parts, "[")
      for i, v in ipairs(obj) do
        if i > 1 then table.insert(parts, ", ") end
        table.insert(parts, encodeJson(v))
      end
      table.insert(parts, "]")
    else
      -- Object/dictionary
      table.insert(parts, "{")
      local first = true
      for k, v in pairs(obj) do
        if not first then table.insert(parts, ", ") end
        first = false
        table.insert(parts, '"' .. k .. '": ')
        table.insert(parts, encodeJson(v))
      end
      table.insert(parts, "}")
    end

    return table.concat(parts)
  else
    return "null"
  end
end

-- Simple JSON decoding (minimal, handles basic structures)
local function decodeJson(jsonStr)
  -- Remove whitespace
  jsonStr = jsonStr:gsub("%s+", "")

  local pos = 1

  local function parseValue()
    if pos > #jsonStr then return nil end

    local char = jsonStr:sub(pos, pos)

    if char == '"' then
      -- String
      pos = pos + 1
      local start = pos
      while pos <= #jsonStr and jsonStr:sub(pos, pos) ~= '"' do
        if jsonStr:sub(pos, pos) == '\\' then pos = pos + 2 else pos = pos + 1 end
      end
      local str = jsonStr:sub(start, pos - 1)
      pos = pos + 1
      return str:gsub('\\"', '"')
    elseif char == '{' then
      -- Object
      pos = pos + 1
      local obj = {}
      if jsonStr:sub(pos, pos) ~= '}' then
        while pos <= #jsonStr do
          local key = parseValue()
          pos = pos + 1 -- skip colon
          local value = parseValue()
          obj[key] = value
          if jsonStr:sub(pos, pos) == ',' then
            pos = pos + 1
          else
            break
          end
        end
      end
      pos = pos + 1
      return obj
    elseif char == '[' then
      -- Array
      pos = pos + 1
      local arr = {}
      if jsonStr:sub(pos, pos) ~= ']' then
        while pos <= #jsonStr do
          table.insert(arr, parseValue())
          if jsonStr:sub(pos, pos) == ',' then
            pos = pos + 1
          else
            break
          end
        end
      end
      pos = pos + 1
      return arr
    elseif char == 't' then
      pos = pos + 4
      return true
    elseif char == 'f' then
      pos = pos + 5
      return false
    elseif char == 'n' then
      pos = pos + 4
      return nil
    else
      -- Number
      local start = pos
      while pos <= #jsonStr and (jsonStr:sub(pos, pos):match("[0-9.%-+eE]")) do
        pos = pos + 1
      end
      return tonumber(jsonStr:sub(start, pos - 1))
    end
  end

  return parseValue()
end

-- PUBLIC API

-- Save an action to disk
function ActionRegistry.save(action)
  if not action then
    log("ActionRegistry.save: action is nil", "error")
    return false
  end

  if not action.id then
    log("ActionRegistry.save: action.id is required", "error")
    return false
  end

  local actionsDir = getActionsPath()
  local filePath = LrPathUtils.child(actionsDir, action.id .. ".json")

  local ok, err = pcall(function()
    local json = encodeJson(action)

    local file = io.open(filePath, "w")
    if not file then
      error("Could not open file for writing: " .. filePath)
    end

    file:write(json)
    file:close()
  end)

  if not ok then
    log("ActionRegistry.save failed: " .. err, "error")
    return false
  end

  log("ActionRegistry.save: saved action " .. action.id)
  return true
end

-- Load an action from disk
function ActionRegistry.load(actionId)
  if not actionId then
    log("ActionRegistry.load: actionId is required", "error")
    return nil
  end

  local actionsDir = getActionsPath()
  local filePath = LrPathUtils.child(actionsDir, actionId .. ".json")

  if not LrFileUtils.exists(filePath) then
    log("ActionRegistry.load: action file not found: " .. filePath, "warn")
    return nil
  end

  local ok, result = pcall(function()
    local file = io.open(filePath, "r")
    if not file then
      error("Could not open file for reading: " .. filePath)
    end

    local json = file:read("*all")
    file:close()

    return decodeJson(json)
  end)

  if not ok then
    log("ActionRegistry.load failed: " .. result, "error")
    return nil
  end

  log("ActionRegistry.load: loaded action " .. actionId)
  return result
end

-- List all saved actions
function ActionRegistry.list()
  local actionsDir = getActionsPath()
  local actions = {}

  local ok, files = pcall(function()
    return LrFileUtils.listDirectoryRecursive(actionsDir)
  end)

  if not ok then
    log("ActionRegistry.list: could not list directory", "warn")
    return actions
  end

  for _, file in ipairs(files or {}) do
    if file:match("%.json$") then
      local actionId = file:gsub("%.json$", "")
      local action = ActionRegistry.load(actionId)
      if action then
        table.insert(actions, action)
      end
    end
  end

  log("ActionRegistry.list: found " .. #actions .. " actions")
  return actions
end

-- Delete an action
function ActionRegistry.delete(actionId)
  if not actionId then
    log("ActionRegistry.delete: actionId is required", "error")
    return false
  end

  local actionsDir = getActionsPath()
  local filePath = LrPathUtils.child(actionsDir, actionId .. ".json")

  local ok, err = pcall(function()
    if LrFileUtils.exists(filePath) then
      LrFileUtils.delete(filePath)
    end
  end)

  if not ok then
    log("ActionRegistry.delete failed: " .. err, "error")
    return false
  end

  log("ActionRegistry.delete: deleted action " .. actionId)
  return true
end

return ActionRegistry
