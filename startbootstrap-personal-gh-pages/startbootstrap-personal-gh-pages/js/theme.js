/* Global theme toggling with persistence */
document.addEventListener('DOMContentLoaded', () => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const stored = localStorage.getItem('theme');

  if (!stored && prefersDark) {
    document.documentElement.classList.add('dark-mode');
  }

  const meta = document.getElementById('theme-color');
  const toggle = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');

  const set = (theme) => {
    document.documentElement.classList.toggle('dark-mode', theme === 'dark');
    localStorage.setItem('theme', theme);
    if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    if (meta) meta.content = theme === 'dark' ? '#000000' : '#ffffff';
  };

  if (toggle) {
    toggle.addEventListener('click', () => {
      const theme = document.documentElement.classList.contains('dark-mode')
        ? 'light'
        : 'dark';
      set(theme);
    });
  }

  const initial = document.documentElement.classList.contains('dark-mode')
    ? 'dark'
    : 'light';
  set(initial);
});
