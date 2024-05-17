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

// // Función de filtro para permitir solo ciertos tipos de archivos
// const fileFilter = function (req, file, cb) {
//     if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('audio/') || file.mimetype.startsWith('video/')) {
//         cb(null, true); // Aceptar el archivo
//     } else {
//         cb(new Error('Tipo de archivo no admitido'), false); // Rechazar el archivo
//     }
// };

// Configuración de Multer
const upload = multer({ 
    storage: storage,
    // fileFilter: fileFilter
});

module.exports = upload;
