import Database from "../model/database/conectionDB.js";
import Crud from "../model/database/crudsql.js";

class t_matriculas{

    constructor(){
        this.id_matricula = "";
        this.primer_nombre_estudiante = "";
        this.nombres_adicionales_estudiante = "";
        this.primer_apellido_estudiante = "";
        this.apellidos_adicionales_estudiante = "";
        this.estado_matricula = "";
        this.fecha_matricula = "";
        this.repitente = "";
        this.eps = "";
        this.sisben = "";
        this.estrato = "";
        this.discapacidad ="";
        this.jornada = "";
        this.direccion_residencia ="";
        this.id_tipo_documento_estudiante = "";
        this.documento_estudiante = "";
        this.observaciones = "";

        this.nombre_acudiente1 ="";
        this.apellido_acudiente1 ="";
        this.id_tipo_documento_acudiente1 = "";
        this.numero_documento_acudiente1="";
        this.tel_contacto_acudiente1="";
        this.correo_acudiente1="";

        this.nombre_acudiente2="";
        this.apellido_acudiente2="";
        this.id_tipo_documento_acudiente2="";
        this.numero_documento_acudiente2="";
        this.tel_contacto_acudiente2="";
        this.correo_acudiente2="";

        this.nombre_acudiente3="";
        this.apellido_acudiente3="";
        this.id_tipo_documento_acudiente3="";
        this.numero_documento_acudiente3="";
        this.tel_contacto_acudiente3="";
        this.correo_acudiente3="";
        
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
                apellido_acudiente1,
                id_tipo_documento_acudiente1,
                numero_documento_acudiente1,
                tel_contacto_acudiente1,
                correo_acudiente1,

                nombre_acudiente2,
                apellido_acudiente2,
                id_tipo_documento_acudiente2,
                numero_documento_acudiente2,
                tel_contacto_acudiente2,
                correo_acudiente2,

                nombre_acudiente3,
                apellido_acudiente3,
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
            this.apellido_acudiente1,
            this.id_tipo_documento_acudiente1,
            this.numero_documento_acudiente1,
            this.tel_contacto_acudiente1,
            this.correo_acudiente1,

            this.nombre_acudiente2,
            this.apellido_acudiente2,
            this.id_tipo_documento_acudiente2,
            this.numero_documento_acudiente2,
            this.tel_contacto_acudiente2,
            this.correo_acudiente2,

            this.nombre_acudiente3,
            this.apellido_acudiente3,
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
    const data = {
        primer_nombre_estudiante: this.primer_nombre_estudiante,
        nombres_adicionales_estudiante: this.nombres_adicionales_estudiante,
        primer_apellido_estudiante: this.primer_apellido_estudiante,
        apellidos_adicionales_estudiante: this.apellidos_adicionales_estudiante,
        estado_matricula: this.estado_matricula,
        fecha_matricula: this.fecha_matricula,
        repitente: this.repitente,
        eps: this.eps,
        sisben: this.sisben,
        estrato: this.estrato,
        discapacidad: this.discapacidad,
        jornada: this.jornada,
        direccion_residencia: this.direccion_residencia,
        id_tipo_documento_estudiante: this.id_tipo_documento_estudiante,
        documento_estudiante: this.documento_estudiante,
        observaciones: this.observaciones,

        nombre_acudiente1: this.nombre_acudiente1,
        apellido_acudiente1: this.apellido_acudiente1,
        id_tipo_documento_acudiente1: this.id_tipo_documento_acudiente1,
        numero_documento_acudiente1: this.numero_documento_acudiente1,
        tel_contacto_acudiente1: this.tel_contacto_acudiente1,
        correo_acudiente1: this.correo_acudiente1,

        nombre_acudiente2: this.nombre_acudiente2,
        apellido_acudiente2: this.apellido_acudiente2,
        id_tipo_documento_acudiente2: this.id_tipo_documento_acudiente2,
        numero_documento_acudiente2: this.numero_documento_acudiente2,
        tel_contacto_acudiente2: this.tel_contacto_acudiente2,
        correo_acudiente2: this.correo_acudiente2,

        nombre_acudiente3: this.nombre_acudiente3,
        apellido_acudiente3: this.apellido_acudiente3,
        id_tipo_documento_acudiente3: this.id_tipo_documento_acudiente3,
        numero_documento_acudiente3: this.numero_documento_acudiente3,
        tel_contacto_acudiente3: this.tel_contacto_acudiente3,
        correo_acudiente3: this.correo_acudiente3,
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
    const query = "DELETE FROM t_matricula WHERE id_matricula = ?";
    await this.db.consultar(query, [doc]);
    await this.db.cerrar();
    return this.db.getData();
}

    async createMatricula(matriculaData) {
        let connection;
        try {
            connection = await this.db.connect(); // Obtiene una conexión del pool

            // Define la consulta SQL para insertar los datos
            // **¡IMPORTANTE!** Los nombres de las columnas en esta consulta (ej. `primer_nombre_estudiante`)
            // DEBEN coincidir *exactamente* con los nombres de las columnas en tu tabla `t_matricula` en MySQL.
            // Si tu tabla usa nombres diferentes (ej. `primerNombreEstudiante` o `primer_nombre_est`),
            // DEBES cambiarlos aquí.
            const query = `
                INSERT INTO t_matricula (
                    primer_nombre_estudiante, nombres_adicionales_estudiante,
                    primer_apellido_estudiante, apellidos_adicionales_estudiante,
                    id_tipo_documento_estudiante, documento_estudiante,
                    eps, estrato, repitente,
                    jornada, direccion_residencia,
                    discapacidad, observaciones,
                    nombre_acudiente1, apellido_acudiente1,
                    id_tipo_documento_acudiente1, numero_documento_acudiente1,
                    tel_contacto_acudiente1, correo_acudiente1,
                    estado_matricula, fecha_matricula
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            // Mapea los datos del objeto matriculaData a un array en el ORDEN correcto para la consulta SQL
            const values = [
                matriculaData.primer_nombre_estudiante || null,
                matriculaData.nombres_adicionales_estudiante || null,
                matriculaData.primer_apellido_estudiante || null,
                matriculaData.apellidos_adicionales_estudiante || null,
                matriculaData.id_tipo_documento_estudiante || null, // Del frontend: id_tipo_identificacion
                matriculaData.documento_estudiante || null,
                matriculaData.eps || null, // Del frontend: eps_estudiante
                matriculaData.estrato || null, // Del frontend: estrato_estudiante
                matriculaData.repitente, // Ya es booleano
                matriculaData.jornada || null, // Del frontend: jornada_estudiante
                matriculaData.direccion_residencia || null,
                matriculaData.discapacidad || null, // Del frontend: discapacidad_estudiante
                matriculaData.observaciones || null,

                matriculaData.nombre_acudiente1 || null, // Del frontend: primer_nombre_acudiente
                matriculaData.apellido_acudiente1 || null,
                matriculaData.id_tipo_documento_acudiente1 || null,
                matriculaData.numero_documento_acudiente1 || null,
                matriculaData.tel_contacto_acudiente1 || null,
                matriculaData.correo_acudiente1 || null,

                // Campos que se asignan en el backend
                'Pendiente', // Valor por defecto para estado_matricula
                new Date().toISOString().slice(0, 19).replace('T', ' ') // Formato 'YYYY-MM-DD HH:MM:SS' para fecha_matricula
            ];

            // console.log("Executing query with values:", values); // Debugging
            const [result] = await connection.execute(query, values);
            return result.insertId; // Devuelve el ID de la fila insertada
        } catch (error) {
            console.error('Error en createMatricula:', error);
            throw error; // Lanza el error para que sea capturado en la ruta
        } finally {
            if (connection) {
               await connection.end(); // cierra la conexion

            }
            // Con `mysql2/promise` pool, la conexión se libera automáticamente, no necesitas `connection.end()` aquí.
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

    // --- Acudiente 1 ---
    get nombre_acudiente1() {
        return this._nombre_acudiente1;
    }
    set nombre_acudiente1(value) {
        this._nombre_acudiente1 = value;
    }

    get apellido_acudiente1() {
        return this._apellido_acudiante1;
    }
    set apellido_acudiente1(value) {
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

    get apellido_acudiente2() {
        return this._apellido_acudiante2;
    }
    set apellido_acudiente2(value) {
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

    get apellido_acudiente3() {
        return this._apellido_acudiante3;
    }
    set apellido_acudiente3(value) {
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