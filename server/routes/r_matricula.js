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

// router.post("/datos/matricula", async (req, res) => {
//   try {
//     const datos = req.body;
//     const instancia = new matricula();

//     // Asignar los campos recibidos del body al objeto
//     for (let campo in datos) {
//       if (instancia.hasOwnProperty(campo)) {
//         instancia[campo] = datos[campo];
//       }
//     }

//     // Aquí es donde haces debug de los tipos de documento
//     console.log("Insertando matrícula con tipo documento:", instancia.id_tipo_documento_estudiante);
//     console.log("Tipo doc acudiente 1:", instancia.id_tipo_documento_acudiente1);
//     console.log("Tipo doc acudiente 2:", instancia.id_tipo_documento_acudiente2);
//     console.log("Tipo doc acudiente 3:", instancia.id_tipo_documento_acudiente3);

//     const resultado = await instancia.insert_matricula();
//     res.status(200).json({ mensaje: "Matrícula insertada correctamente", resultado });
//   } catch (err) {
//     console.error('Error al insertar matrícula:', err);
//     res.status(500).json({ error: 'Error al insertar matrícula' });
//   }
// });



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




export default router ;