const express = require('express');
const mongoose = require('mongoose');
const Task = require('./model/Task');

const app = express();

mongoose.connect('mongodb://127.0.0.1/TaskManagerMarch2020-SB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
})
    .then(() => console.log('Database server connected'))
    .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Welcome, to my app');
});

// RESTful?
app.get('/task', (req, res) => {
    Task.find()
        .then((tasks) => {
            res.json(tasks);
        }).catch((err) => console.log(err));
});
app.post('/task', (req, res) => {
    Task.create(req.body)
        .then((task) => {
            res.status(201).json(task);
        }).catch((err) => console.log(err));
});
app.delete('/task', (req, res) => {
    Task.deleteMany()
        .then((reply) => {
            res.json(reply);
        }).catch((err) => console.log(err));
});
app.get('/task/:id', (req, res) => {
    Task.findById(req.params.id)
        .then((task) => {
            res.json(task);
        }).catch((err) => console.log(err));
});
app.put('/task/:id', (req, res) => {
    Task.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        .then((task) => {
            res.json(task);
        }).catch((err) => console.log(err));
});
app.delete('/task/:id', (req, res) => {
    Task.findByIdAndDelete(req.params.id)
        .then((reply) => {
            res.json(reply);
        }).catch((err) => console.log(err));
});

app.listen(3000, () => {
    console.log('Server is running at localhost:3000');
});