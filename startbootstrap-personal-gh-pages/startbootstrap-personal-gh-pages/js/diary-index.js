document.addEventListener("DOMContentLoaded", async () => {
  const search = document.querySelector("#diary-search");
  const emptyMsg = document.querySelector("#diary-empty");
  const featuredEl = document.querySelector("#diary-featured");
  const listEl = document.querySelector("#diary-list");

  const entries = await loadDiaryEntries();
  if (!entries.length) return;

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

  const [featured, ...others] = entries;
  renderFeatured(featured);
  renderGroups(others);

  // search
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

  // update search placeholder on lang change
  document.addEventListener("langchange", (e) => {
    const lang = e.detail.lang;
    const input = document.querySelector("#diary-search");
    if (input) {
      input.placeholder = lang === "en"
        ? (input.getAttribute("data-placeholder-en") || "Search the diary…")
        : (input.getAttribute("data-placeholder-es") || "Buscar en el diario…");
    }
  });

  function renderFeatured(entry) {
    const lang = currentLang();
    const article = document.createElement("article");
    const ex = entryExcerpt(entry, lang);
    article.className = "diary-featured diary-card";
    article.setAttribute("data-title", entryTitle(entry, "es"));
    article.setAttribute("data-excerpt", buildExcerpt(entry));

    const body = document.createElement("div");
    body.className = "diary-featured-body";

    const label = document.createElement("span");
    label.className = "diary-featured-label";
    label.setAttribute("data-es", "Última entrada");
    label.setAttribute("data-en", "Latest entry");
    label.textContent = lang === "en" ? "Latest entry" : "Última entrada";
    body.appendChild(label);

    const h2 = document.createElement("h2");
    const link = document.createElement("a");
    link.href = `/diary/${entry.date.slice(0,4)}/${entry.date.slice(5,7)}/${entry.slug}/`;
    link.className = "diary-title-link";
    link.textContent = entryTitle(entry, lang);
    link.setAttribute("data-title-es", entry.title);
    link.setAttribute("data-title-en", entry.title_en || entry.title);
    h2.appendChild(link);
    body.appendChild(h2);

    const time = document.createElement("div");
    time.className = "diary-date";
    time.textContent = new Date(entry.date).toLocaleDateString(
      lang === "en" ? "en-US" : "es-ES",
      { day: "numeric", month: "long", year: "numeric" }
    );
    body.appendChild(time);

    const p = document.createElement("p");
    p.className = "diary-excerpt";
    p.textContent = ex;
    p.setAttribute("data-excerpt-es", buildExcerpt(entry));
    p.setAttribute("data-excerpt-en", entry.excerpt_en || buildExcerpt(entry));
    body.appendChild(p);

    const cta = document.createElement("a");
    cta.className = "diary-cta leer-mas-link";
    cta.href = link.href;
    cta.textContent = lang === "en" ? "Read →" : "Leer →";
    body.appendChild(cta);

    article.appendChild(body);
    featuredEl.appendChild(article);

    // lang change handler
    document.addEventListener("langchange", (e) => {
      const l = e.detail.lang;
      label.textContent = l === "en" ? "Latest entry" : "Última entrada";
      link.textContent = entryTitle(entry, l);
      time.textContent = new Date(entry.date).toLocaleDateString(
        l === "en" ? "en-US" : "es-ES",
        { day: "numeric", month: "long", year: "numeric" }
      );
      p.textContent = entryExcerpt(entry, l);
      cta.textContent = l === "en" ? "Read →" : "Leer →";
    });
  }

  function renderGroups(list) {
    const lang = currentLang();
    const groups = {};
    list.forEach((entry) => {
      const key = entry.date.slice(0, 7);
      (groups[key] = groups[key] || []).push(entry);
    });

    Object.keys(groups).sort((a, b) => b.localeCompare(a)).forEach((key) => {
      const [y, m] = key.split("-");
      const heading = document.createElement("h2");
      heading.className = "diary-month";
      heading.textContent = new Date(`${y}-${m}-01T00:00:00`).toLocaleDateString(
        lang === "en" ? "en-US" : "es-ES",
        { month: "long", year: "numeric" }
      );
      listEl.appendChild(heading);

      const grid = document.createElement("div");
      grid.className = "diary-grid";

      groups[key].forEach((entry) => {
        const article = document.createElement("article");
        article.className = "diary-card";
        article.setAttribute("data-title", entry.title || "");
        article.setAttribute("data-excerpt", buildExcerpt(entry));

        const h3 = document.createElement("h3");
        const link = document.createElement("a");
        link.href = `/diary/${entry.date.slice(0,4)}/${entry.date.slice(5,7)}/${entry.slug}/`;
        link.className = "diary-title-link";
        link.textContent = entryTitle(entry, lang);
        link.setAttribute("data-title-es", entry.title);
        link.setAttribute("data-title-en", entry.title_en || entry.title);
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
        p.textContent = entryExcerpt(entry, lang);
        p.setAttribute("data-excerpt-es", buildExcerpt(entry));
        p.setAttribute("data-excerpt-en", entry.excerpt_en || buildExcerpt(entry));
        article.appendChild(p);

        const cta = document.createElement("a");
        cta.className = "diary-cta leer-mas-link";
        cta.href = link.href;
        cta.textContent = lang === "en" ? "Read more" : "Leer más";
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
          cta.textContent = l === "en" ? "Read more" : "Leer más";
          heading.textContent = new Date(`${y}-${m}-01T00:00:00`).toLocaleDateString(
            l === "en" ? "en-US" : "es-ES",
            { month: "long", year: "numeric" }
          );
        });
      });

      listEl.appendChild(grid);
    });
  }
});
