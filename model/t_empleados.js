import Database from "./database/conectionDB.js";
import Crud from "./database/crudsql.js";

class t_empleados {
    constructor() {
        this.table = 't_empleados';
        this.crud = new Crud();
    }

    /**
     * Crear un nuevo empleado
     * @param {Object} empleadoData - Datos del empleado
     * @returns {Promise} Resultado de la inserción
     */
    async crearEmpleado(empleadoData) {
        try {
            // Validaciones básicas
            if (!empleadoData.id_documento_empleado) throw new Error('El campo id_documento_empleado es requerido');
            if (!empleadoData.empl_nombre || empleadoData.empl_nombre.trim().length === 0) throw new Error('El nombre es requerido');
            if (!empleadoData.empl_apellido || empleadoData.empl_apellido.trim().length === 0) throw new Error('El apellido es requerido');
            if (!empleadoData.empl_genero) throw new Error('El género es requerido');
            if (!empleadoData.empl_direccion || empleadoData.empl_direccion.trim().length === 0) throw new Error('La dirección es requerida');
            if (!empleadoData.empl_contrasena) throw new Error('La contraseña es requerida');
            if (!empleadoData.empl_correo) throw new Error('El correo es requerido');
            if (!empleadoData.empl_estado) throw new Error('El estado es requerido');
            if (!empleadoData.empl_rol) throw new Error('El rol es requerido');

            // Longitud de nombre y apellido
            if (empleadoData.empl_nombre.length > 200) throw new Error('El nombre no puede exceder 200 caracteres');
            if (empleadoData.empl_apellido.length > 200) throw new Error('El apellido no puede exceder 200 caracteres');

            return await this.crud.insertOne(this.table, empleadoData);
        } catch (error) {
            throw new Error(`Error al crear empleado: ${error.message}`);
        }
    }

    /**
     * Obtener todos los empleados
     * @returns {Promise} Lista de empleados
     */
    async obtenerTodosEmpleados() {
        try {
            return await this.crud.getAll(this.table);
        } catch (error) {
            throw new Error(`Error al obtener empleados: ${error.message}`);
        }
    }

    /**
     * Obtener empleado por ID
     * @param {number} idEmpleado - ID del empleado
     * @returns {Promise} Empleado específico
     */
    async obtenerEmpleadoPorId(idEmpleado) {
        try {
            return await this.crud.getByCondition(this.table, `id_documento_empleado = ${idEmpleado}`);
        } catch (error) {
            throw new Error(`Error al obtener empleado por ID: ${error.message}`);
        }
    }

    /**
     * Buscar empleados por nombre o apellido (búsqueda parcial)
     * @param {string} texto - Texto a buscar
     * @returns {Promise} Empleados que coinciden
     */
    async buscarEmpleadosPorNombreApellido(texto) {
        try {
            return await this.crud.getByCondition(
                this.table,
                `empl_nombre LIKE '%${texto}%' OR empl_apellido LIKE '%${texto}%'`
            );
        } catch (error) {
            throw new Error(`Error al buscar empleados: ${error.message}`);
        }
    }

    /**
     * Actualizar empleado
     * @param {Object} datosActualizados - Datos a actualizar
     * @param {number} idEmpleado - ID del empleado a actualizar
     * @returns {Promise} Resultado de la actualización
     */
    async actualizarEmpleado(datosActualizados, idEmpleado) {
        try {
            if (datosActualizados.empl_nombre && datosActualizados.empl_nombre.length > 200)
                throw new Error('El nombre no puede exceder 200 caracteres');
            if (datosActualizados.empl_apellido && datosActualizados.empl_apellido.length > 200)
                throw new Error('El apellido no puede exceder 200 caracteres');

            const condition = `id_documento_empleado = ${idEmpleado}`;
            return await this.crud.updateOne(this.table, datosActualizados, condition);
        } catch (error) {
            throw new Error(`Error al actualizar empleado: ${error.message}`);
        }
    }

    /**
     * Eliminar empleado
     * @param {number} idEmpleado - ID del empleado a eliminar
     * @returns {Promise} Resultado de la eliminación
     */
    async eliminarEmpleado(idEmpleado) {
        try {
            const condition = `id_documento_empleado = ${idEmpleado}`;
            return await this.crud.deleteOne(this.table, condition);
        } catch (error) {
            throw new Error(`Error al eliminar empleado: ${error.message}`);
        }
    }

    /**
     * Obtener empleados por rol
     * @param {number} idRol - ID del rol
     * @returns {Promise} Empleados con el rol especificado
     */
    async obtenerEmpleadosPorRol(idRol) {
        try {
            return await this.crud.getByCondition(this.table, `empl_rol = ${idRol}`);
        } catch (error) {
            throw new Error(`Error al obtener empleados por rol: ${error.message}`);
        }
    }

    /**
     * Obtener empleado por correo
     * @param {string} correo - Correo del empleado
     * @returns {Promise} Empleado específico
     */
    async obtenerEmpleadoPorCorreo(correo) {
        try {
            return await this.crud.getByCondition(this.table, `empl_correo = '${correo}'`);
        } catch (error) {
            throw new Error(`Error al obtener empleado por correo: ${error.message}`);
        }
    }
}

export default t_empleados;