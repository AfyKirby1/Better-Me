@echo off
echo Starting Better-Me...
cd /d "%~dp0"
if exist "build\desktop\win-unpacked\Better-Me.exe" (
    start "" "build\desktop\win-unpacked\Better-Me.exe"
) else (
    echo Better-Me.exe not found! Please run build.bat first.
    pause
)
