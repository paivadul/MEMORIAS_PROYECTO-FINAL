const { Anecdota } = require('../models/anecdotaModels');
const upload = require('../config/multerConfig')

const anecdotaSchema = anecdota => ({
    titulo: anecdota.titulo,
    fecha: anecdota.fecha,
    descripcion: anecdota.descripcion,
    media: anecdota.media
});

const createNewAnecdota = (req, res) => {
    console.log('esto es req.body fuera del try', req.body)

    try {
        console.log('esto es req.body', req.body)
        // Utilizar el middleware de Multer para manejar la carga de archivos
        upload.single('media')(req, res, (err) => {
            if (err) {
                console.error('Error al cargar el archivo:', err);
                return res.status(400).json({ error: 'Error al cargar el archivo' });
            }

            // Obtener el nombre del archivo cargado
            const mediaFileName = req.file ? req.file.filename : null;

            // Crear una nueva instancia del modelo Anecdota
            const sendAnecdota = anecdotaSchema(req.body);
            sendAnecdota.media = mediaFileName; // Asignar el nombre del archivo al campo de media

            // Guardar la nueva anécdota en la base de datos
            Anecdota.create(sendAnecdota)
                .then(anecdota => {
                    res.status(200).json(anecdota);
                })
                .catch(err => {
                    console.error('Error al crear una nueva anecdota:', err);
                    res.status(400).json({ error: err.message });
                });
        });
    } catch (error) {
        console.error('Error en la nueva anecdota:', error);
        res.status(400).json({ error: error.message });
    }
};

const getAllAnecdotas = async (req, res) => {
    try {
        const anecdotas = await Anecdota.find();
        res.status(200).json({ anecdotas, message: "Anecdotas enviadas" });
    } catch (error) {
        console.error('Error al obtener anecdotas:', error);
        res.status(500).json({ error: error.message });
    }
};

const getAnecdotaById = async (req, res) => {
    const { id } = req.params;
    try {
        const anecdota = await Anecdota.findById(id);
        if (!anecdota) {
            return res.status(404).json({ message: 'No se encontró la anecdota' });
        }
        res.status(200).json(anecdota);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateAnecdota = async (req, res) => {
    const { id } = req.params;
    const sendAnecdota = anecdotaSchema(req.body);
    try {
        const updatedAnecdota = await Anecdota.findByIdAndUpdate(id, sendAnecdota, { new: true });
        if (!updatedAnecdota) {
            return res.status(404).json({ message: 'No se pudo actualizar la anecdota' });
        }
        res.status(200).json(updatedAnecdota);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteAnecdota = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedAnecdota = await Anecdota.findByIdAndDelete(id);
        if (!deletedAnecdota) {
            return res.status(404).json({ message: 'No se pudo eliminar la anecdota' });
        }
        res.status(200).json({ message: 'Anecdota eliminada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const searchAnecdotas = async (req, res) => {
    const { titulo, fecha } = req.query;
    try {
        let query = {};
        if (titulo) {
            const tituloRegex = new RegExp(titulo, 'i');
            query.titulo = { $regex: tituloRegex };
        }
        if (fecha) {
            query.fecha = new Date(fecha);
        }
        const anecdotas = await Anecdota.find(query);
        res.status(200).json(anecdotas);
    } catch (error) {
        console.error('Error al buscar Anecdotas:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createNewAnecdota,
    getAllAnecdotas,
    getAnecdotaById,
    updateAnecdota,
    deleteAnecdota,
    searchAnecdotas
};
