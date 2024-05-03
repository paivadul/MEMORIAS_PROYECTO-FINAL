const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
    audio: {
        type: String,
    },
    foto: {
        type: String,
    },
    video: {
        type: String,
    },
});

const Media = mongoose.model('Media', MediaSchema);

module.exports = {
    Media
};