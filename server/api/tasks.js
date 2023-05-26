const express = require('express');
const app = express.Router();
const { Task, User } = require('../db');

module.exports = app;

app.get('/', async (req, res, next) => {
  try {
    res.send(await Task.findAll({ include: [
      {
        model: User, as: 'taskCreator'
      },
      {
        model: User, as: 'taskDoer'
      }
      
      ] }));
  } 
  catch (error) {
    next(error);
  }
});

app.post('/', async(req, res, next)=> {
  try {
    res.status(201).send(await Task.create(req.body));
  } 
  catch (error) {
    next(error);
  }
});

app.put('/:id', async(req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id, { include: [
      {
        model: User, as: 'taskCreator'
      },
      {
        model: User, as: 'taskDoer'
      }
      
      ] });
    res.send(await task.update(req.body));
  } 
  catch (error) {
    next(error);
  }
});

app.delete('/:id', async(req, res, next)=> {
  try {
    const task = await Task.findByPk(req.params.id);
    await task.destroy();
    res.sendStatus(204);
  } 
  catch (error) {
    next(error);
  }
})
