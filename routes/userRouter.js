const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/register', (req, res, next) => {
    let { username, password, firstName, lastName, role } = req.body;
    User.findOne({ username })
        .then(user => {
            if (user) {
                let err = new Error('Username already exists!');
                err.status = 400;
                return next(err);
            }
            bcrypt.hash(password, 10)
                .then((hash) => {
                    User.create({ username, password: hash, firstName, lastName, role })
                        .then(user => {
                            res.status(201).json({ "status": "Signup Success" });
                        }).catch(next);
                }).catch(next);
        }).catch(next);
});

router.post('/login', (req, res, next) => {
    let { username, password } = req.body;
    User.findOne({ username })
        .then((user) => {
            if (!user) {
                let err = new Error('User does not exists!');
                err.status = 400;
                return next(err);
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        let err = new Error('Password does not match!');
                        err.status = 401;
                        return next(err);
                    }
                    let payload = {
                        id: user.id,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        role: user.role
                    }
                    jwt.sign(payload, process.env.SECRET, (err, token) => {
                        if (err) { throw new Error('Could not issue a token'); }
                        res.json({
                            success: true,
                            token: `Bearer ${token}`
                        });
                    });
                }).catch(next);
        }).catch(next);
});


module.exports = router;