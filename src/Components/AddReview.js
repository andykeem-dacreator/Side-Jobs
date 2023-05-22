import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { createReview } from '../store';

const AddReview = () => {
  const { auth, tasks } = useSelector(state => state);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log('tasks:', tasks)
  console.log('id:', id)
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  const task = tasks.find(task => task.id === id);

  if(!task){
    return null;
  }

  const create = (ev) => {
    ev.preventDefault();
    try{
      dispatch(createReview({ userId: auth.id, taskId: task.id, taskDoerId: task.taskDoerId, rating, title, comment }));
      navigate(`/users/${task.taskDoerId}`);
    }
    catch(ex){
      console.log(ex);
    }
  };

  return (
    <div>
      <h2>Create a Review for: { task.taskDoer.username }</h2>
      <form onSubmit={ create }>
        <input value={ rating } onChange={ ev => setRating(Number(ev.target.value)) } placeholder='rating' />
        <input value={ title } onChange={ ev => setTitle(ev.target.value) } placeholder='title' />
        <input value={ comment } onChange={ ev => setComment(ev.target.value) } placeholder='written review' />
        <button>Add Review</button>
      </form>
    </div>
    );
};

export default AddReview;