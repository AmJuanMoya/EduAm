import { Router } from "express";
import matricula from "../../model/t_matriculas.js";
import Crud from "../../model/database/crudsql.js";

const router = Router() 


router.get("/datos/matricula", async (req, res) => {
    try {
        let matriculaInstance = new matricula();
        const datos = await matriculaInstance.getMatricula();
        res.json(datos);
        console.log("Trayendo la matricula");
    } catch (err) {
        console.error('Error al obtener los datos:', err);
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
});

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


export default router ;