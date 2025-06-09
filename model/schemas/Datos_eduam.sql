USE eduam;

-- Desactivar temporalmente la verificación de claves foráneas para truncar tablas
SET FOREIGN_KEY_CHECKS = 0;

-- Truncar todas las tablas en el orden inverso de sus dependencias para evitar errores
TRUNCATE TABLE t_anexos_matricula;
TRUNCATE TABLE t_boletin;
TRUNCATE TABLE t_asistencias;
TRUNCATE TABLE t_comentario_actividad;
TRUNCATE TABLE t_recurso_actividad;
TRUNCATE TABLE t_periodo_actividad;
TRUNCATE TABLE t_informe_calificaciones;
TRUNCATE TABLE t_docente_asignatura;
TRUNCATE TABLE t_anuncios_contextos;
TRUNCATE TABLE t_anuncios_recursos;
TRUNCATE TABLE t_comentarios_anuncios;
TRUNCATE TABLE t_anuncios;
TRUNCATE TABLE t_administrativos;
TRUNCATE TABLE t_rol_permisos;
TRUNCATE TABLE t_permisos;
TRUNCATE TABLE t_archivo_documento;
TRUNCATE TABLE t_categoria_archivo;
TRUNCATE TABLE t_recursos;
TRUNCATE TABLE t_tipo_archivo;
TRUNCATE TABLE t_actividad;
TRUNCATE TABLE t_categoria_actividad;
TRUNCATE TABLE t_estudiantes;
TRUNCATE TABLE t_curso;
TRUNCATE TABLE t_grado;
TRUNCATE TABLE t_docente;
TRUNCATE TABLE t_comentarios;
TRUNCATE TABLE t_matricula; -- Mover aquí para que se trunque antes de usuarios si id_matricula es FK
TRUNCATE TABLE t_tipo_identificacion;
TRUNCATE TABLE t_usuarios;
TRUNCATE TABLE t_estado_usuario;
TRUNCATE TABLE t_roles;
TRUNCATE TABLE t_asignaturas;
TRUNCATE TABLE t_periodo_academico;

-- Reactivar la verificación de claves foráneas
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Inserción de datos en t_roles
INSERT INTO t_roles (id_rol, nombre_rol, descripcion_rol) VALUES
(1, 'administrador', 'Acceso completo al sistema y gestión de usuarios.'),
(2, 'docente', 'Gestión de cursos, asignaturas y calificaciones.'),
(3, 'estudiante', 'Acceso a materiales de estudio, actividades y calificaciones.'),
(4, 'acudiente', 'Seguimiento del progreso académico del estudiante y comunicación con la institución.');

-- 2. Inserción de datos en t_estado_usuario
INSERT INTO t_estado_usuario (id_estado_usuario, nombre_estado_usuario) VALUES
(1, 'Activo'),
(2, 'Inactivo'),
(3, 'Pendiente'),
(4, 'Bloqueado');

-- 3. Inserción de datos en t_usuarios (1 admin, 5 docentes, 15 estudiantes, 15 acudientes)
-- Administrador
INSERT INTO t_usuarios (id_usuario, nombres_usuario, apellidos_usuario, correo_usuario, contraseña_usuario, telefono_usuario, avatar_url_usuario, id_rol, id_estado_usuario) VALUES
(1, 'Andrea', 'Mendez', 'andrea.mendez@eduam.com', 'passadmin1', '3001002000', 'avatar_andrea.jpg', 1, 1);

-- Docentes
INSERT INTO t_usuarios (id_usuario, nombres_usuario, apellidos_usuario, correo_usuario, contraseña_usuario, telefono_usuario, avatar_url_usuario, id_rol, id_estado_usuario) VALUES
(2, 'Carlos', 'Guerra', 'carlos.guerra@eduam.com', 'passdocente1', '3101002001', 'avatar_carlos.jpg', 2, 1),
(3, 'Diana', 'Vega', 'diana.vega@eduam.com', 'passdocente2', '3101002002', 'avatar_diana.jpg', 2, 1),
(4, 'Felipe', 'Ruiz', 'felipe.ruiz@eduam.com', 'passdocente3', '3101002003', 'avatar_felipe.jpg', 2, 1),
(5, 'Gabriela', 'Soto', 'gabriela.soto@eduam.com', 'passdocente4', '3101002004', 'avatar_gabriela.jpg', 2, 1),
(6, 'Hector', 'Castaño', 'hector.castano@eduam.com', 'passdocente5', '3101002005', 'avatar_hector.jpg', 2, 1);

-- Estudiantes (15 estudiantes)
INSERT INTO t_usuarios (id_usuario, nombres_usuario, apellidos_usuario, correo_usuario, contraseña_usuario, telefono_usuario, avatar_url_usuario, id_rol, id_estado_usuario) VALUES
(7, 'Alejandro', 'Lopez', 'alejandro.lopez@eduam.com', 'passest1', '3201003001', 'avatar_alejandro.jpg', 3, 1),
(8, 'Brenda', 'Jimenez', 'brenda.jimenez@eduam.com', 'passest2', '3201003002', 'avatar_brenda.jpg', 3, 1),
(9, 'Cristian', 'Mora', 'cristian.mora@eduam.com', 'passest3', '3201003003', 'avatar_cristian.jpg', 3, 1),
(10, 'Daniela', 'Pardo', 'daniela.pardo@eduam.com', 'passest4', '3201003004', 'avatar_daniela.jpg', 3, 1),
(11, 'Esteban', 'Quintero', 'esteban.quintero@eduam.com', 'passest5', '3201003005', 'avatar_esteban.jpg', 3, 1),
(12, 'Fernanda', 'Rojas', 'fernanda.rojas@eduam.com', 'passest6', '3201003006', 'avatar_fernanda.jpg', 3, 1),
(13, 'Gustavo', 'Vargas', 'gustavo.vargas@eduam.com', 'passest7', '3201003007', 'avatar_gustavo.jpg', 3, 1),
(14, 'Isabel', 'Marin', 'isabel.marin@eduam.com', 'passest8', '3201003008', 'avatar_isabel.jpg', 3, 1),
(15, 'Julian', 'Osorio', 'julian.osorio@eduam.com', 'passest9', '3201003009', 'avatar_julian.jpg', 3, 1),
(16, 'Karen', 'Nieto', 'karen.nieto@eduam.com', 'passest10', '3201003010', 'avatar_karen.jpg', 3, 1),
(17, 'Leonardo', 'Paz', 'leonardo.paz@eduam.com', 'passest11', '3201003011', 'avatar_leonardo.jpg', 3, 1),
(18, 'Maria', 'Serrano', 'maria.serrano@eduam.com', 'passest12', '3201003012', 'avatar_maria_e.jpg', 3, 1),
(19, 'Nicolas', 'Torres', 'nicolas.torres@eduam.com', 'passest13', '3201003013', 'avatar_nicolas.jpg', 3, 1),
(20, 'Olga', 'Urrego', 'olga.urrego@eduam.com', 'passest14', '3201003014', 'avatar_olga_e.jpg', 3, 1),
(21, 'Pedro', 'Velez', 'pedro.velez@eduam.com', 'passest15', '3201003015', 'avatar_pedro_e.jpg', 3, 1);

-- Acudientes (15 acudientes, uno por cada estudiante)
INSERT INTO t_usuarios (id_usuario, nombres_usuario, apellidos_usuario, correo_usuario, contraseña_usuario, telefono_usuario, avatar_url_usuario, id_rol, id_estado_usuario) VALUES
(22, 'Laura', 'Lopez', 'laura.lopez@eduam.com', 'passacudiente1', '3301004001', 'avatar_laura_a.jpg', 4, 1), -- Acudiente de Alejandro
(23, 'Miguel', 'Jimenez', 'miguel.jimenez@eduam.com', 'passacudiente2', '3301004002', 'avatar_miguel_a.jpg', 4, 1), -- Acudiente de Brenda
(24, 'Natalia', 'Mora', 'natalia.mora@eduam.com', 'passacudiente3', '3301004003', 'avatar_natalia_a.jpg', 4, 1), -- Acudiente de Cristian
(25, 'Oscar', 'Pardo', 'oscar.pardo@eduam.com', 'passacudiente4', '3301004004', 'avatar_oscar_a.jpg', 4, 1), -- Acudiente de Daniela
(26, 'Paola', 'Quintero', 'paola.quintero@eduam.com', 'passacudiente5', '3301004005', 'avatar_paola_a.jpg', 4, 1), -- Acudiente de Esteban
(27, 'Ricardo', 'Rojas', 'ricardo.rojas@eduam.com', 'passacudiente6', '3301004006', 'avatar_ricardo_a.jpg', 4, 1), -- Acudiente de Fernanda
(28, 'Sara', 'Vargas', 'sara.vargas@eduam.com', 'passacudiente7', '3301004007', 'avatar_sara_a.jpg', 4, 1), -- Acudiente de Gustavo
(29, 'Tomas', 'Marin', 'tomas.marin@eduam.com', 'passacudiente8', '3301004008', 'avatar_tomas_a.jpg', 4, 1), -- Acudiente de Isabel
(30, 'Ursula', 'Osorio', 'ursula.osorio@eduam.com', 'passacudiente9', '3301004009', 'avatar_ursula_a.jpg', 4, 1), -- Acudiente de Julian
(31, 'Viviana', 'Nieto', 'viviana.nieto@eduam.com', 'passacudiente10', '3301004010', 'avatar_viviana_a.jpg', 4, 1), -- Acudiente de Karen
(32, 'Wilson', 'Paz', 'wilson.paz@eduam.com', 'passacudiente11', '3301004011', 'avatar_wilson_a.jpg', 4, 1), -- Acudiente de Leonardo
(33, 'Ximena', 'Serrano', 'ximena.serrano@eduam.com', 'passacudiente12', '3301004012', 'avatar_ximena_a.jpg', 4, 1), -- Acudiente de Maria
(34, 'Yolanda', 'Torres', 'yolanda.torres@eduam.com', 'passacudiente13', '3301004013', 'avatar_yolanda_a.jpg', 4, 1), -- Acudiente de Nicolas
(35, 'Zoe', 'Urrego', 'zoe.urrego@eduam.com', 'passacudiente14', '3301004014', 'avatar_zoe_a.jpg', 4, 1), -- Acudiente de Olga
(36, 'David', 'Velez', 'david.velez@eduam.com', 'passacudiente15', '3301004015', 'avatar_david_a.jpg', 4, 1); -- Acudiente de Pedro

-- 4. Inserción de datos en t_comentarios (Vinculados a usuarios de tipo estudiante o docente)
INSERT INTO t_comentarios (id_comentario, comentario, id_usuario) VALUES
(1, 'Excelente material de apoyo para la clase.', 7), -- Alejandro (Estudiante)
(2, 'No me queda clara la fecha de entrega, por favor confirmar.', 8), -- Brenda (Estudiante)
(3, 'Buen trabajo, se nota la dedicación.', 2), -- Carlos (Docente)
(4, 'Necesito más ejemplos prácticos.', 9), -- Cristian (Estudiante)
(5, 'Felicitaciones por la organización del evento.', 1), -- Andrea (Admin)
(6, 'Podrían habilitar más espacio para los archivos.', 10), -- Daniela (Estudiante)
(7, 'El recurso es muy útil para comprender el tema.', 11), -- Esteban (Estudiante)
(8, 'Considero que la calificación es justa.', 12), -- Fernanda (Estudiante)
(9, 'Dudas sobre el procedimiento del laboratorio.', 13); -- Gustavo (Estudiante)

-- 5. Inserción de datos en t_docente (Vincula a usuarios con rol de docente)
INSERT INTO t_docente (id_docente, id_usuario) VALUES
(1, 2), -- Carlos Guerra
(2, 3), -- Diana Vega
(3, 4), -- Felipe Ruiz
(4, 5), -- Gabriela Soto
(5, 6); -- Hector Castaño

-- 6. Inserción de datos en t_administrativos (Vincula a usuarios con rol de administrador)
INSERT INTO t_administrativos (id_administrativos, id_usuario) VALUES
(1, 1); -- Andrea Mendez

-- 7. Inserción de datos en t_grado
INSERT INTO t_grado (id_grado, nombre_grado) VALUES
(1, 'Primero'), (2, 'Segundo'), (3, 'Tercero'), (4, 'Cuarto'), (5, 'Quinto'),
(6, 'Sexto'), (7, 'Séptimo'), (8, 'Octavo'), (9, 'Noveno'), (10, 'Décimo'), (11, 'Once');

-- 8. Inserción de datos en t_curso (Directores son docentes existentes)
INSERT INTO t_curso (id_curso, id_director_curso, id_grado, nombre_curso) VALUES
(1, 1, 1, '1A'), -- Dirigido por Docente Carlos
(2, 1, 2, '2A'),
(3, 2, 3, '3B'), -- Dirigido por Docente Diana
(4, 2, 4, '4B'),
(5, 3, 5, '5C'), -- Dirigido por Docente Felipe
(6, 3, 6, '6C'),
(7, 4, 7, '7D'), -- Dirigido por Docente Gabriela
(8, 4, 8, '8D'),
(9, 5, 9, '9E'), -- Dirigido por Docente Hector
(10, 5, 10, '10E');

-- 9. Inserción de datos en t_estudiantes (Vincula a usuarios estudiantes con cursos existentes)
INSERT INTO t_estudiantes(id_estudiante, id_usuario, id_curso) VALUES
(1, 7, 1),   -- Alejandro Lopez en 1A
(2, 8, 1),   -- Brenda Jimenez en 1A
(3, 9, 2),   -- Cristian Mora en 2A
(4, 10, 2),  -- Daniela Pardo en 2A
(5, 11, 3),  -- Esteban Quintero en 3B
(6, 12, 3),  -- Fernanda Rojas en 3B
(7, 13, 4),  -- Gustavo Vargas en 4B
(8, 14, 4),  -- Isabel Marin en 4B
(9, 15, 5),  -- Julian Osorio en 5C
(10, 16, 5), -- Karen Nieto en 5C
(11, 17, 6), -- Leonardo Paz en 6C
(12, 18, 6), -- Maria Serrano en 6C
(13, 19, 7), -- Nicolas Torres en 7D
(14, 20, 7), -- Olga Urrego en 7D
(15, 21, 8); -- Pedro Velez en 8D


-- 10. Inserción de datos en t_categoria_actividad
INSERT INTO t_categoria_actividad (id_categoria_actividad, nombre_categoria_actividad) VALUES
(1, 'Tarea Escrita'),
(2, 'Examen Oral'),
(3, 'Proyecto Grupal'),
(4, 'Participación en Clase'),
(5, 'Investigación Individual');

-- 11. Inserción de datos en t_actividad (Vinculadas a categorías)
INSERT INTO t_actividad (id_actividad, titulo_actividad, descripcion_actividad, fecha_publicacion, fecha_entrega, calificacion_nota, id_categoria_actividad) VALUES
(1, 'Análisis de Cuentos Clásicos', 'Análisis literario de "Cien años de soledad".', '2024-03-01 08:00:00', '2024-03-15 23:59:59', 5.0, 1),
(2, 'Experimento de Química', 'Práctica de laboratorio sobre reacciones ácido-base.', '2024-03-05 09:00:00', '2024-03-19 17:00:00', 4.5, 3),
(3, 'Resolución de Problemas de Álgebra', 'Conjunto de ejercicios sobre ecuaciones lineales.', '2024-03-10 10:00:00', '2024-03-24 23:59:59', 4.0, 1),
(4, 'Presentación de Historia', 'Exposición sobre la Revolución Francesa.', '2024-03-15 11:00:00', '2024-03-29 17:00:00', 5.0, 3),
(5, 'Ensayo sobre Ética', 'Redacción de un ensayo argumentativo sobre la ética en la IA.', '2024-03-20 12:00:00', '2024-04-03 23:59:59', 3.8, 1),
(6, 'Debate de Geografía', 'Debate grupal sobre el cambio climático y sus efectos.', '2024-04-01 13:00:00', '2024-04-10 17:00:00', 4.2, 4);

-- 12. Inserción de datos en t_asignaturas
INSERT INTO t_asignaturas (id_asignatura, nombre_asignatura) VALUES
(1, 'Literatura'),
(2, 'Química'),
(3, 'Álgebra'),
(4, 'Historia Universal'),
(5, 'Ética y Valores'),
(6, 'Geografía');

-- 13. Inserción de datos en t_periodo_academico
INSERT INTO t_periodo_academico (id_periodo, nombre_periodo, fecha_inicio, fecha_fin, año_academico) VALUES
(1, 'Primer Periodo', '2024-01-15', '2024-04-05', 2024),
(2, 'Segundo Periodo', '2024-04-15', '2024-07-05', 2024),
(3, 'Tercer Periodo', '2024-08-01', '2024-10-25', 2024),
(4, 'Cuarto Periodo', '2024-11-04', '2024-12-13', 2024);

-- 14. Inserción de datos en t_informe_calificaciones (Consistencia entre actividades, periodos, docentes, estudiantes, asignaturas y cursos)
INSERT INTO t_informe_calificaciones (id_informe_calificaciones, id_actividad, id_periodo, id_docente, id_estudiante, id_asignatura, id_curso) VALUES
(1, 1, 1, 1, 1, 1, 1), -- Alejandro, Literatura, 1A (Docente Carlos)
(2, 2, 1, 1, 2, 2, 1), -- Brenda, Química, 1A (Docente Carlos)
(3, 3, 1, 2, 3, 3, 2), -- Cristian, Álgebra, 2A (Docente Diana)
(4, 4, 1, 2, 4, 4, 2), -- Daniela, Historia Universal, 2A (Docente Diana)
(5, 5, 1, 3, 5, 5, 3), -- Esteban, Ética y Valores, 3B (Docente Felipe)
(6, 6, 2, 4, 7, 6, 4), -- Gustavo, Geografía, 4B (Docente Gabriela)
(7, 1, 2, 1, 8, 1, 4), -- Isabel, Literatura, 4B (Docente Carlos)
(8, 2, 2, 1, 9, 2, 5); -- Julian, Química, 5C (Docente Carlos)


-- 15. Inserción de datos en t_permisos
INSERT INTO t_permisos (id_permiso, nombre_permiso, descripcion_permiso) VALUES
(1, 'crear_usuarios', 'Permite crear nuevos usuarios.'),
(2, 'editar_usuarios', 'Permite editar información de usuarios existentes.'),
(3, 'eliminar_usuarios', 'Permite eliminar usuarios.'),
(4, 'gestionar_cursos', 'Permite crear, editar y eliminar cursos.'),
(5, 'ver_calificaciones', 'Permite ver las calificaciones de los estudiantes.'),
(6, 'subir_recursos', 'Permite subir recursos educativos.'),
(7, 'publicar_anuncios', 'Permite publicar anuncios institucionales.'),
(8, 'administrar_matriculas', 'Permite gestionar el proceso de matrícula.');

-- 16. Inserción de datos en t_rol_permisos
INSERT INTO t_rol_permisos (id_rol_permiso, id_rol, id_permisos) VALUES
(1, 1, 1), (2, 1, 2), (3, 1, 3), (4, 1, 4), (5, 1, 5), (6, 1, 6), (7, 1, 7), (8, 1, 8), -- Administrador tiene todos los permisos
(9, 2, 4), (10, 2, 5), (11, 2, 6), (12, 2, 7), -- Docente: gestionar cursos, ver calificaciones, subir recursos, publicar anuncios
(13, 3, 5), -- Estudiante: ver calificaciones
(14, 4, 5); -- Acudiente: ver calificaciones

-- 17. Inserción de datos en t_anuncios (id_autor apunta a un usuario con rol admin o docente)
INSERT INTO t_anuncios (id_anuncio, titulo_anuncio, descripcion_anuncio, fecha_creacion, fecha_expiracion, id_autor, estado) VALUES
(1, 'Inicio de Clases', 'Les damos la bienvenida al nuevo año escolar 2024.', '2024-01-10 08:00:00', '2024-02-10 23:59:59', 1, TRUE), -- Admin (Andrea)
(2, 'Recordatorio: Reunión de Padres', 'Se llevará a cabo el próximo viernes 10 de marzo.', '2024-03-01 10:00:00', '2024-03-09 17:00:00', 1, TRUE), -- Admin (Andrea)
(3, 'Concurso de Robótica', 'Inscripciones abiertas para el concurso de robótica escolar.', '2024-03-15 11:30:00', '2024-03-31 23:59:59', 2, TRUE), -- Docente (Carlos)
(4, 'Semana Cultural', 'Programa de actividades para la semana cultural.', '2024-04-01 09:00:00', '2024-04-05 18:00:00', 3, TRUE), -- Docente (Diana)
(5, 'Cierre de Notas Primer Periodo', 'Recordatorio para el envío de calificaciones finales.', '2024-04-02 14:00:00', '2024-04-05 23:59:59', 1, TRUE); -- Admin (Andrea)

-- 18. Inserción de datos en t_comentarios_anuncios (Vinculando comentarios a anuncios existentes)
INSERT INTO t_comentarios_anuncios (id_comentarios_anuncio, id_anuncio, id_comentario) VALUES
(1, 1, 1), -- Comentario 1 (Alejandro) sobre Anuncio 1 (Inicio de Clases)
(2, 2, 2), -- Comentario 2 (Brenda) sobre Anuncio 2 (Reunión de Padres)
(3, 3, 3), -- Comentario 3 (Carlos) sobre Anuncio 3 (Concurso Robótica)
(4, 1, 6); -- Comentario 6 (Daniela) sobre Anuncio 1 (Inicio de Clases)

-- 19. Inserción de datos en t_tipo_archivo
INSERT INTO t_tipo_archivo (id_tipo_archivo, tipo_archivo) VALUES
(1, 'PDF'), (2, 'DOCX'), (3, 'JPG'), (4, 'PNG'), (5, 'MP4'), (6, 'XLSX');

-- 20. Inserción de datos en t_recursos (Vinculados a tipos de archivo)
INSERT INTO t_recursos (id_recurso, nombre_recurso, descripcion_recurso, id_tipo_recurso, id_tipo_archivo, direcion_url_recurso, fecha_recurso_agregado) VALUES
(1, 'Guía de Gramática Español', 'Documento con reglas y ejercicios de gramática.', 1, 1, 'http://recursos.eduam.com/guias/gramatica_espanol.pdf', '2024-02-10'),
(2, 'Video Tutorial de Física', 'Video explicativo sobre movimiento parabólico.', 1, 5, 'http://recursos.eduam.com/videos/fisica_movimiento.mp4', '2024-02-15'),
(3, 'Presentación de Biología Celular', 'Diapositivas sobre la estructura y función de la célula.', 1, 2, 'http://recursos.eduam.com/presentaciones/biologia_celular.docx', '2024-02-20'),
(4, 'Mapa Político de Colombia', 'Imagen de alta resolución del mapa político de Colombia.', 1, 3, 'http://recursos.eduam.com/imagenes/mapa_colombia.jpg', '2024-02-25'),
(5, 'Ejercicios Resueltos de Matemáticas', 'Cuadernillo con problemas de cálculo y sus soluciones.', 1, 1, 'http://recursos.eduam.com/ejercicios/matematicas_resueltos.pdf', '2024-03-01');

-- 21. Inserción de datos en t_anuncios_recursos (Vinculando recursos a anuncios existentes)
INSERT INTO t_anuncios_recursos (id_anuncio_recurso, id_recurso, id_anuncio) VALUES
(1, 1, 1), -- Guía de Gramática para Anuncio Inicio de Clases
(2, 2, 3), -- Video Física para Anuncio Concurso Robótica (ejemplo de recurso para un anuncio específico)
(3, 3, 4); -- Presentación Biología para Anuncio Semana Cultural

-- 22. Inserción de datos en t_anuncios_contextos
INSERT INTO t_anuncios_contextos (id_anuncio_contexto, id_anuncio, contexto) VALUES
(1, 1, 'general'),
(2, 2, 'general'),
(3, 3, 'docentes'),
(4, 4, 'general'),
(5, 5, 'general');

-- 23. Inserción de datos en t_docente_asignatura (Vinculando docentes a asignaturas)
INSERT INTO t_docente_asignatura (id_docente_asignatura, id_docente, id_asignatura) VALUES
(1, 1, 1), -- Carlos Guerra enseña Literatura
(2, 1, 2), -- Carlos Guerra enseña Química
(3, 2, 3), -- Diana Vega enseña Álgebra
(4, 2, 4), -- Diana Vega enseña Historia Universal
(5, 3, 5), -- Felipe Ruiz enseña Ética y Valores
(6, 4, 6); -- Gabriela Soto enseña Geografía

-- 24. Inserción de datos en t_periodo_actividad (Vinculando periodos a actividades)
INSERT INTO t_periodo_actividad (id_periodo_actividad, id_periodo, id_actividad) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 2, 4),
(5, 2, 5),
(6, 2, 6);

-- 25. Inserción de datos en t_recurso_actividad (Vinculando recursos a actividades)
INSERT INTO t_recurso_actividad (id_recurso_actividad, id_recurso, id_actividad) VALUES
(1, 1, 1), -- Guía de Gramática para Análisis de Cuentos Clásicos
(2, 2, 2), -- Video Tutorial de Física para Experimento de Química (ejemplo de recurso de otra materia)
(3, 3, 3), -- Presentación de Biología Celular para Resolución de Problemas de Álgebra
(4, 5, 5); -- Ejercicios Resueltos de Matemáticas para Ensayo sobre Ética

-- 26. Inserción de datos en t_comentario_actividad (Vinculando comentarios a actividades)
INSERT INTO t_comentario_actividad (id_comentario_actividad, id_comentario, id_actividad) VALUES
(1, 1, 1),
(2, 4, 3),
(3, 7, 2),
(4, 8, 4);

-- 27. Inserción de datos en t_asistencias (Consistencia entre estudiantes, docentes, asignaturas, cursos y periodos)
INSERT INTO t_asistencias (id_asistencia, id_estudiante, id_docente, id_asignatura, id_curso, id_periodo, fecha, estado, observaciones) VALUES
(1, 1, 1, 1, 1, 1, '2024-03-04', 'Presente', 'Ninguna.'),
(2, 2, 1, 1, 1, 1, '2024-03-04', 'Ausente', 'Enfermedad.'),
(3, 3, 2, 3, 2, 1, '2024-03-05', 'Presente', 'Participación activa.'),
(4, 4, 2, 3, 2, 1, '2024-03-05', 'Retardo', 'Tráfico.'),
(5, 5, 3, 5, 3, 1, '2024-03-06', 'Presente', 'Ninguna.'),
(6, 6, 3, 5, 3, 1, '2024-03-06', 'Justificado', 'Cita médica.'),
(7, 7, 4, 6, 4, 2, '2024-04-20', 'Presente', 'Ninguna.'),
(8, 8, 4, 6, 4, 2, '2024-04-20', 'Ausente', 'Viaje familiar.');


-- 28. Inserción de datos en t_tipo_identificacion
INSERT INTO t_tipo_identificacion (id_identificacion, tipo_identificacion, descripcion_tipo) VALUES
(1, 'Cédula de Ciudadanía', 'Documento de identificación para mayores de edad en Colombia.'),
(2, 'Tarjeta de Identidad', 'Documento de identificación para menores de edad en Colombia.'),
(3, 'Registro Civil', 'Documento de identificación para recién nacidos en Colombia.'),
(4, 'Pasaporte', 'Documento de identificación internacional.');

-- 29. Inserción de datos en t_matricula (15 matrículas para 15 estudiantes, vinculadas a acudientes y tipos de documento)
INSERT INTO t_matricula (id_matricula, primer_nombre_estudiante, nombres_adicionales_estudiante, primer_apellido_estudiante, apellidos_adicionales_estudiante, estado_matricula, fecha_matricula, repitente, eps, sisben, estrato, discapacidad, jornada, direccion_residencia, id_tipo_documento_estudiante, documento_estudiante, observaciones, nombre_acudiente1, apellido_acudiente1, id_tipo_documento_acudiente1, numero_documento_acudiente1, tel_contacto_acudiente1, correo_acudiente1, nombre_acudiente2, apellido_acudiente2, id_tipo_documento_acudiente2, numero_documento_acudiente2, tel_contacto_acudiente2, correo_acudiente2, nombre_acudiente3, apellido_acudiente3, id_tipo_documento_acudiente3, numero_documento_acudiente3, tel_contacto_acudiente3, correo_acudiente3) VALUES
(1, 'Alejandro', NULL, 'Lopez', 'Garcia', 'Activa', '2024-01-10', FALSE, 'SURA', 'Nivel 3', 3, NULL, 'Mañana', 'Calle 10 # 20-30', 2, 1020304007, NULL, 'Laura', 'Lopez', 1, 1000100022, 3301004001, 'laura.lopez@eduam.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'Brenda', NULL, 'Jimenez', 'Diaz', 'Activa', '2024-01-10', FALSE, 'Nueva EPS', 'Nivel 2', 2, NULL, 'Mañana', 'Carrera 5 # 15-25', 2, 1020304008, NULL, 'Miguel', 'Jimenez', 1, 1000100023, 3301004002, 'miguel.jimenez@eduam.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'Cristian', NULL, 'Mora', 'Sanchez', 'Activa', '2024-01-11', FALSE, 'Coomeva', 'Nivel 1', 1, NULL, 'Tarde', 'Avenida 30 # 40-50', 2, 1020304009, NULL, 'Natalia', 'Mora', 1, 1000100024, 3301004003, 'natalia.mora@eduam.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'Daniela', NULL, 'Pardo', 'Martinez', 'Activa', '2024-01-11', FALSE, 'Sanitas', 'Nivel 3', 3, NULL, 'Mañana', 'Calle 25 # 50-60', 2, 1020304010, NULL, 'Oscar', 'Pardo', 1, 1000100025, 3301004004, 'oscar.pardo@eduam.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(5, 'Esteban', NULL, 'Quintero', 'Rojas', 'Activa', '2024-01-12', FALSE, 'Compensar', 'Nivel 2', 2, NULL, 'Mañana', 'Carrera 8 # 30-10', 2, 1020304011, NULL, 'Paola', 'Quintero', 1, 1000100026, 3301004005, 'paola.quintero@eduam.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6, 'Fernanda', NULL, 'Rojas', 'Vargas', 'Activa', '2024-01-12', FALSE, 'Famisanar', 'Nivel 1', 1, NULL, 'Tarde', 'Diagonal 12 # 70-80', 2, 1020304012, NULL, 'Ricardo', 'Rojas', 1, 1000100027, 3301004006, 'ricardo.rojas@eduam.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 'Gustavo', NULL, 'Vargas', 'Lopez', 'Activa', '2024-01-13', FALSE, 'EPS Sura', 'Nivel 3', 3, NULL, 'Mañana', 'Calle 45 # 10-05', 2, 1020304013, NULL, 'Sara', 'Vargas', 1, 1000100028, 3301004007, 'sara.vargas@eduam.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(8, 'Isabel', NULL, 'Marin', 'Perez', 'Activa', '2024-01-13', FALSE, 'Salud Total', 'Nivel 2', 2, NULL, 'Mañana', 'Carrera 20 # 5-15', 2, 1020304014, NULL, 'Tomas', 'Marin', 1, 1000100029, 3301004008, 'tomas.marin@eduam.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(9, 'Julian', NULL, 'Osorio', 'Garcia', 'Activa', '2024-01-14', FALSE, 'Comfenalco', 'Nivel 1', 1, NULL, 'Tarde', 'Avenida Libertador # 90-20', 2, 1020304015, NULL, 'Ursula', 'Osorio', 1, 1000100030, 3301004009, 'ursula.osorio@eduam.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(10, 'Karen', NULL, 'Nieto', 'Hernandez', 'Activa', '2024-01-14', FALSE, 'CajaCop', 'Nivel 3', 3, NULL, 'Mañana', 'Calle 60 # 35-45', 2, 1020304016, NULL, 'Viviana', 'Nieto', 1, 1000100031, 3301004010, 'viviana.nieto@eduam.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(11, 'Leonardo', NULL, 'Paz', 'Castro', 'Activa', '2024-01-15', FALSE, 'Cruz Blanca', 'Nivel 2', 2, NULL, 'Mañana', 'Carrera 15 # 80-01', 2, 1020304017, NULL, 'Wilson', 'Paz', 1, 1000100032, 3301004011, 'wilson.paz@eduam.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(12, 'Maria', NULL, 'Serrano', 'Gomez', 'Activa', '2024-01-15', FALSE, 'Coomeva', 'Nivel 1', 1, NULL, 'Tarde', 'Diagonal 3 # 2-30', 2, 1020304018, NULL, 'Ximena', 'Serrano', 1, 1000100033, 3301004012, 'ximena.serrano@eduam.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(13, 'Nicolas', NULL, 'Torres', 'Lopez', 'Activa', '2024-01-16', FALSE, 'Sanitas', 'Nivel 3', 3, NULL, 'Mañana', 'Calle 80 # 4-50', 2, 1020304019, NULL, 'Yolanda', 'Torres', 1, 1000100034, 3301004013, 'yolanda.torres@eduam.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(14, 'Olga', NULL, 'Urrego', 'Diaz', 'Activa', '2024-01-16', FALSE, 'Nueva EPS', 'Nivel 2', 2, NULL, 'Mañana', 'Carrera 2 # 9-10', 2, 1020304020, NULL, 'Zoe', 'Urrego', 1, 1000100035, 3301004014, 'zoe.urrego@eduam.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(15, 'Pedro', NULL, 'Velez', 'Sanchez', 'Activa', '2024-01-17', FALSE, 'SURA', 'Nivel 1', 1, NULL, 'Tarde', 'Avenida 1 # 100-20', 2, 1020304021, NULL, 'David', 'Velez', 1, 1000100036, 3301004015, 'david.velez@eduam.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- 30. Inserción de datos en t_boletin (Consistencia entre estudiantes, cursos, periodos, asignaturas e informes de calificaciones)
INSERT INTO t_boletin (id_boletin, id_estudiante, id_curso, id_periodo, id_asignatura, id_informe_calificaciones, desempeño, area_academica, fecha_emision, observaciones) VALUES
(1, 1, 1, 1, 1, 1, 'Superior', 'Literatura', '2024-04-06', 'Excelente comprensión de texto.'),
(2, 2, 1, 1, 2, 2, 'Alto', 'Química', '2024-04-06', 'Buen desempeño en laboratorio.'),
(3, 3, 2, 1, 3, 3, 'Basico', 'Álgebra', '2024-04-06', 'Necesita reforzar operaciones básicas.'),
(4, 4, 2, 1, 4, 4, 'Superior', 'Historia Universal', '2024-04-06', 'Destacado en el análisis de eventos históricos.'),
(5, 5, 3, 1, 5, 5, 'Alto', 'Ética y Valores', '2024-04-06', 'Muestra madurez en el pensamiento crítico.'),
(6, 7, 4, 2, 6, 6, 'Superior', 'Geografía', '2024-07-06', 'Dominio de la cartografía y conceptos espaciales.'),
(7, 8, 4, 2, 1, 7, 'Alto', 'Literatura', '2024-07-06', 'Mejoró significativamente la lectura crítica.'),
(8, 9, 5, 2, 2, 8, 'Basico', 'Química', '2024-07-06', 'Dificultades en balanceo de ecuaciones.');

-- 31. Inserción de datos en t_categoria_archivo
INSERT INTO t_categoria_archivo (id_categoria_archivo, nombre_categoria) VALUES
(1, 'Certificados Oficiales'), (2, 'Documentos de Identificación'), (3, 'Formularios'), (4, 'Reportes Académicos'), (5, 'Comprobantes de Pago');

-- 32. Inserción de datos en t_archivo_documento (Vinculados a categoría y tipo de archivo)
INSERT INTO t_archivo_documento (id_archivo_documento, nombre_archivo, direccion_url, fecha_creacion, id_categoria_archivo, id_tipo_archivo) VALUES
(1, 'Certificado_Notas_Final_Alejandro.pdf', 'http://archivos.eduam.com/certificados/notas_alejandro.pdf', '2024-12-15 10:00:00', 1, 1),
(2, 'TI_Brenda_2024.jpg', 'http://archivos.eduam.com/identificacion/ti_brenda.jpg', '2024-01-05 11:30:00', 2, 3),
(3, 'Formulario_Matricula_Cristian.pdf', 'http://archivos.eduam.com/formularios/matricula_cristian.pdf', '2024-01-08 14:00:00', 3, 1),
(4, 'Reporte_Academico_Daniela_P1.xlsx', 'http://archivos.eduam.com/reportes/danielap1.xlsx', '2024-04-10 09:00:00', 4, 6),
(5, 'Comprobante_Pago_Esteban.pdf', 'http://archivos.eduam.com/pagos/pago_esteban.pdf', '2024-01-10 16:00:00', 5, 1);

-- 33. Inserción de datos en t_anexos_matricula (Vinculando archivos a matrículas existentes)
INSERT INTO t_anexos_matricula (id_anexo_matricula, id_archivo, id_matricula) VALUES
(1, 2, 2), -- TI_Brenda_2024.jpg para la matrícula de Brenda
(2, 3, 3), -- Formulario_Matricula_Cristian.pdf para la matrícula de Cristian
(3, 5, 5); -- Comprobante_Pago_Esteban.pdf para la matrícula de Esteban


