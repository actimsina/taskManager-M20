const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();
const path = require('path');
const cors = require('cors');

const categoryRouter = require('./routes/categoryRouter');
const taskRouter = require('./routes/taskRouter');
const userRouter = require('./routes/userRouter');
const uploadRouter = require('./routes/upload');

const auth = require('./routes/auth');

const app = express();
app.use(morgan('tiny'));

mongoose.connect(process.env.DbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log('Connected to database server');
});

app.use(cors('*'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
    res.send('Welcome, to my app');
});

app.use('/api/users', userRouter);
app.use('/api/upload', auth.verifyUser, uploadRouter);
app.use('/api/categories', auth.verifyUser, categoryRouter);
app.use('/api/tasks', auth.verifyUser, taskRouter);

app.use((req, res, next) => {
    let err = new Error('Not found!');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(err.status || 500);
    res.json({
        status: 'error',
        message: err.message
    });
})
app.listen(process.env.Port, () => {
    console.log(`Server is running at localhost:${process.env.Port}`);
});