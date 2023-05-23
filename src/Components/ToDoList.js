import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
const ToDoList = () => {
    const {auth, tasks} = useSelector(state => state);
    let filteredTasks = tasks.filter((task) => task.taskDoerId === auth.id)
    return (
        <div className='myTasks-container'>
            <div>
                <h1>To Do List</h1>
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
                            </li>
                        )
                    })
                }
                </ul>
            </div>


        </div>
    )
}

export default ToDoList;