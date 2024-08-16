const express = require('express');
const router = express.Router();

const genres = [
    {id: 1, name: 'Action'},
    {id: 2, name: 'Horror'},
    {id: 3, name: 'Romance'},
];

router.get('/', (req, res) => {
    res.send(genres);
})

router.get('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not find.');
    res.send(genre);
});

router.post('/', (req, res ) => {
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

router.put('/:id', (req, res ) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not find.');

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.detals[0].message);

    genre.name = req.body.name;
    res.send(genre);
});

router.delete('/:id', (req, res ) => {
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

module.exports = router;