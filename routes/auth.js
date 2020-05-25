const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
    let authHeader = req.headers.authorization;
    if (!authHeader) {
        let err = new Error('No authentication information');
        err.status = 401;
        return next(err);
    }
    let token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET, (err, payload) => {
        if (err) return next(err);
        req.user = payload;
        console.log(req.user);
        next();
    })
}

const verifyManager = (req, res, next) => {
    if (!req.user) {
        let err = new Error('No authentication information');
        err.status = 401;
        return next(err);
    } else if (req.user.role === 'basic') {
        let err = new Error('Forbidden!');
        err.status = 403;
        return next(err);
    }
    // Manager and Admin allowed
    next();
}

// Only Admin allowed
const verifyAdmin = (req, res, next) => {
    if (!req.user) {
        let err = new Error('Unauthorized!');
        err.status = 401;
        return next(err);
    } else if (req.user.role !== 'admin') {
        let err = new Error('Forbidden!');
        err.status = 403;
        return next(err);
    }
    next();
}

module.exports = {
    verifyUser,
    verifyManager,
    verifyAdmin
};