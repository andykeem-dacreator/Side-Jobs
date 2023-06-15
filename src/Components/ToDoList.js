import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
const ToDoList = () => {
    const {auth, tasks} = useSelector(state => state);
    let filteredTasks = tasks.filter((task) => task.taskDoerId === auth.id)
    return (
        <div className="myTasks-page-layout">
                <Typography variant='h4'>Accepted Jobs</Typography>
                {
                    filteredTasks.map(task => {
                        return (
                            <div className='myTasks-container' key={task.id}>
                                <Link to={`/tasks/${task.id}`}>
                                    <div className = 'task-title'>Title: {task.title}</div>
                                    <div className = 'task-price'>Price: ${task.price}</div>
                                    <div className = 'task-location'>Location: {task.city}, {task.state}</div>
                                </Link>
                            </div>
                        )
                    })
                }
        </div>
    )
}

export default ToDoList;