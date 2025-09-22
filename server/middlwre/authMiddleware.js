import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    // Obtener el token del encabezado de autorización
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No autorizado: Token no proporcionado o formato incorrecto.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretjwtkey');
        
        // Adjuntar el usuario decodificado a la solicitud
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Error de autenticación:', error);
        return res.status(403).json({ message: 'No autorizado: Token inválido.' });
    }
};

export default authMiddleware;
