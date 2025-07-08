const input = document.getElementById("actividadId");
const button = document.getElementById("buscarBtn");
const container = document.getElementById("actividadDetalle");

async function consultarActividad() {
  const id = input.value.trim();
  if (!id) return alert("Por favor ingresa un ID válido");

  try {
    const res = await fetch(`http://localhost:3000/api/actividad/detalles/${id}`);
    const data = await res.json();

    if (data.error) {
      container.innerHTML = `<p class="text-red-400">⚠️ ${data.error}</p>`;
      return;
    }

    const { actividad, comentarios } = data;

    container.innerHTML = `
      <div class="bg-slate-800 p-4 rounded-lg shadow-md">
        <h2 class="text-xl font-bold mb-2">${actividad.titulo_actividad}</h2>
        <p class="mb-1 text-slate-300">${actividad.descripcion_actividad}</p>
        <p><span class="font-semibold">Fecha de publicación:</span> ${new Date(actividad.fecha_publicacion).toLocaleString("es-CO")}</p>
        <p><span class="font-semibold">Fecha de entrega:</span> ${new Date(actividad.fecha_entrega).toLocaleString("es-CO")}</p>
        <p><span class="font-semibold">Calificación máxima:</span> ${actividad.calificacion_nota}</p>
        <p><span class="font-semibold">Categoría:</span> ${actividad.nombre_categoria_actividad}</p>
        <hr class="my-3 border-slate-600"/>
        <h3 class="font-semibold mb-2">Comentarios:</h3>
        ${comentarios.length > 0 ? `
          <ul class="space-y-2">
            ${comentarios.map(c => `
              <li class="bg-slate-700 p-2 rounded-md">
                <p class="text-sm">💬 ${c.comentario}</p>
                <p class="text-xs text-slate-400">– ${c.nombres_usuario} ${c.apellidos_usuario}</p>
              </li>
            `).join("")}
          </ul>
        ` : `<p class="text-slate-400">No hay comentarios para esta actividad.</p>`}
      </div>
    `;
  } catch (err) {
    console.error("❌ Error al consultar actividad:", err);
    container.innerHTML = `<p class="text-red-500">Error al consultar actividad.</p>`;
  }
}

button.addEventListener("click", consultarActividad);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") consultarActividad();
});
