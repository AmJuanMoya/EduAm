import conectionDB from "./database/conectionDB.js";

class CategoriaActividad {
  constructor() {
    this.db = new conectionDB();
    this.tableName = "t_categoria_actividad";
  }

  async obtenerTodas() {
    try {
      await this.db.connect();

      const query = `SELECT id_categoria_actividad, nombre_categoria_actividad FROM ${this.tableName}`;
      await this.db.consultar(query);

      const data = this.db.getData();
      await this.db.cerrar();

      return data;
    } catch (error) {
      await this.db.cerrar();
      throw new Error("Error al obtener categorías: " + error.message);
    }
  }
}

export default CategoriaActividad;
