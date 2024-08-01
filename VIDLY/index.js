const debug = require('debug')('app:startup');
// const dbDebugger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan'); // Third Part Middleware
const helmet = require('helmet'); // Third Part Middleware
const express = require('express');
const logger = require('./logger');
const auth = require('./auth');
const app = express();
const Joi = require('joi');

app.set('views engine', 'pug');
app.set('views', './views');

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`); // Setting Up environment
// console.log(`app: ${app.get('env')}`); // Setting Up environment

// Build in middleware function
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());

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

const genres = [
    {id: 1, name: 'Action'},
    {id: 2, name: 'Horror'},
    {id: 3, name: 'Romance'},
];
app.get('/', (req, res) => {
    res.render('index.pug', { title: 'My Express App', message: 'Hello'});
})

app.get('/api/genres', (req, res) => {
    res.send(genres);
})

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not find.');
    res.send(genre);
});

app.post('/api/genres', (req, res ) => {
    if(!req.body.name || req.body.lenght < 2) {
        // 400 Bad request
        res.status(400).send('Name is required and it should be minimum 2 characters.')
        return;
    }
    
    const genre = {
        id: genres.lenght + 1,
        name:req.body.name
    };
    genres.push(genre)
    res.send(genre)
})

app.put('/api/genres/:id', (req, res ) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not find.');

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.detals[0].message);

    genre.name = req.body.name;
    res.send(genre);
});

app.delete('/api/genres/:id', (req, res ) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not find.');

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre)
});

function validateGenre(genre) {
    const schema = Joi.object ({
        name: Joi.string().min(2).required()
    });

    return schema.validate(genre);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));