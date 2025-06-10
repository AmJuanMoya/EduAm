import Database from "../model/database/conectionDB.js";
// import dotenv from 'dotenv';
// dotenv.config({path: '../.env'});


class t_asignaturas{

    constructor(){
        this.id_asignatura;
        this.nombre_asignatura = "";
        this.db = new Database()
        
    }

    async getall_asignatura(){
        await this.db.connect();
        const query = "SELECT * FROM t_asignaturas";
        await this.db.consultar(query);
        let datos = this.db.getData()
        await this.db.cerrar();    
        return datos
    }

    async insert_asignatura(nombre_asignatura) {
        await this.db.connect();
        const query = "INSERT INTO t_asignaturas (nombre_asignatura) VALUES (?)";
        await this.db.consultar(query, [nombre_asignatura]);
        await this.db.cerrar();
        return this.db.getData();
    }
    
    async update_asignatura(nombre_asignatura, id_asignatura) {
        await this.db.connect();
        const query = "UPDATE t_asignaturas SET nombre_asignatura = ? WHERE id_asignatura = ?";
        await this.db.consultar(query, [nombre_asignatura, id_asignatura]);
        await this.db.cerrar();
        return this.db.getData();
    }
    
    async delete_asignatura(id_asignatura) {
        await this.db.connect();
        const query = "DELETE FROM t_asignaturas WHERE id_asignatura = ?";
        await this.db.consultar(query, [id_asignatura]);
        await this.db.cerrar();
        return this.db.getData();
    }

    // Getters y Setters
    get_id_asignatura() {
        return this.id_asignatura;
    }
  
     set_id_asignatura(value) {
        this.id_asignatura = value;
    }
  
     get_nombre_asignatura() {
        return this.nombre_asignatura;
    }
  
     set_nombre_asignatura(value) {
        this.nombre_asignatura = value;
    }
     
}

// PRUEBA DE DATOS....

// console.log(process.env.DB_HOST)
// console.log(process.env.DB_USER)
// console.log(process.env.DB_NAME)
// console.log(process.env.DB_PORT)
// console.log(process.env.DB_PASSWORD)
const tabla = new t_asignaturas();

tabla.getall_asignatura().then(datos =>{

console.log(datos)
 datos.forEach((dato,) =>{
console.log(dato.id_asignatura, dato.nombre_asignatura)
})
})

// tabla.set_id_estado_usuario(7);
// tabla.set_nombre_estado_usuario("Taller4")

// tabla.update_categoria_actividad(tabla.get_id_categoria_actividad(), tabla.get_nombre_categoria_actividad());

// tabla.update_categoria_actividad(tabla.id_categoria_actividad, tabla.nombre_categoria_actividad);


// tabla.delete_categoria_actividad().then(dato=>{
//    console.log(dato)
// })

// tabla.insert_categoria_actividad("taller").then(dato=>{
//    console.log(dato)
// })