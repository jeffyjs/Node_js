const express = require('express');
const Joi = require ('joi');
const app = express();


app.use(express.json());

const courses = [
    {id:1, name: 'courses1'},
    {id:2, name: 'courses2'},
    {id:3, name: 'courses3'}
];

app.get('/', (req,res) => {
    res.send('Hello World');
});

app.get('/api/courses', (req,res) =>{
    res.send(courses);
});

app.get('/api/courses/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with this ID is NOT FOUND');
    res.send(course);
 });
//---------------------------------------GET---------------------------------------

app.post ('/api/courses', (req,res) =>{
    const {error} = validateCourse(req.body);
    if(error)return res.status(400).send(result.error.details[0].message);
    
    const course = {
        id: courses.length + 1 ,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

//---------------------------------------------POST-------------------------------------

app.put('/api/courses/:id', (req,res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with this ID is NOT FOUND');


    const {error} = validateCourse(req.body);
    if(error) return res.status(400).send(result.error.details[0].message);
        

    course.name = req.body.name;
    res.send(course);

});


function validateCourse(course){    
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);

}

//--------------------------------------PUT----------------------------


app.delete('/api/courses/:id', (req,res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with this ID is NOT FOUND');

    const index = courses.indexOf(course);
    courses.splice(index,1);

    res.send(course);
});
//------------------------------DELETE-------------------------------

const port = process.env.PORT || 3000
app.listen(3000, () => console.log(`Listening on port ${port}...`));