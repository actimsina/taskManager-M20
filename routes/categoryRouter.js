const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Task = require('../models/Task');
const { verifyUser, verifyManager, verifyAdmin } = require('../routes/auth');

router.route('/')
    .get(verifyUser, (req, res, next) => {
        Category.find()
            .then((categories) => {
                res.json(categories);
            }).catch(next);
    })
    .post(verifyUser, verifyManager, (req, res, next) => {
        Category.create(req.body)
            .then((category) => {
                res.status(201).json(category);
            }).catch(next);
    })
    .delete(verifyUser, verifyAdmin, (req, res, next) => {
        Category.deleteMany()
            .then((reply) => {
                res.json(reply);
            }).catch(next);
    });

router.route('/:id')
    .get((req, res, next) => {
        Category.findById(req.params.id)
            .populate('tasks')
            .then(category => {
                res.json(category)
            }).catch(next)
    })
    .put((req, res, next) => {
        Category.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            .then(updatedCategory => {
                res.json(updatedCategory)
            }).catch(next)
    })
    .delete((req, res, next) => {
        Category.deleteOne({ _id: req.params.id })
            .then((reply) => {
                res.json(reply)
            }).catch(next)
    });

router.route('/:id/tasks')
    .get((req, res, next) => {
        Category.findById(req.params.id)
            .populate('tasks')
            .then(category => {
                res.json(category.tasks);
            }).catch(next);
    })
    .post((req, res, next) => {
        Category.findById(req.params.id)
            .then(category => {
                Task.create(req.body)
                    .then(task => {
                        category.tasks.push(task._id);
                        category.save()
                            .then(updatedCategory => {
                                res.status(201).json(task);
                            }).catch(next);
                    }).catch(next);
            }).catch(next);
    })
    .delete((req, res, next) => {
        Category.findById(req.params.id)
            .then(category => {
                Task.deleteMany({ _id: { $in: category.tasks } })
                    .then(reply => {
                        category.tasks = [];
                        category.save()
                            .then(updatedCategory => {
                                res.json({ reply, updatedCategory });
                            }).catch(next);
                    }).catch(next);
            }).catch(next);
    })

router.route('/:id/tasks/:taskId')
    .get((req, res, next) => {
        Category.findById(req.params.id)
            .then(category => {
                if (category.tasks.includes(req.params.taskId)) {
                    Task.findById(req.params.taskId)
                        .then(task => {
                            res.json(task);
                        }).catch(next);
                } else {
                    next('Not found');
                }
            }).catch(next);
    })
    .put((req, res, next) => {
        Category.findById(req.params.id)
            .then(category => {
                if (category.tasks.includes(req.params.taskId)) {
                    Task.findByIdAndUpdate(req.params.taskId, { $set: req.body }, { new: true })
                        .then(task => {
                            res.json(task);
                        }).catch(next);
                } else {
                    next('Not found');
                }
            }).catch(next);
    })
    .delete((req, res, next) => {
        Category.findById(req.params.id)
            .then(category => {
                if (category.tasks.includes(req.params.taskId)) {
                    Task.deleteOne({ _id: req.params.taskId })
                        .then(reply => {
                            category.tasks = category.tasks.filter((value) => {
                                return value != req.params.taskId;
                            })
                            category.save()
                                .then(updatedCategory => {
                                    res.json({ reply, updatedCategory });
                                }).catch(next);
                        }).catch(next);
                } else {
                    res.status(404);
                    next('Not found!');
                }
            }).catch(next);
    })
module.exports = router;