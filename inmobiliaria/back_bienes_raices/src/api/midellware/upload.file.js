const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


// Configurar almacenamiento en la carpeta 'uploads' con el nombre original
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/empleados'); // Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Usar el nombre original del archivo
    }
});

const upload = multer({ storage });

module.exports = upload;


