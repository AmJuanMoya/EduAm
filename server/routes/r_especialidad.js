import express from "express";
import t_especialidad from "../../model/t_especialidad.js";


const router = express.Router();
const especialidad = new t_especialidad();

router.get("/especialidad", async (req, res) => {
    try {
        const especialidades = await especialidad.obtenerTodasEspecialidades();
        res.json(especialidades);
        console.log("Se enviaron las especialidades..:");
    } catch (error) {
        console.error("Error al obtener especialidades:", error);
        res.status(500).json({ error: "Error al obtener especialidades" });
    }
});


export default router;