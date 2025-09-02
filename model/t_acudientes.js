import Database from "../model/database/conectionDB.js";
import Crud from "../model/database/crudsql.js";

class t_acudientes {

    constructor() {
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


            console.log(data.id_documento_acudiente)
            const valuesAcudiente = [
                parseInt(data.id_documento_acudiente) || null,
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

    async getAcudientes() {
    const sql = `
         SELECT 
          id_documento_acudiente,
          acud_nombres,
          acud_apellidos,
          acud_parentesco,
          acud_telefono,
          acud_correo,
          acud_direccion,
          acud_tipo_documento
      FROM t_acudientes
  `;
    return await this.crud.query(sql);
}

async getAcudienteById(id) {
  const sql = `
    SELECT
      id_documento_acudiente,
      acud_nombres,
      acud_apellidos,
      acud_parentesco,
      acud_telefono,
      acud_correo,
      acud_direccion,
      acud_tipo_documento
    FROM t_acudientes
    WHERE id_documento_acudiente = ?
    LIMIT 1
  `;
  // usa query parametrizada para evitar inyección
  const result = await this.crud.query(sql, [id]);
}

async updateAcudiente(data) {
    const sql = `
      UPDATE t_acudientes 
      SET 
        acud_nombres = ?,
        acud_apellidos = ?,
        acud_parentesco = ?,
        acud_telefono = ?,
        acud_correo = ?,
        acud_direccion = ?
      WHERE id_documento_acudiente = ?
    `;
    const params = [
      data.acud_nombres,
      data.acud_apellidos,
      data.acud_parentesco,
      data.acud_telefono,
      data.acud_correo,
      data.acud_direccion,
      data.id_documento_acudiente
    ];
    return await this.crud.query(sql, params);
    
  }
 
  async deleteAcudiente(id) {
  const sql = `
    DELETE FROM t_acudientes 
    WHERE id_documento_acudiente = ?
  `;
  return await this.crud.query(sql, [id]);
  }
  
}

export default t_acudientes;