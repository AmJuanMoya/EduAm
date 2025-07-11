import Database from '../model/database/conectionDB.js';

class t_tipo_identificacion {

    constructor() {
        this.id_tipo_identificacion = 0;
        this.nombre_tipo_identificacion = '';
        this.db = new Database();
    }

    async getAllTipoIdentificacion() {
        await this.db.connect();
        const query = 'SELECT id_identificacion, tipo_identificacion FROM t_tipo_identificacion';
        await this.db.consultar(query);
        let datos = this.db.getData();
        await this.db.cerrar();
        return datos;
    }

    async insertTipoIdentificacion(tipo_identificacion) {
        console.log("Insertando matrícula con tipo documento:", matricula.id_tipo_documento_estudiante);
        await this.db.connect();
        const query = 'INSERT INTO t_tipo_identificacion (tipo_identificacion) VALUES (?)';
        await this.db.consultar(query, [tipo_identificacion]);
        await this.db.cerrar();
        return this.db.getData();
    }
}

export default t_tipo_identificacion;