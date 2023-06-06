const express = require('express');
const app = express.Router();
const { Task, User, Review } = require('../db');

module.exports = app;

app.get('/', async(req, res, next)=> {
  try{
    const reviews = await Review.findAll({
      order: [
        ['createdAt', 'DESC'],
        ]
    });
    res.send(reviews);
    //const sortedReviews = reviews.sort((a, b) => b.createdAt - a.createdAt);
    //res.send(sortedReviews);
    //res.send(await Review.findAll());
    //await Review.findAll()
    // {
    //   order: [
    //     ['createdAt', 'DESC'],
    //     ]
    // }
  }
  catch(ex){
    next(ex);
  }
});

app.post('/', async(req, res, next)=> {
  try{
    const reviews = await Review.findAll();
    for (const r of reviews){
      if(r.taskId === req.body.taskId){
        res.sendStatus(409);
        return;
      }
    }
    const review = await Review.create(req.body);
    res.status(201).send(review);
  }
  catch(ex){
    next(ex);
  }
});

app.delete(`/:id`, async(req, res, next)=> {
  try{
    const review = await Review.findByPk(req.params.id);
    await review.destroy();
    res.sendStatus(204);
  }
  catch(ex){
    next(ex);
  }
});

app.put(`/:id`, async(req, res, next)=> {
  try{
    const review = await Review.findByPk(req.params.id);
    res.send(await review.update(req.body));
    
  }
  catch(ex){
    next(ex);
  }
});