
import { Router } from "express";
import Rol from "../../model/t_roles.js"; 

const router = Router();

router.get("/datos/roles", async (req, res) => {
    try {
        let rolModel = new Rol(); // Instancia tu clase t_roles
        const datos = await rolModel.getall_roles(); // Llama a tu método existente
        res.json(datos);
        console.log("Trayendo Roles de la base de datos usando t_roles.js.");
    } catch (err) {
        console.error('Error al obtener los roles:', err);
        res.status(500).json({ error: 'Error al obtener los roles' });
    }
});

export default router;
