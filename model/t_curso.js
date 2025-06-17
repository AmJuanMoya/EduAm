import Database from '../model/database/conectionDB.js';

// Falta completar esta clase con los métodos necesarios para manejar los cursos
class t_curso {
    constructor() {
        this.tabla;
        this.id_curso;
        this.nombre_curso;
        this.id_director_curso;
        this.id_grado;


        this.db = new Database();

    }

    async getall_curso() {
        await this.db.connect();
        const query = `
SELECT 
  t_curso.id_curso as ID,
  t_usuarios.nombres_usuario as "Director de Curso",
  t_grado.nombre_grado as Grado,
  t_curso.nombre_curso as Curso
FROM t_curso
INNER JOIN t_docente ON t_curso.id_director_curso = t_docente.id_docente
INNER JOIN t_usuarios ON t_docente.id_usuario = t_usuarios.id_usuario
INNER JOIN t_grado ON t_curso.id_grado = t_grado.id_grado;
`



        await this.db.consultar(query);
        let datos = this.db.getData()
        await this.db.cerrar();
        return datos
    }







}


export default t_curso;