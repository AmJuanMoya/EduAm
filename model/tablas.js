import Database from "../model/database/conectionDB.js";


class tablas{

    constructor(){
        this.db = new Database();
    }



   async getTablas(){
        await this.db.connect()
        const query = `
                    SELECT table_name
                    FROM information_schema.tables
                    WHERE table_schema = 'eduam'
                    AND table_type = 'BASE TABLE';`;
        await this.db.consultar(query);
        await this.db.cerrar();
        return this.db.getData();
        


    }


}


export default tablas;

// let tables = new tablas();

// tables.getTablas().then(data=>{
//     console.log(data)
// }
    
// )