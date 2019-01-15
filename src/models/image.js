const mongoose = require('mongoose');
const { Schema } = mongoose;
const path = require('path');

const ImageSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    imageUrl: {
        type: String
    },
    filename: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    user: {
        type: String
    },
    author: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// To remove the extension of the filename of the image and storage if virtually in 'uniqueId'
// The function of the uniqueId is to remove the extension of the filename
ImageSchema.virtual('uniqueId').get(function() {
    return this.filename.replace(path.extname(this.filename), '')
});

module.exports = mongoose.model('Image', ImageSchema);