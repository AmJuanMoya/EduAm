import t_matricula from '../model/t_matricula.js';
import t_estudiantes from '../model/t_estudiantes.js';

class StatsController {
    constructor() {
        this.matriculaModel = new t_matricula();
        this.estudiantesModel = new t_estudiantes();
    }

    async getMatriculasPorEstado(req, res) {
        try {
            const data = await this.matriculaModel.contarMatriculasPorEstado();
            res.status(200).json(data);
        } catch (error) {
            console.error("Error al obtener matrículas por estado:", error.message);
            res.status(500).json({ message: "Error interno del servidor al obtener matrículas por estado." });
        }
    }

    async getEstudiantesPorGenero(req, res) {
        try {
            const data = await this.estudiantesModel.contarEstudiantesPorGenero();
            res.status(200).json(data);
        } catch (error) {
            console.error("Error al obtener estudiantes por género:", error.message);
            res.status(500).json({ message: "Error interno del servidor al obtener estudiantes por género." });
        }
    }

    async getEstudiantesPorTipoDocumento(req, res) {
        try {
            const data = await this.estudiantesModel.contarEstudiantesPorTipoDocumento();
            res.status(200).json(data);
        } catch (error) {
            console.error("Error al obtener estudiantes por tipo de documento:", error.message);
            res.status(500).json({ message: "Error interno del servidor al obtener estudiantes por tipo de documento." });
        }
    }
}

export default StatsController;