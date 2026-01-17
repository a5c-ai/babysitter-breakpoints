$ErrorActionPreference = "Stop"

Write-Host "Starting API and worker..."
Start-Process -FilePath "node" -ArgumentList "api/server.js" -NoNewWindow
Start-Process -FilePath "node" -ArgumentList "worker/worker.js" -NoNewWindow

Write-Host "API: http://localhost:3000"
Write-Host "Use Ctrl+C to stop."
