import mysql from 'mysql2/promise';


class Database {
    constructor() {
      this.connection;
      this.sql;
      this.result;
      this.query;
      this.afectedRows;
      this.data;
      this.metadata;
    }


  async connect() {

    try {
      const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'eduam',
        port: 3310,
        password: ''
      });
      this.connection = connection;
      console.log('✅ Connected to the database✅');
      // console.log('Connected to the database');
      
    //   return connection;
    } catch (err) {
      this.cerrar()
      console.log("❌ Hubo un error al conectarse a la base de datos ❌: ",err);
      throw err;
    }
  }


async cerrar() {
  if (this.connection) {
    try {
      await this.connection.end();
      console.log('🔒Connection closed successfully🔒');
    } catch (err) {
      console.error('❌Error closing the connection❌:', err);
    }
  } else {
    console.log('⚠️No connection to close⚠️');
  }
}


async consultar(sql, values=[]){
  this.sql = sql;
  try {
    const [rows, fields] = await this.connection.query(this.sql, values);
    this.result = rows;
    this.metadata = fields;

  } catch (err) {
    console.error('❌Hubo un error en la Consulta❌:', err);
    throw err;
  }

  
}


getConnection() {
    return this.connection;
  }

getData() {
    return this.result;
  }

getMetadata() {
    return this.metadata;
  }

}

export default Database;






