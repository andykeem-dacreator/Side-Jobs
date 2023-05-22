import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link , useNavigate } from 'react-router-dom';
import { updateTask } from "../store";

const Tasks = ()=> {
  const { auth, tasks } = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const unassignedTasks = tasks.filter(task => task.taskDoerId === null);

  const update = async(task) => {
      await dispatch(updateTask({id:task.id, taskDoerId: auth.id}));
      navigate('/myTasks')
  }
  return (
    <div className = 'tasks-page-layout'>
      <h2>Tasks</h2>
      {
        unassignedTasks.map(task => {
          return (
            <div className = 'tasks-container' key = {task.id}>
                <div className='task-info'>
                  <Link to={`/tasks/${task.id}`}>
                    <div className = 'task-title'>Title: {task.title}</div>
                    <div className = 'task-price'>Price: {task.price}</div>
                    <div className = 'task-location'>Location: {task.city}, {task.state}</div>
                  </Link>
                </div>
                <div>
                    <button onClick={() => update(task)}>Add to myTasks</button>
                </div>
            </div>
          )
        })
      }
    </div>
  );
};

export default Tasks;
