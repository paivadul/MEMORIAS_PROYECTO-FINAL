const { Media } = require('../models/mediaModels');

const mediaSchema = media => ({
    audio: media.audio,
    foto: media.foto,
    video: media.video,
});

const createNewMedia = (req, res) => {
    const sendmedia = mediaSchema(req.body); 
    Media.create(sendmedia)
        .then(media => {
            res.status(200).json(Media);
        })
        .catch(err => {
            console.error('Error al crear una nueva media:', err);
            res.status(400).json({ error: err.message });
        });
};

const getAllMedias = async (req, res) => {
    try {
        const medias = await Media.find();
        res.status(200).json(medias);
    } catch (error) {
        console.error('Error al obtener medias:', error);
        res.status(500).json({ error: error.message });
    }
};

const getMediaById = async (req, res) => {
    const { id } = req.params;
    try {
        const media = await Media.findById(id);
        if (!media) {
            return res.status(404).json({ message: 'No se encontró el ID de la anécdota' })
        }
        res.status(200).json(media)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

const updateMedia = async (req, res) => {
    const { id } = req.params;
    const sendMedia = mediaSchema(req.body);
    try {
        const updatedMedia = await Media.findByIdAndUpdate(id, sendMedia, { new: true })
        if (!updatedMedia) {
            return res.status(404).json({ message: 'No se pudo actualizar la anécdota' })
        }
        res.status(200).json(updatedMedia)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

const deleteMedia = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedMedia = await Media.findByIdAndDelete(id);
        if (!deletedMedia) {
            return res.status(404).json({ message: 'No se pudo eliminar la anécdota' })
        }
        res.status(200).json({ message: 'Media eliminada' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

module.exports = {
    createNewMedia,
    getAllMedias,
    getMediaById,
    updateMedia,
    deleteMedia,
};