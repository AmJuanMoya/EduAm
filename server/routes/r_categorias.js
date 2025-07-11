// routes/r_categorias.js
import { Router } from "express";
import CategoriaActividad from "../../model/t_categoria_actividad.js";

const router = Router();

router.get("/categorias", async (req, res) => {
  try {
    const categoriaModel = new CategoriaActividad();
    const categorias = await categoriaModel.obtenerTodas();
    res.json(categorias);
  } catch (error) {
    console.error("❌ Error al obtener categorías:", error.message);
    res.status(500).json({ error: "Error al obtener categorías" });
  }
});

export default router;
