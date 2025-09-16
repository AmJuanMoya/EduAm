import express from "express";
import t_actividad from "../../model/t_actividad.js";

const router = express.Router();
const Actividad = new t_actividad();

// Salud
router.get("/", (_req, res) => res.json({ message: "actividades OK" }));

// Crear actividad (inserta y genera informes)
router.post("/", async (req, res) => {
  try {
    const out = await Actividad.crearActividad(req.body); // { ok, id_actividad }
    res.status(201).json({ ok: true, ...out });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

// Listar todas
router.get("/lista/todas", async (_req, res) => {
  try {
    const data = await Actividad.obtenerTodasActividades();
    res.json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Por ID
router.get("/:id", async (req, res) => {
  try {
    const data = await Actividad.obtenerActividadPorId(Number(req.params.id));
    res.json({ ok: true, data });
  } catch (err) {
    res.status(404).json({ ok: false, error: err.message });
  }
});

// Por estado
router.get("/filtro/estado/:estado", async (req, res) => {
  try {
    const data = await Actividad.obtenerActividadesPorEstado(req.params.estado);
    res.json({ ok: true, data });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

// Por categoría
router.get("/filtro/categoria/:categoria", async (req, res) => {
  try {
    const data = await Actividad.obtenerActividadesPorCategoria(req.params.categoria);
    res.json({ ok: true, data });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

// Por docente
router.get("/filtro/docente/:idEmpleado", async (req, res) => {
  try {
    const data = await Actividad.obtenerActividadesPorDocente(Number(req.params.idEmpleado));
    res.json({ ok: true, data });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

// Por asignatura
router.get("/filtro/asignatura/:idAsignatura", async (req, res) => {
  try {
    const data = await Actividad.obtenerActividadesPorAsignatura(Number(req.params.idAsignatura));
    res.json({ ok: true, data });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

// Por curso
router.get("/filtro/curso/:idCurso", async (req, res) => {
  try {
    const data = await Actividad.obtenerActividadesPorCurso(Number(req.params.idCurso));
    res.json({ ok: true, data });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

// Actualizar
router.put("/:id", async (req, res) => {
  try {
    const out = await Actividad.actualizarActividad(req.body, Number(req.params.id));
    res.json({ ok: true, out });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

// Cambiar estado
router.patch("/:id/estado", async (req, res) => {
  try {
    const out = await Actividad.cambiarEstadoActividad(Number(req.params.id), req.body.nuevoEstado);
    res.json({ ok: true, out });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

// Eliminar
router.delete("/:id", async (req, res) => {
  try {
    const out = await Actividad.eliminarActividad(Number(req.params.id));
    res.json({ ok: true, out });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

export default router;
