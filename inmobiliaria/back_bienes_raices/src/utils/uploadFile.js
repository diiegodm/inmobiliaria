const multer = require("multer");
const path = require("path");

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Asegúrate de que esta carpeta exista
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage }).array("imagenes", 6);

module.exports = upload;
