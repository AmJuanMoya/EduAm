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


    async getActivitiesAssignedByStudentDocument(numeroDocumentoEstudiante) {
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
                EU.numero_documento = '${numeroDocumentoEstudiante}';
        `;

        try {
        await this.db.connect();
        await this.db.consultar(query);
        let datos = this.db.getData()
        await this.db.cerrar();
        return datos
        } catch (error) {
            console.error(`Error al obtener actividades asignadas al estudiante con documento ${numeroDocumentoEstudiante}: ${error.message}`);
            throw error;
        }
    }
}

export default t_informe_calificaciones;