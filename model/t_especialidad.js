// import Database from "./database/conectionDB.js";
import Crud from "./database/crudsql.js";

class t_especialidad {
    constructor(){
        this.table = 't_especialidad';
        this.crud = new Crud();
    }

    /**
     * Crear una nueva especialidad
     * @param {Object} especialidadData - Datos de la especialidad
     * @param {string} especialidadData.esp_descripcion - Descripción de la especialidad
     * @returns {Promise} Resultado de la inserción
     */
    async crearEspecialidad(especialidadData) {
        try {
            if (!especialidadData.esp_descripcion) {
                throw new Error('El campo esp_descripcion es requerido');
            }
            if (especialidadData.esp_descripcion.trim().length === 0) {
                throw new Error('La descripción de la especialidad no puede estar vacía');
            }
            if (especialidadData.esp_descripcion.length > 200) {
                throw new Error('La descripción de la especialidad no puede exceder 200 caracteres');
            }
            return await this.crud.insertOne(this.table, especialidadData);
        } catch (error) {
            throw new Error(`Error al crear especialidad: ${error.message}`);
        }
    }

    /**
     * Obtener todas las especialidades
     * @returns {Promise} Lista de todas las especialidades
     */
    async obtenerTodasEspecialidades() {
        try {
            return await this.crud.getAll(this.table);
        } catch (error) {
            throw new Error(`Error al obtener especialidades: ${error.message}`);
        }
    }

    /**
     * Obtener especialidad por ID
     * @param {number} idEspecialidad - ID de la especialidad
     * @returns {Promise} Especialidad específica
     */
    async obtenerEspecialidadPorId(idEspecialidad) {
        try {
            return await this.crud.getByCondition(this.table, `id_especialidad = ${idEspecialidad}`);
        } catch (error) {
            throw new Error(`Error al obtener especialidad por ID: ${error.message}`);
        }
    }

    /**
     * Buscar especialidades por descripción (búsqueda parcial)
     * @param {string} descripcion - Descripción parcial
     * @returns {Promise} Especialidades que coinciden con la descripción
     */
    async buscarEspecialidadesPorDescripcion(descripcion) {
        try {
            return await this.crud.getByCondition(this.table, `esp_descripcion LIKE '%${descripcion}%'`);
        } catch (error) {
            throw new Error(`Error al buscar especialidades por descripción: ${error.message}`);
        }
    }

    /**
     * Actualizar especialidad
     * @param {Object} datosActualizados - Datos a actualizar
     * @param {number} idEspecialidad - ID de la especialidad a actualizar
     * @returns {Promise} Resultado de la actualización
     */
    async actualizarEspecialidad(datosActualizados, idEspecialidad) {
        try {
            if (datosActualizados.esp_descripcion) {
                if (datosActualizados.esp_descripcion.trim().length === 0) {
                    throw new Error('La descripción de la especialidad no puede estar vacía');
                }
                if (datosActualizados.esp_descripcion.length > 200) {
                    throw new Error('La descripción de la especialidad no puede exceder 200 caracteres');
                }
            }
            const condition = `id_especialidad = ${idEspecialidad}`;
            return await this.crud.updateOne(this.table, datosActualizados, condition);
        } catch (error) {
            throw new Error(`Error al actualizar especialidad: ${error.message}`);
        }
    }

    /**
     * Eliminar especialidad
     * @param {number} idEspecialidad - ID de la especialidad a eliminar
     * @returns {Promise} Resultado de la eliminación
     */
    async eliminarEspecialidad(idEspecialidad) {
        try {
            // Verificar si la especialidad está siendo usada en empleados antes de eliminar
            const enUso = await this.verificarEspecialidadEnUso(idEspecialidad);
            if (enUso) {
                throw new Error('No se puede eliminar la especialidad porque está siendo utilizada por empleados');
            }
            const condition = `id_especialidad = ${idEspecialidad}`;
            return await this.crud.deleteOne(this.table, condition);
        } catch (error) {
            throw new Error(`Error al eliminar especialidad: ${error.message}`);
        }
    }

    /**
     * Verificar si una especialidad está siendo usada en empleados
     * @param {number} idEspecialidad - ID de la especialidad a verificar
     * @returns {Promise<boolean>} True si está en uso
     */
    async verificarEspecialidadEnUso(idEspecialidad) {
        try {
            await this.crud.db.connect();
            const query = `SELECT COUNT(*) as count FROM t_empleados WHERE empl_especialidad = ${idEspecialidad}`;
            await this.crud.db.consultar(query);
            const result = this.crud.db.getData();
            await this.crud.db.cerrar();
            return result[0] && result[0].count > 0;
        } catch (error) {
            await this.crud.db.cerrar();
            throw new Error(`Error al verificar especialidad en uso: ${error.message}`);
        }
    }

    /**
     * Crear especialidades por defecto del sistema
     * @returns {Promise} Resultado de la creación de especialidades por defecto
     */
    async crearEspecialidadesPorDefecto() {
        try {
            const especialidadesPorDefecto = [
                { esp_descripcion: 'Matemáticas' },
                { esp_descripcion: 'Lengua Castellana' },
                { esp_descripcion: 'Ciencias Naturales' },
                { esp_descripcion: 'Ciencias Sociales' },
                { esp_descripcion: 'Educación Física' },
                { esp_descripcion: 'Tecnología' },
                { esp_descripcion: 'Idiomas' }
            ];

            const resultados = [];
            for (const esp of especialidadesPorDefecto) {
                try {
                    const resultado = await this.crearEspecialidad(esp);
                    resultados.push({ especialidad: esp.esp_descripcion, estado: 'Creada', resultado });
                } catch (error) {
                    resultados.push({ especialidad: esp.esp_descripcion, estado: 'Error', error: error.message });
                }
            }
            return resultados;
        } catch (error) {
            throw new Error(`Error al crear especialidades por defecto: ${error.message}`);
        }
    }
}

export default t_especialidad;