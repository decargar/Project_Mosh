const debug = require('debug')('app:startup');
// const dbDebugger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan'); // Third Part Middleware
const helmet = require('helmet'); // Third Part Middleware
const express = require('express');
const logger = require('./middleware/logger');
const genres = require('./routes/genres');
const home = require('./routes/home');
const auth = require('./auth');
const app = express();
const Joi = require('joi');

app.set('views engine', 'pug');
app.set('views', './views'); //optional

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`); // Setting Up environment
// console.log(`app: ${app.get('env')}`); // Setting Up environment

// Build in middleware function
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/genres', genres);
app.use('./api/home', home);

// configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
// console.log('Mail Password: ' + config.get('mail.password')); // this is not completed

if (app.get('env') === 'development'){
    app.use(morgan('tiny'));
    debug('Morgan Enable .....') //console.log()
}

// DB work
// dbDebugger('connected to the database...');

// Creating a middleware function
app.use(logger);
app.use(auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));