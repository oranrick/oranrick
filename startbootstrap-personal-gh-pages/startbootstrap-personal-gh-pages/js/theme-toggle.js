(function () {
  const root = document.documentElement;
  const button = document.querySelector('.theme-toggle-btn');

  function setIcon(theme) {
    if (!button) return;
    const icon = button.querySelector('i');
    if (!icon) return;
    icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    setIcon(theme);
  }

  const savedTheme = localStorage.getItem('theme');
  const initialTheme = savedTheme || 'light';
  applyTheme(initialTheme);

  if (button) {
    button.addEventListener('click', function () {
      const currentTheme = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      localStorage.setItem('theme', nextTheme);
    });
  }
})();
