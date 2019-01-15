const ctrl = {};
const { Image } = require('../models');
const sidebar = require('../helpers/sidebar');
const { isAuthenticated } = require('../helpers/auth');

ctrl.index = (req, res) => {
    res.render('index');
};

ctrl.add = async (req, res) => {
    const images = await Image.find().sort({
        timestamp: -1 // Ascending(1), Descending(-1) 
    });
    let viewModel = {
        images: []
    };
    viewModel.images = images;
    viewModel = await sidebar(viewModel);
    res.render('add', viewModel);
};

ctrl.dashboard = async (req, res) => {
    const images = await Image.find().sort({
        timestamp: -1
    });
    let viewModel = {
        images: []
    };
    viewModel.images = images;
    viewModel = await sidebar(viewModel);
    res.render('dashboard', viewModel);
};

module.exports = ctrl;