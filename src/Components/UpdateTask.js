import React, { useState, useEffect } from 'react';
import { updateTask } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateTask = ()=> {
  const { tasks } = useSelector(state => state);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [price, setPrice] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();


  useEffect(() => {
    setTitle(task.title);
    setCity(task.city);
    setState(task.state);
    setDescription(task.description);
    setPrice(task.price);
  }, [tasks]);

  const task = tasks.find((task => task.id === id))

  if (!task) {
    return null;
  }
  const update = async(ev)=> {
    ev.preventDefault();
    await dispatch(updateTask({id: task.id, title, description, city, state, price }));
    navigate('/tasks')
  };


  return (
    <div className = 'update-task'>
      <h2>Update a Task</h2>
      <form onSubmit={ update }>
        <label>
          Title:
          <input value={ title } onChange={ ev=> setTitle(ev.target.value)} placeholder='Title' />
        </label>
        <label>
          Description:
          <input value={ description } onChange={ ev=> setDescription(ev.target.value)} placeholder='Description' />
        </label>
        <label>
          City:
          <input value={ city } onChange={ ev=> setCity(ev.target.value)} placeholder='City' />
        </label>
        <label>
          State:
          <input value={ state } onChange={ ev=> setState(ev.target.value)} placeholder='State' />
        </label>
        <label>
          Price:
          <input value={ price } onChange={ ev=> setPrice(ev.target.value)} placeholder='Price' />
        </label>
        <button>Update</button>
      </form>
    </div>
  )
}

export default UpdateTask;