const multer = require('multer');

// Configuración de almacenamiento para Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/'); // Directorio donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Nombre del archivo único
    }
});

// Función de filtro para permitir solo ciertos tipos de archivos
const fileFilter = function (req, file, cb) {
    // Permitir solo ciertos tipos de archivos de medios (por ejemplo, imágenes, audios, videos)
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('audio/') || file.mimetype.startsWith('video/')) {
        cb(null, true); // Aceptar el archivo
    } else {
        cb(new Error('Tipo de archivo no admitido'), false); // Rechazar el archivo
    }
};

// Configuración de Multer
const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter
});

module.exports = upload;
