const mongoose = require('mongoose');

const VisitaSchema = new mongoose.Schema({
        nombre: {
            type: String,
            required: true,
        },
        nota: {
            type: String,
            required: true,
        },
        media: {
            type: String,
        }
});

const Visita = mongoose.model('Visita', VisitaSchema);

module.exports = {
    Visita
};