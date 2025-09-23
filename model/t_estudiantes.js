import Database from "./database/conectionDB.js";
import Crud from "./database/crudsql.js";

class t_estudiantes {
    constructor() {
        this.table = 't_estudiantes';
        this.crud = new Crud();
    }

    /**
     * Crear un nuevo estudiante
     * @param {Object} estudianteData - Datos del estudiante
     * @returns {Promise} Resultado de la inserción
     */
    async crearEstudiante(estudianteData) {
        try {
            // Validaciones básicas
            if (!estudianteData.id_docuestudiante) throw new Error('El campo id_docuestudiante es requerido');
            if (!estudianteData.estu_nombre || estudianteData.estu_nombre.trim().length === 0) throw new Error('El nombre es requerido');
            if (!estudianteData.estu_apellido || estudianteData.estu_apellido.trim().length === 0) throw new Error('El apellido es requerido');
            if (typeof estudianteData.estu_edad !== 'number') throw new Error('La edad es requerida y debe ser numérica');
            if (!estudianteData.estu_genero) throw new Error('El género es requerido');
            if (!estudianteData.estu_tipo_documento) throw new Error('El tipo de documento es requerido');
            if (!estudianteData.estu_estado) throw new Error('El estado es requerido');
            if (!estudianteData.est_contrasena) throw new Error('La contraseña es requerida');
            if (!estudianteData.estu_rol) throw new Error('El rol es requerido');

            // Longitud de nombre y apellido
            if (estudianteData.estu_nombre.length > 200) throw new Error('El nombre no puede exceder 200 caracteres');
            if (estudianteData.estu_apellido.length > 200) throw new Error('El apellido no puede exceder 200 caracteres');

            return await this.crud.insertOne(this.table, estudianteData);
        } catch (error) {
            throw new Error(`Error al crear estudiante: ${error.message}`);
        }
    }

    /**
     * Obtener todos los estudiantes
     * @returns {Promise} Lista de estudiantes
     */
    async obtenerTodosEstudiantes() {
        try {
            return await this.crud.getAll(this.table);
        } catch (error) {
            throw new Error(`Error al obtener estudiantes: ${error.message}`);
        }
    }

    /**
     * Obtener estudiante por ID
     * @param {number} idEstudiante - ID del estudiante
     * @returns {Promise} Estudiante específico
     */
    async obtenerEstudiantePorId(idEstudiante) {
        try {
            return await this.crud.getByCondition(this.table, `id_docuestudiante = ${idEstudiante}`);
        } catch (error) {
            throw new Error(`Error al obtener estudiante por ID: ${error.message}`);
        }
    }

    /**
     * Buscar estudiantes por nombre o apellido (búsqueda parcial)
     * @param {string} texto - Texto a buscar
     * @returns {Promise} Estudiantes que coinciden
     */
        async obtenerEstudiantePorId(idEstudiante) {
                try {
                    const query = `
                        SELECT 
                            e.*, 
                            r.rol_descripcion,
                            a.acud_nombres,
                            a.acud_apellidos,
                            a.acud_parentesco,
                            a.acud_telefono,
                            a.acud_correo,
                            a.acud_direccion,
                            a.acud_tipo_documento
                        FROM 
                            ${this.table} e
                        LEFT JOIN 
                            t_rol r ON e.estu_rol = r.id_rol
                        LEFT JOIN 
                            t_acudientes a ON e.estu_acudiente = a.id_documento_acudiente
                        WHERE 
                            e.id_docuestudiante = ${idEstudiante}
                    `;
                    
                    await this.crud.db.connect();
                    await this.crud.db.consultar(query);
                    const result = this.crud.db.getData();
                    await this.crud.db.cerrar();
                    return result;
                    
                } catch (error) {
                    throw new Error(`Error al obtener estudiante por ID con detalles: ${error.message}`);
                }
            }

    /**
     * Actualizar estudiante
     * @param {Object} datosActualizados - Datos a actualizar
     * @param {number} idEstudiante - ID del estudiante a actualizar
     * @returns {Promise} Resultado de la actualización
     */
    async actualizarEstudiante(datosActualizados, idEstudiante) {
        try {
            if (datosActualizados.estu_nombre && datosActualizados.estu_nombre.length > 200)
                throw new Error('El nombre no puede exceder 200 caracteres');
            if (datosActualizados.estu_apellido && datosActualizados.estu_apellido.length > 200)
                throw new Error('El apellido no puede exceder 200 caracteres');

            const condition = `id_docuestudiante = ${idEstudiante}`;
            return await this.crud.updateOne(this.table, datosActualizados, condition);
        } catch (error) {
            throw new Error(`Error al actualizar estudiante: ${error.message}`);
        }
    }

    /**
     * Eliminar estudiante
     * @param {number} idEstudiante - ID del estudiante a eliminar
     * @returns {Promise} Resultado de la eliminación
     */
    async eliminarEstudiante(idEstudiante) {
        try {
            const condition = `id_docuestudiante = ${idEstudiante}`;
            return await this.crud.deleteOne(this.table, condition);
        } catch (error) {
            throw new Error(`Error al eliminar estudiante: ${error.message}`);
        }
    }

    /**
     * Obtener estudiantes por rol
     * @param {number} idRol - ID del rol
     * @returns {Promise} Estudiantes con el rol especificado
     */
    async obtenerEstudiantesPorRol(idRol) {
        try {
            return await this.crud.getByCondition(this.table, `estu_rol = ${idRol}`);
        } catch (error) {
            throw new Error(`Error al obtener estudiantes por rol: ${error.message}`);
        }
    }

    /**
     * Obtener estudiante por correo
     * @param {string} correo - Correo del estudiante
     * @returns {Promise} Estudiante específico
     */
    async obtenerEstudiantePorCorreo(correo) {
        try {
            return await this.crud.getByCondition(this.table, `est_correo = '${correo}'`);
        } catch (error) {
            throw new Error(`Error al obtener estudiante por correo: ${error.message}`);
        }
    }
        /**
     * Contar estudiantes por género
     * @returns {Promise} Conteo de estudiantes por género
     */
        async contarEstudiantesPorGenero() {
            try {
                await this.crud.db.connect();
                const query = `
                    SELECT estu_genero, COUNT(*) as cantidad
                    FROM ${this.table}
                    GROUP BY estu_genero
                `;
                await this.crud.db.consultar(query);
                await this.crud.db.cerrar();
                return this.crud.db.getData();
            } catch (error) {
                await this.crud.db.cerrar();
                throw new Error(`Error al contar estudiantes por género: ${error.message}`);
            }
        }
    
        /**
         * Contar estudiantes por tipo de documento
         * @returns {Promise} Conteo de estudiantes por tipo de documento
         */
        async contarEstudiantesPorTipoDocumento() {
            try {
                await this.crud.db.connect();
                const query = `
                    SELECT estu_tipo_documento, COUNT(*) as cantidad
                    FROM ${this.table}
                    GROUP BY estu_tipo_documento
                `;
                await this.crud.db.consultar(query);
                await this.crud.db.cerrar();
                return this.crud.db.getData();
            } catch (error) {
                await this.crud.db.cerrar();
                throw new Error(`Error al contar estudiantes por tipo de documento: ${error.message}`);
            }
        }




}

export default t_estudiantes;
