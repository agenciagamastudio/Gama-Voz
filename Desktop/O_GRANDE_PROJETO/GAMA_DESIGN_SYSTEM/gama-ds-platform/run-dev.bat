@echo off
cd /d "%~dp0"
echo.
echo ==========================================
echo GAMA Design System - Development Server
echo ==========================================
echo.
echo Limpando arquivos temporarios...
rmdir /s /q .next >nul 2>&1

echo Iniciando servidor...
echo.
set PORT=8123
npm run dev

pause
