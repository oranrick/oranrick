document.addEventListener("DOMContentLoaded", function () {
  const btn = document.querySelector(".lang-toggle-btn");
  if (!btn) return;

  const savedLang = localStorage.getItem("lang") || "es";
  applyLanguage(savedLang);
  btn.textContent = savedLang === "es" ? "EN" : "ES";

  btn.addEventListener("click", function () {
    const currentLang = localStorage.getItem("lang") || "es";
    const newLang = currentLang === "es" ? "en" : "es";
    localStorage.setItem("lang", newLang);
    applyLanguage(newLang);
    btn.textContent = newLang === "es" ? "EN" : "ES";
  });
});

function applyLanguage(lang) {
  document.querySelectorAll("[data-es]").forEach(function (el) {
    const esVal = el.getAttribute("data-es");
    const enVal = el.getAttribute("data-en");
    if (esVal == null) return;

    if (el.children.length === 0) {
      // Plain text element
      el.textContent = lang === "en" ? (enVal || esVal) : esVal;
    } else {
      // Element with children: use innerHTML swap
      const target = lang === "en" ? (enVal || esVal) : esVal;
      // Only swap if it looks like plain text (no HTML tags in data attrs)
      if (target && !target.includes("<")) {
        // Replace only the direct text nodes, preserve child elements
        el.childNodes.forEach(function (node) {
          if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== "") {
            node.textContent = target;
          }
        });
      }
    }
  });
  document.documentElement.setAttribute("lang", lang);
  document.dispatchEvent(new CustomEvent("langchange", { detail: { lang: lang } }));
}
