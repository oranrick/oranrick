document.addEventListener("DOMContentLoaded", async () => {
  const teaser = document.getElementById("diary-teaser");
  if (!teaser) return;

  const entries = (await loadDiaryEntries()).slice(0, 4);
  const grid = document.createElement("div");
  grid.className = "diary-grid diary-teaser";

  function currentLang() {
    return localStorage.getItem("lang") || "es";
  }

  function entryTitle(entry, lang) {
    return (lang === "en" && entry.title_en) ? entry.title_en : entry.title;
  }

  function entryExcerpt(entry, lang) {
    if (lang === "en" && entry.excerpt_en) return entry.excerpt_en.trim();
    return buildExcerpt(entry);
  }

  entries.forEach((entry) => {
    const lang = currentLang();
    const article = document.createElement("article");
    article.className = "diary-card";
    const ex = entryExcerpt(entry, lang);
    article.setAttribute("data-title", entry.title || "");
    article.setAttribute("data-excerpt", buildExcerpt(entry));

    const h3 = document.createElement("h3");
    const link = document.createElement("a");
    link.className = "diary-title-link";
    link.href = `/diary/${entry.date.slice(0, 4)}/${entry.date.slice(5, 7)}/${entry.slug}/`;
    link.textContent = entryTitle(entry, lang);
    h3.appendChild(link);
    article.appendChild(h3);

    const time = document.createElement("div");
    time.className = "diary-date";
    time.textContent = new Date(entry.date).toLocaleDateString(
      lang === "en" ? "en-US" : "es-ES",
      { day: "numeric", month: "long", year: "numeric" }
    );
    article.appendChild(time);

    const p = document.createElement("p");
    p.className = "diary-excerpt";
    p.textContent = ex;
    article.appendChild(p);

    const cta = document.createElement("a");
    cta.className = "diary-cta leer-mas-link";
    cta.href = link.href;
    cta.textContent = lang === "en" ? "Read more →" : "Leer más →";
    article.appendChild(cta);

    grid.appendChild(article);

    document.addEventListener("langchange", (e) => {
      const l = e.detail.lang;
      link.textContent = entryTitle(entry, l);
      time.textContent = new Date(entry.date).toLocaleDateString(
        l === "en" ? "en-US" : "es-ES",
        { day: "numeric", month: "long", year: "numeric" }
      );
      p.textContent = entryExcerpt(entry, l);
      cta.textContent = l === "en" ? "Read more →" : "Leer más →";
    });
  });

  teaser.appendChild(grid);
});
