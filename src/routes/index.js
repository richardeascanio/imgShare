const express = require('express');
const router = express.Router();
const home = require('../controllers/home');
const image = require('../controllers/image');
const user = require('../controllers/user');
const passport = require('passport');
const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const { isAuthenticated } = require('../helpers/auth');

module.exports = app => {
    // Cloudinary configuration
    const { CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
    cloudinary.config({
        cloud_name: CLOUD_NAME,
        api_key: CLOUDINARY_API_KEY,
        api_secret: CLOUDINARY_API_SECRET
    });
    const storage = cloudinaryStorage({
        cloudinary: cloudinary,
        folder: "images",
        allowedFormats: ["jpg", "jpeg", "png", "gif"]
    });
    const parser = multer({ storage: storage });

    // Routes
    router.get('/', home.index);
    router.get('/dashboard', isAuthenticated, home.dashboard);
    router.get('/add', isAuthenticated, home.add);
    router.get('/images/:image_id', isAuthenticated, image.index);
    router.get('/users/signin', user.signin);
    router.get('/users/signup', user.signup);
    router.get('/users/logout', isAuthenticated, user.logout);
    router.get('/users/profile', isAuthenticated, user.profile);
    router.post('/users/signup', parser.single("image"), user.create);
    router.post('/users/signin', passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/signin',
        failureFlash: true
    }));
    router.post('/images', isAuthenticated, parser.single("image"), image.create); //parser.single("image") is to upload the image in cloudinary
    router.post('/images/:image_id/like', isAuthenticated, image.like);
    router.post('/images/:image_id/comment', isAuthenticated, image.comment);
    router.delete('/images/:image_id', isAuthenticated, image.remove);

    app.use(router);
}