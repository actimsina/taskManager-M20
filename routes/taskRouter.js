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

router.route('/:id/notes')
    .get((req, res) => {
        Task.findById(req.params.id)
            .then((task) => {
                res.json(task.notes);
            }).catch(err => console.log(err));
    })
    .post((req, res) => {
        let newNote = req.body;
        Task.findById(req.params.id)
            .then((task) => {
                task.notes.push(newNote);
                task.save()
                    .then(newTask => {
                        res.json(newTask.notes)
                    }).catch(err => console.log(err));
            }).catch(err => console.log(err));
    })
    .delete((req, res) => {
        Task.findById(req.params.id)
            .then((task) => {
                task.notes = [],
                    task.save()
                        .then(newTask => {
                            res.json(newTask.notes)
                        }).catch(err => console.log(err));
            }).catch(err => console.log(err));
    });

router.route('/:id/notes/:noteId')
    .get((req, res) => {
        Task.findById(req.params.id)
            .then((task) => {
                res.json(task.notes.id(req.params.noteId));
            }).catch(err => console.log(err));
    })
    .put((req, res) => {
        Task.findById(req.params.id)
            .then((task) => {
                let note = task.notes.id(req.params.noteId);
                note.text = req.body.text;
                task.save()
                    .then((task) => {
                        res.json(task.notes.id(req.params.noteId));
                    }).catch(err => console.log(err));
            }).catch(err => console.log(err));
    })
    .delete((req, res) => {
        Task.findById(req.params.id)
            .then((task) => {
                task.notes = task.notes.filter((note) => {
                    return note.id !== req.params.noteId;
                });
                task.save()
                    .then((task) => {
                        res.json(task.notes);
                    }).catch(err => console.log(err));
            }).catch(err => console.log(err));
    });

module.exports = router;