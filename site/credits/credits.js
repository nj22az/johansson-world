const search = document.querySelector("#credit-search");
const part = document.querySelector("#credit-part");
const status = document.querySelector("#credit-status");
const results = document.querySelector("#credit-results");
const query = new URLSearchParams(location.search);
const parts = { world: "Johansson World", sakura: "Sakura Shōten" };
if (Object.hasOwn(parts, query.get("part"))) part.value = query.get("part");
search.value = query.get("q") ?? "";

function text(parent, tag, value) {
  if (!value) return;
  const node = document.createElement(tag);
  node.textContent = value;
  parent.append(node);
}

function link(parent, url, label) {
  if (!url?.startsWith("https://")) return;
  const node = document.createElement("a");
  node.href = url;
  node.textContent = label;
  parent.append(node);
}

function render(entries) {
  const terms = search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const shown = entries.filter(entry => {
    if (part.value && part.value !== entry.part) return false;
    const words = [parts[entry.part], entry.title, entry.by, entry.licence, entry.note, ...(entry.assets ?? [])].join(" ").toLowerCase();
    return terms.every(term => words.includes(term));
  });
  results.replaceChildren(...shown.map(entry => {
    const item = document.createElement("li");
    text(item, "small", parts[entry.part]);
    text(item, "h2", entry.title);
    text(item, "p", [entry.by, entry.licence].filter(Boolean).join(" · "));
    text(item, "p", entry.note);
    text(item, "p", entry.assets?.join(", "));
    link(item, entry.source_url, "Source");
    link(item, entry.licence_url, "Licence");
    return item;
  }));
  status.textContent = shown.length ? `${shown.length} ${shown.length === 1 ? "credit" : "credits"}` : "No matching credits.";
}

async function load() {
  try {
    const response = await fetch("entries.json", { cache: "no-cache" });
    if (!response.ok) throw new Error();
    const entries = await response.json();
    render(entries);
    search.addEventListener("input", () => render(entries));
    part.addEventListener("change", () => render(entries));
  } catch {
    status.textContent = "Credits could not load. The full asset ledger is linked below.";
  }
}

load();
