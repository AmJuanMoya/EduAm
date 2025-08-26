import Database from "../model/database/conectionDB.js";
import Crud from "../model/database/crudsql.js";

class t_matriculas{

    constructor(){
        this.id_documento = "";
        this.matr_anio = "";
        this.matr_grado = "";
        this.matr_repite = "";
        this.matr_traslado = "";
        this.matr_estado = "";
        this.matr_observaciones = "";
        this.matr_jornada = "";
        this.matr_curso = "";
        
        this.db = new Database();
        this.crud = new Crud;
    }

    async getMatriculaByDoc(doc){
        let data = await this.crud.getByCondition("t_matricula",`documento_estudiante = ${doc}`)
        return data    
    }

    async getMatricula() {
    const sql = `
        SELECT m.id_documento,
               m.matr_anio,
               m.matr_grado,
               m.matr_repite,
               m.matr_traslado,
               m.matr_estado,
               m.matr_observaciones,
               m.matr_jornada,
               e.estu_nombre,
               e.estu_apellido
        FROM t_matricula m
        JOIN t_estudiantes e 
             ON m.id_documento = e.id_docuestudiante
    `;
    return await this.crud.query(sql);  // tu crud debe tener algo como query(sql)
}
    async getGrado() {
    const sql = `
        SELECT id_grado,
               grad_nombre
        FROM t_grado
    `;
    return await this.crud.query(sql);

}
    async getCurso() {
    const sql = `
        SELECT id_curso,
               curso_jornada
        FROM t_curso
    `;
    return await this.crud.query(sql);
    }


    async insert_matricula() {
        await this.db.connect();
        const query = `
            INSERT INTO t_matricula (
                id_documento,
                matr_anio,
                matr_grado,
                matr_repite,
                matr_traslado,
                matr_estado,
                matr_observaciones,
                matr_jornada,
                matr_curso


            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            this.id_documento,
            this.matr_anio,
            this.matr_grado,
            this.matr_repite,
            this.matr_traslado,
            this.matr_estado,
            this.matr_observaciones,
            this.matr_jornada,
            this.matr_curso

        ];
        await this.db.consultar(query, values);
        await this.db.cerrar();
        return this.db.getData();
    }

    
    async update_matricula() {
    const data = {
        id_documento: this.id_documento,
        matr_anio: this.matr_anio,
        matr_grado: this.matr_grado,
        matr_repite: this.matr_repite,
        matr_traslado: this. matr_traslado,
        matr_estado: this.matr_estado,
        matr_observaciones: this.matr_observaciones,
        matr_jornada: this.matr_jornada,
        matr_curso: this.matr_curso
       
    };
    
    Object.keys(data).forEach(key => {
    if (data[key] === undefined) data[key] = null;
    });

    const condition = `id_matricula = ${this.id_matricula}`;

    const crud = new Crud();
    console.log("DATA: ",data)
    return await crud.updateOne('t_matricula', data, condition);
    }

    async delete_matricula(doc) {
    await this.db.connect();
    const query = "DELETE FROM t_matricula WHERE id_documento = ?";
    await this.db.consultar(query, [doc]);
    await this.db.cerrar();
    return this.db.getData();
}

    async createMatricula(data) {
    let connection;
    try {
        connection = await this.db.connect();
        await connection.beginTransaction();

        // 1. Insertar acudiente
        const queryAcudiente = `
            INSERT INTO t_acudientes (
                id_documento_acudiente, acud_nombres, acud_apellidos,
                acud_parentesco, acud_telefono, acud_correo, acud_direccion,
                acud_tipo_documento, acud_rol
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const valuesAcudiente = [
            data.id_documento_acudiente || null,
            data.acud_nombres || null,
            data.acud_apellidos || null,
            data.acud_parentesco || null,
            data.acud_telefono || null,
            data.acud_correo || null,
            data.acud_direccion || null,
            data.acud_tipo_documento || null,
            data.acud_rol || 4   // default rol
        ];
        await connection.execute(queryAcudiente, valuesAcudiente);

         const queryMatricula = `
            INSERT INTO t_matricula (
                id_documento, matr_anio, matr_grado,
                matr_repite, matr_traslado, matr_estado,
                matr_observaciones, matr_jornada, matr_curso
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const valuesMatricula = [
            data.id_docuestudiante || null,
            (data.matr_anio ? data.matr_anio + " 00:00:00" : new Date().toISOString().slice(0,19).replace("T"," ")),
            data.matr_grado || 1,
            data.matr_repite === "true" ? true : false,
            data.matr_traslado === "true" ? true : false,
            data.matr_estado || "Pendiente",
            data.matr_observaciones || null,
            data.matr_jornada || "Jornada Mañana",
            data.matr_curso || 1
        ];
        await connection.execute(queryMatricula, valuesMatricula);

        // 2. Insertar estudiante
        const queryEstudiante = `
            INSERT INTO t_estudiantes (
                id_docuestudiante, estu_nombre, estu_apellido, estu_edad,
                estu_genero, estu_tipo_documento, estu_estado, estu_observaciones,
                est_correo, est_contrasena, estu_rol, estu_acudiente
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const valuesEstudiante = [
            data.id_docuestudiante || null,
            data.estu_nombre || null,
            data.estu_apellido || null,
            data.estu_edad || null,
            data.estu_genero || null,
            data.estu_tipo_documento || null,
            data.estu_estado || null,
            data.estu_observaciones || null,
            data.est_correo || null,
            data.est_contrasena || "123456",
            data.estu_rol || 3,
            data.id_documento_acudiente || null
        ];
        await connection.execute(queryEstudiante, valuesEstudiante);       

        await connection.commit();
        return { success: true, message: "Matrícula completa creada con éxito" };

    } catch (error) {
        if (connection) await connection.rollback();
        console.error("Error en createMatricula:", error);
        throw error;
    } finally {
        if (connection) await connection.end();
    }
}


    get id_matricula() {
        return this._id_matricula;
    }
    set id_matricula(value) {
        this._id_matricula = value;
    }

    get primer_nombre_estudiante() {
        return this._primer_nombre_estudiante;
    }
    set primer_nombre_estudiante(value) {
        this._primer_nombre_estudiante = value;
    }

    get nombres_adicionales_estudiante() {
        return this._nombres_adicionales_estudiante;
    }
    set nombres_adicionales_estudiante(value) {
        this._nombres_adicionales_estudiante = value;
    }

    get primer_apellido_estudiante() {
        return this._primer_apellido_estudiante;
    }
    set primer_apellido_estudiante(value) {
        this._primer_apellido_estudiante = value;
    }

    get apellidos_adicionales_estudiante() {
        return this._apellidos_adicionales_estudiante;
    }
    set apellidos_adicionales_estudiante(value) {
        this._apellidos_adicionales_estudiante = value;
    }

    get estado_matricula() {
        return this._estado_matricula;
    }
    set estado_matricula(value) {
        this._estado_matricula = value;
    }

    get fecha_matricula() {
        return this._fecha_matricula;
    }
    set fecha_matricula(value) {
        this._fecha_matricula = value;
    }

    get repitente() {
        return this._repitente;
    }
    set repitente(value) {
        this._repitente = value;
    }

    get eps() {
        return this._eps;
    }
    set eps(value) {
        this._eps = value;
    }

    get sisben() {
        return this._sisben;
    }
    set sisben(value) {
        this._sisben = value;
    }

    get estrato() {
        return this._estrato;
    }
    set estrato(value) {
        this._estrato = value;
    }

    get discapacidad() {
        return this._discapacidad;
    }
    set discapacidad(value) {
        this._discapacidad = value;
    }

    get jornada() {
        return this._jornada;
    }
    set jornada(value) {
        this._jornada = value;
    }

    get direccion_residencia() {
        return this._direccion_residencia;
    }
    set direccion_residencia(value) {
        this._direccion_residencia = value;
    }

    get id_tipo_documento_estudiante() {
        return this._id_tipo_documento_estudiante;
    }
    set id_tipo_documento_estudiante(value) {
        this._id_tipo_documento_estudiante = value;
    }

    get documento_estudiante() {
        return this._documento_estudiante;
    }
    set documento_estudiante(value) {
        this._documento_estudiante = value;
    }

    get observaciones() {
        return this._observaciones;
    }
    set observaciones(value) {
        this._observaciones = value;
    }

 
}

// const tabla = new t_matriculas();

// tabla.getall_matriculas().then(datos => {
//     console.log("Listado de matrículas:");
    
//     datos.forEach(dato => {
//         console.log(
//             dato.id_matricula,
//             dato.primer_nombre_estudiante,
//             dato.primer_apellido_estudiante,
//             dato.estado_matricula
//         );
//     });
// }).catch(err => {
//     console.error("Error al consultar las matrículas:", err);
// });

// let matricula = new t_matriculas


// matricula.getMatriculaByDoc(1020304014).then(
//     (d)=> console.log(d)
// )

export default t_matriculas;