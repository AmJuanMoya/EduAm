import express from 'express';
import StatsController from '../../controller/c_stats.js';

const router = express.Router();
const statsController = new StatsController();

// Ruta para obtener el conteo de matrículas por estado
router.get('/matriculas-por-estado', (req, res) => statsController.getMatriculasPorEstado(req, res));

// Ruta para obtener el conteo de estudiantes por género
router.get('/estudiantes-por-genero', (req, res) => statsController.getEstudiantesPorGenero(req, res));

// Ruta para obtener el conteo de estudiantes por tipo de documento
router.get('/estudiantes-por-tipo-documento', (req, res) => statsController.getEstudiantesPorTipoDocumento(req, res));

export default router;