import conectionDB from './conectionDB.js';


class Crud{
    constructor(){
        this.db = new conectionDB();
    }

    async insertOne(table, data){
        await this.db.connect();
        // se extraen llaves y valores
        const keys = Object.keys(data);
        const values = Object.values(data).map(value => {
            if (value === undefined || value === null) {
                return 'NULL';
            } else if (typeof value === 'string') {
                return `'${value}'`;
            }
            return value;
        });
        const query = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${values.join(', ')})`;
        await this.db.consultar(query);
        await this.db.cerrar();
        return this.db.getData();
    }

    async getAll(table){
        await this.db.connect();
        const query = `SELECT * FROM ${table}`;
        await this.db.consultar(query);
        await this.db.cerrar();
        return this.db.getData();
    }

    async getByCondition(table, condition){
        await this.db.connect();
        const query = `SELECT * FROM ${table} WHERE ${condition}`;
        await this.db.consultar(query);
        await this.db.cerrar();
        return this.db.getData();
    }

    async updateOne(table, data, condition){
        await this.db.connect();
        const keys = Object.keys(data);
        const values = Object.values(data).map(value => { 
            if (value === undefined || value === null) { 
                return 'NULL';
                } else if (typeof value === 'string') {
                    return `'${value}'`;
                    }
                    return value;
                    });
                    const query = `UPDATE ${table} SET ${keys.map((key, index) => `${key} = ${values[index]}`).join(', ')} WHERE ${condition}`;
                    await this.db.consultar(query);
                    await this.db.cerrar();
                    return this.db.getData();
                    
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
    
    

} 


//--- PRUEBAS DE LOS METODOS ----

let crud = new Crud();

//------EJEMPLO DE TRAER
// crud.getall('t_curso').then(data => {
//     console.log(data);
// })

//-------EJEMPLO DE INSERCCION

//
// crud.insertOne("t_roles",

//     {
//     descripcion_rol: "Rol de ejemplo b", 
//     // nombre_rol: "" 
// }
    

// ).then(data =>{
//     console.log(data);
// }  )     

//------EJEMPLO DE ACTUALIZAR

// crud.updateOne("t_roles", 
//     //Datos a cambiar... se puede poner uno o varios
//     { 
//         descripcion_rol: "Rol_actualizado_a",
//         nombre_rol: "Rol_ejemplo123"
//     },"id_rol = 8"

// ).then(data=>{
//     console.log(data);
// })

    
        
        
// crud.deleteOne("t_roles", "id_rol = 8").then(data =>{
//     console.log(data);
// });
