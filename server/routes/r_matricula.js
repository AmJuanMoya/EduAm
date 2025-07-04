import { Router } from "express";
import matricula from "../../model/t_matriculas.js";
import Crud from "../../model/database/crudsql.js";

const router = Router() 


router.get("/datos/matricula/:doc", async (req, res) => {
    try {
        const doc = req.params.doc;
        console.log(`Se recibe informacion de matricula...  ${doc}`);
        let crud = new matricula
        const datos = await crud.getMatriculaByDoc(doc);
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

// --- NUEVA RUTA POST PARA CREAR MATRÍCULAS ---
router.post("/crear", async (req, res) => {
    const matriculaData = req.body;
    if (!matriculaData.primer_nombre_estudiante || !matriculaData.documento_estudiante || !matriculaData.primer_apellido_estudiante) {
        return res.status(400).json({ message: 'Error: Faltan campos requeridos del estudiante.' });
    }
    if (!matriculaData.nombre_acudiente1 || !matriculaData.numero_documento_acudiente1 || !matriculaData.correo_acudiente1) {
        return res.status(400).json({ message: 'Error: Faltan campos requeridos del acudiente.' });
    }
    try {
        const newMatriculaId = await new matricula().createMatricula(matriculaData);
        res.status(201).json({
            message: 'Matrícula registrada exitosamente.',
            matriculaId: newMatriculaId
        });
        console.log('Matrícula registrada con ID:', newMatriculaId);
    } catch (error) {
        console.error('Error al registrar matrícula:', error);
        res.status(500).json({ message: 'Error interno del servidor al registrar matrícula.', error: error.message });
    }
});

export default router;