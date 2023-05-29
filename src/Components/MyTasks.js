import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link , useNavigate } from 'react-router-dom';
import {updateTask, updateUser} from "../store";

const MyTasks = () => {
    const {users, auth, tasks} = useSelector(state => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let filteredTasks = tasks.filter((task) => task.userId === auth.id)

    const update = async(task) => {
        console.log('task', task);
        const taskDoer = users.find((user) => user.id === task.taskDoerId);
        console.log('taskdoer', taskDoer);
        await dispatch(updateTask({id:task.id, isComplete: true}));
        await dispatch(updateUser({id:taskDoer.id, wallet: taskDoer.wallet + task.price}));
        await dispatch(updateUser({id:auth.id, wallet: auth.wallet - task.price}));
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
                                { task.taskDoerId && <button onClick={() => update(task)}>Task Complete</button>}
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