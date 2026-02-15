Set objShell = CreateObject("WScript.Shell")
objShell.CurrentDirectory = "C:\Users\asus\Desktop\agri\agriconnectapp"
objShell.Run "cmd /c git push origin main --force-with-lease", 1, True
WScript.Echo "Git push completed! Check your GitHub repository."
