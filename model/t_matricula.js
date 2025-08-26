// import Database from "./database/conectionDB.js"
import Crud from "./database/crudsql.js"

class t_matricula {
    constructor(){
        this.table = 't_matricula';
        this.crud = new Crud();
    }

    /**
     * Crear una nueva matrícula
     * @param {Object} matriculaData - Datos de la matrícula
     * @returns {Promise} Resultado de la inserción
     */
    async crearMatricula(matriculaData) {
        try {
            // Validar datos requeridos
            const camposRequeridos = ['id_documento', 'matr_anio', 'matr_grado', 'matr_repite', 'matr_traslado', 'matr_estado', 'matr_jornada'];
            for (const campo of camposRequeridos) {
                if (!matriculaData[campo]) {
                    throw new Error(`El campo ${campo} es requerido`);
                }
            }

            // Validar valores de ENUM
            const estadosValidos = ['Activa', 'Condicionada', 'Cancelada', 'Pendiente'];
            const jornadasValidas = ['Jornada Tarde', 'Jornada Mañana'];

            if (!estadosValidos.includes(matriculaData.matr_estado)) {
                throw new Error(`Estado inválido. Valores permitidos: ${estadosValidos.join(', ')}`);
            }

            if (!jornadasValidas.includes(matriculaData.matr_jornada)) {
                throw new Error(`Jornada inválida. Valores permitidos: ${jornadasValidas.join(', ')}`);
            }

            return await this.crud.insertOne(this.table, matriculaData);
        } catch (error) {
            throw new Error(`Error al crear matrícula: ${error.message}`);
        }
    }

    /**
     * Obtener todas las matrículas
     * @returns {Promise} Lista de todas las matrículas
     */
    async obtenerTodasMatriculas() {
        try {
            return await this.crud.getAll(this.table);
        } catch (error) {
            throw new Error(`Error al obtener matrículas: ${error.message}`);
        }
    }

    /**
     * Obtener matrícula por documento de estudiante
     * @param {number} idDocumento - ID del documento del estudiante
     * @returns {Promise} Matrícula del estudiante
     */
    async obtenerMatriculaPorEstudiante(idDocumento) {
        try {
            return await this.crud.getByCondition(this.table, `id_documento = ${idDocumento}`);
        } catch (error) {
            throw new Error(`Error al obtener matrícula del estudiante: ${error.message}`);
        }
    }

    /**
     * Obtener matrículas por año
     * @param {string} anio - Año de matrícula
     * @returns {Promise} Matrículas del año especificado
     */
    async obtenerMatriculasPorAnio(anio) {
        try {
            return await this.crud.getByCondition(this.table, `YEAR(matr_anio) = ${anio}`);
        } catch (error) {
            throw new Error(`Error al obtener matrículas por año: ${error.message}`);
        }
    }

    /**
     * Obtener matrículas por grado
     * @param {number} grado - ID del grado
     * @returns {Promise} Matrículas del grado especificado
     */
    async obtenerMatriculasPorGrado(grado) {
        try {
            return await this.crud.getByCondition(this.table, `matr_grado = ${grado}`);
        } catch (error) {
            throw new Error(`Error al obtener matrículas por grado: ${error.message}`);
        }
    }

    /**
     * Obtener matrículas por estado
     * @param {string} estado - Estado de la matrícula
     * @returns {Promise} Matrículas con el estado especificado
     */
    async obtenerMatriculasPorEstado(estado) {
        try {
            const estadosValidos = ['Activa', 'Condicionada', 'Cancelada', 'Pendiente'];
            if (!estadosValidos.includes(estado)) {
                throw new Error(`Estado inválido. Valores permitidos: ${estadosValidos.join(', ')}`);
            }
            return await this.crud.getByCondition(this.table, `matr_estado = '${estado}'`);
        } catch (error) {
            throw new Error(`Error al obtener matrículas por estado: ${error.message}`);
        }
    }

    /**
     * Obtener matrículas por jornada
     * @param {string} jornada - Jornada de la matrícula
     * @returns {Promise} Matrículas de la jornada especificada
     */
    async obtenerMatriculasPorJornada(jornada) {
        try {
            const jornadasValidas = ['Jornada Tarde', 'Jornada Mañana'];
            if (!jornadasValidas.includes(jornada)) {
                throw new Error(`Jornada inválida. Valores permitidos: ${jornadasValidas.join(', ')}`);
            }
            return await this.crud.getByCondition(this.table, `matr_jornada = '${jornada}'`);
        } catch (error) {
            throw new Error(`Error al obtener matrículas por jornada: ${error.message}`);
        }
    }

    /**
     * Obtener matrícula específica por clave primaria
     * @param {number} idDocumento - ID del documento del estudiante
     * @param {string} anio - Año de matrícula
     * @param {number} grado - ID del grado
     * @returns {Promise} Matrícula específica
     */
    async obtenerMatriculaEspecifica(idDocumento, anio, grado) {
        try {
            const condition = `id_documento = ${idDocumento} AND YEAR(matr_anio) = ${anio} AND matr_grado = ${grado}`;
            return await this.crud.getByCondition(this.table, condition);
        } catch (error) {
            throw new Error(`Error al obtener matrícula específica: ${error.message}`);
        }
    }

    /**
     * Actualizar matrícula
     * @param {Object} datosActualizados - Datos a actualizar
     * @param {number} idDocumento - ID del documento del estudiante
     * @param {string} anio - Año de matrícula
     * @param {number} grado - ID del grado
     * @returns {Promise} Resultado de la actualización
     */
    async actualizarMatricula(datosActualizados, idDocumento, anio, grado) {
        try {
            // Validar valores de ENUM si se están actualizando
            if (datosActualizados.matr_estado) {
                const estadosValidos = ['Activa', 'Condicionada', 'Cancelada', 'Pendiente'];
                if (!estadosValidos.includes(datosActualizados.matr_estado)) {
                    throw new Error(`Estado inválido. Valores permitidos: ${estadosValidos.join(', ')}`);
                }
            }

            if (datosActualizados.matr_jornada) {
                const jornadasValidas = ['Jornada Tarde', 'Jornada Mañana'];
                if (!jornadasValidas.includes(datosActualizados.matr_jornada)) {
                    throw new Error(`Jornada inválida. Valores permitidos: ${jornadasValidas.join(', ')}`);
                }
            }

            const condition = `id_documento = ${idDocumento} AND YEAR(matr_anio) = ${anio} AND matr_grado = ${grado}`;
            return await this.crud.updateOne(this.table, datosActualizados, condition);
        } catch (error) {
            throw new Error(`Error al actualizar matrícula: ${error.message}`);
        }
    }

    /**
     * Eliminar matrícula
     * @param {number} idDocumento - ID del documento del estudiante
     * @param {string} anio - Año de matrícula
     * @param {number} grado - ID del grado
     * @returns {Promise} Resultado de la eliminación
     */
    async eliminarMatricula(idDocumento, anio, grado) {
        try {
            const condition = `id_documento = ${idDocumento} AND YEAR(matr_anio) = ${anio} AND matr_grado = ${grado}`;
            return await this.crud.deleteOne(this.table, condition);
        } catch (error) {
            throw new Error(`Error al eliminar matrícula: ${error.message}`);
        }
    }

    /**
     * Obtener matrículas con información del estudiante (JOIN)
     * @returns {Promise} Matrículas con datos del estudiante
     */
    async obtenerMatriculasConEstudiante() {
        try {
            await this.crud.db.connect();
            const query = `
                SELECT m.*, e.estu_nombre, e.estu_apellido, e.estu_edad, e.estu_genero
                FROM ${this.table} m
                INNER JOIN t_estudiantes e ON m.id_documento = e.id_docuestudiante
            `;
            await this.crud.db.consultar(query);
            await this.crud.db.cerrar();
            return this.crud.db.getData();
        } catch (error) {
            await this.crud.db.cerrar();
            throw new Error(`Error al obtener matrículas con estudiante: ${error.message}`);
        }
    }

    /**
     * Obtener matrículas con información completa (estudiante, curso, grado)
     * @returns {Promise} Matrículas con información completa
     */
    async obtenerMatriculasCompletas() {
        try {
            await this.crud.db.connect();
            const query = `
                SELECT m.*, 
                       e.estu_nombre, e.estu_apellido, e.estu_edad, e.estu_genero,
                       g.grad_nombre as nombre_grado,
                       c.curso_jornada as jornada_curso
                FROM ${this.table} m
                INNER JOIN t_estudiantes e ON m.id_documento = e.id_docuestudiante
                INNER JOIN t_grado g ON m.matr_grado = g.id_grado
                LEFT JOIN t_curso c ON m.matr_curso = c.id_curso
            `;
            await this.crud.db.consultar(query);
            await this.crud.db.cerrar();
            return this.crud.db.getData();
        } catch (error) {
            await this.crud.db.cerrar();
            throw new Error(`Error al obtener matrículas completas: ${error.message}`);
        }
    }

    /**
     * Contar matrículas por estado
     * @returns {Promise} Conteo de matrículas por estado
     */
    async contarMatriculasPorEstado() {
        try {
            await this.crud.db.connect();
            const query = `
                SELECT matr_estado, COUNT(*) as cantidad
                FROM ${this.table}
                GROUP BY matr_estado
            `;
            await this.crud.db.consultar(query);
            await this.crud.db.cerrar();
            return this.crud.db.getData();
        } catch (error) {
            await this.crud.db.cerrar();
            throw new Error(`Error al contar matrículas por estado: ${error.message}`);
        }
    }

    /**
     * Contar matrículas por grado
     * @returns {Promise} Conteo de matrículas por grado
     */
    async contarMatriculasPorGrado() {
        try {
            await this.crud.db.connect();
            const query = `
                SELECT m.matr_grado, g.grad_nombre, COUNT(*) as cantidad
                FROM ${this.table} m
                INNER JOIN t_grado g ON m.matr_grado = g.id_grado
                GROUP BY m.matr_grado, g.grad_nombre
                ORDER BY m.matr_grado
            `;
            await this.crud.db.consultar(query);
            await this.crud.db.cerrar();
            return this.crud.db.getData();
        } catch (error) {
            await this.crud.db.cerrar();
            throw new Error(`Error al contar matrículas por grado: ${error.message}`);
        }
    }
}

export default t_matricula;