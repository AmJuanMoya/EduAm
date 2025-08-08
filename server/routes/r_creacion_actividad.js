// routes/r_creacion_actividad.js
import { Router } from "express";
import cActividad from "../../model/t_cActividad.js"; 

const router = Router();

// Ruta POST para crear una nueva actividad
router.post("/actividad/crear", async (req, res) => {
  try {
    const data = req.body;

    const {
      id_docente,
      id_asignatura,
      id_curso,
      id_categoria_actividad,
      titulo_actividad,
      descripcion_actividad,
      fecha_entrega,
      id_recurso // ✅ añadimos esto
    } = data;

    // Validación básica
    if (!id_docente || !id_asignatura || !id_curso || !titulo_actividad || !fecha_entrega || !id_categoria_actividad) {
      return res.status(400).json({ error: "Faltan campos obligatorios para crear la actividad." });
    }

    // ✅ Asegurarse que si id_recurso viene vacío, se vuelva null (para evitar errores en el modelo)
    data.id_recurso = id_recurso ? parseInt(id_recurso) : null;

    const actividadObj = new cActividad();
    const resultado = await actividadObj.crearActividad(data);

    res.status(201).json({
      message: "Actividad creada correctamente",
      id_actividad: resultado.id_actividad
    });
  } catch (error) {
    console.error("❌ Error al crear la actividad:", error.message);
    res.status(500).json({ error: "Error al crear la actividad" });
  }
});


// Ruta opcional GET para consultar detalles de una actividad por ID
router.get("/actividad/detalles/:id", async (req, res) => {
  const id = req.params.id;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "ID de actividad inválido" });
  }

  try {
    const actividadObj = new cActividad();
    const resultado = await actividadObj.getActividadById(id);

    if (!resultado || !resultado.actividad) {
      return res.status(404).json({ message: `No se encontró la actividad con ID: ${id}` });
    }

    res.json(resultado);
    console.log(`📤 Actividad ID ${id} enviada correctamente.`);
  } catch (err) {
    console.error(`❌ Error al obtener la actividad con ID ${id}: ${err.message}`);
    res.status(500).json({ error: "Error al consultar la actividad" });
  }
});

// Obtener actividades del docente

router.get("/actividad/docente/:id_docente", async (req, res) => {
  const id_docente = req.params.id_docente;

  if (!id_docente || isNaN(id_docente)) {
    return res.status(400).json({ error: "ID de docente inválido" });
  }

  try {
    const actividadObj = new cActividad();
    const actividades = await actividadObj.obtenerActividadesPorDocente(id_docente);

    res.status(200).json(actividades);
  } catch (error) {
    console.error("❌ Error al obtener actividades del docente:", error.message);
    res.status(500).json({ error: "Error al obtener actividades del docente" });
  }
});

// Obtener cursos y asignaturas por documento del docente
router.get("/actividad/crear/:idDocente", async (req, res) => {
  try {
    const idDocente = req.params.idDocente; // Usar el nombre correcto del parámetro
    const actividadObj = new cActividad();

    const asignaciones = await actividadObj.obtenerAsignacionesPorDocente(idDocente);

    if (!asignaciones.length) {
      return res.status(404).json({ error: "No se encontraron asignaciones para este docente." });
    }

    res.json(asignaciones);
  } catch (err) {
    console.error("❌ Error al obtener asignaciones del docente:", err.message);
    res.status(500).json({ error: "Error al consultar asignaciones." });
  }
});



export default router;
