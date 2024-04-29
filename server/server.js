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

// // User: login y register
// const userRoutes = require('./routes/userRoutes');
// app.use('/api', userRoutes);

app.listen(8000, () => {
    console.log("Servidor escuchando en el puerto 8000");
});