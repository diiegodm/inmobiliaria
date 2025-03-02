
const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/propiedad'); // Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Guardar solo el nombre original del archivo
    }
});

const uploadImage = multer({ storage });

module.exports = uploadImage;


