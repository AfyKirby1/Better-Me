@echo off
echo Starting Better-Me in Development Mode...
echo ========================================
echo.

echo Setting NODE_ENV to development...
set NODE_ENV=development

echo Starting Electron...
npm run dev

pause
