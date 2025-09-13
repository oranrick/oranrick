document.addEventListener("DOMContentLoaded", async () => {
  const teaser = document.getElementById("diary-teaser");
  if (!teaser) return;
  const entries = (await loadDiaryEntries()).slice(0, 4);
  const grid = document.createElement("div");
  grid.className = "diary-grid diary-teaser";
  entries.forEach((entry) => {
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
    time.textContent = new Date(entry.date).toLocaleDateString("en-US", {
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
    cta.textContent = "Read more";
    article.appendChild(cta);

    grid.appendChild(article);
  });
  teaser.appendChild(grid);
});
