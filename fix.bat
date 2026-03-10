@echo off
powershell -Command "$content = Get-Content -Path 'app/[lang]/HomeClient.tsx' -Raw; $content = $content -replace \"beds: '3'\", \"beds: '5'\"; Set-Content -Path 'app/[lang]/HomeClient.tsx' -Value $content"
echo Done
pause
