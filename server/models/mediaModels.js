const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
    audio: {
        type: Buffer,
        contentType: String
    },
    foto: {
        type: Buffer,
        contentType: String
    },
    video: {
        type: Buffer,
        contentType: String
    },
});

const Media = mongoose.model('Media', MediaSchema);

module.exports = {
    Media
};