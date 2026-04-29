-- Utils.lua
-- Helper functions for paths, file operations, and validation

local Utils = {}

-- Get the plugin directory
function Utils.getPluginDir()
  local source = debug.getinfo(1).source
  if source:sub(1, 1) == "@" then
    source = source:sub(2)
  end
  return LrPathUtils.standardizePath(LrPathUtils.parent(source))
end

-- Get the actions directory
function Utils.getActionsDir()
  local pluginDir = Utils.getPluginDir()
  return LrPathUtils.child(pluginDir, "actions")
end

-- Get the logs directory
function Utils.getLogsDir()
  local pluginDir = Utils.getPluginDir()
  return LrPathUtils.child(pluginDir, "logs")
end

-- Ensure a directory exists, create if needed
function Utils.ensureDirectory(path)
  if not LrFileUtils.exists(path) then
    local ok, err = pcall(function()
      LrFileUtils.createDirectoryIfNeeded(path)
    end)
    return ok
  end
  return true
end

-- Check if file exists
function Utils.fileExists(path)
  return LrFileUtils.exists(path)
end

-- Read file content
function Utils.readFile(path)
  if not Utils.fileExists(path) then
    return nil
  end

  local ok, content = pcall(function()
    local file = io.open(path, "r")
    if not file then return nil end
    local text = file:read("*all")
    file:close()
    return text
  end)

  return ok and content or nil
end

-- Write file content
function Utils.writeFile(path, content)
  local ok, err = pcall(function()
    local file = io.open(path, "w")
    if not file then
      error("Could not open file for writing: " .. path)
    end
    file:write(content)
    file:close()
  end)

  return ok
end

-- Delete a file
function Utils.deleteFile(path)
  if Utils.fileExists(path) then
    local ok, err = pcall(function()
      LrFileUtils.delete(path)
    end)
    return ok
  end
  return true
end

-- Generate unique ID (timestamp-based)
function Utils.generateId(prefix)
  prefix = prefix or "item"
  return prefix .. "_" .. tostring(os.time())
end

-- Validate action object
function Utils.validateAction(action)
  if not action then return false end
  if not action.id or type(action.id) ~= "string" then return false end
  if not action.name or type(action.name) ~= "string" then return false end
  if not action.steps or type(action.steps) ~= "table" then return false end
  return true
end

-- Validate action step
function Utils.validateStep(step)
  if not step then return false end
  if not step.setting or type(step.setting) ~= "string" then return false end
  if not step.value then return false end
  if not step.operation or type(step.operation) ~= "string" then return false end
  return true
end

-- Deep copy a table
function Utils.deepCopy(tbl)
  if not tbl then return nil end

  local copy = {}
  for k, v in pairs(tbl) do
    if type(v) == "table" then
      copy[k] = Utils.deepCopy(v)
    else
      copy[k] = v
    end
  end
  return copy
end

-- Trim whitespace from string
function Utils.trim(str)
  if not str then return nil end
  return (str:gsub("^%s*(.-)%s*$", "%1"))
end

-- Split string by delimiter
function Utils.split(str, delimiter)
  if not str then return {} end
  local result = {}
  for match in (str .. delimiter):gmatch("(.-)(" .. delimiter .. ")") do
    table.insert(result, match)
  end
  return result
end

return Utils
