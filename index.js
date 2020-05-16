const express = require('express');
const mongoose = require('mongoose');

const taskRouter = require('./routes/taskRouter');

const app = express();

mongoose.connect('mongodb://127.0.0.1/TaskManagerMarch2020-SB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
})
    .then(() => console.log('Database server connected'))
    .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Welcome, to my app');
});

app.use('/api/task', taskRouter);

app.listen(3000, () => {
    console.log('Server is running at localhost:3000');
});