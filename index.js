const express = require('express');
const mongoose = require('mongoose');

const taskRouter = require('./routes/taskRouter');


const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/TaskManagerMarch2020', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to database server');
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Welcome, to my app');
});

app.use('/api/tasks', taskRouter);

app.listen(3000, () => {
    console.log('Server is running at localhost:3000');
});