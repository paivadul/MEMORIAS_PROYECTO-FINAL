const mongoose = require('mongoose');

const AnecdotaSchema = new mongoose.Schema({
        titulo: {
            type: String,
            required: true,
        },
        fecha: {
            type: Date,
            required: true,
        },
        descripcion: {
            type: String,
            required: true,
        },
        media: {
            type: String,
        }
});

const Anecdota = mongoose.model('Anecdota', AnecdotaSchema);

module.exports = {
    Anecdota
};