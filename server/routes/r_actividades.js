import { Router } from "express";
import t_informe_calificaciones from "../../model/t_informe_calificaciones.js";

const router = Router();

// Ruta para obtener actividades simples por ID del estudiante
router.get("/datos/actividades/estudiante/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "ID de estudiante inválido" });
  }

  try {
    const actividades = new t_informe_calificaciones();
    const datos = await actividades.getActivitiesAssignedByStudentId(id);

    if (datos.length <= 0) {
      res.json({ message: `No se encontraron actividades para el estudiante con ID: ${id}` });
    } else {
      res.json(datos);
      console.log(`📤 Actividades simples enviadas para estudiante ID: ${id}`);
    }
  } catch (err) {
    console.error(`❌ Error al obtener actividades: ${err.message}`);
    res.status(500).json({ error: "Error al obtener actividades" });
  }
});

// Ruta para obtener actividades detalladas por ID del estudiante
router.get("/datos/actividades/estudiante/detalle/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "ID de estudiante inválido" });
  }

  try {
    const actividades = new t_informe_calificaciones();
    const datos = await actividades.getDetailedActivitiesByStudentId(id);

    if (datos.length <= 0) {
      res.json({ message: `No se encontraron actividades para el estudiante con ID: ${id}` });
    } else {
      res.json(datos);
      console.log(`📤 Actividades detalladas enviadas para estudiante ID: ${id}`);
    }
  } catch (err) {
    console.error(`❌ Error al obtener actividades detalladas: ${err.message}`);
    res.status(500).json({ error: "Error al consultar actividades detalladas" });
  }
});

// Ruta adicional para obtener estudiantes por nombre de actividad (si la necesitas)
router.get("/datos/actividades/nombre/:nombreActividad", async (req, res) => {
  try {
    const nombreActividad = req.params.nombreActividad;
    const actividades = new t_informe_calificaciones();
    const datos = await actividades.getStudentsByActivityName(nombreActividad);

    if (datos.length <= 0) {
      res.json({ message: `No se encontraron estudiantes para la actividad: ${nombreActividad}` });
    } else {
      res.json(datos);
      console.log(`📤 Estudiantes enviados para actividad: ${nombreActividad}`);
    }
  } catch (err) {
    console.error(`❌ Error al obtener estudiantes: ${err.message}`);
    res.status(500).json({ error: "Error al obtener estudiantes para la actividad" });
  }
});

export default router;
