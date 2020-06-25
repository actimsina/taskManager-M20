const express = require('express');
const multer = require('multer');
const path = require('path');

// Storage
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + ext);
    }
});
// Filter
const imageFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        let err = new Error('Only image files are allowed');
        err.status = 400;
        return cb(err, false);
    }
    cb(null, true);
}

const upload = multer({
    storage: storage,
    fileFilter: imageFilter,
    limits: {
        fileSize: 1024 * 1024
    }
});

const uploadRouter = express.Router();

uploadRouter.route('/')
    .post(upload.single('myFile'), (req, res, next) => {
        res.json(req.file);
    });

module.exports = uploadRouter;


