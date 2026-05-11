document.addEventListener("DOMContentLoaded", async () => {
  const teaser = document.getElementById("diary-teaser");
  if (!teaser) return;

  const entries = (await loadDiaryEntries()).slice(0, 4);
  const grid = document.createElement("div");
  grid.className = "diary-grid diary-teaser";

  function currentLang() {
    return localStorage.getItem("lang") || "es";
  }

  entries.forEach((entry) => {
    const article = document.createElement("article");
    article.className = "diary-card";
    const ex = buildExcerpt(entry);
    article.setAttribute("data-title", entry.title || "");
    article.setAttribute("data-excerpt", ex);

    const h3 = document.createElement("h3");
    const link = document.createElement("a");
    link.className = "diary-title-link";
    link.href = `/diary/${entry.date.slice(0, 4)}/${entry.date.slice(5, 7)}/${entry.slug}/`;
    link.textContent = entry.title;
    h3.appendChild(link);
    article.appendChild(h3);

    const time = document.createElement("div");
    time.className = "diary-date";
    const dateObj = new Date(entry.date);
    const formatDate = (lang) => dateObj.toLocaleDateString(lang === "en" ? "en-US" : "es-ES", {
      day: "numeric", month: "long", year: "numeric",
    });
    time.textContent = formatDate(currentLang());
    article.appendChild(time);

    const p = document.createElement("p");
    p.className = "diary-excerpt";
    p.textContent = ex;
    article.appendChild(p);

    const cta = document.createElement("a");
    cta.className = "diary-cta leer-mas-link";
    cta.href = link.href;
    cta.textContent = currentLang() === "en" ? "Read more →" : "Leer más →";
    article.appendChild(cta);

    grid.appendChild(article);
  });

  teaser.appendChild(grid);

  document.addEventListener("langchange", (e) => {
    const lang = e.detail.lang;
    grid.querySelectorAll(".leer-mas-link").forEach((el) => {
      el.textContent = lang === "en" ? "Read more →" : "Leer más →";
    });
    grid.querySelectorAll(".diary-date").forEach((el, i) => {
      if (entries[i]) {
        el.textContent = new Date(entries[i].date).toLocaleDateString(
          lang === "en" ? "en-US" : "es-ES",
          { day: "numeric", month: "long", year: "numeric" }
        );
      }
    });
  });
});
