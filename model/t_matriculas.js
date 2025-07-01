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

    async getall_matriculas() {
        await this.db.connect();
        const query = "SELECT * FROM t_matricula";
        await this.db.consultar(query);
        const datos = this.db.getData();
        await this.db.cerrar();
        return datos;
    }

    async insert_matricula() {
        await this.db.connect();
        const query = `
            INSERT INTO t_matricula (
                primer_nombre_estudiante,
                nombres_adicionales_estudiante,
                primer_apellido_estudiante,
                apellidos_adicionales_estudiante,
                estado_matricula,
                fecha_matricula,
                repitente,
                eps,
                sisben,
                estrato,
                discapacidad,
                jornada,
                direccion_residencia,
                id_tipo_documento_estudiante,
                documento_estudiante,
                observaciones,

                nombre_acudiente1,
                apellido_acudiante1,
                id_tipo_documento_acudiente1,
                numero_documento_acudiente1,
                tel_contacto_acudiente1,
                correo_acudiente1,

                nombre_acudiente2,
                apellido_acudiante2,
                id_tipo_documento_acudiente2,
                numero_documento_acudiente2,
                tel_contacto_acudiente2,
                correo_acudiente2,

                nombre_acudiente3,
                apellido_acudiante3,
                id_tipo_documento_acudiente3,
                numero_documento_acudiente3,
                tel_contacto_acudiente3,
                correo_acudiente3
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            this.primer_nombre_estudiante,
            this.nombres_adicionales_estudiante,
            this.primer_apellido_estudiante,
            this.apellidos_adicionales_estudiante,
            this.estado_matricula,
            this.fecha_matricula,
            this.repitente,
            this.eps,
            this.sisben,
            this.estrato,
            this.discapacidad,
            this.jornada,
            this.direccion_residencia,
            this.id_tipo_documento_estudiante,
            this.documento_estudiante,
            this.observaciones,

            this.nombre_acudiente1,
            this.apellido_acudiante1,
            this.id_tipo_documento_acudiente1,
            this.numero_documento_acudiente1,
            this.tel_contacto_acudiente1,
            this.correo_acudiente1,

            this.nombre_acudiente2,
            this.apellido_acudiante2,
            this.id_tipo_documento_acudiente2,
            this.numero_documento_acudiente2,
            this.tel_contacto_acudiente2,
            this.correo_acudiente2,

            this.nombre_acudiente3,
            this.apellido_acudiante3,
            this.id_tipo_documento_acudiente3,
            this.numero_documento_acudiente3,
            this.tel_contacto_acudiente3,
            this.correo_acudiente3
        ];
        await this.db.consultar(query, values);
        await this.db.cerrar();
        return this.db.getData();
    }

    async update_matricula() {
        await this.db.connect();
        const query = `
            UPDATE t_matricula SET
                primer_nombre_estudiante = ?,
                nombres_adicionales_estudiante = ?,
                primer_apellido_estudiante = ?,
                apellidos_adicionales_estudiante = ?,
                estado_matricula = ?,
                fecha_matricula = ?,
                repitente = ?,
                eps = ?,
                sisben = ?,
                estrato = ?,
                discapacidad = ?,
                jornada = ?,
                direccion_residencia = ?,
                id_tipo_documento_estudiante = ?,
                documento_estudiante = ?,
                observaciones = ?,

                nombre_acudiente1 = ?,
                apellido_acudiante1 = ?,
                id_tipo_documento_acudiente1 = ?,
                numero_documento_acudiente1 = ?,
                tel_contacto_acudiente1 = ?,
                correo_acudiente1 = ?,

                nombre_acudiente2 = ?,
                apellido_acudiante2 = ?,
                id_tipo_documento_acudiente2 = ?,
                numero_documento_acudiente2 = ?,
                tel_contacto_acudiente2 = ?,
                correo_acudiente2 = ?,

                nombre_acudiente3 = ?,
                apellido_acudiante3 = ?,
                id_tipo_documento_acudiente3 = ?,
                numero_documento_acudiente3 = ?,
                tel_contacto_acudiente3 = ?,
                correo_acudiente3 = ?
            WHERE id_matricula = ?
        `;
        const values = [
            this.primer_nombre_estudiante,
            this.nombres_adicionales_estudiante,
            this.primer_apellido_estudiante,
            this.apellidos_adicionales_estudiante,
            this.estado_matricula,
            this.fecha_matricula,
            this.repitente,
            this.eps,
            this.sisben,
            this.estrato,
            this.discapacidad,
            this.jornada,
            this.direccion_residencia,
            this.id_tipo_documento_estudiante,
            this.documento_estudiante,
            this.observaciones,

            this.nombre_acudiente1,
            this.apellido_acudiante1,
            this.id_tipo_documento_acudiente1,
            this.numero_documento_acudiente1,
            this.tel_contacto_acudiente1,
            this.correo_acudiente1,

            this.nombre_acudiente2,
            this.apellido_acudiante2,
            this.id_tipo_documento_acudiente2,
            this.numero_documento_acudiente2,
            this.tel_contacto_acudiente2,
            this.correo_acudiente2,

            this.nombre_acudiente3,
            this.apellido_acudiante3,
            this.id_tipo_documento_acudiente3,
            this.numero_documento_acudiente3,
            this.tel_contacto_acudiente3,
            this.correo_acudiente3,

            this.id_matricula
        ];
        await this.db.consultar(query, values);
        await this.db.cerrar();
        return this.db.getData();
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

    // --- Acudiente 1 ---
    get nombre_acudiente1() {
        return this._nombre_acudiente1;
    }
    set nombre_acudiente1(value) {
        this._nombre_acudiente1 = value;
    }

    get apellido_acudiante1() {
        return this._apellido_acudiante1;
    }
    set apellido_acudiante1(value) {
        this._apellido_acudiante1 = value;
    }

    get id_tipo_documento_acudiente1() {
        return this._id_tipo_documento_acudiente1;
    }
    set id_tipo_documento_acudiente1(value) {
        this._id_tipo_documento_acudiente1 = value;
    }

    get numero_documento_acudiente1() {
        return this._numero_documento_acudiente1;
    }
    set numero_documento_acudiente1(value) {
        this._numero_documento_acudiente1 = value;
    }

    get tel_contacto_acudiente1() {
        return this._tel_contacto_acudiente1;
    }
    set tel_contacto_acudiente1(value) {
        this._tel_contacto_acudiente1 = value;
    }

    get correo_acudiente1() {
        return this._correo_acudiente1;
    }
    set correo_acudiente1(value) {
        this._correo_acudiente1 = value;
    }

    // --- Acudiente 2 ---
    get nombre_acudiente2() {
        return this._nombre_acudiente2;
    }
    set nombre_acudiente2(value) {
        this._nombre_acudiente2 = value;
    }

    get apellido_acudiante2() {
        return this._apellido_acudiante2;
    }
    set apellido_acudiante2(value) {
        this._apellido_acudiante2 = value;
    }

    get id_tipo_documento_acudiente2() {
        return this._id_tipo_documento_acudiente2;
    }
    set id_tipo_documento_acudiente2(value) {
        this._id_tipo_documento_acudiente2 = value;
    }

    get numero_documento_acudiente2() {
        return this._numero_documento_acudiente2;
    }
    set numero_documento_acudiente2(value) {
        this._numero_documento_acudiente2 = value;
    }

    get tel_contacto_acudiente2() {
        return this._tel_contacto_acudiente2;
    }
    set tel_contacto_acudiente2(value) {
        this._tel_contacto_acudiente2 = value;
    }

    get correo_acudiente2() {
        return this._correo_acudiente2;
    }
    set correo_acudiente2(value) {
        this._correo_acudiente2 = value;
    }

    // --- Acudiente 3 ---
    get nombre_acudiente3() {
        return this._nombre_acudiente3;
    }
    set nombre_acudiente3(value) {
        this._nombre_acudiente3 = value;
    }

    get apellido_acudiante3() {
        return this._apellido_acudiante3;
    }
    set apellido_acudiante3(value) {
        this._apellido_acudiante3 = value;
    }

    get id_tipo_documento_acudiente3() {
        return this._id_tipo_documento_acudiente3;
    }
    set id_tipo_documento_acudiente3(value) {
        this._id_tipo_documento_acudiente3 = value;
    }

    get numero_documento_acudiente3() {
        return this._numero_documento_acudiente3;
    }
    set numero_documento_acudiente3(value) {
        this._numero_documento_acudiente3 = value;
    }

    get tel_contacto_acudiente3() {
        return this._tel_contacto_acudiente3;
    }
    set tel_contacto_acudiente3(value) {
        this._tel_contacto_acudiente3 = value;
    }

    get correo_acudiente3() {
        return this._correo_acudiente3;
    }
    set correo_acudiente3(value) {
        this._correo_acudiente3 = value;
    }
}

const tabla = new t_matriculas();

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