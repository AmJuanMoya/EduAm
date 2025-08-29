import express from "express";
import Crud from "../../model/database/crudsql.js";
import Login from "../../controller/c_login.js";


const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        const { correo_usuario, contraseña_usuario } = req.body;
        console.log('Datos de inicio de sesión:', { correo_usuario, contraseña_usuario });

        if (!correo_usuario || !contraseña_usuario) {
            return res.status(400).json({ error: 'Faltan datos de inicio de sesión' });
        }

        const result = await Login.validarCredenciales(correo_usuario, contraseña_usuario);

        if (!result) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Devuelve el usuario y el rol
        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            user: result.usuario,
            rol: result.rol
        });
    } catch (error) {
        console.error('Error al procesar la solicitud de inicio de sesión:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

export default router;