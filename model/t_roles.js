import Database from "../model/database/conectionDB.js";

class t_roles{

    constructor() {
        this.id_rol;
        this.nombre_rol = "";
        this.descripcion_rol = "";
        this.db = new Database();
    }

    async getall_roles() {
        await this.db.connect();
        const query = "SELECT * FROM t_roles";
        await this.db.consultar(query);
        let datos = this.db.getData();
        await this.db.cerrar();
        return datos;
    }

    async insert_rol(nombre_rol, descripcion_rol) {
        await this.db.connect();
        const query = "INSERT INTO t_roles (nombre_rol, descripcion_rol) VALUES (?, ?)";
        await this.db.consultar(query, [nombre_rol, descripcion_rol]);
        await this.db.cerrar();
        return this.db.getData();
    }

    async update_rol(nombre_rol, descripcion_rol, id_rol) {
        await this.db.connect();
        const query = "UPDATE t_roles SET nombre_rol = ?, descripcion_rol = ? WHERE id_rol = ?";
        await this.db.consultar(query, [nombre_rol, descripcion_rol, id_rol]);
        await this.db.cerrar();
        return this.db.getData();
    }

    async delete_rol(id_rol) {
        await this.db.connect();
        const query = "DELETE FROM t_roles WHERE id_rol = ?";
        await this.db.consultar(query, [id_rol]);
        await this.db.cerrar();
        return this.db.getData();
    }

    // Getters y Setters
    get_id_rol() {
        return this.id_rol;
    }

    set_id_rol(value) {
        this.id_rol = value;
    }

    get_nombre_rol() {
        return this.nombre_rol;
    }

    set_nombre_rol(value) {
        this.nombre_rol = value;
    }

    get_descripcion_rol() {
        return this.descripcion_rol;
    }

    set_descripcion_rol(value) {
        this.descripcion_rol = value;
    }
}

// PRUEBA DE DATOS....
const tabla = new t_roles();

tabla.getall_roles().then(datos =>{

console.log(datos)
 datos.forEach((dato,) =>{
console.log(dato.id_rol, dato.nombre_rol, dato.descripcion_rol)
})

})


tabla.delete_rol(5).then(dato=>{
   console.log(dato)
})

//tabla.insert_rol("consejero").then(dato=>{
   //console.log(dato)
//})

export default t_roles;