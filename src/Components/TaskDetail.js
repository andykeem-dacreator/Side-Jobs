import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import{ deleteTask } from '../store';

const TaskDetail = ()=> {
  const {id} = useParams();
  const {tasks} = useSelector(state => state);
  const task = tasks.find(t => t.id === id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const destroy = async(task)=> {
    await dispatch(deleteTask(task));
    navigate('/tasks');
  };

  return (
    <div className = 'task-detail'>
      <h1>Task Detail</h1>
      <div className = 'task-title'>
        Title: {task.title}
      </div>
      <div className = 'task-description'>
        Description: {task.description}
      </div>
      <div className = 'task-location'>
        Location: {task.city}, {task.state}
      </div>
      <div className = 'task-price'>
        Price: {task.price}
      </div>
      <button onClick={()=> destroy(task)}>Delete</button>
    </div>
  )
};

export default TaskDetail;