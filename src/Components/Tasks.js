import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Tasks = ()=> {
  const { auth, tasks } = useSelector(state => state);

  return (
    <div className = 'tasks-page-layout'>
      <h2>Tasks</h2>
      {
        tasks.map(task => {
          return (
            <div className = 'tasks-container' key = {task.id}>
              <Link to={`/tasks/${task.id}`}>
                <div className = 'task-title'>Title: {task.title}</div>
                <div className = 'task-price'>Price: {task.price}</div>
                <div className = 'task-location'>Location: {task.city}, {task.state}</div>
              </Link>
            </div>
          )
        })
      }
    </div>
  );
};

export default Tasks;
