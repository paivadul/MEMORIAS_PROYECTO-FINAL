const mongoose = require('mongoose');

const VisitaSchema = new mongoose.Schema({
        nombre: {
            type: String,
            required: true,
        },
        nota: {
            type: Date,
            required: true,
        },
        media: {
            type: Buffer,
            required: true,
        }
});

const Visita = mongoose.model('Visita', VisitaSchema);

module.exports = {
    Visita
};