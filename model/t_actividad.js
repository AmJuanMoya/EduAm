import Database from "./database/conectionDB.js"
import Crud from "./database/crudsql.js"

class t_actividad {
    constructor(){
        this.table = 't_actividad';
        this.crud = new Crud();
    }

    /**
     * Crear una nueva actividad
     * @param {Object} actividadData - Datos de la actividad
     * @param {string} actividadData.act_estado - Estado de la actividad
     * @param {Date} actividadData.act_fecha_asignacion - Fecha de asignación
     * @param {Date} actividadData.act_fecha_entrega - Fecha de entrega
     * @param {string} actividadData.act_nombre - Nombre de la actividad
     * @param {string} actividadData.act_descripcion - Descripción de la actividad
     * @param {number} actividadData.act_id_recurso - ID del recurso asociado
     * @param {string} actividadData.act_categoria - Categoría de la actividad
     * @param {string} actividadData.url_actividad - URL de la actividad
     * @param {number} actividadData.id_rel_empleado_asignatura_curso - ID de la relación empleado-asignatura-curso
     * @returns {Promise} Resultado de la inserción
     */
    async crearActividad(actividadData) {
        try {
            // Validar datos requeridos
            const camposRequeridos = ['act_estado', 'act_nombre', 'act_categoria', 'id_rel_empleado_asignatura_curso'];
            for (const campo of camposRequeridos) {
                if (!actividadData[campo]) {
                    throw new Error(`El campo ${campo} es requerido`);
                }
            }

            // Validar valores de ENUM para estado
            const estadosValidos = ['Asignada', 'Entregada', 'Calificada', 'Fuera de Tiempo'];
            if (!estadosValidos.includes(actividadData.act_estado)) {
                throw new Error(`Estado inválido. Valores permitidos: ${estadosValidos.join(', ')}`);
            }

            // Validar valores de ENUM para categoría
            const categoriasValidas = ['Taller', 'Tarea', 'Evaluacion', 'Actividad en Grupo'];
            if (!categoriasValidas.includes(actividadData.act_categoria)) {
                throw new Error(`Categoría inválida. Valores permitidos: ${categoriasValidas.join(', ')}`);
            }

            // Validar longitud del nombre
            if (actividadData.act_nombre.length > 200) {
                throw new Error('El nombre de la actividad no puede exceder 200 caracteres');
            }

            // Validar fechas si se proporcionan
            if (actividadData.act_fecha_asignacion && actividadData.act_fecha_entrega) {
                const fechaAsignacion = new Date(actividadData.act_fecha_asignacion);
                const fechaEntrega = new Date(actividadData.act_fecha_entrega);
                
                if (fechaEntrega <= fechaAsignacion) {
                    throw new Error('La fecha de entrega debe ser posterior a la fecha de asignación');
                }
            }

            return await this.crud.insertOne(this.table, actividadData);
        } catch (error) {
            throw new Error(`Error al crear actividad: ${error.message}`);
        }
    }

    /**
     * Obtener todas las actividades
     * @returns {Promise} Lista de todas las actividades
     */
    async obtenerTodasActividades() {
        try {
            return await this.crud.getAll(this.table);
        } catch (error) {
            throw new Error(`Error al obtener actividades: ${error.message}`);
        }
    }

    /**
     * Obtener actividad por ID
     * @param {number} idActividad - ID de la actividad
     * @returns {Promise} Actividad específica
     */
    async obtenerActividadPorId(idActividad) {
        try {
            return await this.crud.getByCondition(this.table, `id_actividad = ${idActividad}`);
        } catch (error) {
            throw new Error(`Error al obtener actividad por ID: ${error.message}`);
        }
    }

    /**
     * Obtener actividades por estado
     * @param {string} estado - Estado de la actividad
     * @returns {Promise} Actividades con el estado especificado
     */
    async obtenerActividadesPorEstado(estado) {
        try {
            const estadosValidos = ['Asignada', 'Entregada', 'Calificada', 'Fuera de Tiempo'];
            if (!estadosValidos.includes(estado)) {
                throw new Error(`Estado inválido. Valores permitidos: ${estadosValidos.join(', ')}`);
            }
            return await this.crud.getByCondition(this.table, `act_estado = '${estado}'`);
        } catch (error) {
            throw new Error(`Error al obtener actividades por estado: ${error.message}`);
        }
    }

    /**
     * Obtener actividades por categoría
     * @param {string} categoria - Categoría de la actividad
     * @returns {Promise} Actividades de la categoría especificada
     */
    async obtenerActividadesPorCategoria(categoria) {
        try {
            const categoriasValidas = ['Taller', 'Tarea', 'Evaluacion', 'Actividad en Grupo'];
            if (!categoriasValidas.includes(categoria)) {
                throw new Error(`Categoría inválida. Valores permitidos: ${categoriasValidas.join(', ')}`);
            }
            return await this.crud.getByCondition(this.table, `act_categoria = '${categoria}'`);
        } catch (error) {
            throw new Error(`Error al obtener actividades por categoría: ${error.message}`);
        }
    }

    /**
     * Obtener actividades por docente
     * @param {number} idEmpleado - ID del empleado/docente
     * @returns {Promise} Actividades asignadas por el docente
     */
    async obtenerActividadesPorDocente(idEmpleado) {
        try {
            await this.crud.db.connect();
            const query = `
                SELECT a.*
                FROM ${this.table} a
                INNER JOIN t_rel_empleado_asignatura_curso rel ON a.id_rel_empleado_asignatura_curso = rel.id_rel_empleado_asignatura_curso
                WHERE rel.id_documento_empleado = ${idEmpleado}
                ORDER BY a.act_fecha_asignacion DESC
            `;
            await this.crud.db.consultar(query);
            await this.crud.db.cerrar();
            return this.crud.db.getData();
        } catch (error) {
            await this.crud.db.cerrar();
            throw new Error(`Error al obtener actividades por docente: ${error.message}`);
        }
    }

    /**
     * Obtener actividades por asignatura
     * @param {number} idAsignatura - ID de la asignatura
     * @returns {Promise} Actividades de la asignatura especificada
     */
    async obtenerActividadesPorAsignatura(idAsignatura) {
        try {
            await this.crud.db.connect();
            const query = `
                SELECT a.*
                FROM ${this.table} a
                INNER JOIN t_rel_empleado_asignatura_curso rel ON a.id_rel_empleado_asignatura_curso = rel.id_rel_empleado_asignatura_curso
                WHERE rel.id_asignatura = ${idAsignatura}
                ORDER BY a.act_fecha_asignacion DESC
            `;
            await this.crud.db.consultar(query);
            await this.crud.db.cerrar();
            return this.crud.db.getData();
        } catch (error) {
            await this.crud.db.cerrar();
            throw new Error(`Error al obtener actividades por asignatura: ${error.message}`);
        }
    }

    /**
     * Obtener actividades por curso
     * @param {number} idCurso - ID del curso
     * @returns {Promise} Actividades del curso especificado
     */
    async obtenerActividadesPorCurso(idCurso) {
        try {
            await this.crud.db.connect();
            const query = `
                SELECT a.*
                FROM ${this.table} a
                INNER JOIN t_rel_empleado_asignatura_curso rel ON a.id_rel_empleado_asignatura_curso = rel.id_rel_empleado_asignatura_curso
                WHERE rel.id_curso = ${idCurso}
                ORDER BY a.act_fecha_asignacion DESC
            `;
            await this.crud.db.consultar(query);
            await this.crud.db.cerrar();
            return this.crud.db.getData();
        } catch (error) {
            await this.crud.db.cerrar();
            throw new Error(`Error al obtener actividades por curso: ${error.message}`);
        }
    }

    /**
     * Buscar actividades por nombre
     * @param {string} nombre - Nombre parcial de la actividad
     * @returns {Promise} Actividades que coinciden con el nombre
     */
    async buscarActividadesPorNombre(nombre) {
        try {
            return await this.crud.getByCondition(this.table, `act_nombre LIKE '%${nombre}%'`);
        } catch (error) {
            throw new Error(`Error al buscar actividades por nombre: ${error.message}`);
        }
    }

    /**
     * Obtener actividades por rango de fechas
     * @param {Date} fechaInicio - Fecha de inicio
     * @param {Date} fechaFin - Fecha de fin
     * @returns {Promise} Actividades en el rango de fechas
     */
    async obtenerActividadesPorRangoFechas(fechaInicio, fechaFin) {
        try {
            const fechaInicioStr = fechaInicio.toISOString().slice(0, 19).replace('T', ' ');
            const fechaFinStr = fechaFin.toISOString().slice(0, 19).replace('T', ' ');
            
            return await this.crud.getByCondition(
                this.table, 
                `act_fecha_asignacion BETWEEN '${fechaInicioStr}' AND '${fechaFinStr}'`
            );
        } catch (error) {
            throw new Error(`Error al obtener actividades por rango de fechas: ${error.message}`);
        }
    }

    /**
     * Obtener actividades vencidas
     * @returns {Promise} Actividades con fecha de entrega vencida
     */
    async obtenerActividadesVencidas() {
        try {
            const fechaActual = new Date().toISOString().slice(0, 19).replace('T', ' ');
            return await this.crud.getByCondition(
                this.table, 
                `act_fecha_entrega < '${fechaActual}' AND act_estado IN ('Asignada', 'Entregada')`
            );
        } catch (error) {
            throw new Error(`Error al obtener actividades vencidas: ${error.message}`);
        }
    }

    /**
     * Obtener actividades pendientes de entrega
     * @returns {Promise} Actividades asignadas pero no entregadas
     */
    async obtenerActividadesPendientes() {
        try {
            return await this.crud.getByCondition(this.table, `act_estado = 'Asignada'`);
        } catch (error) {
            throw new Error(`Error al obtener actividades pendientes: ${error.message}`);
        }
    }

    /**
     * Actualizar actividad
     * @param {Object} datosActualizados - Datos a actualizar
     * @param {number} idActividad - ID de la actividad a actualizar
     * @returns {Promise} Resultado de la actualización
     */
    async actualizarActividad(datosActualizados, idActividad) {
        try {
            // Validar valores de ENUM si se están actualizando
            if (datosActualizados.act_estado) {
                const estadosValidos = ['Asignada', 'Entregada', 'Calificada', 'Fuera de Tiempo'];
                if (!estadosValidos.includes(datosActualizados.act_estado)) {
                    throw new Error(`Estado inválido. Valores permitidos: ${estadosValidos.join(', ')}`);
                }
            }

            if (datosActualizados.act_categoria) {
                const categoriasValidas = ['Taller', 'Tarea', 'Evaluacion', 'Actividad en Grupo'];
                if (!categoriasValidas.includes(datosActualizados.act_categoria)) {
                    throw new Error(`Categoría inválida. Valores permitidos: ${categoriasValidas.join(', ')}`);
                }
            }

            // Validar longitud del nombre si se está actualizando
            if (datosActualizados.act_nombre && datosActualizados.act_nombre.length > 200) {
                throw new Error('El nombre de la actividad no puede exceder 200 caracteres');
            }

            // Validar fechas si se están actualizando
            if (datosActualizados.act_fecha_asignacion && datosActualizados.act_fecha_entrega) {
                const fechaAsignacion = new Date(datosActualizados.act_fecha_asignacion);
                const fechaEntrega = new Date(datosActualizados.act_fecha_entrega);
                
                if (fechaEntrega <= fechaAsignacion) {
                    throw new Error('La fecha de entrega debe ser posterior a la fecha de asignación');
                }
            }

            const condition = `id_actividad = ${idActividad}`;
            return await this.crud.updateOne(this.table, datosActualizados, condition);
        } catch (error) {
            throw new Error(`Error al actualizar actividad: ${error.message}`);
        }
    }

    /**
     * Cambiar estado de actividad
     * @param {number} idActividad - ID de la actividad
     * @param {string} nuevoEstado - Nuevo estado de la actividad
     * @returns {Promise} Resultado de la actualización
     */
    async cambiarEstadoActividad(idActividad, nuevoEstado) {
        try {
            const estadosValidos = ['Asignada', 'Entregada', 'Calificada', 'Fuera de Tiempo'];
            if (!estadosValidos.includes(nuevoEstado)) {
                throw new Error(`Estado inválido. Valores permitidos: ${estadosValidos.join(', ')}`);
            }

            const datosActualizados = { act_estado: nuevoEstado };
            
            // Si se cambia a "Entregada", actualizar la fecha de entrega
            if (nuevoEstado === 'Entregada') {
                datosActualizados.act_fecha_entrega = new Date().toISOString().slice(0, 19).replace('T', ' ');
            }

            const condition = `id_actividad = ${idActividad}`;
            return await this.crud.updateOne(this.table, datosActualizados, condition);
        } catch (error) {
            throw new Error(`Error al cambiar estado de actividad: ${error.message}`);
        }
    }

    /**
     * Eliminar actividad
     * @param {number} idActividad - ID de la actividad a eliminar
     * @returns {Promise} Resultado de la eliminación
     */
    async eliminarActividad(idActividad) {
        try {
            const condition = `id_actividad = ${idActividad}`;
            return await this.crud.deleteOne(this.table, condition);
        } catch (error) {
            throw new Error(`Error al eliminar actividad: ${error.message}`);
        }
    }

    /**
     * Obtener actividades con información completa
     * @returns {Promise} Actividades con información de docente, asignatura y curso
     */
    async obtenerActividadesCompletas() {
        try {
            await this.crud.db.connect();
            const query = `
                SELECT a.*,
                       CONCAT(emp.empl_nombre, ' ', emp.empl_apellido) as nombre_docente,
                       asig.asig_nombre as nombre_asignatura,
                       c.curso_jornada,
                       g.grad_nombre as nombre_grado,
                       r.rec_nombre as nombre_recurso,
                       r.rec_tipo as tipo_recurso
                FROM ${this.table} a
                INNER JOIN t_rel_empleado_asignatura_curso rel ON a.id_rel_empleado_asignatura_curso = rel.id_rel_empleado_asignatura_curso
                INNER JOIN t_empleados emp ON rel.id_documento_empleado = emp.id_documento_empleado
                INNER JOIN t_asignatura asig ON rel.id_asignatura = asig.id_asignatura
                INNER JOIN t_curso c ON rel.id_curso = c.id_curso
                INNER JOIN t_grado g ON c.id_curso_grado = g.id_grado
                LEFT JOIN t_recurso r ON a.act_id_recurso = r.id_recurso
                ORDER BY a.act_fecha_asignacion DESC
            `;
            await this.crud.db.consultar(query);
            await this.crud.db.cerrar();
            return this.crud.db.getData();
        } catch (error) {
            await this.crud.db.cerrar();
            throw new Error(`Error al obtener actividades completas: ${error.message}`);
        }
    }

    /**
     * Obtener estadísticas de actividades por estado
     * @returns {Promise} Conteo de actividades por estado
     */
    async obtenerEstadisticasPorEstado() {
        try {
            await this.crud.db.connect();
            const query = `
                SELECT act_estado, COUNT(*) as cantidad
                FROM ${this.table}
                GROUP BY act_estado
                ORDER BY cantidad DESC
            `;
            await this.crud.db.consultar(query);
            await this.crud.db.cerrar();
            return this.crud.db.getData();
        } catch (error) {
            await this.crud.db.cerrar();
            throw new Error(`Error al obtener estadísticas por estado: ${error.message}`);
        }
    }

    /**
     * Obtener estadísticas de actividades por categoría
     * @returns {Promise} Conteo de actividades por categoría
     */
    async obtenerEstadisticasPorCategoria() {
        try {
            await this.crud.db.connect();
            const query = `
                SELECT act_categoria, COUNT(*) as cantidad
                FROM ${this.table}
                GROUP BY act_categoria
                ORDER BY cantidad DESC
            `;
            await this.crud.db.consultar(query);
            await this.crud.db.cerrar();
            return this.crud.db.getData();
        } catch (error) {
            await this.crud.db.cerrar();
            throw new Error(`Error al obtener estadísticas por categoría: ${error.message}`);
        }
    }

    /**
     * Obtener actividades por docente con información completa
     * @param {number} idEmpleado - ID del empleado/docente
     * @returns {Promise} Actividades del docente con información completa
     */
    async obtenerActividadesDocenteCompletas(idEmpleado) {
        try {
            await this.crud.db.connect();
            const query = `
                SELECT a.*,
                       asig.asig_nombre as nombre_asignatura,
                       c.curso_jornada,
                       g.grad_nombre as nombre_grado,
                       r.rec_nombre as nombre_recurso,
                       r.rec_tipo as tipo_recurso
                FROM ${this.table} a
                INNER JOIN t_rel_empleado_asignatura_curso rel ON a.id_rel_empleado_asignatura_curso = rel.id_rel_empleado_asignatura_curso
                INNER JOIN t_asignatura asig ON rel.id_asignatura = asig.id_asignatura
                INNER JOIN t_curso c ON rel.id_curso = c.id_curso
                INNER JOIN t_grado g ON c.id_curso_grado = g.id_grado
                LEFT JOIN t_recurso r ON a.act_id_recurso = r.id_recurso
                WHERE rel.id_documento_empleado = ${idEmpleado}
                ORDER BY a.act_fecha_asignacion DESC
            `;
            await this.crud.db.consultar(query);
            await this.crud.db.cerrar();
            return this.crud.db.getData();
        } catch (error) {
            await this.crud.db.cerrar();
            throw new Error(`Error al obtener actividades del docente: ${error.message}`);
        }
    }

    /**
     * Obtener actividades recientes
     * @param {number} limite - Número de actividades a obtener
     * @returns {Promise} Actividades más recientes
     */
    async obtenerActividadesRecientes(limite = 10) {
        try {
            await this.crud.db.connect();
            const query = `
                SELECT a.*,
                       CONCAT(emp.empl_nombre, ' ', emp.empl_apellido) as nombre_docente,
                       asig.asig_nombre as nombre_asignatura
                FROM ${this.table} a
                INNER JOIN t_rel_empleado_asignatura_curso rel ON a.id_rel_empleado_asignatura_curso = rel.id_rel_empleado_asignatura_curso
                INNER JOIN t_empleados emp ON rel.id_documento_empleado = emp.id_documento_empleado
                INNER JOIN t_asignatura asig ON rel.id_asignatura = asig.id_asignatura
                ORDER BY a.act_fecha_asignacion DESC
                LIMIT ${limite}
            `;
            await this.crud.db.consultar(query);
            await this.crud.db.cerrar();
            return this.crud.db.getData();
        } catch (error) {
            await this.crud.db.cerrar();
            throw new Error(`Error al obtener actividades recientes: ${error.message}`);
        }
    }
}

export default t_actividad;
