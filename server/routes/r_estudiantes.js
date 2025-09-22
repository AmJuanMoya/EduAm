import express  from "express"
import t_estudiantes from "../../model/t_estudiantes.js"
import t_acudientes from "../../model/t_acudientes.js";
import authMiddleware from "../middlwre/authMiddleware.js";

const router = express.Router();
const EST = new t_estudiantes()
const ACU = new t_acudientes()


router.get("/estudiantes/:id", async (req, res) => {

    try {
        const { id } = req.params;
        const estudiante = await EST.obtenerEstudiantePorId(id);
        if(estudiante <= 0 ){
            return res.status(404).json({error: "No se encontro ningun estudiante"})
        }

        if (!estudiante) {
            return res.status(404).json({ error: "Estudiante no encontrado" });
        }

        res.status(200).json(estudiante);

    } catch (error) {
        console.error("Error al obtener estudiante por ID:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

router.post("/estudiantes/registro", async (req, res) => {

    try{
        let data = req.body
        console.log("informacion recibida:", data)
        data.estu_edad = parseInt(data.estu_edad)
        data.estu_rol = 3 
        console.log(data)

        let res_acu = await ACU.obtenerAcudientePorId(data.estu_acudiente)
        console.log("informacion del acudiente:", res_acu)

        if(res_acu <= 0 ){
            return res.status(400).json({error: `El acudiente '${data.estu_acudiente}' no se registra dentro del sistema`})
        }

        EST.crearEstudiante(data)
        res.status(200).json({message: "Informacion tratada con exito"})
        
    }catch(error){
        res.status(500).json({error: "error interno del servidor, lo sentimos."})
        console.log("el error es:", error )
    }



})



export default router;