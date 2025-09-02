// model/t_informe_calificaciones.js
import Crud from "./database/crudsql.js";
import Database from "./database/conectionDB.js";

class t_informe_calificaciones {
  constructor() {
    this.table = "t_informe_calificaciones";
    this.crud = new Crud();
    this.db = new Database();
  }

  /**
   * Crear informes por estudiante al crear una actividad.
   * Inserta una fila por estudiante Activo/Condicionado del curso de la relación.
   * Evita duplicados por (id_actividad, infoc_id_documento_estudiante).
   * @param {number} idActividad
   * @param {number} idRelEmpleadoAsigCurso
   */
  async crearInformesParaActividad(idActividad, idRelEmpleadoAsigCurso) {
    try {
      if (!idActividad || !idRelEmpleadoAsigCurso) {
        throw new Error("idActividad e idRelEmpleadoAsigCurso son requeridos");
      }

      const insertInformesSQL = `
        INSERT INTO ${this.table}
        (id_actividad, infoc_id_documento_estudiante, infoc_estado, infoc_fecha_entrega, infoc_nota, infoc_url_entrega, infoc_observaciones_docente, id_rel_empleado_asignatura_curso)
        SELECT
          ${idActividad},
          e.id_docuestudiante,
          'Pendiente' AS infoc_estado,
          NULL        AS infoc_fecha_entrega,
          NULL        AS infoc_nota,
          NULL        AS infoc_url_entrega,
          NULL        AS infoc_observaciones_docente,
          rel.id_rel_empleado_asignatura_curso
        FROM t_rel_empleado_asignatura_curso rel
        JOIN t_matricula m
          ON m.matr_curso = rel.id_curso
         AND m.matr_estado IN ('Activa','Condicionada')
        JOIN t_estudiantes e
          ON e.id_docuestudiante = m.id_documento
        WHERE rel.id_rel_empleado_asignatura_curso = ${idRelEmpleadoAsigCurso}
          AND NOT EXISTS (
            SELECT 1
            FROM ${this.table} i
            WHERE i.id_actividad = ${idActividad}
              AND i.infoc_id_documento_estudiante = e.id_docuestudiante
          );
      `;

      await this.db.connect();
      await this.db.consultar(insertInformesSQL);
      await this.db.cerrar();

      return { ok: true, msg: "Informes generados (o ya existían) para los estudiantes del curso." };
    } catch (error) {
      await this.db.cerrar();
      throw new Error(`Error al crear informes de actividad: ${error.message}`);
    }
  }

  /**
   * Registrar entrega del estudiante (solo si no ha entregado antes).
   * Mantiene infoc_estado = 'Pendiente' hasta que el docente califique.
   * @param {Object} data
   * @param {number} data.id_actividad
   * @param {number} data.id_documento_estudiante  (coincide con t_estudiantes.id_docuestudiante)
   * @param {string} data.url_entrega
   */
  async entregar({ id_actividad, id_documento_estudiante, url_entrega }) {
    try {
      if (!id_actividad || !id_documento_estudiante || !url_entrega) {
        throw new Error("id_actividad, id_documento_estudiante y url_entrega son requeridos");
      }

      const q = `
        UPDATE ${this.table}
        SET infoc_url_entrega = '${url_entrega}',
            infoc_fecha_entrega = NOW()
        WHERE id_actividad = ${id_actividad}
          AND infoc_id_documento_estudiante = ${id_documento_estudiante}
          AND infoc_fecha_entrega IS NULL;
      `;

      return await this.crud.exec(q);
    } catch (error) {
      throw new Error(`Error al registrar entrega: ${error.message}`);
    }
  }

  /**
   * Calificar entrega (solo si ya entregó).
   * @param {Object} data
   * @param {number} data.id_actividad
   * @param {number} data.id_documento_estudiante
   * @param {number} data.infoc_nota     -- DECIMAL(2,1) en tu DB (ej 0.0..5.0)
   * @param {string} data.infoc_estado   -- 'Aprobada' | 'Desaprobada' | 'Pendiente'
   * @param {string} [data.infoc_observaciones_docente]
   */
  async calificar({ id_actividad, id_documento_estudiante, infoc_nota, infoc_estado, infoc_observaciones_docente = null }) {
    try {
      if (!id_actividad || !id_documento_estudiante) {
        throw new Error("id_actividad e id_documento_estudiante son requeridos");
      }
      if (infoc_nota == null || isNaN(infoc_nota)) {
        throw new Error("La nota es requerida y debe ser numérica");
      }
      const estadosValidos = ["Aprobada", "Desaprobada", "Pendiente"];
      if (!estadosValidos.includes(infoc_estado)) {
        throw new Error(`infoc_estado inválido. Valores permitidos: ${estadosValidos.join(", ")}`);
      }

      const q = `
        UPDATE ${this.table}
        SET infoc_nota = ${infoc_nota},
            infoc_estado = '${infoc_estado}',
            infoc_observaciones_docente = ${infoc_observaciones_docente ? `'${infoc_observaciones_docente}'` : 'NULL'}
        WHERE id_actividad = ${id_actividad}
          AND infoc_id_documento_estudiante = ${id_documento_estudiante}
          AND infoc_fecha_entrega IS NOT NULL;
      `;

      return await this.crud.exec(q);
    } catch (error) {
      throw new Error(`Error al calificar: ${error.message}`);
    }
  }

  /**
   * Listado de actividades para un estudiante con estado_mostrado derivado.
   * Reglas (sin cambiar tu DB):
   * - 'Calificada' si infoc_estado IN ('Aprobada','Desaprobada')
   * - 'Asignada'   si infoc_fecha_entrega IS NULL
   * - 'Fuera de Tiempo' si infoc_fecha_entrega > act_fecha_entrega
   * - 'Entregada'  en otro caso
   * @param {number} id_documento_estudiante
   */
  async obtenerActividadesDeEstudiante(id_documento_estudiante) {
    try {
      if (!id_documento_estudiante) throw new Error("id_documento_estudiante es requerido");

      await this.db.connect();
      const q = `
        SELECT
          a.id_actividad,
          a.act_nombre,
          a.act_descripcion,
          a.act_categoria,
          a.act_fecha_asignacion,
          a.act_fecha_entrega,
          asig.asig_nombre AS nombre_asignatura,
          r.rec_nombre     AS nombre_recurso,
          r.rec_tipo       AS tipo_recurso,
          r.rec_descripcion AS desc_recurso,
          i.infoc_url_entrega,
          i.infoc_nota,
          i.infoc_estado,
          i.infoc_fecha_entrega,
          CASE
            WHEN i.infoc_estado IN ('Aprobada','Desaprobada') THEN 'Calificada'
            WHEN i.infoc_fecha_entrega IS NULL               THEN 'Asignada'
            WHEN i.infoc_fecha_entrega > a.act_fecha_entrega THEN 'Fuera de Tiempo'
            ELSE 'Entregada'
          END AS estado_mostrado
        FROM ${this.table} i
        JOIN t_actividad a
          ON a.id_actividad = i.id_actividad
        JOIN t_rel_empleado_asignatura_curso rel
          ON rel.id_rel_empleado_asignatura_curso = a.id_rel_empleado_asignatura_curso
        JOIN t_asignatura asig
          ON asig.id_asignatura = rel.id_asignatura
        LEFT JOIN t_recurso r
          ON r.id_recurso = a.act_id_recurso
        WHERE i.infoc_id_documento_estudiante = ${id_documento_estudiante}
        ORDER BY a.act_fecha_asignacion DESC;
      `;
      await this.db.consultar(q);
      const data = this.db.getData();
      await this.db.cerrar();
      return data;
    } catch (error) {
      await this.db.cerrar();
      throw new Error(`Error al obtener actividades del estudiante: ${error.message}`);
    }
  }

  /**
   * Entregas por actividad (vista para docente).
   * @param {number} id_actividad
   */
  async obtenerEntregasPorActividad(id_actividad) {
    try {
      if (!id_actividad) throw new Error("id_actividad es requerido");

      await this.db.connect();
      const q = `
        SELECT
          e.id_docuestudiante AS id_documento_estudiante,
          CONCAT(e.estu_nombre, ' ', e.estu_apellido) AS estudiante,
          i.infoc_url_entrega,
          i.infoc_fecha_entrega,
          i.infoc_nota,
          i.infoc_estado,
          i.infoc_observaciones_docente,
          CASE
            WHEN i.infoc_estado IN ('Aprobada','Desaprobada') THEN 'Calificada'
            WHEN i.infoc_fecha_entrega IS NULL               THEN 'Asignada'
            WHEN i.infoc_fecha_entrega > a.act_fecha_entrega THEN 'Fuera de Tiempo'
            ELSE 'Entregada'
          END AS estado_mostrado
        FROM ${this.table} i
        JOIN t_estudiantes e
          ON e.id_docuestudiante = i.infoc_id_documento_estudiante
        JOIN t_actividad a
          ON a.id_actividad = i.id_actividad
        WHERE i.id_actividad = ${id_actividad}
        ORDER BY estado_mostrado DESC, i.infoc_fecha_entrega DESC;
      `;
      await this.db.consultar(q);
      const data = this.db.getData();
      await this.db.cerrar();
      return data;
    } catch (error) {
      await this.db.cerrar();
      throw new Error(`Error al obtener entregas por actividad: ${error.message}`);
    }
  }

  /**
   * Auxiliar: obtener un informe puntual por actividad y estudiante.
   * @param {number} id_actividad
   * @param {number} id_documento_estudiante
   */
  async obtenerInforme(id_actividad, id_documento_estudiante) {
    try {
      if (!id_actividad || !id_documento_estudiante) {
        throw new Error("id_actividad e id_documento_estudiante son requeridos");
      }
      return await this.crud.getByCondition(
        this.table,
        `id_actividad = ${id_actividad} AND infoc_id_documento_estudiante = ${id_documento_estudiante}`
      );
    } catch (error) {
      throw new Error(`Error al obtener informe: ${error.message}`);
    }
  }

  /**
   * Auxiliar: eliminar informes de una actividad (si necesitas rollback).
   * @param {number} id_actividad
   */
  async eliminarInformesDeActividad(id_actividad) {
    try {
      if (!id_actividad) throw new Error("id_actividad es requerido");
      const condition = `id_actividad = ${id_actividad}`;
      return await this.crud.deleteOne(this.table, condition);
    } catch (error) {
      throw new Error(`Error al eliminar informes de la actividad: ${error.message}`);
    }
  }
}

export default t_informe_calificaciones;
