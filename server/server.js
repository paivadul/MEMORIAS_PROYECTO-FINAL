const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const conectarDB = require('./config/config');

// Crear la aplicación Express
const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// Conexión a la base de datos
conectarDB();

// Verifica que el directorio de destino exista, de lo contrario, créalo
const uploadDir = 'upload/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuración de almacenamiento para Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Directorio donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Nombre del archivo único
    }
});

// Configuración de Multer
const upload = multer({ storage: storage });

// Middleware para servir archivos estáticos desde el directorio 'upload'
app.use('/static', express.static(path.join(__dirname, 'upload')));

// Rutas de usuario: inicio de sesión y registro
const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes);

// Rutas de anécdotas
const anecdotaRoutes = require('./routes/anecdotaRoutes');
app.use('/api/anecdota', anecdotaRoutes);

// Rutas de visitas
const visitaRoutes = require('./routes/visitaRoutes');
app.use('/api/visita', visitaRoutes);

// Iniciar el servidor
app.listen(8060, () => {
    console.log("Servidor escuchando en el puerto 8060");
});

module.exports = upload;
