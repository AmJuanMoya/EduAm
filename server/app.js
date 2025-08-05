import express from 'express';
import cors from 'cors';

import TablasRouter from './routes/r_tablas.js';
import matriculasRouter from "./routes/r_matricula.js";
import identificacionRouter from "./routes/r_tipo_identificacion.js";
import actividadesRouter from "./routes/r_actividades.js";
import actividadDetalleRouter from "./routes/r_actividad_detalle.js";
import crearActividadRouter from './routes/r_creacion_actividad.js';
import categoriasRouter from './routes/r_categorias.js';
import rolesRouter from './routes/r_roles.js';
import estadoUsuarioRouter from './routes/r_estado_usuario.js';
import registroUsuarioRouter from './routes/r_registro_usuario.js';



const app = express()
app.use(cors());
app.use("/api",express.json());

app.use('/api', TablasRouter)
app.use("/api", matriculasRouter);
app.use("/api", identificacionRouter);
app.use("/api", actividadesRouter);
app.use("/api", actividadDetalleRouter);
app.use("/api", crearActividadRouter);
app.use("/api", categoriasRouter);
app.use("/api", rolesRouter);
app.use("/api", estadoUsuarioRouter);
app.use("/api", registroUsuarioRouter);





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