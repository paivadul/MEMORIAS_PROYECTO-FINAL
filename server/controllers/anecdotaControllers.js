const { Anecdota } = require('../models/anecdotaModels');

const anecdotaSchema = anecdota => ({
    titulo: anecdota.titulo,
    fecha: anecdota.fecha,
    descripcion: anecdota.descripcion,
    media: {
        audio: anecdota.media.audio,
        foto: anecdota.media.foto,
        video: anecdota.media.video
    }
});

const createNewAnecdota = async (req, res) => {
    try {
        // Obtener el nombre del archivo cargado
        const mediaFileName = req.file.filename;

        // Crear una nueva instancia del modelo Anecdota
        const newAnecdota = new Anecdota({
            titulo: req.body.titulo,
            fecha: req.body.fecha,
            descripcion: req.body.descripcion,
            media: {
                foto: mediaFileName // Solo se carga una foto en este ejemplo
            }
        });

        // Guardar la nueva anécdota en la base de datos
        const savedAnecdota = await newAnecdota.save();

        res.status(201).json(savedAnecdota);
    } catch (error) {
        console.error('Error al crear una nueva anecdota:', error);
        res.status(400).json({ error: error.message });
    }
};


const getAllAnecdotas = async (req, res) => {
    try {
        const anecdotas = await Anecdota.find();
        res.status(200).json(anecdotas);
        res.send('Anecdota s enviadas')
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
            return res.status(404).json({ message: 'No se encontró la anecdota' })
        }
        res.status(200).json(anecdota)
        res.send('Anecdota enviada por ID')
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

const updateAnecdota = async (req, res) => {
    const { id } = req.params;
    const sendAnecdota = anecdotaSchema(req.body);
    try {
        const updatedAnecdota = await Anecdota.findByIdAndUpdate(id, sendAnecdota, { new: true })
        if (!updatedAnecdota) {
            return res.status(404).json({ message: 'No se pudo actualizar la anecdota' })
        }
        res.status(200).json(updatedAnecdota)
        res.send('Anecdota actualizada')
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

const deleteAnecdota = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedAnecdota = await Anecdota.findByIdAndDelete(id);
        if (!deletedAnecdota) {
            return res.status(404).json({ message: 'No se pudo eliminar la anecdota' })
        }
        res.status(200).json({ message: 'Anecdota eliminada' })
        res.send('Anecdota eliminada')
    } catch (error) {
        res.status(500).json({ error: error.message })
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
