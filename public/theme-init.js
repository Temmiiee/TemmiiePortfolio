(function() {
  'use strict';
  
  var html = document.documentElement;
  var theme = null;
  
  // Optimized theme detection
  try {
    theme = localStorage.getItem('theme');
  } catch (e) {
    // Fallback si localStorage n'est pas disponible
    theme = null;
  }
  
  // Appliquer le thème immédiatement pour éviter le flash
  if (theme === 'light') {
    html.className = 'light theme-loaded';
    html.style.cssText = 'background-color:#ffffff!important;color-scheme:light!important;color:#1a1a2e!important';
  } else {
    // Mode sombre par défaut - plus rapide
    html.className = 'dark theme-loaded';
    html.style.cssText = 'background-color:#0a0a1a!important;color-scheme:dark!important;color:#e2e8f0!important';
  }
  
  // Marquer comme chargé pour éviter les re-rendus
  html.setAttribute('data-theme-ready', 'true');
})();
