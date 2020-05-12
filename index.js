const express = require('express');
const mongoose = require('mongoose');
const Task = require('./models/Task');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/TaskManagerMarch2020', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to database server');
});

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
        }).catch(err => console.log(err));
});
app.get('/task/:id', (req, res) => {
    Task.findById(req.params.id)
        .then((task) => {
            res.json(task);
        }).catch(err => console.log(err));
});
app.put('/task/:id', (req, res) => {
    Task.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        .then((task) => {
            res.json(task);
        }).catch(err => console.log(err));

    //     .then((task) => {
    // Task.findById(req.params.id)
    //         if (req.body.name) task.name = req.body.name;
    //         task.done = req.body.done;
    //         task.save()
    //             .then((updatedTask) => {
    //                 res.json(updatedTask)
    //             }).catch((err) => console.log(err));
    //     }).catch(err => console.log(err));
});

app.delete('/task/:id', (req, res) => {
    Task.findByIdAndRemove(req.params.id)
        .then((reply) => {
            res.json(reply);
        }).catch(err => console.log(err));
});

app.listen(3000, () => {
    console.log('Server is running at localhost:3000');
});