import { Router } from "express";
const router = Router();

import t_actividad from "../../model/t_actividad.js";

router.get("/actividad/detalles/:id", async (req, res) => {
  const id = req.params.id;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "ID de actividad inválido" });
  }

  try {
    const actividadObj = new t_actividad();
    const resultado = await actividadObj.getActividadById(id);

    if (!resultado.actividad) {
      return res.status(404).json({ message: `No se encontró la actividad con ID: ${id}` });
    }

    res.json(resultado);
    console.log(`📤 Actividad ID ${id} enviada correctamente.`);
  } catch (err) {
    console.error(`❌ Error al obtener la actividad con ID ${id}: ${err.message}`);
    res.status(500).json({ error: "Error al consultar la actividad" });
  }
});

export default router;