$ErrorActionPreference = "SilentlyContinue"
Set-Location "C:\Users\asus\Desktop\agri\agriconnectapp"

# Run git push
$output = & git push origin main --force-with-lease 2>&1
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

# Log result
$logFile = "$PSScriptRoot\git_push_log.txt"
"$timestamp - Git Push Result:" | Out-File -FilePath $logFile -Encoding UTF8
$output | Out-File -FilePath $logFile -Encoding UTF8 -Append

# If successful, create a marker file
if ($LASTEXITCODE -eq 0) {
    "SUCCESS" | Out-File -FilePath "$PSScriptRoot\push_success.txt"
    Write-Host "Push to GitHub completed successfully!"
} else {
    Write-Host "Push completed with exit code: $LASTEXITCODE"
}
