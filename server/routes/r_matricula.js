import express from 'express';
import t_matricula from "../../model/t_matricula.js"


let router = express.Router();

router.post('/matricula/registro', (req, res) => {
  const data = req.body;
  console.log(data);
  // Puedes agregar lógica para mostrar mensaje de éxito/error
  res.json({ message: 'Han llegado los datos al servidor' });
});




router.delete("/datos/matricula/:doc", async (req, res) => {
    try {
        const doc = req.params.doc;
        console.log(`Solicitud para eliminar matrícula con documento: ${doc}`);
        
        const crud = new t_matricula;
        const resultado = await crud.delete_matricula(doc);

        if (resultado.affectedRows === 0) {
            res.status(404).json({ error: `No se encontró matrícula con documento: ${doc}` });
        } else {
            res.json({ mensaje: `Matrícula eliminada con éxito para documento: ${doc}` });
        }
    } catch (err) {
        console.error('Error al eliminar matrícula:', err);
        res.status(500).json({ error: 'Error al eliminar matrícula' });
    }
});

router.get("/datos/matricula", async(req, res )=>{
    try{
        console.log("Se traen matriculas...")
        let m = new t_matricula()
        let datos = await m.obtenerTodasMatriculas()
        if(datos.length <= 0){ 
            res.json({error: "No hay matriculas para mostrar"})
        }else{
            res.json(datos)
            console.log("Se envia lista de matriculas")
        }
    }catch(err){
        res.status(500).json({error: "error al traer las matriculas"})
        console.log("error al enviar las matriculas, vease...: ", err)
    }
})




// --- RUTA POST PARA CREAR MATRÍCULAS ---

router.post("/datos/matricula", async (req, res) => {
    const data = req.body;

    // ✅ Validaciones mínimas para acudiente
    if (!data.id_documento_acudiente || !data.acud_nombres || !data.acud_apellidos) {
        return res.status(400).json({ 
            message: "Error: faltan campos requeridos del acudiente." 
        });
    }

    // ✅ Validaciones mínimas para estudiante
    if (!data.id_docuestudiante || !data.estu_nombre || !data.estu_apellido) {
        return res.status(400).json({ 
            message: "Error: faltan campos requeridos del estudiante." 
        });
    }

    // ✅ Validaciones mínimas para matrícula
    if (!data.matr_anio || !data.matr_grado || !data.matr_jornada ) {
        return res.status(400).json({ 
            message: "Error: faltan campos requeridos de la matrícula." 
        });
    }

    try {
        console.log("📥 Datos recibidos:", data);

        // 👇 llamada a tu método que inserta acudiente, estudiante y matrícula
        const result = await new matricula().createMatricula(data);

        res.status(201).json({
            message: "😀 Matrícula registrada exitosamente ✅",
            result
        });

        console.log("👉 Matrícula creada con éxito:", result);

    } catch (error) {
        console.error("😓 Error al registrar matrícula ❌:", error);
        res.status(500).json({ 
            message: "Error interno del servidor al registrar matrícula.", 
            error: error.message 
        });
    }
});

router.get("/datos/grado", async (req,res) =>{
    try{
        console.log("Se traen matriculas...")
        let m = new matricula
        let datos = await m.getGrado()
        if(datos.length <= 0){ 
            res.json({error: "No hay grados para mostrar"})
        }else{
            res.json(datos)
            console.log("Se envia lista de Grados")
        }
    }catch(err){
        res.status(500).json({error: "error al traer los datos"})
        console.log("error al enviar las matriculas, vease...: ", err)
    }
})

router.get("/datos/curso", async (req,res) =>{
    try{
        console.log("Se traen matriculas...")
        let m = new matricula
        let datos = await m.getCurso()
        if(datos.length <= 0){ 
            res.json({error: "No hay cursos para mostrar"})
        }else{
            res.json(datos)
            console.log("Se envia lista de Cursos")
        }
    }catch(err){
        res.status(500).json({error: "error al traer los datos"})
        console.log("error al enviar las cursos, vease...: ", err)
    }
})

export default router;
