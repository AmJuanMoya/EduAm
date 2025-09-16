import Database from "./database/conectionDB.js";
import Crud from "./database/crudsql.js";

class t_acudientes {
    constructor() {
        this.table = 't_acudientes';
        this.crud = new Crud();
    }

    /**
     * Crear un nuevo acudiente
     * @param {Object} acudienteData - Datos del acudiente
     * @param {number} acudienteData.id_documento_acudiente - ID del documento del acudiente
     * @param {string} acudienteData.acud_nombres - Nombres del acudiente
     * @param {string} acudienteData.acud_apellidos - Apellidos del acudiente
     * @param {string} acudienteData.acud_parentesco - Parentesco con el estudiante
     * @param {number} acudienteData.acud_telefono - Teléfono del acudiente
     * @param {string} acudienteData.acud_correo - Correo del acudiente
     * @param {string} acudienteData.acud_direccion - Dirección del acudiente
     * @param {string} acudienteData.acud_tipo_documento - Tipo de documento
     * @param {number} acudienteData.acud1_documento - Documento del segundo acudiente
     * @param {string} acudienteData.acud1_nombres - Nombres del segundo acudiente
     * @param {string} acudienteData.acud1_apellidos - Apellidos del segundo acudiente
     * @param {number} acudienteData.acud_rol - ID del rol del acudiente
     * @returns {Promise} Resultado de la inserción
     */
    async crearAcudiente(acudienteData) {
        try {
            // Validar datos requeridos
            if (!acudienteData.id_documento_acudiente) {
                throw new Error('El campo id_documento_acudiente es requerido');
            }

            // Validar que los nombres no estén vacíos si se proporcionan
            if (acudienteData.acud_nombres && acudienteData.acud_nombres.trim().length === 0) {
                throw new Error('Los nombres del acudiente no pueden estar vacíos');
            }

            if (acudienteData.acud_apellidos && acudienteData.acud_apellidos.trim().length === 0) {
                throw new Error('Los apellidos del acudiente no pueden estar vacíos');
            }

            // Validar longitud de campos de texto
            if (acudienteData.acud_nombres && acudienteData.acud_nombres.length > 200) {
                throw new Error('Los nombres del acudiente no pueden exceder 200 caracteres');
            }

            if (acudienteData.acud_apellidos && acudienteData.acud_apellidos.length > 200) {
                throw new Error('Los apellidos del acudiente no pueden exceder 200 caracteres');
            }

            if (acudienteData.acud_direccion && acudienteData.acud_direccion.length > 255) {
                throw new Error('La dirección del acudiente no puede exceder 255 caracteres');
            }

            if (acudienteData.acud_correo && acudienteData.acud_correo.length > 255) {
                throw new Error('El correo del acudiente no puede exceder 255 caracteres');
            }

            // Validar formato de correo si se proporciona
            if (acudienteData.acud_correo && !this.validarEmail(acudienteData.acud_correo)) {
                throw new Error('El formato del correo electrónico no es válido');
            }

            // Validar valores de ENUM
            if (acudienteData.acud_parentesco && !['Padre', 'Madre', 'Abuelo', 'Otro'].includes(acudienteData.acud_parentesco)) {
                throw new Error('El parentesco debe ser: Padre, Madre, Abuelo u Otro');
            }

            if (acudienteData.acud_tipo_documento && !['CC', 'TI', 'CE'].includes(acudienteData.acud_tipo_documento)) {
                throw new Error('El tipo de documento debe ser: CC, TI o CE');
            }

            return await this.crud.insertOne(this.table, acudienteData);
        } catch (error) {
            throw new Error(`Error al crear acudiente: ${error.message}`);
        }
    }

    /**
     * Obtener todos los acudientes
     * @returns {Promise} Lista de todos los acudientes
     */
    async obtenerTodosAcudientes() {
        try {
            return await this.crud.getAll(this.table);
        } catch (error) {
            throw new Error(`Error al obtener acudientes: ${error.message}`);
        }
    }

    /**
     * Obtener acudiente por ID de documento
     * @param {number} idDocumento - ID del documento del acudiente
     * @returns {Promise} Acudiente específico
     */
    async obtenerAcudientePorId(idDocumento) {
        try {
            return await this.crud.getByCondition(this.table, `id_documento_acudiente = ${idDocumento}`);
        } catch (error) {
            throw new Error(`Error al obtener acudiente por ID: ${error.message}`);
        }
    }

    /**
     * Obtener acudientes por parentesco
     * @param {string} parentesco - Parentesco con el estudiante
     * @returns {Promise} Acudientes con el parentesco especificado
     */
    async obtenerAcudientesPorParentesco(parentesco) {
        try {
            return await this.crud.getByCondition(this.table, `acud_parentesco = '${parentesco}'`);
        } catch (error) {
            throw new Error(`Error al obtener acudientes por parentesco: ${error.message}`);
        }
    }

    /**
     * Obtener acudientes por tipo de documento
     * @param {string} tipoDocumento - Tipo de documento
     * @returns {Promise} Acudientes con el tipo de documento especificado
     */
    async obtenerAcudientesPorTipoDocumento(tipoDocumento) {
        try {
            return await this.crud.getByCondition(this.table, `acud_tipo_documento = '${tipoDocumento}'`);
        } catch (error) {
            throw new Error(`Error al obtener acudientes por tipo de documento: ${error.message}`);
        }
    }

    /**
     * Buscar acudientes por nombre (búsqueda parcial)
     * @param {string} nombre - Nombre o apellido del acudiente
     * @returns {Promise} Acudientes que coinciden con el nombre
     */
    async buscarAcudientesPorNombre(nombre) {
        try {
            return await this.crud.getByCondition(this.table, `acud_nombres LIKE '%${nombre}%' OR acud_apellidos LIKE '%${nombre}%'`);
        } catch (error) {
            throw new Error(`Error al buscar acudientes por nombre: ${error.message}`);
        }
    }

    /**
     * Obtener acudientes por correo
     * @param {string} correo - Correo del acudiente
     * @returns {Promise} Acudiente con el correo especificado
     */
    async obtenerAcudientePorCorreo(correo) {
        try {
            return await this.crud.getByCondition(this.table, `acud_correo = '${correo}'`);
        } catch (error) {
            throw new Error(`Error al obtener acudiente por correo: ${error.message}`);
        }
    }

    /**
     * Obtener acudientes por teléfono
     * @param {number} telefono - Teléfono del acudiente
     * @returns {Promise} Acudiente con el teléfono especificado
     */
    async obtenerAcudientePorTelefono(telefono) {
        try {
            return await this.crud.getByCondition(this.table, `acud_telefono = ${telefono}`);
        } catch (error) {
            throw new Error(`Error al obtener acudiente por teléfono: ${error.message}`);
        }
    }

    /**
     * Actualizar acudiente
     * @param {Object} datosActualizados - Datos a actualizar
     * @param {number} idDocumento - ID del documento del acudiente a actualizar
     * @returns {Promise} Resultado de la actualización
     */
    async actualizarAcudiente(datosActualizados, idDocumento) {
        try {
            // Validar longitud de campos de texto si se están actualizando
            if (datosActualizados.acud_nombres) {
                if (datosActualizados.acud_nombres.trim().length === 0) {
                    throw new Error('Los nombres del acudiente no pueden estar vacíos');
                }
                if (datosActualizados.acud_nombres.length > 200) {
                    throw new Error('Los nombres del acudiente no pueden exceder 200 caracteres');
                }
            }

            if (datosActualizados.acud_apellidos) {
                if (datosActualizados.acud_apellidos.trim().length === 0) {
                    throw new Error('Los apellidos del acudiente no pueden estar vacíos');
                }
                if (datosActualizados.acud_apellidos.length > 200) {
                    throw new Error('Los apellidos del acudiente no pueden exceder 200 caracteres');
                }
            }

            if (datosActualizados.acud_direccion && datosActualizados.acud_direccion.length > 255) {
                throw new Error('La dirección del acudiente no puede exceder 255 caracteres');
            }

            if (datosActualizados.acud_correo) {
                if (datosActualizados.acud_correo.length > 255) {
                    throw new Error('El correo del acudiente no puede exceder 255 caracteres');
                }
                if (!this.validarEmail(datosActualizados.acud_correo)) {
                    throw new Error('El formato del correo electrónico no es válido');
                }
            }

            // Validar valores de ENUM si se están actualizando
            if (datosActualizados.acud_parentesco && !['Padre', 'Madre', 'Abuelo', 'Otro'].includes(datosActualizados.acud_parentesco)) {
                throw new Error('El parentesco debe ser: Padre, Madre, Abuelo u Otro');
            }

            if (datosActualizados.acud_tipo_documento && !['CC', 'TI', 'CE'].includes(datosActualizados.acud_tipo_documento)) {
                throw new Error('El tipo de documento debe ser: CC, TI o CE');
            }

            const condition = `id_documento_acudiente = ${idDocumento}`;
            return await this.crud.updateOne(this.table, datosActualizados, condition);
        } catch (error) {
            throw new Error(`Error al actualizar acudiente: ${error.message}`);
        }
    }

    /**
     * Eliminar acudiente
     * @param {number} idDocumento - ID del documento del acudiente a eliminar
     * @returns {Promise} Resultado de la eliminación
     */
    async eliminarAcudiente(idDocumento) {
        try {
            // Verificar si el acudiente está siendo usado en otras tablas antes de eliminar
            const acudienteEnUso = await this.verificarAcudienteEnUso(idDocumento);
            if (acudienteEnUso) {
                throw new Error('No se puede eliminar el acudiente porque está siendo utilizado en otras tablas');
            }

            const condition = `id_documento_acudiente = ${idDocumento}`;
            return await this.crud.deleteOne(this.table, condition);
        } catch (error) {
            throw new Error(`Error al eliminar acudiente: ${error.message}`);
        }
    }

    /**
     * Verificar si un acudiente está siendo usado en otras tablas
     * @param {number} idDocumento - ID del documento del acudiente a verificar
     * @returns {Promise<boolean>} True si el acudiente está en uso
     */
    async verificarAcudienteEnUso(idDocumento) {
        try {
            await this.crud.db.connect();
            
            // Verificar en t_estudiantes
            let query = `SELECT COUNT(*) as count FROM t_estudiantes WHERE estu_acudiente = ${idDocumento}`;
            await this.crud.db.consultar(query);
            let result = this.crud.db.getData();
            if (result[0] && result[0].count > 0) {
                await this.crud.db.cerrar();
                return true;
            }

            await this.crud.db.cerrar();
            return false;
        } catch (error) {
            await this.crud.db.cerrar();
            throw new Error(`Error al verificar acudiente en uso: ${error.message}`);
        }
    }

    /**
     * Obtener acudientes con información de estudiantes asociados
     * @returns {Promise} Acudientes con información de sus estudiantes
     */
    async obtenerAcudientesConEstudiantes() {
        try {
            await this.crud.db.connect();
            const query = `
                SELECT a.*, 
                       COUNT(e.id_docuestudiante) as cantidad_estudiantes,
                       GROUP_CONCAT(CONCAT(e.estu_nombre, ' ', e.estu_apellido) SEPARATOR ', ') as nombres_estudiantes
                FROM ${this.table} a
                LEFT JOIN t_estudiantes e ON a.id_documento_acudiente = e.estu_acudiente
                GROUP BY a.id_documento_acudiente
                ORDER BY a.acud_apellidos, a.acud_nombres
            `;
            await this.crud.db.consultar(query);
            await this.crud.db.cerrar();
            return this.crud.db.getData();
        } catch (error) {
            await this.crud.db.cerrar();
            throw new Error(`Error al obtener acudientes con estudiantes: ${error.message}`);
        }
    }

    /**
     * Obtener acudientes por rol
     * @param {number} idRol - ID del rol
     * @returns {Promise} Acudientes que tienen el rol especificado
     */
    async obtenerAcudientesPorRol(idRol) {
        try {
            return await this.crud.getByCondition(this.table, `acud_rol = ${idRol}`);
        } catch (error) {
            throw new Error(`Error al obtener acudientes por rol: ${error.message}`);
        }
    }

    /**
     * Obtener estadísticas de acudientes por parentesco
     * @returns {Promise} Estadísticas de acudientes agrupados por parentesco
     */
    async obtenerEstadisticasPorParentesco() {
        try {
            await this.crud.db.connect();
            const query = `
                SELECT acud_parentesco, 
                       COUNT(*) as cantidad,
                       ROUND((COUNT(*) * 100.0 / (SELECT COUNT(*) FROM ${this.table})), 2) as porcentaje
                FROM ${this.table}
                WHERE acud_parentesco IS NOT NULL
                GROUP BY acud_parentesco
                ORDER BY cantidad DESC
            `;
            await this.crud.db.consultar(query);
            await this.crud.db.cerrar();
            return this.crud.db.getData();
        } catch (error) {
            await this.crud.db.cerrar();
            throw new Error(`Error al obtener estadísticas por parentesco: ${error.message}`);
        }
    }

    /**
     * Obtener acudientes sin estudiantes asociados
     * @returns {Promise} Acudientes que no tienen estudiantes asociados
     */
    async obtenerAcudientesSinEstudiantes() {
        try {
            await this.crud.db.connect();
            const query = `
                SELECT a.*
                FROM ${this.table} a
                LEFT JOIN t_estudiantes e ON a.id_documento_acudiente = e.estu_acudiente
                WHERE e.id_docuestudiante IS NULL
                ORDER BY a.acud_apellidos, a.acud_nombres
            `;
            await this.crud.db.consultar(query);
            await this.crud.db.cerrar();
            return this.crud.db.getData();
        } catch (error) {
            await this.crud.db.cerrar();
            throw new Error(`Error al obtener acudientes sin estudiantes: ${error.message}`);
        }
    }

    /**
     * Validar formato de email
     * @param {string} email - Email a validar
     * @returns {boolean} True si el email es válido
     */
    validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    /**
     * Obtener acudientes con información completa (incluyendo rol)
     * @returns {Promise} Acudientes con información de rol
     */
    async obtenerAcudientesConRol() {
        try {
            await this.crud.db.connect();
            const query = `
                SELECT a.*, r.rol_descripcion
                FROM ${this.table} a
                LEFT JOIN t_rol r ON a.acud_rol = r.id_rol
                ORDER BY a.acud_apellidos, a.acud_nombres
            `;
            await this.crud.db.consultar(query);
            await this.crud.db.cerrar();
            return this.crud.db.getData();
        } catch (error) {
            await this.crud.db.cerrar();
            throw new Error(`Error al obtener acudientes con rol: ${error.message}`);
        }
    }
}

export default t_acudientes;
