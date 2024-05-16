const express = require('express');
const anecdotaRoutes = express.Router();
const { verifyToken } = require('../utils/auth');

const { createNewAnecdota, getAllAnecdotas, getAnecdotaById, updateAnecdota, deleteAnecdota, searchAnecdotas } = require("../controllers/anecdotaControllers");

anecdotaRoutes.post('/new', verifyToken, createNewAnecdota);
anecdotaRoutes.get('/all', getAllAnecdotas);
anecdotaRoutes.get('/:id', verifyToken, getAnecdotaById);
anecdotaRoutes.put('/update/:id', verifyToken, updateAnecdota);
anecdotaRoutes.delete('/delete/:id', verifyToken, deleteAnecdota);

anecdotaRoutes.get('/search/:message', verifyToken, searchAnecdotas);

module.exports = anecdotaRoutes;