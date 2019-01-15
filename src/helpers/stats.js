const { Image, Comment } = require('../models');

async function imagesCounter() {
    return await Image.countDocuments();
}

async function commentsCounter() {
    return await Comment.countDocuments();
}

async function totalImageViewsCounter() {
    const result = await Image.aggregate([{ $group: {
        _id: '1',
        totalViews: { $sum: '$views' }
    }}]);
    return result[0].totalViews;
}

async function totalLikesCounter() {
    const result = await Image.aggregate([{ $group: {
        _id: '1',
        totalLikes: { $sum: '$likes' }
    }}]);
    return result[0].totalLikes;
}

module.exports = async () => {
    const results = await Promise.all([    // Promise.all() to excecute all the async functions at the same time (async-await)
        imagesCounter(),
        commentsCounter(),
        totalImageViewsCounter(),
        totalLikesCounter()
    ]);
    return {
        images: results[0],
        comments: results[1],
        views: results[2],
        likes: results[3]
    }
}