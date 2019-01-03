const express = require('express');
const router = express.Router();
const home = require('../controllers/home');
const image = require('../controllers/image');
const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

module.exports = app => {
    cloudinary.config({
        cloud_name: 'richardeascanio',
        api_key: 267243752577173,
        api_secret: 'L4qWTJ055d8rouqkRLchDf_2gs0'
    });
    const storage = cloudinaryStorage({
        cloudinary: cloudinary,
        folder: "images",
        allowedFormats: ["jpg", "jpeg", "png", "gif"]
    });
    const parser = multer({ storage: storage });
    router.get('/', home.dashboard);
    router.get('/add', home.index);
    router.get('/images/:image_id', image.index);
    router.post('/images', parser.single("image"), image.create);
    router.post('/images/:image_id/like', image.like);
    router.post('/images/:image_id/comment', image.comment);
    router.delete('/images/:image_id', image.remove);

    app.use(router);
}