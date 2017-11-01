// Import dependencies
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// MongoDB URL from the docker-compose file
const dbHost = 'mongodb://database/mean-todo';

// Connect to mongodb
mongoose.connect(dbHost);

// create mongoose schema
const todoSchema = new mongoose.Schema({
  title: String,
  isDone: Boolean
});

// create mongoose model
const Todo = mongoose.model('Todo', todoSchema);

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

/* GET all todos. */
router.get('/todo', (req, res) => {
  Todo.find({}, (err, todos) => {
    if (err) res.status(500).send(error)

    res.status(200).json(todos);
  });
});

/* GET one todos. */
router.get('/todo/:id', (req, res) => {
  Todo.findById(req.param.id, (err, todos) => {
    if (err) res.status(500).send(error)

    res.status(200).json(todos);
  });
});

/* Create a todo. */
router.post('/todo', (req, res) => {
  let todo = new Todo({
    title: req.body.title,
    isDone: req.body.isDone
  });

  todo.save(error => {
    if (error) res.status(500).send(error);

    res.status(201).json({
      message: 'Todo created successfully'
    });
  });
});

/* Delete a todo */
router.delete('/todo/:id', (req, res) => {
    Todo.findByIdAndRemove(req.params.id, (err, todos) => {
        if (err) res.status(500).send(error)

        res.status(200).json(todos);
    });
});

/* PUT /todos/:id */
router.put('/todo/:id', (req, res) => {
    Todo.findByIdAndUpdate(req.params.id, req.body, function (err, todos) {
        if (err) res.status(500).send(error)

        res.status(200).json(todos);
  });
});

module.exports = router;
