const { Visita } = require('../models/visitaModels');
const upload = require('../config/multerConfig')

const visitaSchema = visita => ({
    nombre: visita.nombre,
    nota: visita.nota,
    media: visita.media
});

const createNewVisita = (req, res) => {
    try {
        // Utilizar el middleware de Multer para manejar la carga de archivos
        upload.single('media')(req, res, (err) => {
            if (err) {
                console.error('Error al cargar el archivo:', err);
                return res.status(400).json({ error: 'Error al cargar el archivo' });
            }

            // Obtener el nombre del archivo cargado
            const mediaFileName = req.file ? req.file.filename : null;

            // Crear una nueva instancia del modelo visita
            const sendvisita = visitaSchema(req.body);
            sendvisita.media = mediaFileName; // Asignar el nombre del archivo al campo de media

            // Guardar la nueva anécdota en la base de datos
            Visita.create(sendvisita)
                .then(visita => {
                    res.status(200).json(visita);
                })
                .catch(err => {
                    console.error('Error al crear una nueva visita:', err);
                    res.status(400).json({ error: err.message });
                });
        });
    } catch (error) {
        console.error('Error al crear una nueva visita:', error);
        res.status(400).json({ error: error.message });
    }
};

const getAllVisitas = async (req, res) => {
    try {
        const visitas = await Visita.find();
        res.status(200).json(visitas);
    } catch (error) {
        console.error('Error al obtener visitas:', error);
        res.status(500).json({ error: error.message });
    }
};

const getVisitaById = async (req, res) => {
    const { id } = req.params;
    try {
        const visita = await Visita.findById(id);
        if (!visita) {
            return res.status(404).json({ message: 'No se encontró la visita' });
        }
        res.status(200).json(visita);
    } catch (error) {
        console.error('Error al obtener la visita por ID:', error);
        res.status(500).json({ error: error.message });
    }
};

const updateVisita = async (req, res) => {
    const { id } = req.params;
    const sendVisita = visitaSchema(req.body);
    try {
        const updatedVisita = await Visita.findByIdAndUpdate(id, sendVisita, { new: true });
        if (!updatedVisita) {
            return res.status(404).json({ message: 'No se pudo actualizar la visita' });
        }
        res.status(200).json(updatedVisita);
    } catch (error) {
        console.error('Error al actualizar la visita:', error);
        res.status(500).json({ error: error.message });
    }
};

const deleteVisita = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedVisita = await Visita.findByIdAndDelete(id);
        if (!deletedVisita) {
            return res.status(404).json({ message: 'No se pudo eliminar la visita' });
        }
        res.status(200).json({ message: 'Visita eliminada' });
    } catch (error) {
        console.error('Error al eliminar la visita:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createNewVisita,
    getAllVisitas,
    getVisitaById,
    updateVisita,
    deleteVisita,
};
