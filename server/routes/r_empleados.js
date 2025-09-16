import express from "express";
import t_empleados from "../../model/t_empleados.js";

const router = express.Router();
const empleados = new t_empleados();

router.post("/empleados", async (req, res) => {

    let datos_que_llegan = req.body;
    console.log("Datos recibidos en /empleados:", datos_que_llegan);
  
    try{
         let resultado = await empleados.crearEmpleado(datos_que_llegan);
         res.status(201).json({ message: "Empleado creado exitosamente... `Respuesta enviada desde el servidor`",
                                // data: resultado
                             }); 
        console.log("Empleado creado:", resultado);

    }catch(error){
        console.error("Error al procesar la solicitud:", error);
        res.status(500).json({ error: "Error al procesar la solicitud... desde el servidor" });
    }
 

})

export default router;