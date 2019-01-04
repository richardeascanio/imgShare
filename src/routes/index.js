const express = require('express');
const router = express.Router();
const home = require('../controllers/home');
const image = require('../controllers/image');
const user = require('../controllers/user');
const passport = require('passport');
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
    router.get('/', home.index);
    router.get('/dashboard', home.dashboard);
    router.get('/add', home.add);
    router.get('/images/:image_id', image.index);
    router.get('/users/signin', user.signin);
    router.get('/users/signup', user.signup);
    router.get('/users/logout', user.logout);
    router.post('/users/signup', user.create);
    router.post('/users/signin', passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/signin',
        failureFlash: true
    }));
    router.post('/images', parser.single("image"), image.create); //parser.single("image") is to upload the image in cloudinary
    router.post('/images/:image_id/like', image.like);
    router.post('/images/:image_id/comment', image.comment);
    router.delete('/images/:image_id', image.remove);

    app.use(router);
}