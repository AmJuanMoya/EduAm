
import { Router } from "express";
import EstadoUsuario from "../../model/t_estado_usuario.js"; 

const router = Router();

router.get("/datos/estadosUsuario", async (req, res) => {
    try {
        let estadoUsuarioModel = new EstadoUsuario(); 
        const datos = await estadoUsuarioModel.getall_estado_usuario(); 
        res.json(datos);
        console.log("Trayendo Estados de Usuario de la base de datos usando t_estado_usuario.js.");
    } catch (err) {
        console.error('Error al obtener los estados de usuario:', err);
        res.status(500).json({ error: 'Error al obtener los estados de usuario' });
    }
});

export default router;
