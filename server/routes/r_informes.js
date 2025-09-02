import express from "express";
import t_informe_calificaciones from "../../model/t_informe_calificaciones.js";

const router = express.Router();
const Informes = new t_informe_calificaciones();

// Salud
router.get("/", (_req, res) => res.json({ message: "informes OK" }));

// Entregar (estudiante)
router.post("/entregar", async (req, res) => {
  try {
    // body: { id_actividad, id_documento_estudiante, url_entrega }
    const out = await Informes.entregar(req.body);
    res.json({ ok: true, out });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

// Calificar (docente)
router.put("/calificar", async (req, res) => {
  try {
    // body: { id_actividad, id_documento_estudiante, infoc_nota, infoc_estado, infoc_observaciones_docente? }
    const out = await Informes.calificar(req.body);
    res.json({ ok: true, out });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

// Actividades del estudiante (con estado_mostrado)
router.get("/estudiante/:id_documento_estudiante", async (req, res) => {
  try {
    const data = await Informes.obtenerActividadesDeEstudiante(Number(req.params.id_documento_estudiante));
    res.json({ ok: true, data });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

// Entregas por actividad (vista docente)
router.get("/actividad/:id_actividad/entregas", async (req, res) => {
  try {
    const data = await Informes.obtenerEntregasPorActividad(Number(req.params.id_actividad));
    res.json({ ok: true, data });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

export default router;
