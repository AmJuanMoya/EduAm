import { Router } from "express";
import matricula from "../../model/t_matriculas.js";
import Crud from "../../model/database/crudsql.js";

const router = Router() 


router.get("/datos/matricula/:doc", async (req, res) => {
    try {
        const doc = req.params.doc;
        console.log(`Se recibe informacion de matricula...  ${doc}`);
        let m = new matricula
        const datos = await m.getMatriculaByDoc(doc);
        if(datos.length <= 0){
            res.json({error: `No se encontraron matriculas con: ${doc}`})
        }else{
            res.json(datos);
            console.log("Se envia " + doc);
        }
    } catch (err) {
        console.error('Error al obtener los datos:', err);
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
});

  router.put("/datos/matricula/:id_matricula", async (req, res) => {
   try {
    const datos = req.body;
    console.log(datos)
    const id_matricula = req.params.id_matricula;
  
    const instancia = new matricula();


  Object.keys(datos).forEach(campo => {
    try {
      instancia[campo] = datos[campo]; 
    } catch (err) {
      console.warn("No se pudo asignar el campo:", campo);
    }
  });


    const result = await instancia.update_matricula();
    res.status(200).json({ mensaje: "Matrícula actualizada correctamente", result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al actualizar la matrícula", detalle: error.message });
  }
});

router.delete("/datos/matricula/:doc", async (req, res) => {
    try {
        const doc = req.params.doc;
        console.log(`Solicitud para eliminar matrícula con documento: ${doc}`);
        
        const crud = new matricula();
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
        let m = new matricula
        let datos = await m.getMatricula()
        if(datos.length <= 0){ 
            res.json({error: "No hay matriculas para mostrar"})
        }else{
            res.json(datos)
            console.log("Se envia lista de matriculas")
        }
    }catch(err){
        res.status(500).json({error: "error al traer los datos"})
        console.log("error al enviar las matriculas, vease...: ", err)
    }
})




// --- RUTA POST PARA CREAR MATRÍCULAS ---
router.post("/datos/matricula", async (req, res) => {
    if(!req.body.id_matricula){
        req.body.id_matricula = null
    }
    const matriculaData = req.body;
    if (!matriculaData.primer_nombre_estudiante || !matriculaData.documento_estudiante || !matriculaData.primer_apellido_estudiante) {
        return res.status(400).json({ message: 'Error: Faltan campos requeridos del estudiante.' });
    }
    if (!matriculaData.nombre_acudiente1 || !matriculaData.numero_documento_acudiente1 || !matriculaData.correo_acudiente1) {
        return res.status(400).json({ message: 'Error: Faltan campos requeridos del acudiente.' });
    }

    try {
        console.log(req.body)
        const newMatriculaId = await new matricula().createMatricula(matriculaData);
        res.status(201).json({
            message: ' 😀​ Matrícula registrada exitosamente ✅​.',
            matriculaId: newMatriculaId
        });
        console.log('👉​ Matrícula registrada con ID:', newMatriculaId);
    } catch (error) {
        console.error(' 😓​ Error al registrar matrícula ​❌​:', error);
        res.status(500).json({ message: 'Error interno del servidor al registrar matrícula.', error: error.message });
    }
});

export default router;
