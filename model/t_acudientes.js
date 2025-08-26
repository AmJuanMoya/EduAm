import Database from "../model/database/conectionDB.js";
import Crud from "../model/database/crudsql.js";

class t_acudientes{

    constructor(){
        this.id_documento_acudiente = "";
        this.acud_nombres = "";
        this.acud_apellidos = "";
        this.acud_parentesco = "";
        this.acud_telefono = "";
        this.acud_correo = "";
        this.acud_direccion = "";
        this.acud_tipo_documento = "";

        this.acud1_documento = "";
        this.acud1_nombres = "";
        this.acud1_apellidos = "";

        this.acud_rol = "";
        
        this.db = new Database();
        this.crud = new Crud;
    }

    async createAcudiente(data) {
    let connection;
    try {
        connection = await this.db.connect();
        await connection.beginTransaction();

        const queryAcudiente = `
            INSERT INTO t_acudientes (
                id_documento_acudiente, acud_nombres, acud_apellidos,
                acud_parentesco, acud_telefono, acud_correo, acud_direccion,
                acud_tipo_documento, acud_rol
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const valuesAcudiente = [
            data.id_documento_acudiente || null,
            data.acud_nombres || null,
            data.acud_apellidos || null,
            data.acud_parentesco || null,
            data.acud_telefono || null,
            data.acud_correo || null,
            data.acud_direccion || null,
            data.acud_tipo_documento || null,
            data.acud_rol || 4   // valor por defecto
        ];

        await connection.execute(queryAcudiente, valuesAcudiente);
        await connection.commit();

        return { success: true, message: "Acudiente creado con éxito" };

    } catch (error) {
        if (connection) await connection.rollback();
        console.error("Error en createAcudiente:", error);
        throw error;
    } finally {
        if (connection) await connection.end();
    }
}

}

export default t_acudientes;