-- Creacion de la DB
CREATE DATABASE eduam;
-- Usar db
USE eduam;

-- CREACION DE TABLAS


-- TABLA CATEGORIA_ACTIVIDAD

CREATE TABLE t_categoria_actividad (
id_categoria_actividad int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
nombre_categoria_actividad varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;


-- TABLA COMENTARIOS
CREATE TABLE t_comentarios (
id_comentario int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
comentario text NOT NULL,
id_usuario int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;


-- TABLA DE DOCENTES
CREATE TABLE t_docente (
id_docente int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
id_usuario int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;


-- TABLA ESTADO DEL USUARIO
CREATE TABLE t_estado_usuario (
id_estado_usuario int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
nombre_estado_usuario varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;


-- TABLA RECURSOS EDUCATIVOS

CREATE TABLE t_recursos (
id_recurso int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
nombre_recurso varchar(200) NOT NULL,
descripcion_recurso text DEFAULT NULL,
id_tipo_recurso int(11) NOT NULL,
id_tipo_archivo int(11) NOT NULL,
direcion_url_recurso text NOT NULL,
fecha_recurso_agregado date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;


-- TABLA ROLES
CREATE TABLE t_roles (
id_rol int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
nombre_rol varchar(100) NOT NULL,
descripcion_rol text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;


-- TABLA DE USUARIOS
CREATE TABLE t_usuarios (
id_usuario int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
nombres_usuario varchar(200) NOT NULL,
apellidos_usuario varchar(200) NOT NULL,
correo_usuario varchar(250) NOT NULL UNIQUE,
contraseña_usuario varchar(100) NOT NULL,
telefono_usuario varchar(11) DEFAULT NULL,
avatar_url_usuario text DEFAULT NULL,
id_rol int(11) NOT NULL,
id_estado_usuario int(11) NOT NULL,
id_tipo_documento INT(11) NOT NULL,
numero_documento INT(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- TABLA CURSO
CREATE TABLE t_curso (
id_curso INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
id_director_curso INT(11) NOT NULL,
id_grado INT(11) NOT NULL,
nombre_curso VARCHAR(200) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;


-- TABLA ASIGNATURA
CREATE TABLE t_asignaturas (
id_asignatura INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
nombre_asignatura VARCHAR(200) NOT NULL     
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;



-- TABLA ESTUDIANTES 

CREATE TABLE t_estudiantes(
id_estudiante INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
id_usuario INT(11) NOT NULL,
id_curso INT(11) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;



-- TABLA GRADO
CREATE TABLE t_grado(
id_grado INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
nombre_grado VARCHAR(200) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- TABLA CATEGORIA_ARCHIVO
CREATE TABLE t_categoria_archivo(
id_categoria_archivo INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
nombre_categoria VARCHAR(200) NOT NULL UNIQUE
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- TABLA ARCHIVO DOCUMENTO

CREATE TABLE t_archivo_documento(
id_archivo_documento INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
nombre_archivo VARCHAR(200) NOT NULL,
direccion_url TEXT NOT NULL,
fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
id_categoria_archivo INT(11) NOT NULL,
id_tipo_archivo INT(11) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- TABLA PERMISOS
CREATE TABLE t_permisos(
id_permiso INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
nombre_permiso VARCHAR(200) NOT NULL UNIQUE,
descripcion_permiso TEXT NULL    
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;


-- TABLA ROL PERMISOS
CREATE TABLE t_rol_permisos(
id_rol_permiso INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
id_rol INT(11) NOT NULL,
id_permisos INT(11) NOT NULL    
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;


-- TABLA ADMINISTRATIVOS
CREATE TABLE t_administrativos(
id_administrativos INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
id_usuario INT(11) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;


-- TABLA COMENTARIOS ANUNCIO
CREATE TABLE t_anuncios (
id_anuncio INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
titulo_anuncio VARCHAR(255) NOT NULL,
descripcion_anuncio TEXT NOT NULL,
fecha_creacion  DATETIME DEFAULT CURRENT_TIMESTAMP,
fecha_expiracion DATETIME NULL,
-- id_autor == id_usuario
id_autor INT(11) NOT NULL,
estado BOOLEAN DEFAULT FALSE    
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;


-- TABLA COMENTARIOS ANUNCIO
CREATE TABLE t_comentarios_anuncios(
id_comentarios_anuncio INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
id_anuncio INT(11) NOT NULL,
id_comentario INT(11) NOT NULL    
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;


-- TABLA ANUNCIO RECURSO

CREATE TABLE t_anuncios_recursos(
id_anuncio_recurso INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
id_recurso INT(11) NOT NULL,
id_anuncio INT(11) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;


-- TABLA ANUNCIOS CONTEXTO
CREATE TABLE t_anuncios_contextos (
id_anuncio_contexto INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
id_anuncio INT(11) NOT NULL,
    
-- general == institucional    
contexto ENUM ('privado', 'cursos' , 'general', 'docentes') DEFAULT 'privado'    
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;


-- TABLA DOCENTE ASIGNATURA

CREATE TABLE t_docente_asignatura(
id_docente_asignatura INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
id_docente INT(11) NOT NULL,
id_asignatura INT(11) NOT NULL    

)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;


-- TABLA INFORME CALIFICACIONES


CREATE TABLE t_informe_calificaciones(
id_informe_calificaciones INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
id_actividad INT(11) NOT NULL,
id_periodo INT(11) NOT NULL,
id_docente INT(11) NOT NULL,
id_estudiante INT(11) NOT NULL,
id_asignatura INT(11) NOT NULL,
id_curso INT(11) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;



-- TABLA PERIODO ACADEMICO

CREATE TABLE t_periodo_academico( 
id_periodo INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
-- el nombre del periodo es el numero por ejemplo
nombre_periodo VARCHAR(200) NOT NULL UNIQUE,
fecha_inicio DATE NOT NULL,
fecha_fin DATE,  
año_academico YEAR NOT NULL   
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;


--  TABLA PERIODO ACTIVIDAD

CREATE TABLE t_periodo_actividad(
id_periodo_actividad INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
id_periodo INT(11) NOT NULL,
id_actividad INT(11) NOT NULL    
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;


-- TABLA RECURSO ACTIVIDAD
CREATE TABLE t_recurso_actividad(
id_recurso_actividad INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
id_recurso INT(11) NOT NULL,
id_actividad INT(11) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;


-- TABLA COMENTARIO ACTIVIDAD

CREATE TABLE t_comentario_actividad(
id_comentario_actividad INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
id_comentario INT(11) NOT NULL,   
id_actividad INT(11) NOT NULL    
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci; 


-- TABLA ACTIVIDAD
CREATE TABLE t_actividad (
id_actividad INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
titulo_actividad VARCHAR(255) NOT NULL,
descripcion_actividad TEXT,     
fecha_publicacion  DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
fecha_entrega DATETIME,
calificacion_nota DECIMAL(2,1) NOT NULL,
id_categoria_actividad INT(11) NOT NULL    
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;


-- TABLA ASISTENCIA

CREATE TABLE t_asistencias(
id_asistencia INT(11) NOT NULL PRIMARY KEY,
id_estudiante INT(11) NOT NULL,
id_docente INT(11) NOT NULL,
id_asignatura INT(11) NOT NULL,
id_curso INT(11) NOT NULL,
id_periodo INT(11) NOT NULL,
fecha DATE NOT NULL,
estado ENUM('Presente', 'Ausente', 'Retardo', 'Justificado', 'Retirado'),
observaciones TEXT     
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- TABLA BOLETIN

CREATE TABLE t_boletin(
id_boletin INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
id_estudiante INT(11) NOT NULL,
id_curso INT(11) NOT NULL,
id_periodo INT(11) NOT NULL,
id_asignatura INT(11) NOT NULL,
id_informe_calificaciones INT(11) NOT NULL,
desempeño ENUM('Bajo', 'Basico','Alto', 'Superior' ) NOT NULL,    
area_academica VARCHAR(255),
fecha_emision DATE NOT NULL,
observaciones TEXT     
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;



-- TABLA MATRICULA

CREATE TABLE t_matricula(
id_matricula INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
primer_nombre_estudiante VARCHAR(255) NOT NULL,
nombres_adicionales_estudiante VARCHAR(255),
primer_apellido_estudiante VARCHAR(255) NOT NULL,
apellidos_adicionales_estudiante VARCHAR(255) NOT NULL,    
estado_matricula ENUM('Activa', 'Cancela', 'Retirada', 'Condicional', 'Pendiente') NOT NULL,
fecha_matricula DATE NOT NULL,
repitente BOOLEAN NOT NULL,
eps VARCHAR(255),
sisben VARCHAR(255),
estrato INT(1),
discapacidad TEXT,
jornada ENUM('Tarde', 'Mañana') NOT NULL,
direccion_residencia TEXT NOT NULL,
id_tipo_documento_estudiante INT(11) NOT NULL,
documento_estudiante INT(11) NOT NULL UNIQUE,
observaciones TEXT,             
nombre_acudiente1 VARCHAR(255) NOT NULL,
apellido_acudiente1 VARCHAR(255) NOT NULL,
id_tipo_documento_acudiente1 INT(11) NOT NULL,
numero_documento_acudiente1 INT(11) NOT NULL,
tel_contacto_acudiente1 VARCHAR(15) NOT NULL,
correo_acudiente1 VARCHAR(255),    

nombre_acudiente2 VARCHAR(255),
apellido_acudiente2 VARCHAR(255) ,
id_tipo_documento_acudiente2 INT(11),
numero_documento_acudiente2 INT(11),
tel_contacto_acudiente2 VARCHAR(15) ,
correo_acudiente2 VARCHAR(255),     
    
nombre_acudiente3 VARCHAR(255),
apellido_acudiente3 VARCHAR(255) ,
id_tipo_documento_acudiente3 INT(11),
numero_documento_acudiente3 INT(11),
tel_contacto_acudiente3 VARCHAR(15),
correo_acudiente3 VARCHAR(255) 
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;


-- TABLA TIPO ARCHIVO

CREATE  TABLE t_tipo_archivo(
id_tipo_archivo INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
tipo_archivo VARCHAR(200) NOT NULL UNIQUE    
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;


-- TABLA ANEXOS MATRICULA

CREATE TABLE t_anexos_matricula(
id_anexo_matricula INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
id_archivo INT(11) NOT NULL,
id_matricula INT(11) NOT NULL    
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;


-- TABLA TIPO IDENTIFICACION
CREATE TABLE t_tipo_identificacion(
id_identificacion INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
tipo_identificacion VARCHAR(200) NOT NULL,
descripcion_tipo TEXT    

)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;






-- SE ESTABLECEN LAS LLAVES FORANEAS --------

ALTER TABLE t_comentarios
ADD CONSTRAINT fk_comentarios_usuario
FOREIGN KEY (id_usuario) REFERENCES t_usuarios(id_usuario) ON DELETE CASCADE;

-- Relaciones para t_docente
ALTER TABLE t_docente
ADD CONSTRAINT fk_docente_usuario
FOREIGN KEY (id_usuario) REFERENCES t_usuarios(id_usuario) ON DELETE CASCADE;

-- Relaciones para t_usuarios
ALTER TABLE t_usuarios
ADD CONSTRAINT fk_usuario_rol
FOREIGN KEY (id_rol) REFERENCES t_roles(id_rol),
ADD CONSTRAINT fk_usuario_estado
FOREIGN KEY (id_estado_usuario) REFERENCES t_estado_usuario(id_estado_usuario),
ADD CONSTRAINT fk_usuario_tipo_documento
FOREIGN KEY (id_tipo_documento) REFERENCES t_tipo_identificacion(id_identificacion);

-- Relaciones para t_curso
ALTER TABLE t_curso
ADD CONSTRAINT fk_curso_director
FOREIGN KEY (id_director_curso) REFERENCES t_docente(id_docente),
ADD CONSTRAINT fk_curso_grado
FOREIGN KEY (id_grado) REFERENCES t_grado(id_grado);

-- Relaciones para t_estudiantes
ALTER TABLE t_estudiantes
ADD CONSTRAINT fk_estudiante_usuario
FOREIGN KEY (id_usuario) REFERENCES t_usuarios(id_usuario) ON DELETE CASCADE,
ADD CONSTRAINT fk_estudiante_curso
FOREIGN KEY (id_curso) REFERENCES t_curso(id_curso);

-- Relaciones para t_archivo_documento
ALTER TABLE t_archivo_documento
ADD CONSTRAINT fk_archivo_categoria
FOREIGN KEY (id_categoria_archivo) REFERENCES t_categoria_archivo(id_categoria_archivo),
ADD CONSTRAINT fk_archivo_tipo_archivo
FOREIGN KEY (id_tipo_archivo) REFERENCES t_tipo_archivo(id_tipo_archivo);

-- Relaciones para t_rol_permisos
ALTER TABLE t_rol_permisos
ADD CONSTRAINT fk_rol_permisos_rol
FOREIGN KEY (id_rol) REFERENCES t_roles(id_rol),
ADD CONSTRAINT fk_rol_permisos_permiso
FOREIGN KEY (id_permisos) REFERENCES t_permisos(id_permiso);

-- Relaciones para t_administrativos
ALTER TABLE t_administrativos
ADD CONSTRAINT fk_administrativo_usuario
FOREIGN KEY (id_usuario) REFERENCES t_usuarios(id_usuario) ON DELETE CASCADE;

-- Relaciones para t_anuncios
ALTER TABLE t_anuncios
ADD CONSTRAINT fk_anuncio_autor
FOREIGN KEY (id_autor) REFERENCES t_usuarios(id_usuario) ON DELETE CASCADE;

-- Relaciones para t_comentarios_anuncios
ALTER TABLE t_comentarios_anuncios
ADD CONSTRAINT fk_comentario_anuncio_anuncio
FOREIGN KEY (id_anuncio) REFERENCES t_anuncios(id_anuncio),
ADD CONSTRAINT fk_comentario_anuncio_comentario
FOREIGN KEY (id_comentario) REFERENCES t_comentarios(id_comentario);

-- Relaciones para t_anuncios_recursos
ALTER TABLE t_anuncios_recursos
ADD CONSTRAINT fk_anuncio_recurso_recurso
FOREIGN KEY (id_recurso) REFERENCES t_recursos(id_recurso),
ADD CONSTRAINT fk_anuncio_recurso_anuncio
FOREIGN KEY (id_anuncio) REFERENCES t_anuncios(id_anuncio);

-- Relaciones para t_anuncios_contextos
ALTER TABLE t_anuncios_contextos
ADD CONSTRAINT fk_anuncio_contexto_anuncio
FOREIGN KEY (id_anuncio) REFERENCES t_anuncios(id_anuncio);

-- Relaciones para t_docente_asignatura
ALTER TABLE t_docente_asignatura
ADD CONSTRAINT fk_docente_asignatura_docente
FOREIGN KEY (id_docente) REFERENCES t_docente(id_docente),
ADD CONSTRAINT fk_docente_asignatura_asignatura
FOREIGN KEY (id_asignatura) REFERENCES t_asignaturas(id_asignatura);

-- Relaciones para t_informe_calificaciones
ALTER TABLE t_informe_calificaciones
ADD CONSTRAINT fk_informe_actividad
FOREIGN KEY (id_actividad) REFERENCES t_actividad(id_actividad),
ADD CONSTRAINT fk_informe_periodo
FOREIGN KEY (id_periodo) REFERENCES t_periodo_academico(id_periodo),
ADD CONSTRAINT fk_informe_docente
FOREIGN KEY (id_docente) REFERENCES t_docente(id_docente),
ADD CONSTRAINT fk_informe_estudiante
FOREIGN KEY (id_estudiante) REFERENCES t_estudiantes(id_estudiante),
ADD CONSTRAINT fk_informe_asignatura
FOREIGN KEY (id_asignatura) REFERENCES t_asignaturas(id_asignatura),
ADD CONSTRAINT fk_informe_curso
FOREIGN KEY (id_curso) REFERENCES t_curso(id_curso);

-- Relaciones para t_periodo_actividad
ALTER TABLE t_periodo_actividad
ADD CONSTRAINT fk_periodo_actividad_periodo
FOREIGN KEY (id_periodo) REFERENCES t_periodo_academico(id_periodo),
ADD CONSTRAINT fk_periodo_actividad_actividad
FOREIGN KEY (id_actividad) REFERENCES t_actividad(id_actividad);

-- Relaciones para t_recurso_actividad
ALTER TABLE t_recurso_actividad
ADD CONSTRAINT fk_recurso_actividad_recurso
FOREIGN KEY (id_recurso) REFERENCES t_recursos(id_recurso),
ADD CONSTRAINT fk_recurso_actividad_actividad
FOREIGN KEY (id_actividad) REFERENCES t_actividad(id_actividad);

-- Relaciones para t_comentario_actividad
ALTER TABLE t_comentario_actividad
ADD CONSTRAINT fk_comentario_actividad_comentario
FOREIGN KEY (id_comentario) REFERENCES t_comentarios(id_comentario),
ADD CONSTRAINT fk_comentario_actividad_actividad
FOREIGN KEY (id_actividad) REFERENCES t_actividad(id_actividad);

-- Relaciones para t_asistencias
ALTER TABLE t_asistencias
ADD CONSTRAINT fk_asistencia_estudiante
FOREIGN KEY (id_estudiante) REFERENCES t_estudiantes(id_estudiante),
ADD CONSTRAINT fk_asistencia_docente
FOREIGN KEY (id_docente) REFERENCES t_docente(id_docente),
ADD CONSTRAINT fk_asistencia_asignatura
FOREIGN KEY (id_asignatura) REFERENCES t_asignaturas(id_asignatura),
ADD CONSTRAINT fk_asistencia_curso
FOREIGN KEY (id_curso) REFERENCES t_curso(id_curso),
ADD CONSTRAINT fk_asistencia_periodo
FOREIGN KEY (id_periodo) REFERENCES t_periodo_academico(id_periodo);

-- Relaciones para t_boletin
ALTER TABLE t_boletin
ADD CONSTRAINT fk_boletin_estudiante
FOREIGN KEY (id_estudiante) REFERENCES t_estudiantes(id_estudiante),
ADD CONSTRAINT fk_boletin_curso
FOREIGN KEY (id_curso) REFERENCES t_curso(id_curso),
ADD CONSTRAINT fk_boletin_periodo
FOREIGN KEY (id_periodo) REFERENCES t_periodo_academico(id_periodo),
ADD CONSTRAINT fk_boletin_asignatura
FOREIGN KEY (id_asignatura) REFERENCES t_asignaturas(id_asignatura),
ADD CONSTRAINT fk_boletin_informe
FOREIGN KEY (id_informe_calificaciones) REFERENCES t_informe_calificaciones(id_informe_calificaciones);

-- Relaciones para t_matricula
ALTER TABLE t_matricula
ADD CONSTRAINT fk_matricula_tipo_doc_estudiante
FOREIGN KEY (id_tipo_documento_estudiante) REFERENCES t_tipo_identificacion(id_identificacion),
ADD CONSTRAINT fk_matricula_tipo_doc_acudiente1
FOREIGN KEY (id_tipo_documento_acudiente1) REFERENCES t_tipo_identificacion(id_identificacion),
ADD CONSTRAINT fk_matricula_tipo_doc_acudiente2
FOREIGN KEY (id_tipo_documento_acudiente2) REFERENCES t_tipo_identificacion(id_identificacion),
ADD CONSTRAINT fk_matricula_tipo_doc_acudiente3
FOREIGN KEY (id_tipo_documento_acudiente3) REFERENCES t_tipo_identificacion(id_identificacion);

-- Relaciones para t_anexos_matricula
ALTER TABLE t_anexos_matricula
ADD CONSTRAINT fk_anexo_matricula_archivo
FOREIGN KEY (id_archivo) REFERENCES t_archivo_documento(id_archivo_documento),
ADD CONSTRAINT fk_anexo_matricula_matricula
FOREIGN KEY (id_matricula) REFERENCES t_matricula(id_matricula);

-- Relaciones para t_recursos
ALTER TABLE t_recursos
ADD CONSTRAINT fk_recurso_tipo_archivo
FOREIGN KEY (id_tipo_archivo) REFERENCES t_tipo_archivo(id_tipo_archivo);

-- Relaciones para t_actividad
ALTER TABLE t_actividad
ADD CONSTRAINT fk_actividad_categoria
FOREIGN KEY (id_categoria_actividad) REFERENCES t_categoria_actividad(id_categoria_actividad);
