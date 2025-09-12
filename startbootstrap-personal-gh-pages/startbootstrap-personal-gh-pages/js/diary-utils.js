async function loadDiaryEntries() {
  const res = await fetch("/content/diary/index.json");
  const files = await res.json();
  const entries = [];
  for (const file of files) {
    const text = await fetch(`/content/diary/${file}`).then((r) => r.text());
    const { metadata, content } = parseFrontMatter(text);
    const slug = metadata.slug || slugify(metadata.title || "");
    entries.push({ ...metadata, slug, content });
  }
  entries.sort((a, b) => new Date(b.date) - new Date(a.date));
  return entries;
}

function parseFrontMatter(text) {
  if (text.startsWith("---")) {
    const end = text.indexOf("\n---", 3);
    const fmText = text.substring(3, end).trim();
    const body = text.substring(end + 4);
    const metadata = {};
    fmText.split("\n").forEach((line) => {
      const idx = line.indexOf(":");
      if (idx === -1) return;
      const key = line.slice(0, idx).trim();
      let value = line.slice(idx + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      metadata[key] = value;
    });
    return { metadata, content: body.trim() };
  }
  return { metadata: {}, content: text };
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function buildExcerpt(entry) {
  if (entry.excerpt && entry.excerpt.trim()) return entry.excerpt.trim();
  const html = marked.parse(entry.content || "");
  const temp = document.createElement("div");
  temp.innerHTML = html;
  const q = temp.querySelector("blockquote");
  if (q && q.textContent) return q.textContent.trim();
  const p = temp.querySelector("p");
  return p && p.textContent ? p.textContent.trim() : "";
}

window.loadDiaryEntries = loadDiaryEntries;
window.buildExcerpt = buildExcerpt;
