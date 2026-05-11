// Apply saved theme immediately to avoid flash of wrong theme
(function () {
  const saved = localStorage.getItem('theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  }
})();

document.addEventListener('DOMContentLoaded', function () {
  const btn = document.querySelector('.theme-toggle-btn');
  if (!btn) return;

  function setIcon(theme) {
    const icon = btn.querySelector('i');
    if (!icon) return;
    icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
  }

  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  setIcon(currentTheme);

  btn.addEventListener('click', function () {
    const theme = document.documentElement.getAttribute('data-theme');
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    setIcon(nextTheme);
  });
});
