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
    fecha_entrega
  }) {
    const fecha_publicacion = new Date().toISOString().slice(0, 19).replace('T', ' ');

    try {
      // Validación previa
      if (
        !id_docente ||
        !id_curso ||
        !id_asignatura ||
        !id_categoria_actividad ||
        !titulo_actividad ||
        !descripcion_actividad ||
        !fecha_entrega
      ) {
        throw new Error("Faltan campos obligatorios para crear la actividad.");
      }

      await this.db.connect();

      // INSERT en t_actividad
      const insertActividadQuery = `
        INSERT INTO t_actividad (
          titulo_actividad,
          descripcion_actividad,
          fecha_publicacion,
          fecha_entrega,
          id_docente,
          id_categoria_actividad
        )
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      const actividadValues = [
        titulo_actividad,
        descripcion_actividad,
        fecha_publicacion,
        fecha_entrega,
        id_docente,
        id_categoria_actividad
      ];

      console.log("📦 Valores INSERT actividad:", actividadValues);

      const result = await this.db.consultar(insertActividadQuery, actividadValues);
      const id_actividad = result.rows.insertId;

      if (!id_actividad) {
        throw new Error("No se pudo obtener el ID de la actividad insertada.");
      }

      // Obtener estudiantes del curso
      const estudiantesQuery = `
        SELECT id_estudiante FROM t_estudiantes WHERE id_curso = ?
      `;
      await this.db.consultar(estudiantesQuery, [id_curso]);
      const estudiantes = this.db.getData();

      // INSERT en t_informe_calificaciones para cada estudiante
      for (const est of estudiantes) {
        const insertInformeQuery = `
          INSERT INTO t_informe_calificaciones (
            id_actividad,
            id_periodo,
            id_docente,
            id_estudiante,
            id_asignatura,
            id_curso
          )
          VALUES (?, 1, ?, ?, ?, ?)
        `;
        const informeValues = [
          id_actividad,
          id_docente,
          est.id_estudiante,
          id_asignatura,
          id_curso
        ];
        await this.db.consultar(insertInformeQuery, informeValues);
      }

      await this.db.cerrar();
      return { mensaje: "Actividad creada con éxito", id_actividad };

    } catch (error) {
      await this.db.cerrar();
      throw new Error(`Error al crear la actividad: ${error.message}`);
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
