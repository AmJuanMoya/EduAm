
USE eduam;

/* 1) Tablas totalmente independientes */
INSERT INTO t_rol (id_rol, rol_descripcion) VALUES
  (1,'Administrador'),
  (2,'Docente'),
  (3,'Estudiante'),
  (4,'Acudiente');

INSERT INTO t_especialidad (id_especialidad, esp_descripcion) VALUES
  (1,'Matemáticas'),
  (2,'Lengua Castellana'),
  (3,'Ciencias Naturales');

INSERT INTO t_asignatura (id_asignatura, asig_nombre) VALUES
  (1,'Matemáticas'),
  (2,'Lengua'),
  (3,'Ciencias Naturales');

INSERT INTO t_grado (id_grado, grad_nombre) VALUES
  (1,'6°'),
  (2,'7°');

INSERT INTO t_recurso (id_recurso, rec_nombre, rec_descripcion, rec_tipo, rec_fecha_agregado) VALUES
  (1,'Guía Fracciones','Documento base para taller 1','PDF','2025-01-05 08:00:00'),
  (2,'Presentación Narrativa','Diapositivas del tema 1','PPT','2025-01-06 09:00:00'),
  (3,'Banco de preguntas','TXT con ítems de práctica','TXT','2025-01-07 10:00:00');

/* 2) Empleados (docentes/directores) */
INSERT INTO t_empleados (
  id_documento_empleado, empl_tipo_documento, empl_nombre, empl_apellido,
  empl_celular, empl_genero, empl_direccion, empl_persona_contacto,
  empl_celular_persona_contacto, empl_contrasena, empl_correo, empl_estado,
  empl_especialidad, empl_rol
) VALUES
  (1001234567,'CC','Ana','Ramírez', 2001112233,'FEMENINO','Cra 10 #1-23', 'Luis Ramírez', 2002223344,
   'hash123','ana.ramirez@colegio.edu','Activo', 1, 2),
  (1002345678,'CC','Jorge','Pardo', 2004445566,'MASCULINO','Cll 20 #5-10', 'María Pardo', 2005556677,
   'hash123','jorge.pardo@colegio.edu','Activo', 2, 2);

/* 3) Cursos (depende de grado y empleados) */
INSERT INTO t_curso (id_curso, curso_jornada, id_curso_grado, curso_docente_director) VALUES
  (1,'Jornada Mañana', 1, 1001234567),
  (2,'Jornada Tarde',  2, 1002345678);

/* 4) Acudientes (ajuste de documentos y teléfonos) */
INSERT INTO t_acudientes (
  id_documento_acudiente, acud_nombres, acud_apellidos, acud_parentesco,
  acud_telefono, acud_correo, acud_direccion, acud_tipo_documento,
  acud1_documento, acud1_nombres, acud1_apellidos, acud_rol
) VALUES
  (2004567890,'Carlos','Pérez','Padre', 2111111111,'carlos.perez@example.com','Av 1 #2-3','CC', NULL, NULL, NULL, 4),
  (2005678901,'María','Gómez','Madre', 2122222222,'maria.gomez@example.com','Av 2 #3-4','CC', NULL, NULL, NULL, 4);

/* 6) Estudiantes (FK a acudiente y a matrícula por documento) */
INSERT INTO t_estudiantes (
  id_docuestudiante, estu_nombre, estu_apellido, estu_edad, estu_genero,
  estu_tipo_documento, estu_estado, estu_observaciones, est_correo,
  est_contrasena, estu_rol, estu_acudiente
) VALUES
  (2001234567,'Juan','López',12,'MASCULINO','TI','Activo',NULL,'juan.lopez@example.com','alfa123',3,2004567890),
  (2002345678,'Luisa','Martínez',12,'FEMENINO','TI','Activo',NULL,'luisa.martinez@example.com','beta123',3,2005678901),
  (2003456789,'Andrés','Quiroz',13,'MASCULINO','TI','Pendiente','Debe documentación','andres.quiroz@example.com','gamma123',3,2004567890);


/* 5) Matrículas (id_documento = documento del estudiante) */
INSERT INTO t_matricula (
  id_documento, matr_anio, matr_grado, matr_repite, matr_traslado,
  matr_estado, matr_observaciones, matr_jornada, matr_curso
) VALUES
  (2001234567,'2025-01-15 00:00:00', 1, 0, 0, 'Activa',       'Matriculado sin novedades','Jornada Mañana', 1),
  (2002345678,'2025-01-15 00:00:00', 1, 0, 0, 'Activa',       'Pago al día','Jornada Mañana', 1),
  (2003456789,'2025-01-15 00:00:00', 2, 0, 0, 'Condicionada', 'Pendiente acto disciplinario','Jornada Tarde', 2);


/* 7) Relación Docente–Asignatura–Curso */
INSERT INTO t_rel_empleado_asignatura_curso (
  id_rel_empleado_asignatura_curso, id_asignatura, id_curso, id_documento_empleado
) VALUES
  (1, 1, 1, 1001234567),
  (2, 2, 1, 1002345678),
  (3, 1, 2, 1001234567);

/* 8) Actividades */
INSERT INTO t_actividad (
  id_actividad, act_estado, act_fecha_asignacion, act_fecha_entrega, act_nombre,
  act_descripcion, act_id_recurso, act_categoria, url_actividad, id_rel_empleado_asignatura_curso
) VALUES
  (1,'Asignada','2025-02-01 08:00:00','2025-02-05 23:59:59','Taller de fracciones',
   'Resolver guía de fracciones básicas', 1, 'Taller', 'https://aula/actividad/1', 1),
  (2,'Asignada','2025-02-02 08:00:00','2025-02-06 23:59:59','Lectura: cuento breve',
   'Leer y responder preguntas', 2, 'Tarea', 'https://aula/actividad/2', 2);

/* 9) Informes / entregas */
INSERT INTO t_informe_calificaciones (
  id_informe_calificacion, infoc_estado, infoc_fecha_entrega, infoc_nota,
  infoc_url_entrega, infoc_observaciones_docente, id_rel_empleado_asignatura_curso,
  infoc_id_documento_estudiante
) VALUES
  (1,'Aprobada','2025-02-05 20:30:00',4.5,'https://aula/entrega/1',
   'Buen manejo de fracciones', 1, 2001234567),
  (2,'Aprobada','2025-02-06 21:10:00',4.0,'https://aula/entrega/2',
   'Comprensión adecuada del texto', 2, 2002345678),
  (3,'Pendiente',NULL,0.0,NULL,
   'Aún no entrega', 1, 2003456789);
