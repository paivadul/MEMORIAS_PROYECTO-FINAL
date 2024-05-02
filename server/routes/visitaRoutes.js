const express = require('express');
const visitaRoutes = express.Router();
const {verifyToken} = require('../utils/auth');

const { createNewVisita, getAllVisitas, getVisitaById, updateVisita, deleteVisita} = require("../controllers/visitaControllers");

visitaRoutes.post('/new', verifyToken, createNewVisita);
visitaRoutes.get('/all', verifyToken, getAllVisitas);
visitaRoutes.get('/:id', verifyToken, getVisitaById);
visitaRoutes.put('/update/:id', verifyToken, updateVisita);
visitaRoutes.delete('/delete/:id', verifyToken, deleteVisita);

module.exports = visitaRoutes;