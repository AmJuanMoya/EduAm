// routes/r_creacion_actividad.js
import express from "express";
import TActividad from "../../model/t_actividad.js";
import Crud from "../../model/database/crudsql.js";

const router = express.Router();
const Actividad = new TActividad();
const crud = new Crud();

// helper: resolver id_rel_empleado_asignatura_curso
async function getRelId({ id_documento_empleado, id_curso, id_asignatura }) {
  await crud.db.connect();
  const q = `
    SELECT id_rel_empleado_asignatura_curso
    FROM t_rel_empleado_asignatura_curso
    WHERE id_documento_empleado = ${id_documento_empleado}
      AND id_curso = ${id_curso}
      AND id_asignatura = ${id_asignatura}
    LIMIT 1
  `;
  await crud.db.consultar(q);
  const row = (crud.db.getData() || [])[0];
  await crud.db.cerrar();
  if (!row?.id_rel_empleado_asignatura_curso) {
    throw new Error("No existe la relación empleado-asignatura-curso para esos datos");
  }
  return row.id_rel_empleado_asignatura_curso;
}

// POST /api/actividad/crear
router.post("/actividad/crear", async (req, res) => {
  try {
    const {
      id_documento_empleado,
      id_curso,
      id_asignatura,
      id_categoria_actividad,   // si no usas categoría por FK, ignóralo
      titulo_actividad,
      descripcion_actividad,
      fecha_entrega
    } = req.body;

    // 1) resolver relación
    const idRel = await getRelId({ id_documento_empleado, id_curso, id_asignatura });

    // 2) armar payload para t_actividad (usa tus nombres de columnas)
    const actividadData = {
      act_estado: "Asignada",
      act_fecha_asignacion: new Date().toISOString().slice(0,19).replace("T"," "),
      act_fecha_entrega: fecha_entrega ? `${fecha_entrega} 23:59:59` : null, // o lo que prefieras
      act_nombre: titulo_actividad,
      act_descripcion: descripcion_actividad ?? null,
      act_id_recurso: null,                 // si luego seleccionas recurso, cámbialo
      act_categoria: "Tarea",               // o deriva desde id_categoria_actividad si aplica
      url_actividad: null,
      id_rel_empleado_asignatura_curso: idRel
    };

    // 3) crear actividad + informes
    const result = await Actividad.crearActividad(actividadData);

    return res.status(201).json({ ok: true, id_actividad: result.id_actividad });
  } catch (err) {
    console.error("❌ Error crear actividad:", err.message);
    return res.status(400).json({ ok: false, error: err.message });
  }
});

export default router;
