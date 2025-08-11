import Database from './database/conectionDB.js';
import Crud from './database/crudsql.js';

class t_actividad {
  constructor() {
    this.db = new Database();
    this.crud = new Crud();
  }

  async getActividadById(idActividad) {
    const queryActividad = `
      SELECT 
        A.*, 
        CA.nombre_categoria_actividad
      FROM 
        t_actividad A
      JOIN 
        t_categoria_actividad CA ON A.id_categoria_actividad = CA.id_categoria_actividad
      WHERE 
        A.id_actividad = ${idActividad};
    `;

    const queryComentarios = `
      SELECT 
        C.id_comentario, 
        C.comentario, 
        U.nombres_usuario, 
        U.apellidos_usuario
      FROM 
        t_comentario_actividad CA
      JOIN 
        t_comentarios C ON CA.id_comentario = C.id_comentario
      JOIN 
        t_usuarios U ON C.id_usuario = U.id_usuario
      WHERE 
        CA.id_actividad = ${idActividad};
    `;

    try {
      await this.db.connect();

      await this.db.consultar(queryActividad);
      const actividad = this.db.getData()[0];

      if (!actividad) {
        await this.db.cerrar();
        return null;
      }

      await this.db.consultar(queryComentarios);
      const comentarios = this.db.getData();

      await this.db.cerrar();

      return { actividad, comentarios };
    } catch (error) {
      console.error(`❌ Error al obtener la actividad por ID: ${error.message}`);
      throw new Error('Error al consultar la actividad');
    }
  }
}

export default t_actividad;

