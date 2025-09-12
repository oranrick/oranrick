document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('diary-entries');
  const search = document.getElementById('diary-search');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  diaryEntries.sort((a, b) => new Date(b.date) - new Date(a.date));

  if (id) {
    const entry = diaryEntries.find(e => e.id === id);
    renderEntry(entry);
    if (search) search.style.display = 'none';
    return;
  }

  renderList(diaryEntries);
  search.addEventListener('input', filterEntries);

  function renderEntry(entry) {
    container.innerHTML = '';
    if (!entry) {
      container.textContent = 'Entrada no encontrada.';
      return;
    }
    const article = document.createElement('article');
    const h1 = document.createElement('h1');
    h1.className = 'diary-title';
    h1.textContent = entry.title;
    article.appendChild(h1);

    const time = document.createElement('time');
    time.dateTime = entry.date;
    time.className = 'diary-date';
    time.textContent = new Date(entry.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
    article.appendChild(time);

    const content = document.createElement('div');
    content.innerHTML = marked.parse(entry.content);
    const firstH1 = content.querySelector('h1');
    if (firstH1) firstH1.remove();
    article.appendChild(content);
    container.appendChild(article);
  }

  function renderList(list) {
    container.innerHTML = '';
    if (list.length === 0) {
      const p = document.createElement('p');
      p.textContent = 'No se encontraron entradas con esa búsqueda.';
      container.appendChild(p);
      return;
    }

   
    list.forEach(entry => {
      const article = document.createElement('article');
      const h2 = document.createElement('h2');
      const link = document.createElement('a');
      link.href = `?id=${entry.id}`;
      link.textContent = entry.title;
      h2.appendChild(link);
      article.appendChild(h2);

      const time = document.createElement('time');
      time.dateTime = entry.date;
      time.className = 'text-muted d-block mb-2';

      time.textContent = new Date(entry.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
      article.appendChild(time);

      const p = document.createElement('p');
      p.className = 'diary-excerpt';
      p.textContent = getExcerpt(entry.content);
      article.appendChild(p);

      time.textContent = date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
      header.appendChild(time);
      article.appendChild(header);
      const content = document.createElement('div');
      content.innerHTML = marked.parse(entry.content);
      article.appendChild(content);
      
      container.appendChild(article);
    });
  }

  function getExcerpt(markdown) {
    const tokens = marked.lexer(markdown);
    for (const token of tokens) {
      if (token.type === 'blockquote' || token.type === 'paragraph') {
        const html = marked.parser([token]);
        const temp = document.createElement('div');
        temp.innerHTML = html;
        return temp.textContent.trim();
      }
    }
    return '';
  }

  function filterEntries() {
    const q = search.value.toLowerCase();
    const filtered = diaryEntries.filter(e =>
      (e.title && e.title.toLowerCase().includes(q)) ||
      e.content.toLowerCase().includes(q)
    );
    renderList(filtered.sort((a, b) => new Date(b.date) - new Date(a.date)));
  }
});
