document.addEventListener("DOMContentLoaded", async () => {
  const search = document.querySelector("#diary-search");
  const emptyMsg = document.querySelector("#diary-empty");
  const featuredEl = document.querySelector("#diary-featured");
  const listEl = document.querySelector("#diary-list");

  const entries = await loadDiaryEntries();
  if (!entries.length) return;

  const [featured, ...others] = entries;
  renderFeatured(featured);
  renderGroups(others);

  const cards = Array.from(document.querySelectorAll(".diary-card"));
  search.addEventListener("input", () => {
    const term = search.value.trim().toLowerCase();
    let shown = 0;
    cards.forEach((card) => {
      const title = card.getAttribute("data-title")?.toLowerCase() || "";
      const excerpt = card.getAttribute("data-excerpt")?.toLowerCase() || "";
      const match = !term || title.includes(term) || excerpt.includes(term);
      card.style.display = match ? "" : "none";
      if (match) shown++;
    });
    emptyMsg.style.display = shown ? "none" : "";
  });

  function renderFeatured(entry) {
    const article = document.createElement("article");
    const ex = buildExcerpt(entry);
    article.className = "diary-featured diary-card";
    article.setAttribute("data-title", entry.title || "");
    article.setAttribute("data-excerpt", ex);
    const h2 = document.createElement("h2");
    const link = document.createElement("a");
    link.href = `/diary/${entry.date.slice(0, 4)}/${entry.date.slice(5, 7)}/${entry.slug}/`;
    link.textContent = entry.title;
    h2.appendChild(link);
    article.appendChild(h2);

    const time = document.createElement("div");
    time.className = "diary-date";
    time.textContent = new Date(entry.date).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    article.appendChild(time);

    const p = document.createElement("p");
    p.className = "diary-excerpt";
    p.textContent = ex;
    article.appendChild(p);

    const cta = document.createElement("a");
    cta.className = "diary-cta";
    cta.href = link.href;
    cta.textContent = "Leer el post completo";
    article.appendChild(cta);

    featuredEl.appendChild(article);
  }

  function renderGroups(list) {
    const groups = {};
    list.forEach((entry) => {
      const key = entry.date.slice(0, 7); // YYYY-MM
      (groups[key] = groups[key] || []).push(entry);
    });

    Object.keys(groups)
      .sort((a, b) => b.localeCompare(a))
      .forEach((key) => {
        const [y, m] = key.split("-");
        const heading = document.createElement("h2");
        heading.className = "diary-month";
        const date = new Date(`${y}-${m}-01T00:00:00`);
        heading.textContent = date.toLocaleDateString("es-ES", {
          month: "long",
          year: "numeric",
        });
        listEl.appendChild(heading);

        const grid = document.createElement("div");
        grid.className = "diary-grid";
        groups[key].forEach((entry) => {
          const article = document.createElement("article");
          article.className = "diary-card";
          const ex = buildExcerpt(entry);
          article.setAttribute("data-title", entry.title || "");
          article.setAttribute("data-excerpt", ex);

          const h3 = document.createElement("h3");
          const link = document.createElement("a");
          link.href = `/diary/${entry.date.slice(0, 4)}/${entry.date.slice(5, 7)}/${entry.slug}/`;
          link.textContent = entry.title;
          h3.appendChild(link);
          article.appendChild(h3);

          const time = document.createElement("div");
          time.className = "diary-date";
          time.textContent = new Date(entry.date).toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });
          article.appendChild(time);

          const p = document.createElement("p");
          p.className = "diary-excerpt";
          p.textContent = ex;
          article.appendChild(p);

          const cta = document.createElement("a");
          cta.className = "diary-cta";
          cta.href = link.href;
          cta.textContent = "Leer más";
          article.appendChild(cta);

          grid.appendChild(article);
        });
        listEl.appendChild(grid);
      });
  }
});
