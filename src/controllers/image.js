const path = require('path');
const { randomName } = require('../helpers/libs');
const fs = require('fs-extra');
const { Image, Comment } = require('../models');
const sidebar = require('../helpers/sidebar');
const ctrl = {};

// Description view of just one image
ctrl.index = async (req, res) => {
    let viewModel = {
        image: {},
        comments: {},
        isAuthor: false
    };
    const image = await Image.findOne({
        filename: { $regex: req.params.image_id }
        // filename is the image_id but with the extension, so $regex help me to find an image
        // wose filename isnt exactly the same as the image_id param but it is contained by it
    });
    if (image) {
        image.views++;
        viewModel.image = image;
        await image.save();
        const comments = await Comment.find({
            image_id: image._id
        });
        if (image.user == req.user._id){
            console.log('is author');
            viewModel.isAuthor= true
        }
        viewModel.comments = comments;
        viewModel = await sidebar(viewModel);
        res.render('image', viewModel);
    } else {
        res.redirect('/');
    }
    
};

// Create and save an image
ctrl.create = (req, res) => {
    const saveImage = async () => {
        const url = randomName();
        const images = await Image.find({
            filename: url
        });
        if (images.length > 0) {
            saveImage();
        } else {
            const ext = path.extname(req.file.originalname).toLowerCase();
            if (ext === '.png' || ext === '.jpg' || ext === '.jepg' || ext === '.gif') {
                const newImg = new Image({
                    title: req.body.title,
                    imageUrl: req.file.url,
                    filename: url + ext,
                    description: req.body.description,
                    user: req.user._id,
                    author: req.user.username
                });
                const imageSaved = await newImg.save();
                res.redirect('/images/' + url);
            } else {
                res.status(500).json({
                    error: 'Only images are allowed'
                });
            }
        }
    };
    saveImage();
};

ctrl.like = async (req, res) => {
    const image = await Image.findOne({
        filename: { $regex: req.params.image_id }
    });
    if (image) {
        image.likes++;
        await image.save();
        res.json({
            likes: image.likes
        });
    } else {
        res.status(500).json({
            error: 'Internal error'
        });
    }
};

ctrl.comment = async (req, res) => {
    const image = await Image.findOne({
        filename: { $regex: req.params.image_id }
    });
    if (image) {
        const newComment = new Comment({
            name: req.user.name,
            email: req.user.email,
            comment: req.body.comment
        });
        newComment.image_id = image._id;
        await newComment.save();
        res.redirect(`/images/${image.uniqueId}`);
    } else {
        res.redirect('/');
    }
};

ctrl.remove = async (req, res) => {
    const image = await Image.findOne({
        filename: { $regex: req.params.image_id }
    });
    if (image) {
        await fs.unlink(path.resolve('./src/public/upload/' + image.filename));
        await Comment.deleteOne({
            image_id: image._id
        });
        await image.remove();
        res.json(true);
    }
};

module.exports = ctrl;