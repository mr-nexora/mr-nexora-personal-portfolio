/**
 * MR. NEXORA PORTFOLIO | THEME CONTROLLER
 * Manages light/dark themes, localStorage persistence, and system preference
 */

const THEME_KEY = 'mrnexora_theme_preference';

export function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  applyTheme(initialTheme);

  // Bind toggle buttons (both desktop and mobile if present)
  const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      localStorage.setItem(THEME_KEY, nextTheme);
    });
  });

  // Listen to OS theme changes if user has not explicitly set a manual preference
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(THEME_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
}

export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
  
  toggleBtns.forEach(btn => {
    if (theme === 'dark') {
      btn.innerHTML = '<i class="uil uil-sun"></i>';
      btn.setAttribute('aria-label', 'Switch to light mode');
      btn.setAttribute('title', 'Switch to light mode');
    } else {
      btn.innerHTML = '<i class="uil uil-moon"></i>';
      btn.setAttribute('aria-label', 'Switch to dark mode');
      btn.setAttribute('title', 'Switch to dark mode');
    }
  });
}
