const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

router.route('/')
    .get((req, res, next) => {
        Task.find()
            .then((tasks) => {
                res.json(tasks);
            }).catch((err) => next(err));
    })
    .post((req, res, next) => {
        Task.create(req.body)
            .then((task) => {
                res.status(201).json(task);
            }).catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Task.deleteMany()
            .then((reply) => {
                res.json(reply);
            }).catch(err => next(err));
    });

router.route('/:id')
    .get((req, res, next) => {
        Task.findById(req.params.id)
            .then((task) => {
                res.json(task);
            }).catch(err => next(err));
    })
    .put((req, res, next) => {
        Task.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            .then((task) => {
                res.json(task);
            }).catch(err => next(err));
    })
    .delete((req, res, next) => {
        Task.findByIdAndDelete(req.params.id)
            .then((reply) => {
                res.json(reply);
            }).catch((err) => next(err));
    });

router.route('/:id/notes')
    .get((req, res, next) => {
        Task.findById(req.params.id)
            .then((task) => {
                res.json(task.notes);
            }).catch(err => next(err));
    })
    .post((req, res, next) => {
        let newNote = req.body;
        Task.findById(req.params.id)
            .then((task) => {
                task.notes.push(newNote);
                task.save()
                    .then(newTask => {
                        res.json(newTask.notes)
                    }).catch(err => next(err));
            }).catch(err => next(err));
    })
    .delete((req, res, next) => {
        Task.findById(req.params.id)
            .then((task) => {
                task.notes = [],
                    task.save()
                        .then(newTask => {
                            res.json(newTask.notes)
                        }).catch(err => next(err));
            }).catch(err => next(err));
    });

router.route('/:id/notes/:noteId')
    .get((req, res, next) => {
        Task.findById(req.params.id)
            .then((task) => {
                res.json(task.notes.id(req.params.noteId));
            }).catch(err => next(err));
    })
    .put((req, res, next) => {
        Task.findById(req.params.id)
            .then((task) => {
                let note = task.notes.id(req.params.noteId);
                note.text = req.body.text;
                task.save()
                    .then((task) => {
                        res.json(task.notes.id(req.params.noteId));
                    }).catch(err => next(err));
            }).catch(err => next(err));
    })
    .delete((req, res, next) => {
        Task.findById(req.params.id)
            .then((task) => {
                task.notes = task.notes.filter((note) => {
                    return note.id !== req.params.noteId;
                });
                task.save()
                    .then((task) => {
                        res.json(task.notes);
                    }).catch(err => next(err));
            }).catch(err => next(err));
    });

module.exports = router;