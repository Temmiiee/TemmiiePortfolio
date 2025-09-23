# 🔥 Test de déclenchement des workflows

Ce fichier sert à déclencher manuellement les workflows GitHub Actions pour tester :

## 🔍 Workflows déclenchés :

### 1. **CodeQL Analysis**
- **Déclencheur:** Push sur main, PR, programmé (mardi 3h)
- **Action:** Analyse statique du code JavaScript/TypeScript
- **Résultat:** Détection des vulnérabilités et problèmes de sécurité

### 2. **Security Scan**
- **Déclencheur:** Modification package.json, programmé (quotidien 4h)
- **Action:** Scan des vulnérabilités dans les dépendances npm
- **Résultat:** Rapport des CVE et problèmes de sécurité

### 3. **Dependabot Auto-merge**
- **Déclencheur:** PR Dependabot créée
- **Action:** Auto-merge intelligent des mises à jour mineures
- **Résultat:** Gestion automatisée des dépendances

### 4. **Security Notifications**
- **Déclencheur:** Programmé (lundi 9h), manuel
- **Action:** Rapport hebdomadaire de sécurité
- **Résultat:** Issues automatiques si vulnérabilités critiques

## 🚀 Commandes de déclenchement :

### Via interface GitHub :
1. Aller sur https://github.com/Temmiiee/TemmiiePortfolio/actions
2. Sélectionner le workflow souhaité
3. Cliquer "Run workflow" (si `workflow_dispatch` activé)

### Via push/PR :
```bash
# Déclencher CodeQL + Security Scan
git add . && git commit -m "trigger workflows" && git push

# Créer une PR pour test complet
git checkout -b test-security
git push -u origin test-security
# Puis créer PR via GitHub
```

### Via modification des dépendances :
```bash
# Déclencher Security Scan
npm update --save-dev @types/node
git add package*.json && git commit -m "update deps" && git push
```

---

**Timestamp:** $(date)
**Test ID:** $(uuidgen || echo "manual-trigger-$(date +%s)")<!-- Manual trigger: 09/23/2025 21:16:48 -->
