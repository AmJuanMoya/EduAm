import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
// import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';
dotenv.config({path: '.env'});

// Cargar variables de entorno

class Database {
    constructor() {
      this.connection;
      this.sql;
      this.result;
      this.query;
      this.afectedRows;
      this.data;
      this.metadata;
      // data from .env of database
      this.db_host = process.env.DB_HOST || 'localhost';
      this.db_user = process.env.DB_USER || 'root';
      this.db_name = process.env.DB_NAME || 'eduam';
      this.db_port = process.env.DB_PORT || 3306;
      this.db_password = process.env.DB_PASSWORD || 'tecno159';
      
    }


  async connect() {

    try {
      
      const connection = await mysql.createConnection({
        host: this.db_host,
        user: this.db_user,
        database: this.db_name,
        port: this.db_port,
        password: this.db_password
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






