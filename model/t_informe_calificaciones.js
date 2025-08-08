import Database from './database/conectionDB.js';
import Crud from './database/crudsql.js';

class t_informe_calificaciones {
    constructor() {
        this.id_informe_calificaciones;
        this.id_actividad;
        this.id_periodo;
        this.id_docente;
        this.id_estudiante;
        this.id_asignatura;
        this.id_curso;

        this.db = new Database();
        this.crud = new Crud();
        this.tableName = "t_informe_calificaciones";
    }

    // CAMBIADO: Ahora recibe id_estudiante directamente
    async getActivitiesAssignedByStudentId(idEstudiante) {
        const query = `
            SELECT
                EU.numero_documento AS documento_estudiante,
                EU.nombres_usuario AS nombre_estudiante,
                EU.apellidos_usuario AS apellido_estudiante,
                A.id_actividad,
                A.titulo_actividad,
                A.fecha_publicacion,
                A.fecha_entrega,
                A.calificacion_nota
            FROM
                t_informe_calificaciones AS IC
            JOIN
                t_actividad AS A ON IC.id_actividad = A.id_actividad
            JOIN
                t_estudiantes AS E ON IC.id_estudiante = E.id_estudiante
            JOIN
                t_usuarios AS EU ON E.id_usuario = EU.id_usuario
            WHERE
                IC.id_estudiante = ?;
        `;

        try {
            await this.db.connect();
            await this.db.consultar(query, [idEstudiante]);
            const datos = this.db.getData();
            await this.db.cerrar();
            return datos;
        } catch (error) {
            console.error(`Error al obtener actividades asignadas al estudiante con ID ${idEstudiante}: ${error.message}`);
            throw error;
        }
    }

    // CAMBIADO: Ahora recibe id_estudiante directamente
    async getDetailedActivitiesByStudentId(idEstudiante) {
        const query = `
            SELECT
                A.id_actividad,
                A.titulo_actividad,
                A.fecha_entrega,
                A.descripcion_actividad,
                ASIG.nombre_asignatura,
                A.fecha_publicacion,
                CONCAT(DU.nombres_usuario, ' ', DU.apellidos_usuario) AS docente,
                (
                    SELECT 
                        GROUP_CONCAT(C.comentario SEPARATOR ' || ')
                    FROM t_comentario_actividad AS CA
                    JOIN t_comentarios AS C ON CA.id_comentario = C.id_comentario
                    WHERE CA.id_actividad = A.id_actividad
                ) AS comentarios,
                R.nombre_recurso,
                R.direcion_url_recurso,
                IC.estado_entrega,
                IC.url_entrega
            FROM
                t_informe_calificaciones AS IC
            JOIN t_actividad AS A ON IC.id_actividad = A.id_actividad
            JOIN t_estudiantes AS E ON IC.id_estudiante = E.id_estudiante
            JOIN t_usuarios AS EU ON E.id_usuario = EU.id_usuario
            JOIN t_docente AS D ON IC.id_docente = D.id_docente
            JOIN t_usuarios AS DU ON D.id_usuario = DU.id_usuario
            JOIN t_asignaturas AS ASIG ON IC.id_asignatura = ASIG.id_asignatura
            LEFT JOIN t_recurso_actividad AS RA ON A.id_actividad = RA.id_actividad
            LEFT JOIN t_recursos AS R ON RA.id_recurso = R.id_recurso
            WHERE
                IC.id_estudiante = ?;
        `;

        try {
            await this.db.connect();
            await this.db.consultar(query, [idEstudiante]);
            const datos = this.db.getData();
            await this.db.cerrar();
            return datos;
        } catch (error) {
            console.error(`Error al consultar actividades detalladas por ID: ${error.message}`);
            throw error;
        }
    }
    async realizarEntrega({ id_estudiante, id_actividad, url_entrega }) {
    const query = `
    UPDATE t_informe_calificaciones
    SET 
      url_entrega = ?,
      estado_entrega = 'entregado'
    WHERE 
      id_estudiante = ? AND id_actividad = ?
    `;

    try {
        await this.db.connect();
        const [result] = await this.db.connection.execute(query, [
        url_entrega,
        id_estudiante,
        id_actividad
    ]);
    await this.db.cerrar();

    return result.affectedRows > 0;
  } catch (error) {
    console.error("❌ Error en realizarEntrega:", error.message);
    throw error;
  }
}
}

export default t_informe_calificaciones;
