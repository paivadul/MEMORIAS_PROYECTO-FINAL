const { Media } = require('../models/mediaModels');

const createNewMedia = async (req, res) => {
    try {
        const { file, body } = req;

        const nuevoMedia = await Media.create({
            audio: file.path,
            foto: body.foto,
            video: body.video
        });

        res.status(200).json(nuevoMedia);
    } catch (error) {
        console.error('Error al crear una nueva media:', error);
        res.status(400).json({ error: error.message });
    }
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
            return res.status(404).json({ message: 'No se encontró el medio con el ID proporcionado' });
        }
        res.status(200).json(media);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateMedia = async (req, res) => {
    const { id } = req.params;
    const sendMedia = req.body;

    try {
        const updatedMedia = await Media.findByIdAndUpdate(id, sendMedia, { new: true });
        if (!updatedMedia) {
            return res.status(404).json({ message: 'No se pudo actualizar el medio' });
        }
        res.status(200).json(updatedMedia);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteMedia = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedMedia = await Media.findByIdAndDelete(id);
        if (!deletedMedia) {
            return res.status(404).json({ message: 'No se pudo eliminar el medio' });
        }
        res.status(200).json({ message: 'Media eliminada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createNewMedia,
    getAllMedias,
    getMediaById,
    updateMedia,
    deleteMedia,
};
