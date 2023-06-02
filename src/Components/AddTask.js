import React, { useState } from 'react';
import { createTask } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Input, Select, MenuItem, InputLabel} from "@mui/material";

const AddTask = ()=> {
  const { auth } = useSelector(state => state);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = ['virtual',
    'shopping',
    'misc',
    'moving',
    'sport',
    'gaming',
    'photography'];
  const create = async(ev)=> {
    ev.preventDefault();
    await dispatch(createTask({ title, description, city, state, price, category, userId: auth.id }));
    navigate('/myTasks')
  };

  return (
    <div className = 'add-task'>
      <h2>Post a Job</h2>
      <form onSubmit={ create }>
        <TextField required label="Title" variant="outlined" value={ title } onChange={ ev=> setTitle(ev.target.value)} placeholder='Title' />
        <TextField required label="Description" variant="outlined" value={ description } onChange={ ev=> setDescription(ev.target.value)} placeholder='Description' />
        <TextField required label="City" variant="outlined" value={ city } onChange={ ev=> setCity(ev.target.value)} placeholder='City' />
        <TextField required label="State" variant="outlined" value={ state } onChange={ ev=> setState(ev.target.value)} placeholder='State' />
        <TextField required label="Price" variant="outlined" value={ price } onChange={ ev=> setPrice(ev.target.value)} placeholder='Price' />
        <Select name="categories" id="task-category" onChange = { ev => setCategory(ev.target.value)}>
          <MenuItem value=''>Select a Category</MenuItem>
          {

            categories.map(category => {
              return (

                  <MenuItem key={category} value={`${category}`}>{`${category}`}</MenuItem>
              )
            })
          }
        </Select>
        <Button type="submit" variant="outlined" disabled={!title || !description || !city || !state || !price}>Add</Button>
      </form>
    </div>
  )
}

export default AddTask;