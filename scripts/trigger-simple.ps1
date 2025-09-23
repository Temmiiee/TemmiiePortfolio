# 🚀 Script de déclenchement des workflows GitHub Actions
param(
    [string]$Type = "all"
)

Write-Host "🔥 Déclenchement des workflows GitHub Actions" -ForegroundColor Cyan
Write-Host "=================================================="

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

if ($Type -eq "codeql" -or $Type -eq "all") {
    Write-Host "🔍 Déclenchement CodeQL Analysis..." -ForegroundColor Yellow
    Add-Content -Path "WORKFLOW_TRIGGER.md" -Value "`n<!-- CodeQL trigger: $timestamp -->"
}

if ($Type -eq "security" -or $Type -eq "all") {
    Write-Host "🛡️ Déclenchement Security Scan..." -ForegroundColor Yellow
    # Mise à jour d'une dépendance pour déclencher le scan
    npm update --save-dev typescript 2>$null
}

if ($Type -eq "dependabot") {
    Write-Host "🤖 Informations Dependabot:" -ForegroundColor Yellow
    Write-Host "Dependabot se déclenche automatiquement selon sa configuration"
    Write-Host "Vérifiez: https://github.com/Temmiiee/TemmiiePortfolio/network/dependencies"
    return
}

# Commiter et pousser les changements
if ($Type -ne "dependabot") {
    Write-Host "📤 Commit et push des changements..." -ForegroundColor Green
    
    git add .
    git commit -m "trigger: Workflows $Type - $timestamp"
    git push
    
    Write-Host "✅ Workflows déclenchés!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🔗 Voir les résultats:" -ForegroundColor Cyan
    Write-Host "https://github.com/Temmiiee/TemmiiePortfolio/actions"
}

Write-Host "=================================================="