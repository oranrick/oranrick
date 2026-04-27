const translations = {
  // Add translations as data attributes
};

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
    el.textContent = lang === "en" ? el.getAttribute("data-en") : el.getAttribute("data-es");
  });
  document.documentElement.setAttribute("lang", lang);
}
