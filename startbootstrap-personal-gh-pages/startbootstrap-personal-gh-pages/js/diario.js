document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('diary-entries');
  const search = document.getElementById('diary-search');
  if (!container) return;

  function render(list) {
    container.innerHTML = '';
    let currentMonth = '';
    list.forEach(entry => {
      const date = new Date(entry.date);
      const monthLabel = date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
      if (monthLabel !== currentMonth) {
        const h2 = document.createElement('h2');
        h2.textContent = monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1);
        container.appendChild(h2);
        currentMonth = monthLabel;
      }
      const article = document.createElement('article');
      const header = document.createElement('header');
      if (entry.title) {
        const h3 = document.createElement('h3');
        h3.textContent = entry.title;
        header.appendChild(h3);
      }
      const time = document.createElement('time');
      time.dateTime = entry.date;
      time.className = 'text-muted d-block mb-2';
      time.textContent = date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
      header.appendChild(time);
      article.appendChild(header);
      const p = document.createElement('p');
      p.innerHTML = entry.content;
      article.appendChild(p);
      container.appendChild(article);
    });
  }

  function filterEntries() {
    const q = search.value.toLowerCase();
    const filtered = diaryEntries.filter(e =>
      (e.title && e.title.toLowerCase().includes(q)) ||
      e.content.toLowerCase().includes(q)
    );
    const sorted = filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    render(sorted);
  }

  diaryEntries.sort((a, b) => new Date(b.date) - new Date(a.date));
  render(diaryEntries);
  search.addEventListener('input', filterEntries);
});
