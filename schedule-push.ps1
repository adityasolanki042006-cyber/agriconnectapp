$scriptPath = "C:\Users\asus\Desktop\agri\agriconnectapp\push-to-github.ps1"
$taskName = "GitPushToGitHub"

# Remove existing task if it exists
Unregister-ScheduledTask -TaskName $taskName -Confirm:$false -ErrorAction SilentlyContinue

# Create scheduled task to run immediately
$action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-NoProfile -ExecutionPolicy Bypass -File `"$scriptPath`""
$trigger = New-ScheduledTaskTrigger -Once -At (Get-Date).AddSeconds(2)
$principal = New-ScheduledTaskPrincipal -UserId "$env:USERNAME" -LogonType Interactive -RunLevel Highest

Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Principal $principal -Force | Out-Null

Write-Host "Task scheduled to run. Checking in 5 seconds..."
Start-Sleep -Seconds 5

# Check if push was successful
if (Test-Path "C:\Users\asus\Desktop\agri\agriconnectapp\push_success.txt") {
    Write-Host "✓ Push to GitHub completed successfully!"
    Get-Content "C:\Users\asus\Desktop\agri\agriconnectapp\git_push_log.txt"
} else {
    Write-Host "Checking push status..."
    if (Test-Path "C:\Users\asus\Desktop\agri\agriconnectapp\git_push_log.txt") {
        Get-Content "C:\Users\asus\Desktop\agri\agriconnectapp\git_push_log.txt"
    }
}
