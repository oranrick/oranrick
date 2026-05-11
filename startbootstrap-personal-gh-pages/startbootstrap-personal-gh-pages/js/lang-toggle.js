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
    if (el.children.length > 0) return; // skip elements that contain child elements
    const text = lang === "en"
      ? (el.getAttribute("data-en") || el.getAttribute("data-es"))
      : el.getAttribute("data-es");
    if (text != null) el.textContent = text;
  });
  document.documentElement.setAttribute("lang", lang);
  document.dispatchEvent(new CustomEvent("langchange", { detail: { lang: lang } }));
}
