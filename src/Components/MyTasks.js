import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link , useNavigate } from 'react-router-dom';

import {updateTask} from "../store";
const MyTasks = () => {
    const {auth, tasks} = useSelector(state => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let filteredTasks = tasks.filter((task) => task.userId === auth.id)

    const update = async(task) => {
        await dispatch(updateTask({id:task.id, isComplete: true}));
        navigate('/myTasks')
    }
    return (
        <div className='myTasks-container'>
            <div>
                <h2>Created Tasks</h2>
            </div>
            <div>
                <ul>
                {
                    filteredTasks.map(task => {
                        return (

                            <li key={task.id}>
                                <Link to={`/tasks/${task.id}`}>
                                    <div className = 'task-title'>Title: {task.title}</div>
                                    <div className = 'task-price'>Price: {task.price}</div>
                                    <div className = 'task-location'>Location: {task.city}, {task.state}</div>
                                </Link>
                                <button onClick={() => update(task)}>Task Complete</button>
                            </li>
                        )
                    })
                }
                </ul>
            </div>



        </div>
    )
}

export default MyTasks;