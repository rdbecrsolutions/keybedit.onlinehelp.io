"use strict";

const topics = Array.from(document.querySelectorAll(".topic"));
const links = Array.from(document.querySelectorAll(".sidebar nav a"));
const search = document.querySelector("#cerca");
const status = document.querySelector("#risultati");
const noResults = document.querySelector(".no-results");
const menuButton = document.querySelector(".menu-toggle");
const normalize = text => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const searchable = new Map(topics.map(topic => [topic.id, normalize(topic.textContent)]));

function filterTopics() {
  const words = normalize(search.value).trim().split(/\s+/).filter(Boolean);
  let count = 0;
  for (const topic of topics) {
    const matches = words.every(word => searchable.get(topic.id).includes(word));
    topic.hidden = !matches;
    if (matches) count += 1;
  }
  for (const link of links) {
    link.hidden = document.querySelector(link.hash).hidden;
  }
  status.textContent = words.length ? `${count} argomenti trovati` : "";
  noResults.hidden = count !== 0;
}

function closeMenu() {
  document.body.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded", "false");
}

function revealHash() {
  const target = topics.find(topic => `#${topic.id}` === location.hash);
  if (!target) return;
  if (target.hidden) {
    search.value = "";
    filterTopics();
  }
  for (const link of links) {
    if (link.hash === location.hash) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  }
}

document.body.classList.add("enhanced");
document.querySelector(".search").hidden = false;
menuButton.hidden = false;
document.querySelector(".print-button").hidden = false;
search.addEventListener("input", filterTopics);
search.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    search.value = "";
    filterTopics();
  }
});
menuButton.addEventListener("click", () => {
  const open = document.body.classList.toggle("menu-open");
  menuButton.setAttribute("aria-expanded", String(open));
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && document.body.classList.contains("menu-open")) {
    closeMenu();
    menuButton.focus();
  }
});
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", () => {
    search.value = "";
    filterTopics();
    closeMenu();
  });
});
window.addEventListener("hashchange", revealHash);
revealHash();

const imageDialog = document.querySelector("#immagine");
if (typeof imageDialog.showModal === "function") {
  imageDialog.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      event.preventDefault();
      imageDialog.close();
    }
  });
  document.querySelectorAll(".zoom").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      const source = link.querySelector("img");
      const image = imageDialog.querySelector("img");
      image.src = source.src;
      image.alt = source.alt;
      imageDialog.querySelector("p").textContent = source.alt;
      imageDialog.showModal();
    });
  });
  imageDialog.querySelector("button").addEventListener("click", () => imageDialog.close());
  imageDialog.addEventListener("click", event => {
    if (event.target === imageDialog) {
      const bounds = imageDialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right ||
          event.clientY < bounds.top || event.clientY > bounds.bottom) imageDialog.close();
    }
  });
}

const details = Array.from(document.querySelectorAll("details"));
let detailStates = [];
window.addEventListener("beforeprint", () => {
  detailStates = details.map(detail => detail.open);
  details.forEach(detail => { detail.open = true; });
});
window.addEventListener("afterprint", () => {
  details.forEach((detail, index) => { detail.open = detailStates[index]; });
});
document.querySelector(".print-button").addEventListener("click", () => window.print());
