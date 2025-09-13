/* Script para alternar el tema oscuro/claro */
document.addEventListener('DOMContentLoaded', () => {
  // Detecta si el sistema del usuario prefiere modo oscuro
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  // Revisa si el usuario ya eligió un tema en 'localStorage'
  const userTheme = localStorage.getItem('theme');

  if (userTheme) {
    document.documentElement.setAttribute('data-theme', userTheme);
  } else if (prefersDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
  }

  function updateIcon(theme) {
    const icon = document.getElementById('theme-icon');
    if (!icon) return;
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  const button = document.getElementById('theme-toggle');
  if (button) {
    button.addEventListener('click', toggleTheme);
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    updateIcon(current);
  }
});
