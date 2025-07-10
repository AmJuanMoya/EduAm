import { Router } from "express";
import t_informe_calificaciones from "../../model/t_informe_calificaciones.js";
const router = Router();





router.get("/datos/actividades/estudiante/:doc", async (req, res) => {
    try {
        const doc = req.params.doc;
        let actividades = new t_informe_calificaciones();
        const datos = await actividades.getActivitiesAssignedByStudentDocument(doc);
        if (datos.length <= 0) {
            res.json({ message: `No se encontraron actividades para el estudiante con documento: ${doc}` });
        }else{
            res.json(datos);
            console.log(`Se envian actividades del estudiante con documento: ${doc}`);
        }

    }
    catch (err){
        console.error(`Error al obtener actividades del estudiante con documento: ${doc}: ${err.message}`);
        res.status(500).json({ error: 'Error al obtener actividades del estudiante con documento' });
    }
})

router.get("/datos/actividades/nombre/:nombreActividad", async (req, res) => {
    try{
        const nombreActividad = req.params.nombreActividad;
        let actividades = new t_informe_calificaciones();
        const datos = await actividades.getStudentsByActivityName(nombreActividad);
        if (datos.length <= 0) {
            res.json({ message: `No se encontraron estudiantes para la actividad: ${nombreActividad}` });
        }else{
            res.json(datos);
            console.log(`Se envian estudiantes para la actividad: ${nombreActividad}`);
        }
        
    }
    catch (err){
        console.error(`Error al obtener estudiantes para la actividad: ${nombreActividad}: ${err.message}`);
        res.status(500).json({ error: 'Error al obtener estudiantes para la actividad' });
    }
})
router.get("/datos/actividades/estudiante/detalle/:doc", async (req, res) => {
  const doc = req.params.doc;
  try {
    let actividades = new t_informe_calificaciones();
    const datos = await actividades.getDetailedActivitiesByStudentDoc(doc);

    if (datos.length <= 0) {
      res.json({ message: `No se encontraron actividades para el estudiante con documento: ${doc}` });
    } else {
      res.json(datos);
    }
  } catch (err) {
    console.error(`❌ Error al obtener actividades detalladas: ${err.message}`);
    res.status(500).json({ error: 'Error al consultar actividades detalladas' });
  }
});

export default router;