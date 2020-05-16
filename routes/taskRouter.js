const express = require('express');
const router = express.Router();
const Task = require('../model/Task');

router.route('/')
    .get((req, res, next) => {
        Task.find()
            .then((tasks) => {
                res.json(tasks);
            }).catch(next);
    })
    .post((req, res, next) => {
        Task.create(req.body)
            .then(task => {
                res.status(201).json(task)
            }).catch(next);
    })
    .delete((req, res, next) => {
        Task.deleteMany()
            .then(reply => {
                res.json(reply);
            }).catch(next);
    })

router.route('/:task_id')
    .get((req, res, next) => {
        Task.findById(req.params.task_id)
            .then(task => {
                res.json(task);
            }).catch(next);
    })
    .put((req, res, next) => {
        Task.findByIdAndUpdate(req.params.task_id, { $set: req.body }, { new: true })
            .then(task => {
                res.json(task);
            }).catch(next);
    })
    .delete((req, res, next) => {
        Task.deleteOne({ _id: req.params.task_id })
            .then(replay => {
                res.json(replay);
            }).catch(next);
    })

module.exports = router;
