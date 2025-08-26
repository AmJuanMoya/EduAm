import Database from "./database/conectionDB.js"
import Crud from "./database/crudsql.js"

class t_rol {
    constructor(){
        this.table = 't_rol';
        this.crud = new Crud();
    }

    /**
     * Crear un nuevo rol
     * @param {Object} rolData - Datos del rol
     * @param {number} rolData.id_rol - ID del rol
     * @param {string} rolData.rol_descripcion - Descripción del rol
     * @returns {Promise} Resultado de la inserción
     */
    async crearRol(rolData) {
        try {
            // Validar datos requeridos
            if (!rolData.id_rol) {
                throw new Error('El campo id_rol es requerido');
            }
            if (!rolData.rol_descripcion) {
                throw new Error('El campo rol_descripcion es requerido');
            }

            // Validar que la descripción no esté vacía
            if (rolData.rol_descripcion.trim().length === 0) {
                throw new Error('La descripción del rol no puede estar vacía');
            }

            // Validar longitud de la descripción
            if (rolData.rol_descripcion.length > 200) {
                throw new Error('La descripción del rol no puede exceder 200 caracteres');
            }

            return await this.crud.insertOne(this.table, rolData);
        } catch (error) {
            throw new Error(`Error al crear rol: ${error.message}`);
        }
    }

    /**
     * Obtener todos los roles
     * @returns {Promise} Lista de todos los roles
     */
    async obtenerTodosRoles() {
        try {
            return await this.crud.getAll(this.table);
        } catch (error) {
            throw new Error(`Error al obtener roles: ${error.message}`);
        }
    }

    /**
     * Obtener rol por ID
     * @param {number} idRol - ID del rol
     * @returns {Promise} Rol específico
     */
    async obtenerRolPorId(idRol) {
        try {
            return await this.crud.getByCondition(this.table, `id_rol = ${idRol}`);
        } catch (error) {
            throw new Error(`Error al obtener rol por ID: ${error.message}`);
        }
    }

    /**
     * Obtener rol por descripción
     * @param {string} descripcion - Descripción del rol
     * @returns {Promise} Rol con la descripción especificada
     */
    async obtenerRolPorDescripcion(descripcion) {
        try {
            return await this.crud.getByCondition(this.table, `rol_descripcion = '${descripcion}'`);
        } catch (error) {
            throw new Error(`Error al obtener rol por descripción: ${error.message}`);
        }
    }

    /**
     * Buscar roles por descripción (búsqueda parcial)
     * @param {string} descripcion - Descripción parcial del rol
     * @returns {Promise} Roles que coinciden con la descripción
     */
    async buscarRolesPorDescripcion(descripcion) {
        try {
            return await this.crud.getByCondition(this.table, `rol_descripcion LIKE '%${descripcion}%'`);
        } catch (error) {
            throw new Error(`Error al buscar roles por descripción: ${error.message}`);
        }
    }

    /**
     * Actualizar rol
     * @param {Object} datosActualizados - Datos a actualizar
     * @param {number} idRol - ID del rol a actualizar
     * @returns {Promise} Resultado de la actualización
     */
    async actualizarRol(datosActualizados, idRol) {
        try {
            // Validar que la descripción no esté vacía si se está actualizando
            if (datosActualizados.rol_descripcion) {
                if (datosActualizados.rol_descripcion.trim().length === 0) {
                    throw new Error('La descripción del rol no puede estar vacía');
                }
                if (datosActualizados.rol_descripcion.length > 200) {
                    throw new Error('La descripción del rol no puede exceder 200 caracteres');
                }
            }

            const condition = `id_rol = ${idRol}`;
            return await this.crud.updateOne(this.table, datosActualizados, condition);
        } catch (error) {
            throw new Error(`Error al actualizar rol: ${error.message}`);
        }
    }

    /**
     * Eliminar rol
     * @param {number} idRol - ID del rol a eliminar
     * @returns {Promise} Resultado de la eliminación
     */
    async eliminarRol(idRol) {
        try {
            // Verificar si el rol está siendo usado en otras tablas antes de eliminar
            const rolEnUso = await this.verificarRolEnUso(idRol);
            if (rolEnUso) {
                throw new Error('No se puede eliminar el rol porque está siendo utilizado en otras tablas');
            }

            const condition = `id_rol = ${idRol}`;
            return await this.crud.deleteOne(this.table, condition);
        } catch (error) {
            throw new Error(`Error al eliminar rol: ${error.message}`);
        }
    }

    /**
     * Verificar si un rol está siendo usado en otras tablas
     * @param {number} idRol - ID del rol a verificar
     * @returns {Promise<boolean>} True si el rol está en uso
     */
    async verificarRolEnUso(idRol) {
        try {
            await this.crud.db.connect();
            
            // Verificar en t_estudiantes
            let query = `SELECT COUNT(*) as count FROM t_estudiantes WHERE estu_rol = ${idRol}`;
            await this.crud.db.consultar(query);
            let result = this.crud.db.getData();
            if (result[0] && result[0].count > 0) {
                await this.crud.db.cerrar();
                return true;
            }

            // Verificar en t_empleados
            query = `SELECT COUNT(*) as count FROM t_empleados WHERE empl_rol = ${idRol}`;
            await this.crud.db.consultar(query);
            result = this.crud.db.getData();
            if (result[0] && result[0].count > 0) {
                await this.crud.db.cerrar();
                return true;
            }

            // Verificar en t_acudientes
            query = `SELECT COUNT(*) as count FROM t_acudientes WHERE acud_rol = ${idRol}`;
            await this.crud.db.consultar(query);
            result = this.crud.db.getData();
            if (result[0] && result[0].count > 0) {
                await this.crud.db.cerrar();
                return true;
            }

            await this.crud.db.cerrar();
            return false;
        } catch (error) {
            await this.crud.db.cerrar();
            throw new Error(`Error al verificar rol en uso: ${error.message}`);
        }
    }

    /**
     * Obtener roles con conteo de usuarios
     * @returns {Promise} Roles con cantidad de usuarios por cada uno
     */
    async obtenerRolesConConteoUsuarios() {
        try {
            await this.crud.db.connect();
            const query = `
                SELECT r.id_rol, r.rol_descripcion,
                       COALESCE(COUNT(DISTINCT e.id_docuestudiante), 0) as estudiantes,
                       COALESCE(COUNT(DISTINCT emp.id_documento_empleado), 0) as empleados,
                       COALESCE(COUNT(DISTINCT a.id_documento_acudiente), 0) as acudientes,
                       (COALESCE(COUNT(DISTINCT e.id_docuestudiante), 0) + 
                        COALESCE(COUNT(DISTINCT emp.id_documento_empleado), 0) + 
                        COALESCE(COUNT(DISTINCT a.id_documento_acudiente), 0)) as total_usuarios
                FROM ${this.table} r
                LEFT JOIN t_estudiantes e ON r.id_rol = e.estu_rol
                LEFT JOIN t_empleados emp ON r.id_rol = emp.empl_rol
                LEFT JOIN t_acudientes a ON r.id_rol = a.acud_rol
                GROUP BY r.id_rol, r.rol_descripcion
                ORDER BY r.id_rol
            `;
            await this.crud.db.consultar(query);
            await this.crud.db.cerrar();
            return this.crud.db.getData();
        } catch (error) {
            await this.crud.db.cerrar();
            throw new Error(`Error al obtener roles con conteo de usuarios: ${error.message}`);
        }
    }

    /**
     * Obtener usuarios por rol
     * @param {number} idRol - ID del rol
     * @returns {Promise} Usuarios que tienen el rol especificado
     */
    async obtenerUsuariosPorRol(idRol) {
        try {
            await this.crud.db.connect();
            const query = `
                SELECT 'Estudiante' as tipo_usuario, 
                       e.id_docuestudiante as id, 
                       CONCAT(e.estu_nombre, ' ', e.estu_apellido) as nombre_completo,
                       e.est_correo as correo
                FROM t_estudiantes e
                WHERE e.estu_rol = ${idRol}
                
                UNION ALL
                
                SELECT 'Empleado' as tipo_usuario, 
                       emp.id_documento_empleado as id, 
                       CONCAT(emp.empl_nombre, ' ', emp.empl_apellido) as nombre_completo,
                       emp.empl_correo as correo
                FROM t_empleados emp
                WHERE emp.empl_rol = ${idRol}
                
                UNION ALL
                
                SELECT 'Acudiente' as tipo_usuario, 
                       a.id_documento_acudiente as id, 
                       CONCAT(a.acud_nombres, ' ', a.acud_apellidos) as nombre_completo,
                       a.acud_correo as correo
                FROM t_acudientes a
                WHERE a.acud_rol = ${idRol}
                
                ORDER BY tipo_usuario, nombre_completo
            `;
            await this.crud.db.consultar(query);
            await this.crud.db.cerrar();
            return this.crud.db.getData();
        } catch (error) {
            await this.crud.db.cerrar();
            throw new Error(`Error al obtener usuarios por rol: ${error.message}`);
        }
    }

    /**
     * Obtener roles ordenados por cantidad de usuarios
     * @returns {Promise} Roles ordenados por cantidad de usuarios (descendente)
     */
    async obtenerRolesOrdenadosPorUso() {
        try {
            await this.crud.db.connect();
            const query = `
                SELECT r.id_rol, r.rol_descripcion,
                       (COALESCE(COUNT(DISTINCT e.id_docuestudiante), 0) + 
                        COALESCE(COUNT(DISTINCT emp.id_documento_empleado), 0) + 
                        COALESCE(COUNT(DISTINCT a.id_documento_acudiente), 0)) as total_usuarios
                FROM ${this.table} r
                LEFT JOIN t_estudiantes e ON r.id_rol = e.estu_rol
                LEFT JOIN t_empleados emp ON r.id_rol = emp.empl_rol
                LEFT JOIN t_acudientes a ON r.id_rol = a.acud_rol
                GROUP BY r.id_rol, r.rol_descripcion
                ORDER BY total_usuarios DESC, r.rol_descripcion
            `;
            await this.crud.db.consultar(query);
            await this.crud.db.cerrar();
            return this.crud.db.getData();
        } catch (error) {
            await this.crud.db.cerrar();
            throw new Error(`Error al obtener roles ordenados por uso: ${error.message}`);
        }
    }

    /**
     * Obtener roles no utilizados
     * @returns {Promise} Roles que no tienen usuarios asignados
     */
    async obtenerRolesNoUtilizados() {
        try {
            await this.crud.db.connect();
            const query = `
                SELECT r.id_rol, r.rol_descripcion
                FROM ${this.table} r
                LEFT JOIN t_estudiantes e ON r.id_rol = e.estu_rol
                LEFT JOIN t_empleados emp ON r.id_rol = emp.empl_rol
                LEFT JOIN t_acudientes a ON r.id_rol = a.acud_rol
                WHERE e.id_docuestudiante IS NULL 
                  AND emp.id_documento_empleado IS NULL 
                  AND a.id_documento_acudiente IS NULL
                ORDER BY r.id_rol
            `;
            await this.crud.db.consultar(query);
            await this.crud.db.cerrar();
            return this.crud.db.getData();
        } catch (error) {
            await this.crud.db.cerrar();
            throw new Error(`Error al obtener roles no utilizados: ${error.message}`);
        }
    }

    /**
     * Crear roles por defecto del sistema
     * @returns {Promise} Resultado de la creación de roles por defecto
     */
    async crearRolesPorDefecto() {
        try {
            const rolesPorDefecto = [
                { id_rol: 1, rol_descripcion: 'Administrador' },
                { id_rol: 2, rol_descripcion: 'Docente' },
                { id_rol: 3, rol_descripcion: 'Estudiante' },
                { id_rol: 4, rol_descripcion: 'Acudiente' },
                { id_rol: 5, rol_descripcion: 'Coordinador' }
            ];

            const resultados = [];
            for (const rol of rolesPorDefecto) {
                try {
                    const resultado = await this.crearRol(rol);
                    resultados.push({ rol: rol.rol_descripcion, estado: 'Creado', resultado });
                } catch (error) {
                    resultados.push({ rol: rol.rol_descripcion, estado: 'Error', error: error.message });
                }
            }

            return resultados;
        } catch (error) {
            throw new Error(`Error al crear roles por defecto: ${error.message}`);
        }
    }
}

export default t_rol;
