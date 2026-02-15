@echo off
cd /d "C:\Users\asus\Desktop\agri\agriconnectapp"

echo.
echo ========== CHECKING REMOTE STATUS ==========
echo.

REM Fetch latest from remote
echo Fetching latest from GitHub...
git fetch origin main

echo.
echo ========== LOCAL vs REMOTE ==========
git log --oneline -1
echo.
echo ========== REMOTE MAIN ==========
git log origin/main --oneline -1

echo.
echo ========== CHECK IF PUSH IS NEEDED ==========
git log origin/main..HEAD --oneline

echo.
echo ========== ALL LOCAL COMMITS ==========
git log --oneline -5

pause
