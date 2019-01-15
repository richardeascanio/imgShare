const { Schema, model } = require('mongoose');
const { ObjectId } = Schema;

const CommentSchema = new Schema({
    email: {
        type: String
    },
    name: {
        type: String
    },
    comment: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    picture: {
        type: String,
    },
    image_id: {
        type: ObjectId // To tell mongoDB that this id belongs to annother collection
    }
});

// We use this virtual property to set an image to the comment in Recent Comments
CommentSchema.virtual('image').set(function(image) {
    this._image = image;
}).get(function() {
    return this._image
});

module.exports = model('Comment', CommentSchema);