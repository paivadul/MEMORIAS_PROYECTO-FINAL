const express = require('express');
const mediaRoutes = express.Router();
const multer = require('multer');
const { createNewMedia, getAllMedias, getMediaById, updateMedia, deleteMedia } = require("../controllers/mediaControllers");

// Rutas
mediaRoutes.post('/new', upload.single('media'), createNewMedia);
mediaRoutes.get('/all', getAllMedias);
mediaRoutes.get('/:id', getMediaById);
mediaRoutes.put('/update/:id', upload.single('media'), updateMedia);
mediaRoutes.delete('/delete/:id', deleteMedia);

module.exports = mediaRoutes;