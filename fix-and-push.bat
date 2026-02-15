@echo off
setlocal enabledelayedexpansion

cd /d "C:\Users\asus\Desktop\agri\agriconnectapp"

set "logfile=%cd%\fix_rebase_log.txt"
echo. > "%logfile%"
echo Fixing git state and pushing... >> "%logfile%"
echo Time: %date% %time% >> "%logfile%"
echo. >> "%logfile%"

REM Check if rebase is in progress
if exist ".git\rebase-merge" (
    echo Rebase in progress, aborting... >> "%logfile%"
    git rebase --abort >> "%logfile%" 2>&1
) else (
    echo No active rebase detected >> "%logfile%"
)

REM Check current status
echo. >> "%logfile%"
echo Current Git Status: >> "%logfile%"
git status >> "%logfile%" 2>&1

echo. >> "%logfile%"
echo Recent commits: >> "%logfile%"
git log --oneline -5 >> "%logfile%" 2>&1

REM Switch to main branch
echo. >> "%logfile%"
echo Switching to main branch... >> "%logfile%"
git checkout main >> "%logfile%" 2>&1

REM Show logs
echo. >> "%logfile%"
echo Commits after checkout: >> "%logfile%"
git log --oneline -5 >> "%logfile%" 2>&1

REM Try to push
echo. >> "%logfile%"
echo Attempting push... >> "%logfile%"
git push origin main --force-with-lease >> "%logfile%" 2>&1
set "exitcode=!errorlevel!"

echo. >> "%logfile%"
echo Push exit code: !exitcode! >> "%logfile%"

echo.
echo ========================================
echo Log Contents:
echo ========================================
type "%logfile%"

pause
