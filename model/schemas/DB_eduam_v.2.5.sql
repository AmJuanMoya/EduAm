CREATE TABLE `t_matricula` (
  `id_documento` int(10) NOT NULL,
  `matr_anio` datetime NOT NULL,
  `matr_grado` int(11) NOT NULL,
  `matr_repite` boolean NOT NULL,
  `matr_traslado` boolean NOT NULL,
  `matr_estado` ENUM ('Activa', 'Condicionada', 'Cancelada', 'Pendiente') NOT NULL,
  `matr_observaciones` text,
  `matr_jornada` ENUM ('Jornada Tarde', 'Jornada Mañana') NOT NULL,
  `matr_curso` int(11) COMMENT 'fk a t_curso',
  PRIMARY KEY (`id_documento`, `matr_anio`, `matr_grado`)
);

CREATE TABLE `t_estudiantes` (
  `id_docuestudiante` int(11) PRIMARY KEY NOT NULL,
  `estu_nombre` varchar(200) NOT NULL,
  `estu_apellido` varchar(200) NOT NULL,
  `estu_edad` int(10) NOT NULL,
  `estu_genero` ENUM ('MASCULINO', 'FEMENINO', 'OTRO') NOT NULL,
  `estu_tipo_documento` ENUM ('CC', 'TI', 'CE') NOT NULL,
  `estu_estado` ENUM ('Activo', 'Bloqueado', 'Pendiente', 'Inactivo', 'Condicionado') NOT NULL,
  `estu_observaciones` text,
  `est_correo` varchar(255),
  `est_contrasena` varchar(255) NOT NULL,
  `estu_rol` int(11) NOT NULL COMMENT 'fk de t_roles',
  `estu_acudiente` int(11) COMMENT 'fk pero tambien pk'
);

CREATE TABLE `t_acudientes` (
  `id_documento_acudiente` int(11) PRIMARY KEY NOT NULL,
  `acud_nombres` varchar(200),
  `acud_apellidos` varchar(200),
  `acud_parentesco` ENUM ('Padre', 'Madre', 'Abuelo', 'Otro'),
  `acud_telefono` int(10),
  `acud_correo` varchar(255),
  `acud_direccion` varchar(255),
  `acud_tipo_documento` ENUM ('CC', 'TI', 'CE'),
  `acud1_documento` int(11),
  `acud1_nombres` varchar(200),
  `acud1_apellidos` varchar(200),
  `acud_rol` int(11) COMMENT 'fk de t_roles'
);

CREATE TABLE `t_empleados` (
  `id_documento_empleado` int(11) PRIMARY KEY NOT NULL,
  `empl_tipo_documento` ENUM ('CC', 'TI', 'CE'),
  `empl_nombre` varchar(200) NOT NULL,
  `empl_apellido` varchar(200) NOT NULL,
  `empl_celular` int(10),
  `empl_genero` ENUM ('MASCULINO', 'FEMENINO', 'OTRO') NOT NULL,
  `empl_direccion` varchar(200) NOT NULL,
  `empl_persona_contacto` varchar(200),
  `empl_celular_persona_contacto` int(10),
  `empl_contrasena` varchar(255) NOT NULL,
  `empl_correo` varchar(255) NOT NULL,
  `empl_estado` ENUM ('Activo', 'Bloqueado', 'Pendiente', 'Inactivo') NOT NULL,
  `empl_especialidad` int(11) COMMENT 'fk de t_especialidad',
  `empl_rol` int(11) NOT NULL COMMENT 'fk de t_roles'
);

CREATE TABLE `t_curso` (
  `id_curso` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `curso_jornada` ENUM ('Jornada Tarde', 'Jornada Mañana'),
  `id_curso_grado` int(11) COMMENT 'fk de t_grado',
  `curso_docente_director` int(11) COMMENT 'fk de t_empleados'
);

CREATE TABLE `t_grado` (
  `id_grado` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `grad_nombre` varchar(100)
);

CREATE TABLE `t_rel_empleado_asignatura_curso` (
  `id_rel_empleado_asignatura_curso` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_asignatura` int(11) NOT NULL COMMENT 'fk de t_asignatura',
  `id_curso` int(11) NOT NULL COMMENT 'fk de t_curso',
  `id_documento_empleado` int(11) NOT NULL COMMENT 'fk de t_empleados '
);

CREATE TABLE `t_actividad` (
  `id_actividad` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `act_estado` ENUM ('Asignada', 'Entregada', 'Calificada', 'Fuera de Tiempo') NOT NULL,
  `act_fecha_asignacion` datetime,
  `act_fecha_entrega` datetime,
  `act_nombre` varchar(200) NOT NULL,
  `act_descripcion` text,
  `act_id_recurso` int(11),
  `act_categoria` ENUM ('Taller', 'Tarea', 'Evaluacion', 'Actividad en Grupo') NOT NULL,
  `url_actividad` text,
  `id_rel_empleado_asignatura_curso` int(11) NOT NULL COMMENT 'fk de t_rel_empleado_asignatura_curso '
);

CREATE TABLE `t_informe_calificaciones` (
  `id_informe_calificacion` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `infoc_estado` ENUM ('Aprobada', 'Desaprobada', 'Pendiente'),
  `infoc_fecha_entrega` datetime,
  `infoc_nota` decimal(2,1),
  `infoc_url_entrega` text,
  `infoc_observaciones_docente` text,
  `id_rel_empleado_asignatura_curso` int(11) COMMENT 'fk de t_rel_empleado_asignatura_curso ',
  `infoc_id_documento_estudiante` int(11) COMMENT 'fk de t_estudiante '
);

CREATE TABLE `t_especialidad` (
  `id_especialidad` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `esp_descripcion` varchar(200) NOT NULL
);

CREATE TABLE `t_asignatura` (
  `id_asignatura` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `asig_nombre` varchar(200) NOT NULL
);

CREATE TABLE `t_rol` (
  `id_rol` int(11) PRIMARY KEY NOT NULL,
  `rol_descripcion` varchar(200) NOT NULL
);

CREATE TABLE `t_recurso` (
  `id_recurso` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `rec_nombre` varchar(200) NOT NULL,
  `rec_descripcion` text,
  `rec_tipo` ENUM ('PDF', 'DOC', 'TXT', 'XLSX', 'CSV', 'PPT'),
  `rec_fecha_agregado` datetime
);

ALTER TABLE `t_matricula` COMMENT = 'ejemplo de nota';

ALTER TABLE `t_matricula` ADD FOREIGN KEY (`matr_curso`) REFERENCES `t_curso` (`id_curso`);

ALTER TABLE `t_matricula` ADD FOREIGN KEY (`matr_grado`) REFERENCES `t_grado` (`id_grado`);

ALTER TABLE `t_matricula` ADD FOREIGN KEY (`id_documento`) REFERENCES `t_estudiantes` (`id_docuestudiante`);

ALTER TABLE `t_actividad` ADD FOREIGN KEY (`id_rel_empleado_asignatura_curso`) REFERENCES `t_rel_empleado_asignatura_curso` (`id_rel_empleado_asignatura_curso`);

ALTER TABLE `t_actividad` ADD FOREIGN KEY (`act_id_recurso`) REFERENCES `t_recurso` (`id_recurso`);

ALTER TABLE `t_rel_empleado_asignatura_curso` ADD FOREIGN KEY (`id_asignatura`) REFERENCES `t_asignatura` (`id_asignatura`);

ALTER TABLE `t_rel_empleado_asignatura_curso` ADD FOREIGN KEY (`id_curso`) REFERENCES `t_curso` (`id_curso`);

ALTER TABLE `t_rel_empleado_asignatura_curso` ADD FOREIGN KEY (`id_documento_empleado`) REFERENCES `t_empleados` (`id_documento_empleado`);

ALTER TABLE `t_curso` ADD FOREIGN KEY (`id_curso_grado`) REFERENCES `t_grado` (`id_grado`);

ALTER TABLE `t_curso` ADD FOREIGN KEY (`curso_docente_director`) REFERENCES `t_empleados` (`id_documento_empleado`);

ALTER TABLE `t_empleados` ADD FOREIGN KEY (`empl_rol`) REFERENCES `t_rol` (`id_rol`);

ALTER TABLE `t_empleados` ADD FOREIGN KEY (`empl_especialidad`) REFERENCES `t_especialidad` (`id_especialidad`);

ALTER TABLE `t_acudientes` ADD FOREIGN KEY (`acud_rol`) REFERENCES `t_rol` (`id_rol`);

ALTER TABLE `t_estudiantes` ADD FOREIGN KEY (`estu_acudiente`) REFERENCES `t_acudientes` (`id_documento_acudiente`);

ALTER TABLE `t_estudiantes` ADD FOREIGN KEY (`estu_rol`) REFERENCES `t_rol` (`id_rol`);

ALTER TABLE `t_informe_calificaciones` ADD FOREIGN KEY (`infoc_id_documento_estudiante`) REFERENCES `t_estudiantes` (`id_docuestudiante`);

ALTER TABLE `t_informe_calificaciones` ADD FOREIGN KEY (`id_rel_empleado_asignatura_curso`) REFERENCES `t_rel_empleado_asignatura_curso` (`id_rel_empleado_asignatura_curso`);
