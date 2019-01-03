const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const express = require('express');
const errorHandler = require('errorhandler');
const routes = require('../routes/index.js');

module.exports = app => {

    // Settings 
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, '../views'));
    app.engine('.hbs', exphbs({
        defaultLayout: 'main',
        partialsDir: path.join(app.get('views'), 'partials'),
        layoutsDir: path.join(app.get('views'), 'layouts'),
        extname: '.hbs',
        helpers: require('./helpers')
    }))
    app.set('view engine', '.hbs');

    // Middlewares
    app.use(morgan('dev'));
    app.use(express.urlencoded({
        extended: false
    }));
    app.use(express.json());

    // Routes
    routes(app);

    // Static files
    app.use('/public', express.static(path.join(__dirname, '../public')));

    // ErrorHandlers
    if ('development' == app.get('env')){
        app.use(errorHandler);
    }

    return app;
}