import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import mysql from 'mysql2/promise';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = resolve(__dirname, '../../.env');

dotenv.config({ path: envPath });



// Verificación temporal de variables de entorno
// console.log('Variables de entorno:', {
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     database: process.env.DB_NAME,
//     port: process.env.DB_PORT
// });

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
    //   this.db_password = process.env.DB_PASSWORD || "tecno159";
    }

    async connect() {
        try {
            const config = {
                host: this.db_host, // Usamos IP en lugar de localhost
                user: this.db_user,
                database:this.db_name,
                port:  this.db_port ,
                password: this.db_password,
                // connectTimeout: 30000
            };
            
            // console.log('Intentando conectar con la configuración:', {
            //     ...config,
            //     password: '******'
            // });
            
            this.connection = await mysql.createConnection(config);
            console.log('✅ Connected to the database✅');
        } catch (err) {
            await this.cerrar();
            console.error("❌ Error al conectarse a la base de datos ❌:", err);
            throw new Error(`Error de conexión: ${err.message}`);
        }
    }

    async cerrar() {
        if (this.connection) {
            try {
                await this.connection.end();
                this.connection = null;
                console.log('🔒 Connection closed successfully 🔒');
            } catch (err) {
                console.error('❌ Error closing the connection ❌:', err);
                throw new Error(`Error al cerrar la conexión: ${err.message}`);
            }
        } else {
            console.log('⚠️ No connection to close ⚠️');
        }
    }

    async consultar(sql, values = []) {
        if (!this.connection) {
            throw new Error('No hay conexión activa a la base de datos');
        }

        try {
            // Usar execute en lugar de query para mejor soporte de consultas preparadas
            const [rows, fields] = await this.connection.execute(sql, values);
            this.result = rows;
            this.metadata = fields;
            return { rows, fields };
        } catch (err) {
            console.error('❌ Error en la consulta ❌:', err);
            throw new Error(`Error en la consulta: ${err.message}`);
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






