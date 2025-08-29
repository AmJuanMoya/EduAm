import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import actividadRouter from './routes/r_actividad.js';
import informesRouter from './routes/r_informes.js';
import crearActividadRouter from './routes/r_creacion_actividad.js';
import exampleRouter from './routes/r_example.js';
// import TablasRouter from './routes/r_tablas.js';



const app = express()
app.use(cors());
app.use("/api",express.json());
app.use("/api/actividad", actividadRouter);
app.use("/api/informes", informesRouter);
app.use('/api/example', exampleRouter);
app.use('/api/actividad', crearActividadRouter);
// app.use('/api', TablasRouter)





// General... Redirije a la applicacion
app.get("/", (req, res) => {
    // res.redirect("http://localhost:4321/");
    res.json({message: "Hola AM. ruta de prueba"})
});


app.use((err, req, res, next) => {
    console.error('Error inesperado:', err);
    res.status(500).json({ error: 'Error inesperado en el servidor -- desde el middleware de error' });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor en la ruta http://localhost:${PORT}/`);
});