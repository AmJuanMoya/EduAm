import Crud from "../model/database/crudsql.js";
import t_empleados from "../model/t_empleados.js";
import t_estudiantes from "../model/t_estudiantes.js";

const crud = new Crud();
const empleados = new t_empleados();
const estudiantes = new t_estudiantes();

class Login {
    static async validarCredenciales(correo_usuario, contraseña_usuario) {
        try {
            let usuarioresult = null;
            let rol = null;

            // Buscar en empleados
            const resultempleado = await empleados.obtenerEmpleadoPorCorreo(correo_usuario);
            if (resultempleado && resultempleado.length > 0) {
                const empleado = resultempleado[0];
                if (empleado.empl_contrasena === contraseña_usuario) {
                    usuarioresult = empleado;
                    rol = empleado.empl_rol;
                }
            }

            // Si no es empleado, buscar en estudiantes
            if (!usuarioresult) {
                const resultEstudiante = await estudiantes.obtenerEstudiantePorCorreo(correo_usuario);
                if (resultEstudiante && resultEstudiante.length > 0) {
                    const estudiante = resultEstudiante[0];
                    if (estudiante.est_contrasena === contraseña_usuario) {
                        usuarioresult = estudiante;
                        rol = estudiante.estu_rol;
                    }
                }
            }

            // Si no se encuentra el usuario o la contraseña es incorrecta
            if (!usuarioresult) {
                return null;
            }

            // Devuelve el usuario y el rol
            return { usuario: usuarioresult, rol };
        } catch (error) {
            console.error('Error en validarCredenciales:', error);
            throw error;
        }
    }
}

export default Login;