// Sacred Scrubs — shared page behaviour

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }
});

async function loadProducts() {
  const res = await fetch("data/products.json");
  if (!res.ok) throw new Error("Could not load product data");
  return res.json();
}

async function loadConfig() {
  const res = await fetch("data/config.json");
  if (!res.ok) throw new Error("Could not load site config");
  return res.json();
}

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function stockLabel(stock) {
  if (stock <= 0) return { text: "Out of stock", cls: "out" };
  if (stock <= 4) return { text: `Only ${stock} left`, cls: "low" };
  return { text: "In stock", cls: "" };
}
