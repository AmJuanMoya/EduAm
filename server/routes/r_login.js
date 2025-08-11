// routes/r_login.js
import { Router } from "express";
import Usuario from "../../model/t_usuario.js"; // Importa tu clase t_usuario
import jwt from 'jsonwebtoken'; // ¡IMPORTA jsonwebtoken!

const router = Router();


const JWT_SECRET = process.env.JWT_SECRET; 

router.post("/login", async (req, res) => {
    try {
        const { correo_usuario, contraseña_usuario } = req.body;
        // Validación básica de entrada
        if (!correo_usuario || !contraseña_usuario) {
            return res.status(400).json({ message: "Correo y contraseña son requeridos." });
        }

        // Verificar que el secreto JWT esté cargado
        if (!JWT_SECRET) {
            console.error('Error: JWT_SECRET no está definido en las variables de entorno.');
            return res.status(500).json({ message: 'Error de configuración del servidor.' });
        }

        const usuarioModel = new Usuario();

        const user = await usuarioModel.getUsuarioByEmail(correo_usuario);
        if (!user) {
            return res.status(401).json({ message: "Credenciales inválidas." });
        }

        // Comparar la contraseña proporcionada con la hasheada en la base de datos
        const isMatch = await usuarioModel.comparePassword(contraseña_usuario, user.contraseña_usuario);

        if (isMatch) {
            // Generar el JWT
            const token = jwt.sign(
                { 
                    id: user.id_usuario,
                    correo: user.correo_usuario,
                    rol: user.nombre_rol, // Asegúrate de que 'nombre_rol' venga del JOIN en t_usuario.js
                    nombres: user.nombres_usuario, 
                    apellidos: user.apellidos_usuario 
                },
                JWT_SECRET,
                { expiresIn: '1m' } // El token expira en 1 minuto.para realizacion de pruebas
            );

            // Si las credenciales son correctas, envía el token y los datos del usuario (sin la contraseña hasheada)
            res.status(200).json({ 
                message: "Inicio de sesión exitoso.",
                token: token, // ¡Este es el JWT que el cliente debe almacenar!
                user: {
                    id: user.id_usuario,
                    nombres: user.nombres_usuario,
                    apellidos: user.apellidos_usuario,
                    correo: user.correo_usuario,
                    rol: user.nombre_rol, // Envía el nombre del rol (desde el JOIN)
                    
                }
            });
        } else {
            return res.status(401).json({ message: "Credenciales inválidas." });
        }
    } catch (error) {
        console.error('Error en la ruta /login:', error);
        res.status(500).json({ message: 'Error interno del servidor al intentar iniciar sesión.', error: error.message });
    }
});

export default router;

