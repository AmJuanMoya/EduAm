import { Drawer } from "flowbite";

export function initSidebar() {
  const dawerT = document.getElementById("drawer");
  const btnClose = document.getElementById("btnClose");
  if (dawerT) {
    const drawer = new Drawer(dawerT);
    btnClose?.addEventListener("click", () => drawer.toggle());
  }
  document.querySelectorAll('.menu-group').forEach(group => {
    const header = group.querySelector('.menu-header');
    const submenu = group.querySelector('.submenu');
    const arrow = header?.querySelector('svg');
    header?.replaceWith(header.cloneNode(true));
    const newHeader = group.querySelector('.menu-header');
    newHeader?.addEventListener('click', () => {
      submenu?.classList.toggle('hidden');
      arrow?.classList.toggle('rotate-180');
    });
  });
}

function astroReady() {
  initSidebar();
}

// Eventos de Astro para evitar comportamiento SPA
document.addEventListener("DOMContentLoaded", astroReady);
document.addEventListener("astro:page-load", astroReady);
document.addEventListener("astro:after-swap", astroReady);