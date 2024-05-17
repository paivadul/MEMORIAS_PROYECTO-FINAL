const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// Conexión a la base de datos
const conectarDB = require('./config/config');
conectarDB();

// Servir archivos estáticos desde el directorio 'upload'
app.use('/static', express.static(path.join(__dirname, 'upload')));

// Usuario: inicio de sesión y registro
const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes);

// Anécdotas
const anecdotaRoutes = require('./routes/anecdotaRoutes');
app.use('/api/anecdota', anecdotaRoutes)

// Visitas
const visitaRoutes = require('./routes/visitaRoutes');
app.use('/api/visita', visitaRoutes)

app.listen(8060, () => {
    console.log("Servidor escuchando en el puerto 8060");
});
