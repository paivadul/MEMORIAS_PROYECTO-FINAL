const { Anecdota } = require('../models/anecdotaModels');

const anecdotaSchema = anecdota => ({
    titulo: anecdota.titulo,
    fecha: anecdota.fecha,
    descripcion: anecdota.descripcion,
});

const createNewAnecdota = (req, res) => {
    const sendAnecdota = anecdotaSchema(req.body); 
    Anecdota.create(sendAnecdota)
        .then(Anecdota => {
            res.status(200).json(Anecdota);
        })
        .catch(err => {
            console.error('Error al crear una nueva anecdota:', err);
            res.status(400).json({ error: err.message });
        });
};

const getAllAnecdotas = async (req, res) => {
    try {
        const anecdotas = await Anecdota.find();
        res.status(200).json(anecdotas);
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
            return res.status(404).json({ message: 'No se encontró el ID de la anécdota' })
        }
        res.status(200).json(anecdota)
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
            return res.status(404).json({ message: 'No se pudo actualizar la anécdota' })
        }
        res.status(200).json(updatedAnecdota)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

const deleteAnecdota = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedAnecdota = await Anecdota.findByIdAndDelete(id);
        if (!deletedAnecdota) {
            return res.status(404).json({ message: 'No se pudo eliminar la anécdota' })
        }
        res.status(200).json({ message: 'Anecdota eliminada' })
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
            const fechaRegex = new Date(fecha);
            query.fecha = { $eq: fechaRegex };
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