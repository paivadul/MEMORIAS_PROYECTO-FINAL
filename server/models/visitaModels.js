const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MediaSchema = new Schema({
    audio: {
        type: Schema.Types.ObjectId,
        ref: 'Audio'
    },
    foto: {
        type: Schema.Types.ObjectId,
        ref: 'Foto'
    },
    video: {
        type: Schema.Types.ObjectId,
        ref: 'Video'
    }
});

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
            type: MediaSchema
        }
});

const Visita = mongoose.model('Visita', VisitaSchema);

module.exports = {
    Visita
};