const express = require('express');
const config = require('./server/config');

// Database
require('./database');
const app = config(express());

// Initializing passport
require('./config/passport');

// Starting server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
