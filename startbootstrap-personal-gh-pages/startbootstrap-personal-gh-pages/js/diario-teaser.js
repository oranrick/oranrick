document.addEventListener('DOMContentLoaded', () => {
  const teaser = document.getElementById('diary-teaser');
  if (!teaser) return;
  const latest = [...diaryEntries]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 1);
  latest.forEach(entry => {
    const article = document.createElement('article');
    if (entry.title) {
      const h3 = document.createElement('h3');
      const link = document.createElement('a');
      link.href = `diario/?id=${entry.id}`;
      link.textContent = entry.title;
      h3.appendChild(link);
      article.appendChild(h3);
    }
    const time = document.createElement('time');
    time.dateTime = entry.date;
    time.className = 'text-muted d-block mb-2';
    time.textContent = new Date(entry.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
    article.appendChild(time);
    const p = document.createElement('p');
    p.className = 'diary-excerpt';
    const html = marked.parse(entry.content);
    const temp = document.createElement('div');
    temp.innerHTML = html;
    const quote = temp.querySelector('blockquote');
    const firstP = temp.querySelector('p');
    const snippet = quote ? quote.textContent : firstP ? firstP.textContent : '';
    p.textContent = snippet;
    const html = marked.parse(entry.content);
    const temp = document.createElement('div');
    temp.innerHTML = html;
    const firstP = temp.querySelector('p');
    p.textContent = firstP ? firstP.textContent : '';
    article.appendChild(p);
    teaser.appendChild(article);
  });
});
