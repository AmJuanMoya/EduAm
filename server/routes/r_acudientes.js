import { Router } from "express";
import Acudiente from "../../model/t_acudientes.js";
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

        // 👇 llamada a tu método simplificado
        const result = await new Acudiente().createAcudiente(data);

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
    const acudientes = await new Acudiente().getAcudientes();
    console.log("Acudientes recibidos:", acudientes);
    res.json(acudientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener acudientes" });
  }
});


export default router;
