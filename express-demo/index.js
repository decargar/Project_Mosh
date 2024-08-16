const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());


const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
 ];
app.get('/', (req, res) => {
    res.send('Welcome');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// app.get('/api/posts/:year/:month', (req, res) => {
//     res.send(req.query);
// })

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found'); // 404
    res.send(course);
    // res.send(req.params.id);
});

app.post('/api/courses', (req, res) => {
    // const { error } = validateCourse(req.body);
    // if (error) {
    // //     res.status(400).send(error.details[0].message);
    //     return;
    // }
    // const schema = {
    //     name: Joi.string().min(3).required()
    // };

    // const result = Joi.Validate(req.body, schema);
    // console.log(result);

    // if (result.error) {
    //     // 400 Bad Request
    //     res.status(400).send(result.error.details[0].message);
    //     return;
    // }
    if (!req.body.name || req.body.name.length < 3) return res.status(400).send('Name is required and it should be minimum 3 characters');
        // 400 Bad Request

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    // Look up the course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found'); // 404


    // validate
    // if invalid, return 400 - bad request
    if (!req.body.name || req.body.name.length < 3) 
        // 400 Bad Request
       return res.status(400).send('Name is required and it should be minimum 3 characters');

    // update course
    course.name = req.body.name;
    // Return the updated course
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    // Look up the course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    // Not existing, return 404
    if (!course) return res.status(404).send('The course with the given ID was not found');
    

    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // Return the same course
    res.send(course);
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
// app.post()
// app.put()
// app.delete()