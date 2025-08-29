import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import TablasRouter from './routes/r_tablas.js';
import matriculasRouter from "./routes/r_matricula.js";

import acudienteRouter from './routes/r_acudientes.js';


const app = express()
app.use(cors());
app.use("/api",express.json());


app.use('/api', TablasRouter)
app.use("/api", matriculasRouter);

app.use("/api", acudienteRouter);





// General... Redirije a la applicacion
app.get("/", (req, res) => {
    res.redirect("http://localhost:4321/");
});


app.use((err, req, res, next) => {
    console.error('Error inesperado:', err);
    res.status(500).json({ error: 'Error inesperado en el servidor -- desde el middleware de error' });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor en la ruta http://localhost:${PORT}/`);
});