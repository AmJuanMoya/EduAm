// routes/r_login.js
import { Router } from "express";
import Usuario from "../../model/t_usuario.js"; // Importa tu clase t_usuario

const router = Router();

router.post("/login", async (req, res) => {
    try{
     const { correo_usuario, contraseña_usuario } = req.body;
     // Validación básica de entrada
        if (!correo_usuario || !contraseña_usuario) {
            return res.status(400).json({ message: "Correo y contraseña son requeridos." });
        }

    // console.log('Datos recibidos de la vista /login:', { correo_usuario});

    const usuarioModel = new Usuario();

     const user = await usuarioModel.getUsuarioByEmail(correo_usuario);
            if (!user) {
            return res.status(401).json({ message: "Credenciales inválidas (usuario no encontrado)." });
        }


        // console.log('Usuario encontrado:', user);
        
        // Comparar la contraseña proporcionada con la hasheada en la base de datos
        // console.log('Contraseña proporcionada:', contraseña_usuario);
        // console.log('Contraseña hasheada en la base de datos:', user.contraseña_usuario);
        const isMatch = await usuarioModel.comparePassword(contraseña_usuario, user.contraseña_usuario);

        if (isMatch) {
            // Si las credenciales son correctas
            res.status(200).json({ 
                message: "Inicio de sesión exitoso.",
                // AQUI SE DEBE ENVIAR EL TOKEN DE AUTENTICACION !!!!!!!!!!!!!!!!!
                user: {
                    id: user.id_usuario,
                    nombres: user.nombres_usuario,
                    apellidos: user.apellidos_usuario,
                    correo: user.correo_usuario,
                    rol: user.id_rol // Ajusta según tu estructura de datos
                }
            });
        } else {
            // console.error('Error en la ruta /login:', error);
            return res.status(401).json({ message: "Credenciales inválidas (contraseña incorreta)." });
        }


    } catch (error) {
        console.error('Error en la ruta /login:', error);
        res.status(500).json({ message: 'Error interno del servidor al intentar iniciar sesión.', error: error.message });
    }
});

export default router;
