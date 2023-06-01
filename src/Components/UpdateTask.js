import React, { useState, useEffect } from 'react';
import { updateTask } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Input} from "@mui/material";

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
          <TextField required label="Title" variant="outlined" value={ title } onChange={ ev=> setTitle(ev.target.value)} placeholder='Title' />
          <TextField required label="Description" variant="outlined" value={ description } onChange={ ev=> setDescription(ev.target.value)} placeholder='Description' />
          <TextField required label="City" variant="outlined" value={ city } onChange={ ev=> setCity(ev.target.value)} placeholder='City' />
          <TextField required label="State" variant="outlined" value={ state } onChange={ ev=> setState(ev.target.value)} placeholder='State' />
          <TextField required label="Price" variant="outlined" value={ price } onChange={ ev=> setPrice(ev.target.value)} placeholder='Price' />
        <Button type="submit" variant="outlined" disabled={!title || !description || !city || !state || !price}>Update</Button>
      </form>
    </div>
  )
}

export default UpdateTask;