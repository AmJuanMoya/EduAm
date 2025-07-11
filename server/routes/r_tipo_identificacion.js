
import { Router } from "express";
import TipoIdentificacion from "../../model/t_tipo_identificacion.js";  

const router = Router();

router.get("/datos/tipo_identificacion", async (req, res) => {
    try {
        let tipoIdentificacion = new TipoIdentificacion();
        const datos = await tipoIdentificacion.getAllTipoIdentificacion();
        res.json(datos);
        console.log("Trayendo Tipos de Identificación");
    } catch (err) {
        console.error('Error al obtener los datos:', err);
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
});

export default router;