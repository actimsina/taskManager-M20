const express = require('express');
const Task = require('../models/Task');
const router = express.Router();


router.route('/')
    .get((req, res) => {
        Task.find()
            .then((tasks) => {
                res.json(tasks);
            }).catch((err) => console.log(err));
    })
    .post((req, res) => {
        Task.create(req.body)
            .then((task) => {
                res.status(201).json(task);
            }).catch((err) => console.log(err));
    })
    .delete((req, res) => {
        Task.deleteMany()
            .then((reply) => {
                res.json(reply);
            }).catch(err => console.log(err));
    });

router.route('/:id')
    .get((req, res) => {
        Task.findById(req.params.id)
            .then((task) => {
                res.json(task);
            }).catch(err => console.log(err));
    })
    .put((req, res) => {
        Task.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            .then((task) => {
                res.json(task);
            }).catch(err => console.log(err));
    })
    .delete((req, res) => {
        Task.findByIdAndDelete(req.params.id)
            .then((reply) => {
                res.json(reply);
            }).catch((err) => console.log(err));
    });

module.exports = router;