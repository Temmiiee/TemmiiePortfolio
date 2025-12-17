(function() {
  var html = document.documentElement;
  var theme = null;
  if (typeof Storage !== 'undefined') {
    theme = localStorage.getItem('theme');
  }
  if (theme === 'light') {
    html.className = 'light theme-loaded';
    html.style.cssText = 'background-color:#ffffff;color-scheme:light';
  } else {
    // Mode sombre par défaut
    html.className = 'dark theme-loaded';
    html.style.cssText = 'background-color:#0a0a1a;color-scheme:dark';
  }
})();
