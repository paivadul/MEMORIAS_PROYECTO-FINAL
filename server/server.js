const express = require('express');

// Multer: exportación
const multer = require('multer')
const upload = multer({ dest: 'upload/' })

const app = express();
const cors = require('cors');

// Middlewares
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// Multer: rutas
app.post('/anecdota/new', upload.single('media'), function (req, res, next) {
    console.log(req.file)
    res.send('Termina el multer')
})

// app.post('/media/subir', upload.array('fotos', 12), function (req, res, next) {
//     // req.files es un array de archivos de `fotos`
//     // req.body contendrá los campos de texto, si los hubiera
// })

// const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'galeria', maxCount: 8 }])
// app.post('/perfil-genial', cpUpload, function (req, res, next) {
//     // req.files es un objeto (String -> Array) donde el nombre del campo es la clave y el valor es un array de archivos
//     //
//     // ej.
//     //  req.files['avatar'][0] -> Archivo
//     //  req.files['galeria'] -> Array
//     //
//     // req.body contendrá los campos de texto, si los hubiera
// })

// Conexión a la base de datos
const conectarDB = require('./config/config');
conectarDB();

// Usuario: inicio de sesión y registro
const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes);

// Anécdotas
const anecdotaRoutes = require('./routes/anecdotaRoutes');
app.use('/api/anecdota', anecdotaRoutes)

app.listen(8060, () => {
    console.log("Servidor escuchando en el puerto 8060");
});
