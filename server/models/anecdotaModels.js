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
            type: MediaSchema
        }
});

const Anecdota = mongoose.model('Anecdota', AnecdotaSchema);

module.exports = {
    Anecdota
};