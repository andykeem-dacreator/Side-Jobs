import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Tasks = ()=> {
  const { auth, tasks } = useSelector(state => state);
console.log(tasks);

  return (
    <div className = 'tasks-page-layout'>
      <h1>Tasks</h1>
      {
        tasks.map(task => {
          return (
            <div className = 'tasks-container' key = {task.id}>
              <Link to={`/tasks/${task.id}`}>
                <div className = 'task-title'>{task.title}</div>
                <div className = 'task-price'>{task.price}</div>
                <div className = 'task-location'>{task.city}, {task.state}</div>
              </Link>
            </div>
          )
        })
      }
    </div>
  )
};

export default Tasks
