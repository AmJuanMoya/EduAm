export const tableManager = {
  data: [],

  init(rawData) {
    this.data = rawData;
    return true;
  },

  createTable() {
    const container = document.getElementById("table");

    // Validar que haya datos
    if (!this.data || this.data.length === 0) {
      container.innerHTML = `<p class="text-yellow-300">No hay datos para mostrar.</p>`;
      return;
    }

    console.log("✅ Creando tabla con datos:", this.data);

    // Crear tabla
    const table = document.createElement("table");
    table.className = "min-w-full bg-slate-800 text-white border border-slate-600 rounded-md overflow-hidden";

    // Encabezados
    const headers = Object.keys(this.data[0]);
    const thead = table.createTHead();
    const headerRow = thead.insertRow();

    headers.forEach((header) => {
      const th = document.createElement("th");
      th.textContent = header.replace(/_/g, " ").toUpperCase();
      th.className = "text-left font-bold p-3 border-b border-slate-600 bg-slate-700";
      headerRow.appendChild(th);
    });

    // Cuerpo
    const tbody = table.createTBody();
    this.data.forEach((item) => {
      const row = tbody.insertRow();
      headers.forEach((key) => {
        const cell = row.insertCell();
        if (key.toLowerCase().includes("fecha")) {
  const date = new Date(item[key]);
  cell.textContent = date.toLocaleString("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
} else {
  cell.textContent = item[key];
}

        cell.className = "p-3 border-b border-slate-700";
      });
    });

    // Mostrar tabla
    container.innerHTML = "";
    container.appendChild(table);
  }
};

// ✅ Exportar al contexto global para que Astro lo use
window.tableManager = tableManager;