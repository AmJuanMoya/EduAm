import express from "express";
import Crud from "../../model/database/crudsql.js";
import Login from "../../controller/c_login.js";
import jwt from "jsonwebtoken";


const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        const { correo_usuario, contraseña_usuario } = req.body;
        console.log('Datos de inicio de sesión:', { correo_usuario, contraseña_usuario });

        if (!correo_usuario || !contraseña_usuario) {
            return res.status(400).json({ error: 'Faltan datos de inicio de sesión' });
        }

        const result = await Login.validarCredenciales(correo_usuario, contraseña_usuario);
        console.log(result)

        if (!result) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const token = jwt.sign(
            { id: result.usuario.id, rol: result.rol },
            process.env.JWT_SECRET || "supersecretjwtkey", // Deberías usar una variable de entorno para esto
            { expiresIn: '1h' } // El token expira en 1 hora
        );

        // Devuelve el usuario, el rol y el token
        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            user: result.usuario,
            rol: result.rol,
            user_id: result.id_docuestudiante,
            token: token
        });
    } catch (error) {
        console.error('Error al procesar la solicitud de inicio de sesión:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

export default router;