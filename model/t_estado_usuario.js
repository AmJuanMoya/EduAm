
import Database from "../model/database/conectionDB.js";



class t_estado_usuario{

   constructor(){
    this.id_estado_usuario;
    this.nombre_estado_usuario = "";
    this.db = new Database()
   }


   
   async getall_estado_usuario() {
    await this.db.connect();
    const query = "SELECT * FROM t_estado_usuario";
    await this.db.consultar(query);
    let datos = this.db.getData()
    await this.db.cerrar();    
    return datos
    }

    async insert_estado_usuario(nombre_estado_usuario) {
    await this.db.connect();
    const query = "INSERT INTO t_estado_usuario (nombre_estado_usuario) VALUES (?)";
    await this.db.consultar(query, [nombre_estado_usuario]);
    await this.db.cerrar();
    return this.db.getData();
    }

    async update_estado_usuario(nombre_estado_usuario, id_estado_usuario) {
    await this.db.connect();
    const query = "UPDATE t_estado_usuario SET nombre_estado_usuario = ? WHERE id_estado_usuario = ?";
    await this.db.consultar(query, [nombre_estado_usuario, id_estado_usuario]);
    await this.db.cerrar();
    return this.db.getData();
    }

    async delete_estado_usuario(id_estado_usuario) {
    await this.db.connect();
    const query = "DELETE FROM t_estado_usuario WHERE id_estado_usuario = ?";
    await this.db.consultar(query, [id_estado_usuario]);
    await this.db.cerrar();
    return this.db.getData();
    }

    // Getters y Setters
    get_id_estado_usuario() {
        return this.id_estado_usuario;
    }
  
     set_id_estado_usuario(value) {
        this.id_estado_usuario = value;
    }
  
     get_nombre_estado_usuario() {
        return this.nombre_estado_usuario;
    }
  
     set_nombre_estado_usuario(value) {
        this.nombre_estado_usuario = value;
    }
}

// PRUEBA DE DATOS....
const tabla = new t_estado_usuario();

tabla.getall_estado_usuario().then(datos =>{

console.log(datos)
 datos.forEach((dato,) =>{
console.log(dato.id_estado_usuario, dato.nombre_estado_usuario)
})
})