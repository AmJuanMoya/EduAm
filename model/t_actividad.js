// model/t_actividad.js
import Database from "./database/conectionDB.js"
import Crud from "./database/crudsql.js"
import t_informe_calificaciones from "./t_informe_calificaciones.js"

class t_actividad {
    constructor(){
        this.table = 't_actividad';
        this.crud = new Crud();
    }

    /**
     * 
     * @param {Object} actividadData - Datos de la actividad
     * @param {string} actividadData.act_estado - Estado inicial de la actividad
     * @param {Date}   [actividadData.act_fecha_asignacion] - Fecha de asignación (opcional)
     * @param {Date}   [actividadData.act_fecha_entrega] - Fecha de entrega (opcional)
     * @param {string} actividadData.act_nombre - Nombre de la actividad
     * @param {string} [actividadData.act_descripcion] - Descripción (opcional)
     * @param {number} [actividadData.act_id_recurso] - ID del recurso asociado (opcional)
     * @param {string} actividadData.act_categoria - Categoría de la actividad
     * @param {string} [actividadData.url_actividad] - URL de la actividad (opcional)
     * @param {number} actividadData.id_rel_empleado_asignatura_curso - Relación docente-asignatura-curso
     * 
     * @returns {Promise<{ok: boolean, id_actividad: number}>} Confirmación e id generado
     * @throws {Error} Si faltan datos, si los ENUM no coinciden o si las fechas son inválidas
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

            // 1) Insertar actividad
            const insertRes = await this.crud.insertOne(this.table, actividadData);

            // 2) Obtener id_actividad recién creado según lo que devuelva tu CRUD
            let idActividad = insertRes?.insertId || insertRes?.id || actividadData?.id_actividad || null;
            if (!idActividad) {
                // Fallback usando tu mismo stack (this.crud.db)
                await this.crud.db.connect();
                const qLast = `
                    SELECT id_actividad
                    FROM ${this.table}
                    WHERE act_nombre = '${actividadData.act_nombre}'
                      AND id_rel_empleado_asignatura_curso = ${actividadData.id_rel_empleado_asignatura_curso}
                    ORDER BY id_actividad DESC
                    LIMIT 1
                `;
                await this.crud.db.consultar(qLast);
                await this.crud.db.cerrar();
                const row = (this.crud.db.getData() || [])[0];
                if (!row?.id_actividad) {
                    throw new Error('No se pudo obtener el ID de la actividad recién creada');
                }
                idActividad = row.id_actividad;
            }

            // 3) Generar informes por estudiante del curso (sin duplicar)
            const informes = new t_informe_calificaciones();
            await informes.crearInformesParaActividad(
                idActividad,
                actividadData.id_rel_empleado_asignatura_curso
            );

            // 4) Responder
            return { ok: true, id_actividad: idActividad };
        } catch (error) {
            try { await this.crud.db.cerrar(); } catch (_) {}
            throw new Error(`Error al crear actividad: ${error.message}`);
        }
    }

    /**
     * Obtener todas las actividades
     * @returns {Promise<Array>} Lista de actividades
     * @throws {Error} Si falla la consulta
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
     * @returns {Promise<Array>} Fila(s) de la actividad solicitada
     * @throws {Error} Si falla la consulta
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
     * @param {string} estado - 'Asignada' | 'Entregada' | 'Calificada' | 'Fuera de Tiempo'
     * @returns {Promise<Array>} Actividades con ese estado
     * @throws {Error} Si el estado no es válido o falla la consulta
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
     * @param {string} categoria - 'Taller' | 'Tarea' | 'Evaluacion' | 'Actividad en Grupo'
     * @returns {Promise<Array>} Actividades de esa categoría
     * @throws {Error} Si la categoría no es válida o falla la consulta
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
     * @param {number} idEmpleado - Documento del docente (t_empleados.id_documento_empleado)
     * @returns {Promise<Array>} Actividades asignadas por ese docente
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
     * @param {number} idAsignatura - t_asignatura.id_asignatura
     * @returns {Promise<Array>} Actividades de esa asignatura
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
     * @param {number} idCurso - t_curso.id_curso
     * @returns {Promise<Array>} Actividades del curso
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
     * Buscar actividades por nombre (LIKE)
     * @param {string} nombre - Búsqueda parcial en act_nombre
     * @returns {Promise<Array>} Actividades que coincidan
     */
    async buscarActividadesPorNombre(nombre) {
        try {
            return await this.crud.getByCondition(this.table, `act_nombre LIKE '%${nombre}%'`);
        } catch (error) {
            throw new Error(`Error al buscar actividades por nombre: ${error.message}`);
        }
    }

    /**
     * Obtener actividades por rango de fechas (act_fecha_asignacion)
     * @param {Date} fechaInicio - Fecha de inicio (incluida)
     * @param {Date} fechaFin - Fecha fin (incluida)
     * @returns {Promise<Array>} Actividades en el rango
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
     * Obtener actividades vencidas (act_fecha_entrega < ahora) con estado 'Asignada' o 'Entregada'
     * @returns {Promise<Array>} Actividades vencidas
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
     * Obtener actividades pendientes (estado 'Asignada')
     * @returns {Promise<Array>} Actividades asignadas sin entregar
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
     * Valida ENUMs, longitud y coherencia de fechas si se actualizan.
     * @param {Object} datosActualizados - Campos a actualizar
     * @param {number} idActividad - ID de la actividad
     * @returns {Promise<any>} Resultado de updateOne de tu CRUD
     */
    async actualizarActividad(datosActualizados, idActividad) {
        try {
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

            if (datosActualizados.act_nombre && datosActualizados.act_nombre.length > 200) {
                throw new Error('El nombre de la actividad no puede exceder 200 caracteres');
            }

            if (datosActualizados.act_fecha_asignacion && datosActualizados.act_fecha_entrega) {
                const fa = new Date(datosActualizados.act_fecha_asignacion);
                const fe = new Date(datosActualizados.act_fecha_entrega);
                if (fe <= fa) {
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
     * Cambiar estado de una actividad
     * Si pasa a 'Entregada', se marca act_fecha_entrega = NOW() en el servidor.
     * @param {number} idActividad - ID de la actividad
     * @param {string} nuevoEstado - Nuevo estado (ENUM)
     * @returns {Promise<any>} Resultado de updateOne
     */
    async cambiarEstadoActividad(idActividad, nuevoEstado) {
        try {
            const estadosValidos = ['Asignada', 'Entregada', 'Calificada', 'Fuera de Tiempo'];
            if (!estadosValidos.includes(nuevoEstado)) {
                throw new Error(`Estado inválido. Valores permitidos: ${estadosValidos.join(', ')}`);
            }

            const datosActualizados = { act_estado: nuevoEstado };
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
     * @returns {Promise<any>} Resultado de deleteOne
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
     * Obtener actividades con información asociada (docente, asignatura, curso, recurso)
     * @returns {Promise<Array>} Filas enriquecidas
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
     * @returns {Promise<Array<{act_estado: string, cantidad: number}>>}
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
     * @returns {Promise<Array<{act_categoria: string, cantidad: number}>>}
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
     * Obtener actividades de un docente con info asociada (asignatura, curso, grado, recurso)
     * @param {number} idEmpleado - Documento del docente
     * @returns {Promise<Array>} Filas enriquecidas
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
     * Obtener actividades más recientes (con nombre de docente y asignatura)
     * @param {number} [limite=10] - Número de filas
     * @returns {Promise<Array>} Filas recientes
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
