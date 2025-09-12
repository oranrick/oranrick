/* Script para alternar el tema oscuro/claro */
document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.setAttribute('data-theme', 'dark');

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
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
    updateIcon('dark');
  }
});
