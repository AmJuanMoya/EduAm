
import Database from "./database/conectionDB.js"; 
import bcrypt from 'bcryptjs'; 

class t_usuario {
    constructor() {
        this.id_usuario = null; 
        this.nombres_usuario = "";
        this.apellidos_usuario = "";
        this.correo_usuario = "";
        this.contraseña_usuario = ""; 
        this.telefono_usuario = null;
        this.avatar_url_usuario = null;
        this.id_rol = null;
        this.id_estado_usuario = null;
        this.id_tipo_documento = null;
        this.numero_documento = "";

        this.db = new Database();
    }

    // Método para insertar un nuevo usuario (usa las propiedades de la instancia)
    async insert_usuario() {
        await this.db.connect(); // Conecta a la base de datos

        // Hashear la contraseña antes de insertarla
        const hashedPassword = await bcrypt.hash(this.contraseña_usuario, 10); 

        const query = `
            INSERT INTO t_usuarios (
                nombres_usuario, apellidos_usuario, correo_usuario, contraseña_usuario,
                telefono_usuario, avatar_url_usuario, id_rol, id_estado_usuario,
                id_tipo_documento, numero_documento
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            this.nombres_usuario,
            this.apellidos_usuario,
            this.correo_usuario,
            hashedPassword, // Usamos la contraseña hasheada
            this.telefono_usuario,
            this.avatar_url_usuario,
            this.id_rol,
            this.id_estado_usuario,
            this.id_tipo_documento,
            this.numero_documento
        ];

        try {
            await this.db.consultar(query, values);
            const result = this.db.getData(); // Suponiendo que getData() devuelve información sobre la inserción (ej. insertId)
            console.log('Usuario insertado con éxito en la base de datos.');
            return result; // Devuelve el resultado de la operación (ej. ID insertado)
        } catch (error) {
            console.error('Error al insertar usuario en t_usuarios:', error);
            throw error; // Propaga el error para que la ruta lo maneje
        } finally {
            await this.db.cerrar(); // Cierra la conexión a la base de datos
        }
    }

    // Puedes añadir otros métodos CRUD aquí si los necesitas para t_usuario
    // async getUsuarioById(id) { ... }
    // async updateUsuario(id, data) { ... }
    // async deleteUsuario(id) { ... }

    // Getters y Setters
    get_id_usuario() { return this.id_usuario; }
    set_id_usuario(value) { this.id_usuario = value; }

    get_nombres_usuario() { return this.nombres_usuario; }
    set_nombres_usuario(value) { this.nombres_usuario = value; }

    get_apellidos_usuario() { return this.apellidos_usuario; }
    set_apellidos_usuario(value) { this.apellidos_usuario = value; }

    get_correo_usuario() { return this.correo_usuario; }
    set_correo_usuario(value) { this.correo_usuario = value; }

    get_contraseña_usuario() { return this.contraseña_usuario; }
    set_contraseña_usuario(value) { this.contraseña_usuario = value; }

    get_telefono_usuario() { return this.telefono_usuario; }
    set_telefono_usuario(value) { this.telefono_usuario = value; }

    get_avatar_url_usuario() { return this.avatar_url_usuario; }
    set_avatar_url_usuario(value) { this.avatar_url_usuario = value; }

    get_id_rol() { return this.id_rol; }
    set_id_rol(value) { this.id_rol = value; }

    get_id_estado_usuario() { return this.id_estado_usuario; }
    set_id_estado_usuario(value) { this.id_estado_usuario = value; }

    get_id_tipo_documento() { return this.id_tipo_documento; }
    set_id_tipo_documento(value) { this.id_tipo_documento = value; }

    get_numero_documento() { return this.numero_documento; }
    set_numero_documento(value) { this.numero_documento = value; }
}

export default t_usuario;


