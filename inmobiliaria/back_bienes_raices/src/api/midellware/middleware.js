const jwt = require('jsonwebtoken');
const { selectById } = require('../models/users.model');

//validar el token y el rol
const checkToken = async (req, res, next) => {
  if (!req.headers["authorization"]) {
    return res.status(401).json({ msg: "Debe incluir el token" });
  }

  const token = req.headers["authorization"];
  let data;
  try {
    const tokenVe = token.split(" ")[1];
    data = jwt.verify(tokenVe, process.env.SECRET_KEY_JWT);
  } catch (error) {
    return res.status(401).json({ msg: "El token es incorrecto" });
  }

  // Buscar en la BD el usuario del token
  const user = await selectById(data.idvendedor);
  if (user.length === 0) {
    return res.status(404).json({ msg: "El usuario no existe" });
  }

  req.user = user[0]; // Guardar usuario en req.user para su uso en otras rutas
  next();
};

// Middleware para validar si el usuario es administrador
const checkTokenAdmin = async (req, res, next) => {
  await checkToken(req, res, async () => {
    console.log("Usuario autenticado:", req.user); 

    if (!req.user || req.user.rol !== 0) {  
      return res.status(403).json({ msg: "Debe ser Administrador para acceder a esta ruta" });
    }

    next();
  });
};


const authvendedor = (req, res, next) => {
  const authHeader = req.header("Authorization");

    console.log("Encabezado recibido:", authHeader); 

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "No hay token o formato incorrecto" });
    }

    // Extraer el token después de "Bearer "
    const token = authHeader.split(" ")[1];
    console.log("Token recibido en el middleware:", token);

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY_JWT);
        console.log("Token decodificado en el middleware:", decoded);
        req.user = decoded; //  
        next();
    } catch (error) {
        console.log("Error al verificar token:", error.message);
        return res.status(401).json({ msg: "Token no válido" });
    }
};

module.exports = { checkToken, checkTokenAdmin, authvendedor };


