import React, { useState } from 'react';
import { createTask } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
    navigate('/tasks')
  };

  return (
    <div className = 'add-task'>
      <h2>Add a Task</h2>
      <form onSubmit={ create }>
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
        <select name="categories" id="task-category" onChange = { ev => setCategory(ev.target.value)}>
          {
            categories.map(category => {
              return (
                  <option key={category} value={`${category}`}>{`${category}`}</option>
              )
            })
          }
        </select>
        <button>Add</button>
      </form>
    </div>
  )
}

export default AddTask;