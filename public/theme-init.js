(function() {
  try {
    // dark mode as default - executed immediately
    var html = document.documentElement;
    var theme = null;
    
    try {
      theme = localStorage.getItem('theme');
    } catch (e) {
      // localStorage might not be available
    }
    
    // ALWAYS start with dark mode
    html.classList.add('dark');
    html.style.backgroundColor = '#0a0a1a';
    html.style.colorScheme = 'dark';
    
    // Only switch to light if explicitly requested
    if (theme === 'light') {
      html.classList.remove('dark');
      html.style.backgroundColor = '#ffffff';
      html.style.colorScheme = 'light';
    }
    
    // Prevent any flash
    html.classList.add('theme-loaded');
    
  } catch (e) {
    // fallback - ALWAYS dark mode
    var html = document.documentElement;
    html.classList.add('dark');
    html.style.backgroundColor = '#0a0a1a';
    html.style.colorScheme = 'dark';
    html.classList.add('theme-loaded');
  }
})();
