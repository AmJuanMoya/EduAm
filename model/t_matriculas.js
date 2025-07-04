import Database from "../model/database/conectionDB.js";
import Crud from "../model/database/crudsql.js";

class t_matriculas{

    constructor(){
        this.id_matricula;
        this.primer_nombre_estudiante ;
        this.nombres_adicionales_estudiante;
        this.primer_apellido_estudiante;
        this.apellidos_adicionales_estudiante;
        this.estado_matricula;
        this.fecha_matricula;
        this.repitente;
        this.eps;
        this.sisben;
        this.estrato;
        this.discapacidad;
        this.jornada;
        this.direccion_residencia;
        this.id_tipo_documento_estudiante;
        this.documento_estudiante;
        this.observaciones;
        this.nombre_acudiente1;
        this.apellido_acudiante1;
        this.id_tipo_documento_acudiente1;
        this.numero_documento_acudiente1;
        this.tel_contacto_acudiente1;
        this.correo_acudiente1;
        this.nombre_acudiente2;
        this.apellido_acudiante2;
        this.id_tipo_documento_acudiente2;
        this.numero_documento_acudiente2;
        this.tel_contacto_acudiente2;
        this.correo_acudiente2;
        this.nombre_acudiente3;
        this.apellido_acudiante3;
        this.id_tipo_documento_acudiente3;
        this.numero_documento_acudiente3;
        this.tel_contacto_acudiente3;
        this.correo_acudiente3;
        this.db = new Database();
        this.crud = new Crud;
    }

    async getMatriculaByDoc(doc){
        let data = await this.crud.getByCondition("t_matricula",`documento_estudiante = ${doc}`)
        return data    
    }

    async getMatricula() {
        return await this.crud.getAll("t_matricula");
    }

    // --- NUEVO MÉTODO PARA CREAR MATRÍCULA ---
    async createMatricula(matriculaData) {
        let connection;
        try {
            connection = await this.db.connect(); // Obtiene una conexión del pool

            // Define la consulta SQL para insertar los datos
            // **¡IMPORTANTE!** Los nombres de las columnas en esta consulta (ej. `primer_nombre_estudiante`)
            // DEBEN coincidir *exactamente* con los nombres de las columnas en tu tabla `t_matricula` en MySQL.
            // Si tu tabla usa nombres diferentes (ej. `primerNombreEstudiante` o `primer_nombre_est`),
            // DEBES cambiarlos aquí.
            const query = `
                INSERT INTO t_matricula (
                    primer_nombre_estudiante, nombres_adicionales_estudiante,
                    primer_apellido_estudiante, apellidos_adicionales_estudiante,
                    id_tipo_documento_estudiante, documento_estudiante,
                    eps, estrato, repitente,
                    jornada, direccion_residencia,
                    discapacidad, observaciones,
                    nombre_acudiente1, apellido_acudiente1,
                    id_tipo_documento_acudiente1, numero_documento_acudiente1,
                    tel_contacto_acudiente1, correo_acudiente1,
                    estado_matricula, fecha_matricula
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            // Mapea los datos del objeto matriculaData a un array en el ORDEN correcto para la consulta SQL
            const values = [
                matriculaData.primer_nombre_estudiante || null,
                matriculaData.nombres_adicionales_estudiante || null,
                matriculaData.primer_apellido_estudiante || null,
                matriculaData.apellidos_adicionales_estudiante || null,
                matriculaData.id_tipo_documento_estudiante || null, // Del frontend: id_tipo_identificacion
                matriculaData.documento_estudiante || null,
                matriculaData.eps || null, // Del frontend: eps_estudiante
                matriculaData.estrato || null, // Del frontend: estrato_estudiante
                matriculaData.repitente, // Ya es booleano
                matriculaData.jornada || null, // Del frontend: jornada_estudiante
                matriculaData.direccion_residencia || null,
                matriculaData.discapacidad || null, // Del frontend: discapacidad_estudiante
                matriculaData.observaciones || null,

                matriculaData.nombre_acudiente1 || null, // Del frontend: primer_nombre_acudiente
                matriculaData.apellido_acudiente1 || null,
                matriculaData.id_tipo_documento_acudiente1 || null,
                matriculaData.numero_documento_acudiente1 || null,
                matriculaData.tel_contacto_acudiente1 || null,
                matriculaData.correo_acudiente1 || null,

                // Campos que se asignan en el backend
                'Activa', // Valor por defecto para estado_matricula
                new Date().toISOString().slice(0, 19).replace('T', ' ') // Formato 'YYYY-MM-DD HH:MM:SS' para fecha_matricula
            ];

            // console.log("Executing query with values:", values); // Debugging
            const [result] = await connection.execute(query, values);
            return result.insertId; // Devuelve el ID de la fila insertada
        } catch (error) {
            console.error('Error en createMatricula:', error);
            throw error; // Lanza el error para que sea capturado en la ruta
        } finally {
            if (connection) {
               await connection.end(); // cierra la conexion

            }
            // Con `mysql2/promise` pool, la conexión se libera automáticamente, no necesitas `connection.end()` aquí.
        }
    }
}




// let matricula = new t_matriculas


// matricula.getMatriculaByDoc(1020304014).then(
//     (d)=> console.log(d)
// )

export default t_matriculas;