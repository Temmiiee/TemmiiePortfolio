# 🚀 Guide de déclenchement des workflows

## ⚡ **Méthodes rapides**

### **1. Script PowerShell (Recommandé)**
```powershell
# Déclencher tous les workflows
.\scripts\trigger-workflows.ps1 -WorkflowType "all"

# Déclencher CodeQL uniquement
.\scripts\trigger-workflows.ps1 -WorkflowType "codeql"

# Déclencher Security Scan uniquement  
.\scripts\trigger-workflows.ps1 -WorkflowType "security"

# Avec message personnalisé
.\scripts\trigger-workflows.ps1 -WorkflowType "all" -Message "Test après nouvelles fonctionnalités"
```

### **2. Via push/commit manuel**
```bash
# Méthode simple : push vide
git commit --allow-empty -m "trigger: Déclencher workflows de sécurité"
git push

# Ou modifier un fichier existant
echo "<!-- $(date) -->" >> WORKFLOW_TRIGGER.md
git add . && git commit -m "trigger workflows" && git push
```

### **3. Via interface GitHub**
1. 🌐 Aller sur https://github.com/Temmiiee/TemmiiePortfolio/actions
2. 📋 Sélectionner le workflow souhaité
3. ▶️ Cliquer "Run workflow" (bouton vert à droite)
4. ✅ Confirmer l'exécution

## 🎯 **Déclencheurs spécifiques**

### **CodeQL Analysis**
```yaml
# Déclencheurs automatiques:
on:
  push: [main, develop]          # ✅ À chaque push
  pull_request: [main]           # ✅ À chaque PR
  schedule: '0 3 * * 2'          # ✅ Mardi 3h auto
  workflow_dispatch              # ✅ Manuel via GitHub
```

**🚀 Déclenchement manuel:**
- Any push to main → déclenche immédiatement
- Création d'une PR → analyse automatique
- Interface GitHub Actions → "Run workflow"

### **Security Scan** 
```yaml
# Déclencheurs automatiques:
on:
  push:
    paths: ['package.json', 'package-lock.json']  # ✅ Modif dépendances
  pull_request:
    paths: ['package.json', 'package-lock.json']  # ✅ PR avec deps
  schedule: '0 4 * * *'                           # ✅ Quotidien 4h
  workflow_dispatch                               # ✅ Manuel
```

**🚀 Déclenchement manuel:**
```bash
# Toucher package.json
npm update --save-dev @types/node
git add package*.json && git commit -m "update deps" && git push

# Ou directement
.\scripts\trigger-workflows.ps1 -WorkflowType "security"
```

### **Dependabot**
```yaml
# Déclencheurs automatiques:
schedule:
  - package-ecosystem: "npm"
    schedule: 
      interval: "daily"        # ✅ Vérification quotidienne
      time: "04:00"           # ✅ À 4h du matin
```

**🤖 Gestion Dependabot:**
- ✅ **Automatique** : Vérification quotidienne à 4h
- ✅ **Auto-merge** : Mises à jour mineures fusionnées automatiquement  
- ✅ **Manual review** : Mises à jour majeures nécessitent validation
- 🌐 **Interface** : https://github.com/Temmiiee/TemmiiePortfolio/network/dependencies

### **Security Notifications**
```yaml
# Déclencheur automatique:
schedule: '0 9 * * 1'          # ✅ Lundi 9h (rapport hebdomadaire)
workflow_dispatch              # ✅ Manuel via GitHub
```

## 📊 **Monitoring en temps réel**

### **Vérifier l'exécution:**
```bash
# Via liens directs
start https://github.com/Temmiiee/TemmiiePortfolio/actions

# Workflows individuels
start https://github.com/Temmiiee/TemmiiePortfolio/actions/workflows/codeql-analysis.yml
start https://github.com/Temmiiee/TemmiiePortfolio/actions/workflows/security-scan.yml
```

### **Status des workflows:**
- 🟢 **Success** : Workflow terminé sans problème
- 🟡 **In Progress** : Workflow en cours d'exécution  
- 🔴 **Failed** : Erreur détectée, vérification requise
- ⚪ **Cancelled** : Workflow annulé manuellement

## ⏱️ **Temps d'exécution estimés**

| Workflow | Durée | Fréquence auto |
|----------|-------|----------------|
| 🔍 **CodeQL Analysis** | 5-10 min | Mardi 3h |
| 🛡️ **Security Scan** | 2-3 min | Quotidien 4h |
| 🤖 **Dependabot Auto-merge** | 1-2 min | Sur PR Dependabot |
| 📢 **Security Notifications** | 30s-1 min | Lundi 9h |

## 🆘 **Troubleshooting**

### **Workflow échoue:**
1. 📋 Vérifier les logs sur GitHub Actions
2. 🔍 Chercher les erreurs dans la sortie
3. 🔧 Corriger les problèmes identifiés
4. 🚀 Re-déclencher via script ou push

### **Dependabot ne crée pas de PR:**
1. ✅ Vérifier que Dependabot est activé dans Settings
2. 📦 S'assurer que des mises à jour sont disponibles
3. ⏱️ Attendre la prochaine vérification programmée
4. 🔄 Forcer via l'interface Dependencies

### **CodeQL trouve des problèmes:**
1. 📋 Examiner les résultats dans Security tab
2. 🔍 Analyser les vulnérabilités détectées
3. 🔧 Appliquer les corrections suggérées
4. ✅ Re-tester avec nouveau push