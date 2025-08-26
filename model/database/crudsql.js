import conectionDB from './conectionDB.js';


class Crud{
    constructor(table, keys, values){
        this.db = new conectionDB();

        this.table = table
        this.keys = keys
        this.values = values

    }

    async insertOne(table, data){
        try {
            await this.db.connect();
            
            const keys = Object.keys(data);
            const placeholders = keys.map(() => ' ?')
            const values = Object.values(data);

            const query = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders})`;

            // console.log("-------------")
            // console.log(query)
            // console.log("-------------")

            await this.db.consultar(query, values);     
            await this.db.cerrar();
            return this.db.getData();
        } catch (error) {
            await this.db.cerrar();
            throw new Error(`Error en insertOne: ${error.message}`);
        }
    }

    async getAll(table){
        try {
            await this.db.connect();
            const query = `SELECT * FROM ${table}`;
            await this.db.consultar(query);
            await this.db.cerrar();
            return this.db.getData();
        } catch (error) {
            await this.db.cerrar();
            throw new Error(`Error en getAll: ${error.message}`);
        }
    }

    async query(sql, params = []) {
    try {
        await this.db.connect();
        await this.db.consultar(sql, params); // soporta parámetros opcionales
        await this.db.cerrar();
        return this.db.getData();
    } catch (error) {
        await this.db.cerrar();
        throw new Error(`Error en query: ${error.message}`);
    }
}


    async getByCondition(table, condition){
        try {
            await this.db.connect();
            const query = `SELECT * FROM ${table} WHERE ${condition}`;
            await this.db.consultar(query);
            await this.db.cerrar();
            return this.db.getData();
        } catch (error) {
            await this.db.cerrar();
            throw new Error(`Error en getByCondition: ${error.message}`);
        }
    }

    async updateOne(table, data, condition){
        try {
            await this.db.connect();
            
            const keys = Object.keys(data);
            console.log(keys)
            const values = Object.values(data);
            console.log(values)
            const setClause = keys.map((k) => `${k} = ?`).join(', ');
            console.log(setClause)

            const query = `UPDATE ${table} SET ${setClause} WHERE ${condition}`;
            console.log(query)
            await this.db.consultar(query, values);

            await this.db.cerrar();
            return this.db.getData();

        } catch (error) {
            await this.db.cerrar();
            throw new Error(`Error en updateOne: ${error.message}`);
        }
    }

    async deleteOne(table, condition){
        try{
        await this.db.connect();
        const query = `DELETE FROM ${table} WHERE ${condition}`;
        await this.db.consultar(query);
        await this.db.cerrar();
        return this.db.getData();
        }
        catch{
             await this.db.cerrar();
             return {error: 'Error al eliminar el registro.'};
             
        }
    }
    
    async querySQL(sql, params = []) {
        try {
            const [rows] = await connection.execute(sql, params);
        return rows;
        } catch (err) {
            console.error("Error ejecutando querySQL:", err);
        throw err;
    }
}


} 

export default Crud;


//--- PRUEBAS DE LOS METODOS ----

// let crud = new Crud();

// // ------EJEMPLO DE TRAER POR CONDICION
// console.log("Ejemplo de traer por condicion")
// let correo_usuario = "yolanda.torres@eduam.com"
// crud.getByCondition('t_usuarios',  `correo_usuario = "${correo_usuario}"`).then(data => {
//     console.log(data);
// })

//------EJEMPLO DE TRAER
// crud.getAll('t_actividad').then(data => {
//     console.log(data);
// })

//-------EJEMPLO DE INSERCCION


// crud.insertOne("t_actividad",

//     {
//     titulo_actividad: "Actividad de Ejemplo",
//     descripcion_actividad: "xd_Esta es una descripcionde la actividad por ejemploxd",
//     calificacion_nota: 3.4 ,
//     id_categoria_actividad: 2        
     
//     // nombre_rol: "" 
    
//     })
    

// ).then(data =>{
//     console.log(data);
// }  )     

//------EJEMPLO DE ACTUALIZAR

// crud.updateOne("t_actividad", 
//     //Datos a cambiar... se puede poner uno o varios
//     { 
//       titulo_actividad: "Debate de Geografía",
//     //   otra_cosa_x: "otra cosa x",
//     //   otra_cosa_y: "otra cosa yz"
//     },"id_actividad = 6"

// ).then(data=>{
//     console.log(data);
// })

    
        
        
// crud.deleteOne("t_actividad", "id_actividad = 7").then(data =>{
//     console.log(data);
// });

