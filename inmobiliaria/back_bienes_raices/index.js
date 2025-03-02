const express = require("express");
const cors = require("cors");
const path = require("path");  // Importar path para manejar rutas de archivos

require("dotenv").config(); // Cargar variables de entorno

const router = require("./src/api/routers/routes");

const server = express();

// Middleware para procesar JSON
server.use(express.json());

// Habilitar CORS para permitir solicitudes desde cualquier origen
server.use(cors({
    origin: '*'       
}));

// Servir archivos estáticos desde la carpeta "uploads"


server.use("/uploads", express.static(path.join(__dirname, "uploads")));




server.use("/", router);

const PORT = process.env.PORT ; // Asegurar un puerto por defecto en caso de que no haya en .env

// Iniciar el servidor
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
