import { Router } from "express";
import t_informe_calificaciones from "../../model/t_informe_calificaciones.js";

const router = Router();

router.post("/api/entrega/actividad", async (req, res) => {
  const { id_estudiante, id_actividad, url_entrega } = req.body;

  // Validar que los datos necesarios estén presentes
  if (!id_estudiante || !id_actividad || !url_entrega) {
    return res.status(400).json({ error: "Faltan datos necesarios para realizar la entrega." });
  }

  try {
    const informe = new t_informe_calificaciones();

    // Verificar si el estudiante ya entregó la actividad
    const entregaExistente = await informe.verificarEntregaExistente(id_estudiante, id_actividad);

    if (entregaExistente) {
      return res.status(400).json({ error: "Ya has entregado esta actividad." });
    }

    // Si no se ha entregado, proceder con la entrega
    const resultado = await informe.realizarEntrega({
      id_estudiante,
      id_actividad,
      url_entrega
    });

    if (resultado) {
      res.json({ message: "Entrega registrada correctamente." });
    } else {
      res.status(500).json({ error: "No se pudo registrar la entrega." });
    }
  } catch (error) {
    console.error("❌ Error al registrar entrega:", error.message);
    res.status(500).json({ error: "Error al registrar entrega." });
  }
});

export default router;
