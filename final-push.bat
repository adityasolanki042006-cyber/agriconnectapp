@echo off
setlocal enabledelayedexpansion

cd /d "C:\Users\asus\Desktop\agri\agriconnectapp"

echo.
echo ===== FINAL PUSH ATTEMPT =====
echo.

REM First, show what we're pushing
echo Current branch:
git rev-parse --abbrev-ref HEAD

echo.
echo Current commit:
git log --oneline -1

echo.
echo Remote URL:
git config --get remote.origin.url

echo.
echo Attempting force push...
echo.

REM Force push with all options
git push -u origin main --force-with-lease --verbose 2>&1

if %errorlevel% equ 0 (
    echo.
    echo SUCCESS! Commit pushed to GitHub
    echo Repository: https://github.com/adityasolanki042006-cyber/agriconnectapp.git
    echo Branch: main
) else (
    echo.
    echo Push encountered an issue. Exit code: %errorlevel%
)

echo.
echo Final verification - checking remote:
git log origin/main --oneline -1

pause
