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

  const back = document.createElement("a");
  back.className = "back-link";
  back.href = "/diary/";
  back.textContent = "← Volver al diario";
  container.appendChild(back);
});
