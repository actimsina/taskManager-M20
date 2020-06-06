const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();

const categoryRouter = require('./routes/categoryRouter');
const taskRouter = require('./routes/taskRouter');
const userRouter = require('./routes/userRouter');

const auth = require('./routes/auth');

const app = express();

mongoose.connect(process.env.DbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log('Connected to database server');
});

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
    res.send('Welcome, to my app');
});

app.use('/api/users', userRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/tasks', taskRouter);

app.listen(process.env.Port, () => {
    console.log(`Server is running at localhost:${process.env.Port}`);
});