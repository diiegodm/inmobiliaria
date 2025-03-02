const jwt = require("jsonwebtoken");

const createToken = (info) => {
  console.log("Información recibida:", info);  // Para depurar

  if (!info || !info.idvendedor) {
    throw new Error('Faltan datos necesarios para generar el token');
  }

  const data = {
    idvendedor: info.idvendedor,
    correo: info.correo,
  };
  return jwt.sign(data, process.env.SECRET_KEY_JWT, { expiresIn: "1h" });
}




module.exports = { createToken, };