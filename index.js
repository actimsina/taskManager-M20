const express = require('express');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Welcome, to my app');
});

// RESTful?
app.get('/task', (req, res) => {
    res.send('Send all task');
});
app.post('/task', (req, res) => {
    console.log(req.body.desc);
    res.status(201).send('Should create a new task');
});
app.delete('/task', (req, res) => {
    res.send('Delete all task');
});
app.get('/task/:id', (req, res) => {
    res.send(`Send a task with id ${req.params.id}`);
});
app.put('/task/:id', (req, res) => {
    res.send(`Update the task with id ${req.params.id}`);
});
app.delete('/task/:id', (req, res) => {
    res.send(`Delete a task with id ${req.params.id}`);
});

app.listen(3000, () => {
    console.log('Server is running at localhost:3000');
});