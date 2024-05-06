const express = require('express');
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
app.post('/api/anecdota/new', upload.single('media'), function (req, res) {
    res.send('Termina el multer')
})
app.use('/static', express.static('upload'));

// Conexión a la base de datos
const conectarDB = require('./config/config');
conectarDB();

// Usuario: inicio de sesión y registro
const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes);

// Anécdotas
const anecdotaRoutes = require('./routes/anecdotaRoutes');
app.use('/api/anecdota', anecdotaRoutes)

// Visitas
const visitaRoutes = require('./routes/visitaRoutes');
app.use('/api/visitas', visitaRoutes)

app.listen(8060, () => {
    console.log("Servidor escuchando en el puerto 8060");
});
