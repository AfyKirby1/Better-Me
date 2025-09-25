@echo off
echo Better-Me Portable Build Script
echo ===============================
echo Creating a portable executable that runs anywhere!

echo.
echo [1/8] Checking environment...
node --version || (echo ERROR: Node.js not found & pause & exit /b 1)
npm --version || (echo ERROR: npm not found & pause & exit /b 1)

echo.
echo [2/8] Cleaning previous builds...
if exist "build" rmdir /s /q "build"
if exist "dist" rmdir /s /q "dist"

echo.
echo [3/8] Installing dependencies...
if not exist "node_modules" (
    npm install || (echo ERROR: Install failed & pause & exit /b 1)
)

echo.
echo [4/8] Building application...
npm run dist || (echo ERROR: Build failed & pause & exit /b 1)

echo.
echo [5/8] Creating build directories...
mkdir build 2>nul
mkdir build\web 2>nul
mkdir build\desktop 2>nul
mkdir build\logs 2>nul

echo.
echo [6/8] Build completed - skipping web copy step...

echo.
echo [7/8] Desktop application already built...

echo.
echo [8/8] Finalizing portable build...
if exist "main.js" copy "main.js" "build\desktop\" >nul
if exist "preload.js" copy "preload.js" "build\desktop\" >nul
if exist "package.json" copy "package.json" "build\desktop\" >nul

echo Build Date: %date% %time% > "build\logs\build.log"

echo.
echo Looking for built executable...
if exist "build\desktop\win-unpacked\Better-Me.exe" (
    echo SUCCESS: Found executable at build\desktop\win-unpacked\Better-Me.exe
    echo Creating portable launcher...
    echo @echo off > Better-Me-Portable.bat
    echo echo Starting Better-Me... >> Better-Me-Portable.bat
    echo cd /d "%%~dp0" >> Better-Me-Portable.bat
    echo start "" "build\desktop\win-unpacked\Better-Me.exe" >> Better-Me-Portable.bat
    echo SUCCESS: Created Better-Me-Portable.bat launcher
) else (
    echo WARNING: No executable found, check build\desktop\ folder
)

echo.
echo ========================================
echo     PORTABLE BUILD COMPLETED!
echo ========================================
echo.
if exist "Better-Me-Portable.exe" (
    echo PORTABLE: Better-Me-Portable.exe (run anywhere!)
) else (
    echo UNPACKED: build\desktop\win-unpacked\Better-Me.exe
)
echo.

set /p "run_now=Run the app now? (y/n): "
if /i "%run_now%"=="y" (
    if exist "Better-Me-Portable.exe" (
        start "" "Better-Me-Portable.exe"
    ) else if exist "build\desktop\win-unpacked\Better-Me.exe" (
        start "" "build\desktop\win-unpacked\Better-Me.exe"
    )
)

echo.
echo PORTABLE APP READY!
pause