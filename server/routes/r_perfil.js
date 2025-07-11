// Eduam/server/routes/r_perfil.js

import express from 'express';

import CrudClass from '../../model/database/crudsql.js'; 
const crud = new CrudClass(); 

import Database from '../../model/database/conectionDB.js'; 
const db = new Database(); 
const router = express.Router(); 


router.get('/datos/usuario/:id', async (req, res) => {
    const idUsuario = req.params.id;
    let userData = {};

    try {
        // 1. Obtener información básica del usuario
        const users = await crud.getByCondition('t_usuarios', `id_usuario = ${idUsuario}`);
        if (users.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        userData = users[0]; 

         if (userData.id_rol) {
            const roles = await crud.getByCondition('t_roles', `id_rol = ${userData.id_rol}`);
            if (roles.length > 0) {
                userData.nombre_rol = roles[0].nombre_rol; // Añade el nombre del rol al objeto userData
            } else {
                userData.nombre_rol = 'Rol Desconocido'; // En caso de que el ID del rol no se encuentre
            }
        } else {
            userData.nombre_rol = 'No Asignado'; // Si el usuario no tiene id_rol
        }

        res.status(200).json(userData);
        console.log(userData);

        // 2. Obtener el nombre del rol
        // const roles = await crud.getAll('t_roles'); 
        // const rolesMap = new Map(roles.map(rol => [rol.id_rol, rol.nombre_rol])); 

        // if (userData.id_rol && rolesMap.has(userData.id_rol)) {
        //     userData.rol_nombre = rolesMap.get(userData.id_rol); 
        // } else {
        //     userData.rol_nombre = 'Desconocido'; 
        // }

        // 3. Consultas condicionales por rol utilizando JOINs con la conexión directa a DB
        // if (userData.rol_nombre === 'estudiante') { 
        //     const queryEstudiante = `
        //         SELECT
        //             tu.id_usuario,
        //             tu.nombres_usuario,
        //             tu.apellidos_usuario,
        //             tu.correo_usuario,
        //             tu.telefono_usuario,
        //             tu.avatar_url_usuario,
        //             tu.id_rol,
        //             tr.nombre_rol AS rol_nombre,
        //             te.id_estudiante,
        //             te.id_curso AS id_curso_principal_estudiante, 
        //             tc_principal.nombre_curso AS nombre_curso_principal_estudiante,

        //             GROUP_CONCAT(DISTINCT 
        //                 CONCAT_WS(';', 
        //                     tic.id_informe_calificaciones, 
        //                     ta.id_actividad, 
        //                     ta.titulo_actividad, 
        //                     ta.descripcion_actividad, 
        //                     DATE_FORMAT(ta.fecha_publicacion, '%Y-%m-%d %H:%i:%s'), 
        //                     DATE_FORMAT(ta.fecha_entrega, '%Y-%m-%d %H:%i:%s'), 
        //                     ta.calificacion_nota,
        //                     curso_matriculado.id_curso,
        //                     curso_matriculado.nombre_curso
        //                 ) 
        //                 ORDER BY ta.fecha_publicacion DESC
        //             ) AS actividades_data_str,

        //             GROUP_CONCAT(DISTINCT CONCAT(curso_matriculado.id_curso, ':', curso_matriculado.nombre_curso)) AS cursos_matriculados_str
        //         FROM t_usuarios tu
        //         JOIN t_roles tr ON tu.id_rol = tr.id_rol
        //         LEFT JOIN t_estudiantes te ON tu.id_usuario = te.id_usuario
        //         LEFT JOIN t_curso tc_principal ON te.id_curso = tc_principal.id_curso
        //         LEFT JOIN t_informe_calificaciones tic ON te.id_estudiante = tic.id_estudiante
        //         LEFT JOIN t_actividad ta ON tic.id_actividad = ta.id_actividad
        //         LEFT JOIN t_curso curso_matriculado ON tic.id_curso = curso_matriculado.id_curso
        //         WHERE tu.id_usuario = ${idUsuario}
        //         GROUP BY tu.id_usuario, te.id_estudiante;
        //     `;
        //     const [estudianteResult] = await db.query(queryEstudiante); 

            // if (estudianteResult && estudianteResult.length > 0) {
            //     const result = estudianteResult[0];

            //     userData = {
            //         ...userData, 
            //         id_estudiante: result.id_estudiante,
            //         id_curso: result.id_curso_principal_estudiante, 
            //         nombre_curso_principal_estudiante: result.nombre_curso_principal_estudiante,

            //         actividades: [],
            //         cursos_matriculados: []
            //     };

            //     if (result.actividades_data_str) {
            //         const uniqueActivities = new Map();
            //         result.actividades_data_str.split(',').forEach(activityStr => {
            //             const parts = activityStr.split(';');
            //             const idActividad = parseInt(parts[1]);
            //             if (!uniqueActivities.has(idActividad) && parts.length === 9) { // Asegura que haya 9 partes
            //                 uniqueActivities.set(idActividad, {
            //                     id_informe_calificaciones: parseInt(parts[0]),
            //                     id_actividad: idActividad,
            //                     titulo_actividad: parts[2],
            //                     descripcion_actividad: parts[3],
            //                     fecha_publicacion: parts[4],
            //                     fecha_entrega: parts[5],
            //                     calificacion_nota: parseFloat(parts[6]),
            //                     id_curso: parseInt(parts[7]),
            //                     nombre_curso: parts[8]
            //                 });
            //             }
            //         });
            //         userData.actividades = Array.from(uniqueActivities.values());
            //     }

            //     if (result.cursos_matriculados_str) {
            //         const uniqueCourses = new Map();
            //         result.cursos_matriculados_str.split(',').forEach(courseStr => {
            //             const parts = courseStr.split(':');
            //             const id = parseInt(parts[0]);
            //             if (!isNaN(id) && !uniqueCourses.has(id)) {
            //                 uniqueCourses.set(id, {
            //                     id_curso: id,
            //                     nombre_curso: parts[1]
            //                 });
            //             }
            //         });
            //         userData.cursos_matriculados = Array.from(uniqueCourses.values());
            //     }

            // } else {
            //     userData.id_estudiante = null;
            //     userData.id_curso = null;
            //     userData.nombre_curso_principal_estudiante = null;
            //     userData.actividades = [];
            //     userData.cursos_matriculados = [];
            // }

//         } else if (userData.rol_nombre === 'docente') { 
//             const queryDocente = `
//                 SELECT
//                     tu.id_usuario,
//                     tu.nombres_usuario,
//                     tu.apellidos_usuario,
//                     tu.correo_usuario,
//                     tu.telefono_usuario,
//                     tu.avatar_url_usuario,
//                     tu.id_rol,
//                     tr.nombre_rol AS rol_nombre,
//                     td.id_docente,
//                     td.especialidad_docente,
//                     td.años_experiencia_docente,
//                     td.grado_academico_docente,
//                     td.fecha_contratacion_docente,
//                     GROUP_CONCAT(DISTINCT CONCAT(tc.id_curso, ':', tc.nombre_curso)) AS cursos_impartidos_str
//                 FROM t_usuarios tu
//                 JOIN t_roles tr ON tu.id_rol = tr.id_rol
//                 LEFT JOIN t_docentes td ON tu.id_usuario = td.id_usuario
//                 LEFT JOIN t_curso tc ON td.id_docente = tc.id_director_curso 
//                 WHERE tu.id_usuario = ${idUsuario}
//                 GROUP BY tu.id_usuario, td.id_docente;
//             `;
//             const [docenteResult] = await db.query(queryDocente);

//             if (docenteResult && docenteResult.length > 0) {
//                 const result = docenteResult[0];
//                 userData = {
//                     ...userData, 
//                     id_docente: result.id_docente,
//                     especialidad_docente: result.especialidad_docente,
//                     años_experiencia_docente: result.años_experiencia_docente,
//                     grado_academico_docente: result.grado_academico_docente,
//                     fecha_contratacion_docente: result.fecha_contratacion_docente,
//                     cursos_impartidos: []
//                 };

//                 if (result.cursos_impartidos_str) {
//                     const uniqueCourses = new Map();
//                     result.cursos_impartidos_str.split(',').forEach(courseStr => {
//                         const parts = courseStr.split(':');
//                         const id = parseInt(parts[0]);
//                         if (!isNaN(id) && !uniqueCourses.has(id)) {
//                             uniqueCourses.set(id, {
//                                 id_curso: id,
//                                 nombre_curso: parts[1]
//                             });
//                         }
//                     });
//                     userData.cursos_impartidos = Array.from(uniqueCourses.values());
//                 }
//             } else {
//                 userData.id_docente = null;
//                 userData.especialidad_docente = null;
//                 userData.años_experiencia_docente = null;
//                 userData.grado_academico_docente = null;
//                 userData.fecha_contratacion_docente = null;
//                 userData.cursos_impartidos = [];
//             }
//         }

        // return res.json(userData); 
    } catch (error) {
        console.error('Error en r_perfil.js:', error);
        return res.status(500).json({ message: 'Error interno del servidor al obtener el perfil.' });
    } 
});

export default router;