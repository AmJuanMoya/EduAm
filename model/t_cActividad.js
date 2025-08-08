// cActividad.js
import Crud from "../model/database/crudsql.js";
import conectionDB from "./database/conectionDB.js";

class cActividad {
  constructor() {
    this.crud = new Crud();
    this.db = new conectionDB();
    this.tableName = "t_actividad";
  }

  async crearActividad({
    id_docente,
    id_curso,
    id_asignatura,
    id_categoria_actividad,
    titulo_actividad,
    descripcion_actividad,
    fecha_entrega,
    id_recurso
  }) {
    const fecha_publicacion = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const hoy = new Date().toISOString().slice(0, 10);

    if (fecha_entrega < hoy) {
      throw new Error("La fecha de entrega no puede ser anterior al día actual.");
    }

    try {
      if (!id_docente || !id_curso || !id_asignatura || !id_categoria_actividad || !titulo_actividad || !descripcion_actividad || !fecha_entrega) {
        throw new Error("Faltan campos obligatorios para crear la actividad.");
      }

      await this.db.connect();

      const insertActividadQuery = `
        INSERT INTO t_actividad (
          titulo_actividad,
          descripcion_actividad,
          fecha_publicacion,
          fecha_entrega,
          id_docente,
          id_categoria_actividad,
          id_asignatura,
          id_curso,
          estado
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const actividadValues = [
        titulo_actividad,
        descripcion_actividad,
        fecha_publicacion,
        fecha_entrega,
        id_docente,
        id_categoria_actividad,
        id_asignatura,
        id_curso,
        'Asignado'
      ];

      const result = await this.db.consultar(insertActividadQuery, actividadValues);
      const id_actividad = result.rows.insertId;

      if (!id_actividad) {
        throw new Error("No se pudo obtener el ID de la actividad insertada.");
      }

      if (id_recurso) {
        const insertRelacion = `
          INSERT INTO t_recurso_actividad (id_recurso, id_actividad)
          VALUES (?, ?)
        `;
        await this.db.consultar(insertRelacion, [id_recurso, id_actividad]);
      }

      const estudiantesQuery = `SELECT id_estudiante FROM t_estudiantes WHERE id_curso = ?`;
      await this.db.consultar(estudiantesQuery, [id_curso]);
      const estudiantes = this.db.getData();

      for (const est of estudiantes) {
        const insertInformeQuery = `
          INSERT INTO t_informe_calificaciones (
            id_actividad, id_periodo, id_docente, id_estudiante, id_asignatura, id_curso
          ) VALUES (?, 1, ?, ?, ?, ?)
        `;
        const informeValues = [id_actividad, id_docente, est.id_estudiante, id_asignatura, id_curso];
        await this.db.consultar(insertInformeQuery, informeValues);
      }

      await this.db.cerrar();
      return { mensaje: "Actividad creada con éxito", id_actividad };

    } catch (error) {
      await this.db.cerrar();
      throw new Error(`Error al crear la actividad: ${error.message}`);
    }
  }

  async obtenerActividadesPorDocente(id_docente) {
    try {
      if (!id_docente) throw new Error("ID del docente es requerido.");

      await this.db.connect();

      const query = ` 
        SELECT 
          a.id_actividad,
          a.titulo_actividad,
          a.descripcion_actividad,
          a.fecha_publicacion,
          a.fecha_entrega,
          a.estado,
          asi.nombre_asignatura,
          c.nombre_curso,
          r.id_recurso,
          rec.nombre_recurso,
          rec.direcion_url_recurso
        FROM t_actividad a
        JOIN t_asignaturas asi ON a.id_asignatura = asi.id_asignatura
        JOIN t_curso c ON a.id_curso = c.id_curso
        LEFT JOIN t_recurso_actividad r ON a.id_actividad = r.id_actividad
        LEFT JOIN t_recursos rec ON r.id_recurso = rec.id_recurso
        WHERE a.id_docente = ?
      `;

      await this.db.consultar(query, [id_docente]);
      const data = this.db.getData();
      await this.db.cerrar();
      return data;
    } catch (error) {
      console.error("❌ Error al obtener actividades del docente:", error.message);
      throw error;
    }
  }

  async obtenerAsignacionesPorDocente(id_docente) {
    try {
      await this.db.connect();

      const query = `
        SELECT 
          dc.id_docente,
          c.id_curso,
          g.nombre_grado AS grado,
          c.nombre_curso AS letra,
          a.id_asignatura,
          a.nombre_asignatura
        FROM t_docente_curso dc
        JOIN t_docente_asignatura da ON dc.id_docente = da.id_docente
        JOIN t_curso c ON dc.id_curso = c.id_curso
        JOIN t_grado g ON c.id_grado = g.id_grado
        JOIN t_asignaturas a ON da.id_asignatura = a.id_asignatura
        WHERE dc.id_docente = ?
      `;

      await this.db.consultar(query, [id_docente]);
      const data = this.db.getData();
      await this.db.cerrar();

      return data;

    } catch (error) {
      await this.db.cerrar();
      throw new Error("Error al obtener asignaciones del docente por ID: " + error.message);
    }
  }
}

export default cActividad;
