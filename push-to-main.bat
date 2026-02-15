@echo off
setlocal enabledelayedexpansion

cd /d "C:\Users\asus\Desktop\agri\agriconnectapp"

REM Log file for output
set "logfile=%cd%\push_output.log"

echo. > "%logfile%"
echo Pushing to GitHub... >> "%logfile%"
echo Time: %date% %time% >> "%logfile%"

REM Get git log to show what we're pushing
git log --oneline -1 >> "%logfile%" 2>&1

REM Attempt to push
echo. >> "%logfile%"
echo Executing: git push origin main --force-with-lease >> "%logfile%"
echo. >> "%logfile%"

git push origin main --force-with-lease >> "%logfile%" 2>&1
set "exitcode=!errorlevel!"

echo. >> "%logfile%"
echo Push completed with exit code: !exitcode! >> "%logfile%"

REM Check if successful
if !exitcode! equ 0 (
    echo. >> "%logfile%"
    echo SUCCESS! Code pushed to GitHub >> "%logfile%"
    git log --oneline -1 >> "%logfile%"
    echo.
    echo ========================================
    echo PUSH SUCCESSFUL!
    echo ========================================
    echo Your code has been pushed to:
    echo https://github.com/adityasolanki042006-cyber/agriconnectapp.git
    echo.
    type "%logfile%"
) else (
    echo. >> "%logfile%"
    echo PUSH FAILED with exit code !exitcode! >> "%logfile%"
    echo. >> "%logfile%"
    echo Full output: >> "%logfile%"
    git status >> "%logfile%" 2>&1
    echo.
    echo ========================================
    echo PUSH RESULT
    echo ========================================
    type "%logfile%"
)

pause
