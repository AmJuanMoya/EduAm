
import express from "express";
import Database from "../../model/database/conectionDB.js"; 

const router = express.Router();
const db = new Database
router.get("/:id/:tipo", async (req, res) => {
  const { id, tipo } = req.params;

  try {
    let query = "";
    let values = [id];
    let user = null;

    // if (tipo === "estudiante") {
    //   query = "SELECT id_docuestudiante AS id, estu_nombre AS nombre, estu_apellido AS apellido, est_correo AS correo, estu_rol AS rol FROM t_estudiantes WHERE id_docuestudiante = ?";
    // } else if (tipo === "empleado") {
    //   query = "SELECT id_documento_empleado AS id, empl_nombre AS nombre, empl_apellido AS apellido, empl_correo AS correo, empl_rol AS rol FROM t_empleados WHERE id_documento_empleado = ?";
    // } else {
    //   return res.status(400).json({ error: "Tipo no válido" });
    // }

    query = "SELECT * FROM t_estudiantes"

    const rows = await db.consultar(query)
    

    // if (rows.length === 0) {
    //   return res.status(404).json({ error: "Usuario no encontrado" });
    // }

    // user = rows[0];
    // res.json(user);

    res.json(rows)

  } catch (error) {
    console.error("Error en /api/perfil:", error);
    res.status(500).json({ error: "Error interno del servidor de cristian" });
  }
});

export default router;
