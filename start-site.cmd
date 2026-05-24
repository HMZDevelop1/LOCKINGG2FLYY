@echo off
cd /d "%~dp0"
echo Installing dependencies...
npm.cmd install
if errorlevel 1 (
  echo.
  echo Install failed. Make sure Node.js LTS is installed from https://nodejs.org
  pause
  exit /b 1
)
echo.
echo Starting development server...
npm.cmd run dev
pause
