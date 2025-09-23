import { Router } from "express";
import t_acudientes from "../../model/t_acudientes.js";
import Crud from "../../model/database/crudsql.js";

const router = Router() 

router.post("/datos/acudiente", async (req, res) => {
    const data = req.body;

    // ✅ Validaciones mínimas para acudiente
    if (!data.id_documento_acudiente || !data.acud_nombres || !data.acud_apellidos) {
        return res.status(400).json({ 
            message: "Error: faltan campos requeridos del acudiente." 
        });
    }

    try {
        console.log("📥 Datos recibidos de acudiente:", data);
      let ACU = new t_acudientes()
      const result = ACU.crearAcudiente(data)
        // 👇 llamada a tu método simplificado
        // const result = await new Acudiente().createAcudiente(data);

        res.status(201).json({
            message: "😀 Acudiente registrado exitosamente ✅",
            result
        });

        console.log("👉 Acudiente creado con éxito:", result);

    } catch (error) {
        console.error("😓 Error al registrar acudiente ❌:", error);
        res.status(500).json({ 
            message: "Error interno del servidor al registrar acudiente.", 
            error: error.message 
        });
    }
});

router.get("/datos/acudientes", async (req, res) => {
  try {
    const acudientes =  new t_acudientes
    let result = await acudientes.obtenerTodosAcudientes()
    // console.log("Acudientes recibidos:", acudientes);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener acudientes" });
  }
});

router.get("/datos/acudientes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "Falta id" });

    const acudiente = await Acudiente.getAcudienteById(id);
    if (!acudiente) return res.status(404).json({ error: "Acudiente no encontrado" });

    res.json(acudiente);
  } catch (err) {
    console.error("Error en GET /datos/acudientes/:id ->", err);
    res.status(500).json({ error: "Error del servidor" });
  }
});

router.put("/datos/acudientes/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = { ...req.body, id_documento_acudiente: id };
    console.log("ID:", id);
    console.log("Body recibido:", req.body);
    let ACU = new t_acudientes()
    ACU.actualizarAcudiente(data)
    // await new Acudiente().updateAcudiente(data);

    res.json({ message: "Acudiente actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar acudiente:", error);
    res.status(500).json({ error: "Error al actualizar acudiente" });
  }
});

router.delete("/datos/acudientes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await new Acudiente().deleteAcudiente(id);
    res.json({ message: "Acudiente eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar acudiente:", error);
    res.status(500).json({ error: "Error al eliminar acudiente" });
  }
});

export default router;
