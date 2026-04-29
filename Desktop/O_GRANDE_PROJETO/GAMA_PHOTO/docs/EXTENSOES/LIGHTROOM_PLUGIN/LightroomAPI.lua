-- LightroomAPI.lua
-- Abstraction wrapper for Lightroom SDK
-- Reduces boilerplate and makes code more readable

local LR = {}

-- Get the active catalog
function LR.getCatalog()
  return LrApplication.activeCatalog()
end

-- Get selected photos from library
function LR.getSelectedPhotos()
  local catalog = LR.getCatalog()
  return catalog:getActiveSourceSelections()
end

-- Get develop settings for a photo
function LR.getPhotoDevelopSettings(photo)
  if not photo then return nil end
  return photo:getDeveloper()
end

-- Get a specific develop setting value
function LR.getPhotoDevelopSetting(photo, setting)
  if not photo or not setting then return nil end
  return photo:getDeveloper()[setting]
end

-- Set a specific develop setting
function LR.setPhotoDevelopSetting(photo, setting, value)
  if not photo or not setting then return false end

  local ok, err = pcall(function()
    photo:getDeveloper()[setting] = value
  end)

  return ok
end

-- Get photo filename
function LR.getPhotoFilename(photo)
  if not photo then return nil end
  return photo:getFormattedMetadata("fileName")
end

-- Get photo path
function LR.getPhotoPath(photo)
  if not photo then return nil end
  local path = photo:getRawMetadata("path")
  return path
end

-- Log a message
function LR.log(message, level)
  level = level or "info"
  local logger = import 'Logging'.namespace('LR')

  if level == "error" then
    logger:error(message)
  elseif level == "warn" then
    logger:warn(message)
  else
    logger:info(message)
  end
end

-- Show error dialog to user
function LR.showError(title, message)
  LrDialogs.showError(title, message)
end

-- Show info dialog to user
function LR.showInfo(title, message)
  LrDialogs.showInfo(title, message)
end

-- Show warning dialog to user
function LR.showWarning(title, message)
  LrDialogs.showWarning(title, message)
end

-- Show modeless dialog
function LR.showDialog(title, viewTable, properties)
  return LrDialogs.showModelessDialog(title, viewTable)
end

-- Dismiss current dialog
function LR.dismissDialog()
  LrDialogs.stopModalWithResult(LrDialogs.cancelButton)
end

-- Yield control (for long-running operations)
function LR.yield()
  LrTasks.yield()
end

-- Sleep for N milliseconds
function LR.sleep(milliseconds)
  LrTasks.sleep(milliseconds / 1000)
end

-- Start an async task
function LR.asyncTask(fn, description)
  local ok = LrTasks.startAsyncTask(fn)
  return ok
end

-- Perform operation with write access to catalog
function LR.withWriteAccess(fn)
  return LR.getCatalog():withWriteAccessDo(fn)
end

-- Get application version
function LR.getAppVersion()
  return LrApplication.versionTable()
end

-- Check if running on Mac
function LR.isMac()
  return WIN_ENV == nil
end

-- Check if running on Windows
function LR.isWindows()
  return WIN_ENV ~= nil
end

return LR
