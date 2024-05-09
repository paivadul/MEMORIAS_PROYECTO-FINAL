const express = require('express');
const authRoutes = express.Router();
const userControllers = require('../controllers/userControllers');

//Ruta para registrarse
authRoutes.post('/register', userControllers.register);

// Ruta para iniciar sesión
authRoutes.post('/login', userControllers.login);

// Ruta para traer al usuario por ID
authRoutes.get('/user/:id', userControllers.getUserById);

module.exports = authRoutes;