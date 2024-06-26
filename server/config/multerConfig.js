const multer = require('multer');
const fs = require('fs');
// const path = require('path');

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
const upload = multer({ 
    storage: storage,
});

module.exports = upload;