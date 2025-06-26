import { Router } from "express";
import tablas from "../../model/tablas.js";
import Crud from "../../model/database/crudsql.js";


const router = Router() 


router.get("/datos/tablas", async (req, res) => {
    try {
        let tablasInstance = new tablas();
        const datos = await tablasInstance.getTablas();
        res.json(datos);
        console.log("Trayendo Tablas");
    } catch (err) {
        console.error('Error al obtener los datos:', err);
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
});

router.get("/datos/registros/:tabla", async (req, res) => {
    try {
        const tabla = req.params.tabla;
        console.log(`Se recibe tabla...  ${tabla}`);
        let crud = new Crud();
        const datos = await crud.getAll(tabla);
        res.json(datos);
        console.log("Se envia " + tabla);
    } catch (err) {
        console.error('Error al obtener los datos:', err);
        res.status(500).json({ error: 'Error al obtener los datos' });
    }

});


export default router ;
