import React, { useState } from 'react';
import { attemptLogin, register } from '../store';
import { useDispatch } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Typography,
  InputAdornment,
  OutlinedInput,
  IconButton,
  Button,
  FormControl,
  InputLabel,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [changeForm, setChangeForm] = useState(true);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  const handleMouseDownPassword = (ev) => {
    ev.preventDefault();
  };

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const onChangeConfirmPassword = (ev) => {
    setConfirmPassword(ev.target.value);
  };

  const login = async (ev) => {
    ev.preventDefault();
    try {
      await dispatch(attemptLogin(credentials));
      navigate('/');
    } catch (ex) {
      setError('Invalid combination of username and password');
    }
  };

  const create = async (ev) => {
    ev.preventDefault();
    if(credentials.password !== confirmPassword){
      setError('Passwords do not match');
      return;
    }
    const updatedCredentials = { ...credentials, avatar: getRandomAvatar() };
    try {
      await dispatch(register(updatedCredentials));
      navigate('/');
    } catch (ex) {
      setError(
        'Invalid Input, please try again (a user with that username or email may already exist)'
      );
    }
  };

  const getRandomAvatar = () => {
    return `https://avatars.githubusercontent.com/u/${Math.floor(
      Math.random() * 1000
    )}`;
  };

  return (
    <div className='login'>
      <Typography variant='h4' sx={{ textAlign: 'center'}}>{changeForm ? 'Login' : 'Create Account'}</Typography>
      <form onSubmit={changeForm ? login : create}>
        <FormControl
          required
          variant='outlined'
        >
          <InputLabel htmlFor="username">Username</InputLabel>
        <OutlinedInput
          id="username"
          placeholder="username"
          name="username"
          value={credentials.username}
          onChange={onChange}
        />
        </FormControl>
        <FormControl
          required
          variant='outlined'
        >
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            placeholder="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            type={showPassword ? 'text' : 'password'}
                endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
                }
          />
          </FormControl>
        {!changeForm && (
          <>
            <FormControl
              required
              variant='outlined'
            >
              <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-confirm-password"
                placeholder="confirm password"
                name="confirmPassword"
                value={confirmPassword || ''}
                onChange={onChangeConfirmPassword}
                type={showConfirmPassword ? 'text' : 'password'}
                endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              }
              />
            </FormControl>
            <FormControl
              required
              variant='outlined'>
              <InputLabel htmlFor="email">Email</InputLabel>
              <OutlinedInput
                id="email"
                placeholder="email"
                name="email"
                value={credentials.email || ''}
                onChange={onChange}
              />
            </FormControl>
            <FormControl
              required
              variant='outlined'
            >
              <InputLabel htmlFor="first-name">First Name</InputLabel>
              <OutlinedInput
                id="first-name"
                placeholder="first name"
                name="firstName"
                value={credentials.firstName || ''}
                onChange={onChange}
              />
            </FormControl>
            <FormControl
              required
              variant='outlined'
            >
              <InputLabel htmlFor="last-name">Last Name</InputLabel>
              <OutlinedInput
                id="last-name"
                placeholder="last name"
                name="lastName"
                value={credentials.lastName || ''}
                onChange={onChange}
              />
            </FormControl>
          </>
        )}
        <Button type="submit" variant="contained" >{changeForm ? 'Login' : 'Create Account'}</Button>
      </form>
      <Button

        onClick={() => setChangeForm(!changeForm)}>
        {changeForm ? 'Create Account' : 'Login'}
      </Button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
