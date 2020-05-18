const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/signup', (req, res, next) => {
    let { username, password, firstName, lastName, role } = req.body;
    User.findOne({ username })
        .then(user => {
            if (user) {
                let err = new Error('Username already exists!');
                err.status = 401;
                return next(err);
            }
            bcrypt.hash(password, 10)
                .then((hash) => {
                    let payload = {
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        role: user.role
                    }
                    let token = jwt.sign(payload, process.env.SECRET);
                    User.create({ username, password: hash, firstName, lastName })
                        .then(user => {
                            res.status(201).json(token);
                        }).catch(next);
                }).catch(next);
        }).catch(next);
});

module.exports = router;