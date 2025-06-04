
import Database from "../model/database/conectionDB.js";



class t_categoria_actividad{

   constructor(){
    this.id_categoria_actividad
    this.nombre_categoria_actividad = ""
    this.db = new Database()
   }


   
   async getall_categoria_actividad() {
    await this.db.connect();
    const query = "SELECT * FROM t_categoria_actividad";
    await this.db.consultar(query);
    let datos = this.db.getData()
    await this.db.cerrar();    
    return datos
    }

   async insert_categoria_actividad(nombre_categoria_actividad) {
   await this.db.connect();
   const query = "INSERT INTO t_categoria_actividad (nombre_categoria_actividad) VALUES (?)";
   await this.db.consultar(query, [nombre_categoria_actividad]);
   await this.db.cerrar();
   return this.db.getData();
  }

  async update_categoria_actividad(nombre_categoria_actividad, id_categoria_actividad) {
   await this.db.connect();
   const query = "UPDATE t_categoria_actividad SET nombre_categoria_actividad = ? WHERE id_categoria_actividad = ?";
   await this.db.consultar(query, [nombre_categoria_actividad, id_categoria_actividad]);
   await this.db.cerrar();
   return this.db.getData();
}

async delete_categoria_actividad(id_categoria_actividad) {
   await this.db.connect();
   const query = "DELETE FROM t_categoria_actividad WHERE id_categoria_actividad = ?";
   await this.db.consultar(query, [id_categoria_actividad]);
   await this.db.cerrar();
   return this.db.getData();
}


    // Getter y Setter para id_categoria_actividad
   get_id_categoria_actividad() {
      return this.id_categoria_actividad;
   }

   set_id_categoria_actividad(value) {
      this.id_categoria_actividad = value;
   }

   // Getter y Setter para nombre_categoria_actividad
   get_nombre_categoria_actividad() {
      return this.nombre_categoria_actividad;
   }

   set_nombre_categoria_actividad(value) {
      this.nombre_categoria_actividad = value;
   }


   } 
   
   

 

// PRUEBA DE DATOS....
// const tabla = new t_categoria_actividad();

// tabla.getall_categoria_actividad().then(datos =>{

// // console.log(datos)
//  datos.forEach((dato,) =>{
//    console.log(dato.id_categoria_actividad, dato.nombre_categoria_actividad)
//  })

// })

// tabla.set_id_categoria_actividad(7);
// tabla.set_nombre_categoria_actividad("Taller4")

// tabla.update_categoria_actividad(tabla.get_id_categoria_actividad(), tabla.get_nombre_categoria_actividad());

// tabla.update_categoria_actividad(tabla.id_categoria_actividad, tabla.nombre_categoria_actividad);


// tabla.delete_categoria_actividad().then(dato=>{
//    console.log(dato)
// })

// tabla.insert_categoria_actividad("taller").then(dato=>{
//    console.log(dato)
// })




