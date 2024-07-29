const express = require('express')
const app = express()
const Joi = require('joi')

app.use(express.json());

const genres = [
    {id: 1, name: 'Action'},
    {id: 2, name: 'Horror'},
    {id: 3, name: 'Romance'},
];

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