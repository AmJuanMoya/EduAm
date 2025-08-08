import express from 'express';
import cActividad from "../../model/t_cActividad.js";

const router = express.Router();
const actividadController = new cActividad();

// GET /api/actividades/docente/:id
router.get('/actividades/docente/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const actividades = await actividadController.obtenerActividadesPorDocente(id);
    res.json(actividades);
  } catch (error) {
    console.error("❌ Error en ruta GET actividades por docente:", error.message);
    res.status(500).json({ error: "Error al obtener las actividades del docente." });
  }
});

export default router;
