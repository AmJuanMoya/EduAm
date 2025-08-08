// routes/r_login.js
import { Router } from "express";
import Usuario from "../../model/t_usuario.js"; // Importa tu clase t_usuario

const router = Router();

router.post("/login", async (req, res) => {
    const { correo_usuario, contraseña_usuario } = req.body;

    // Validación básica de entrada
    if (!correo_usuario || !contraseña_usuario) {
        return res.status(400).json({ message: "Correo y contraseña son requeridos." });
    }

    try {
        const usuarioModel = new Usuario();
        const user = await usuarioModel.getUsuarioByEmail(correo_usuario);

        // Verificar si el usuario existe
        if (!user) {
            return res.status(401).json({ message: "Credenciales inválidas (usuario no encontrado)." });
        }

        // Comparar la contraseña proporcionada con la hasheada en la base de datos
        const isMatch = await usuarioModel.comparePassword(contraseña_usuario, user.contraseña_usuario);

        if (isMatch) {
            // Si las credenciales son correctas, puedes enviar un token (JWT, etc.)
            // Por ahora, solo enviaremos un mensaje de éxito y el rol del usuario.
            res.status(200).json({ 
                message: "Inicio de sesión exitoso.",
                user: {
                    id: user.id_usuario,
                    nombres: user.nombres_usuario,
                    apellidos: user.apellidos_usuario,
                    correo: user.correo_usuario,
                    rol: user.nombre_rol // Aquí está el nombre del rol
                }
            });
        } else {
            return res.status(401).json({ message: "Credenciales inválidas (contraseña incorrecta)." });
        }
    } catch (error) {
        console.error('Error en la ruta /login:', error);
        res.status(500).json({ message: 'Error interno del servidor al intentar iniciar sesión.', error: error.message });
    }
});

export default router;
