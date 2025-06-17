import express from 'express';
import Crud from '../model/database/crudsql.js'; // Asegúrate de que la ruta sea correcta
import t_curso from '../model/t_curso.js'; // Asegúrate de que la ruta sea correcta
import tablas from '../model/tablas.js';

const app = express();
const PORT = 3000;
let crud = new Crud();


function saludar(req, res, next) {
    console.log('¡Hola desde el middleware de saludo!');
    next(); // Pasar el control a la siguiente función de middleware/ruta
}


app.use(express.json()); // Middleware para parsear JSON en el cuerpo de las solicitudes


// Middleware de manejo de errores
// app.use((err, req, res, next) => {
//     console.error('Error inesperado:', err);
//     res.status(500).json({ error: 'Error inesperado en el servidor-- desde el middleware de error' });
// });





app.get("/api/datos/cursos", (req, res) => {
    try {
        let curso = new t_curso();
                //------EJEMPLO DE TRAER
        curso.getall_curso().then((datos)=>{
            res.json(datos); // Enviar los datos al cliente
            console.log("Trayendo Cursos")
        })
        //------EJEMPLO DE TRAER
        // crud.getAll('t_curso').then(data => {
        //     console.log(data); //aqui muestra por consola los datos en el servidor
        //     res.json(data); //aqui envia los datos al cliente

        // })
        
        .catch(err => {
            console.error('Error al obtener los datos:', err);
            res.status(500).json({ error: 'Error al obtener los datos' });
        });
    } 
    catch(err){
        // console.error('Error inesperado:', err);
        res.send('Error inesperado en el servidor desde la ruta de tablas');
        res.status(500).json({ error: 'Error inesperado en el servidor' });
        
    }

});



app.get("/api/datos/tablas", async (req, res) => {
    try {
        let tablasInstance = new tablas();
        const datos = await tablasInstance.getTablas();
        res.json(datos);
        console.log("Trayendo Tablas");
    } catch (err) {
        console.error('Error al obtener los datos:', err);
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
});



// app.get('/Moya', (req, res) => {
//     res.send('¡Hola Moya!');
// });

// app.get('/cristian', saludar, (req, res) => {

//     res.send('<input type="color" />');
  
// });
// const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en la ruta http://localhost:${PORT}/`);
});

