document.addEventListener('DOMContentLoaded', () => {
  const teaser = document.getElementById('diary-teaser');
  if (!teaser) return;
  const latest = [...diaryEntries]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 2);
  latest.forEach(entry => {
    const article = document.createElement('article');
    if (entry.title) {
      const h3 = document.createElement('h3');
      h3.textContent = entry.title;
      article.appendChild(h3);
    }
    const time = document.createElement('time');
    time.dateTime = entry.date;
    time.className = 'text-muted d-block mb-2';
    time.textContent = new Date(entry.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
    article.appendChild(time);
    const p = document.createElement('p');
    const snippet = entry.content.length > 120 ? entry.content.substring(0, 120) + '…' : entry.content;
    p.innerHTML = snippet;
    article.appendChild(p);
    teaser.appendChild(article);
  });
});
