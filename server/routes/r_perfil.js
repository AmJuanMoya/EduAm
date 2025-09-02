import express from "express";
import Database from "../../model/database/conectionDB.js"; 

const router = express.Router();
const db = new Database;

router.get("/:id/:tipo", async (req, res) => {
  const { id, tipo } = req.params;

  try {
    let query = "";
    let values = [id];

    if (tipo === "estudiante") {
      query = `
        SELECT e.id_docuestudiante AS id, e.estu_nombre AS nombre, e.estu_apellido AS apellido, e.est_correo AS correo, r.rol_descripcion AS rol
        FROM t_estudiantes e
        JOIN t_rol r ON e.estu_rol = r.id_rol
        WHERE e.id_docuestudiante = ?
      `;
    } else if (tipo === "empleado") {
      query = `
        SELECT emp.id_documento_empleado AS id, emp.empl_nombre AS nombre, emp.empl_apellido AS apellido, emp.empl_correo AS correo, r.rol_descripcion AS rol
        FROM t_empleados emp
        JOIN t_rol r ON emp.empl_rol = r.id_rol
        WHERE emp.id_documento_empleado = ?
      `;
    } else {
      return res.status(400).json({ error: "Tipo no válido" });
    }

    const rows = await db.consultar(query, values);

    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error en /api/perfil:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;

