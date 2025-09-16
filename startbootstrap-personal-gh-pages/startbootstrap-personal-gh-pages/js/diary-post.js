document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("diary-post");
  const parts = window.location.pathname.split("/").filter(Boolean);
  const slug = parts[parts.length - 1];
  const year = parts[parts.length - 3];
  const month = parts[parts.length - 2];

  const entries = await loadDiaryEntries();
  const entry = entries.find(
    (e) => e.slug === slug && e.date.startsWith(`${year}-${month}`),
  );
  if (!entry) {
    container.textContent = "Entrada no encontrada.";
    return;
  }

  const h1 = document.createElement("h1");
  h1.className = "post-title";
  h1.textContent = entry.title;
  container.appendChild(h1);

  const time = document.createElement("p");
  time.className = "post-date";
  time.textContent = new Date(entry.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  container.appendChild(time);

  const content = document.createElement("div");
  content.className = "post-content";
  content.innerHTML = marked.parse(entry.content);
  const firstH1 = content.querySelector("h1");
  if (firstH1) firstH1.remove();
  container.appendChild(content);

  const share = document.createElement("div");
  share.className = "share-container";
  share.setAttribute("data-share-text", entry.title);
  share.innerHTML = `
    <h2 class="share-title">Comparte este texto</h2>
    <p class="share-description">Si te gustó, compártelo en tus redes sociales favoritas:</p>
    <div class="share-buttons">
      <button type="button" class="share-button" data-share-network="facebook">
        <i class="bi bi-facebook"></i>
        <span>Facebook</span>
      </button>
      <button type="button" class="share-button" data-share-network="x">
        <i class="bi bi-twitter-x"></i>
        <span>X</span>
      </button>
      <button type="button" class="share-button" data-share-network="linkedin">
        <i class="bi bi-linkedin"></i>
        <span>LinkedIn</span>
      </button>
      <button type="button" class="share-button" data-share-network="whatsapp">
        <i class="bi bi-whatsapp"></i>
        <span>WhatsApp</span>
      </button>
      <button type="button" class="share-button" data-share-network="telegram">
        <i class="bi bi-telegram"></i>
        <span>Telegram</span>
      </button>
      <button type="button" class="share-button" data-share-network="copy">
        <i class="bi bi-link-45deg"></i>
        <span>Copiar enlace</span>
      </button>
    </div>
    <p class="share-hint"><i class="bi bi-info-circle me-2"></i>¿Prefieres otra app? Copia el enlace y pégalo donde quieras.</p>
    <p class="share-feedback" role="status" aria-live="polite"></p>
  `;
  container.appendChild(share);
  if (typeof window.initializeShareButtons === "function") {
    window.initializeShareButtons(share);
  }

  const back = document.createElement("a");
  back.className = "back-link";
  back.href = "/diary/";
  back.textContent = "← Volver al diario";
  container.appendChild(back);
});
