// routes/r_registro_usuario.js
import { Router } from "express";
import Usuario from "../../model/t_usuario.js"; // Importa tu clase t_usuario
import Crud from "../../model/database/crudsql.js"

const router = Router();
const crud = new Crud();

router.post("/registroUsuario", async (req, res) => { // La ruta completa será /api/registroUsuario
    try {
        const userData = req.body; // Los datos del formulario ya están en req.body

        // Validar campos requeridos
        const requiredFields = [
            'nombres_usuario', 'apellidos_usuario', 'correo_usuario',
            'contraseña_usuario', 'id_rol', 'id_estado_usuario',
            'id_tipo_documento', 'numero_documento'
        ];
        for (const field of requiredFields) {
            if (!userData[field]) {
                console.error(`Campo requerido faltante: ${field}`);
                return res.status(400).json({ message: `El campo '${field}' es requerido.` });
            }
        }

        // crud.getByCondition("t_usuarios", `correo_usuario = "${userData.correo_usuario}"`).then((data)=>{
        //     console.log("la informacion es: ", data)
        // })
        // console.log( "se muestra la meta ", crud.db.getMetadata())
       
        

        // Instancia tu modelo de usuario
        let usuarioModel = new Usuario();

        // Asigna los datos recibidos del formulario a las propiedades del modelo
        usuarioModel.set_nombres_usuario(userData.nombres_usuario);
        usuarioModel.set_apellidos_usuario(userData.apellidos_usuario);
        usuarioModel.set_correo_usuario(userData.correo_usuario);
        usuarioModel.set_contraseña_usuario(userData.contraseña_usuario);
        usuarioModel.set_telefono_usuario(userData.telefono_usuario || null);
        // usuarioModel.set_avatar_url_usuario(userData.avatar_url_usuario || null); // Descomentar si usas este campo
        usuarioModel.set_id_rol(userData.id_rol);
        usuarioModel.set_id_estado_usuario(userData.id_estado_usuario);
        usuarioModel.set_id_tipo_documento(userData.id_tipo_documento);
        usuarioModel.set_numero_documento(userData.numero_documento);

        // Llama al método insert_usuario del modelo (ahora sin argumentos)
        
        crud.getByCondition("t_usuarios", `correo_usuario = "${userData.correo_usuario}"`).then((data)=>{
            console.log("la informacion es: ", data)
            console.log( "se muestra la meta ", crud.db.getMetadata())
        })
        

        const result = await usuarioModel.insert_usuario();

        // Envía una respuesta de éxito
        res.status(200).json({ message: 'Usuario registrado con éxito', id_usuario: result?.insertId || 'N/A' });

    } catch (error) {
        console.error('------------Error en la ruta /registroUsuario:', error);
        console.error('Error al registrar usuario:', error);


        res.status(500).json({ message: 'Error interno del servidor al registrar usuario', error: error.message });
    }
});

export default router;

