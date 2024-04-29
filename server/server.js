const express = require('express');
const app = express();
const cors = require('cors');

// Middlewares
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// Conexión a la base de datos
const connectDB = require('./config/config');
connectDB();

// User: login y register
const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes);

// Anecdotas
const anecdotaRoutes = require('./routes/anecdotaRoutes');
app.use('/api/anecdota', anecdotaRoutes)

app.listen(8060, () => {
    console.log("Servidor escuchando en el puerto 8060");
});