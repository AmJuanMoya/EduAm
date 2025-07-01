import Database from "../model/database/conectionDB.js";
import Crud from "../model/database/crudsql.js";

class t_matriculas{

    constructor(){
        this.id_matricula;
        this.primer_nombre_estudiante ;
        this.nombres_adicionales_estudiante;
        this.primer_apellido_estudiante;
        this.apellidos_adicionales_estudiante;
        this.estado_matricula;
        this.fecha_matricula;
        this.repitente;
        this.eps;
        this.sisben;
        this.estrato;
        this.discapacidad;
        this.jornada;
        this.direccion_residencia;
        this.id_tipo_documento_estudiante;
        this.documento_estudiante;
        this.observaciones;
        this.nombre_acudiente1;
        this.apellido_acudiante1;
        this.id_tipo_documento_acudiente1;
        this.numero_documento_acudiente1;
        this.tel_contacto_acudiente1;
        this.correo_acudiente1;
        this.nombre_acudiente2;
        this.apellido_acudiante2;
        this.id_tipo_documento_acudiente2;
        this.numero_documento_acudiente2;
        this.tel_contacto_acudiente2;
        this.correo_acudiente2;
        this.nombre_acudiente3;
        this.apellido_acudiante3;
        this.id_tipo_documento_acudiente3;
        this.numero_documento_acudiente3;
        this.tel_contacto_acudiente3;
        this.correo_acudiente3;
        this.db = new Database();
        this.crud = new Crud;
    }

    async getMatriculaByDoc(doc){
        let data = await this.crud.getByCondition("t_matricula",`documento_estudiante = ${doc}`)
        return data    
    }

    async getMatricula() {
        return await this.crud.getAll("t_matricula");
    }

}


// let matricula = new t_matriculas


// matricula.getMatriculaByDoc(1020304014).then(
//     (d)=> console.log(d)
// )

export default t_matriculas;