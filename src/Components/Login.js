import React, { useState } from 'react';
import { attemptLogin, register } from '../store';
import { useDispatch } from 'react-redux';

const Login = () => {
  const dispatch = useDispatch();
  const [changeForm, setChangeForm] = useState(true);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
  });
  const [error, setError] = useState('');

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const login = async (ev) => {
    ev.preventDefault();
    try {
      await dispatch(attemptLogin(credentials));
    } catch (ex) {
      setError('Invalid combination of username and password');
    }
  };

  const create = async (ev) => {
    ev.preventDefault();
    const updatedCredentials = { ...credentials, avatar: getRandomAvatar() };
    try {
      await dispatch(register(updatedCredentials));
    } catch (ex) {
      setError('Invalid Input, please try again (a user with that username or email may already exist)');
    }
  };

  const getRandomAvatar = () => {
    return `https://avatars.githubusercontent.com/u/${Math.floor(
      Math.random() * 1000
    )}`;
  };

  return (
    <div>
      <h1>{changeForm ? 'Login' : 'Create Account'}</h1>
      <form onSubmit={changeForm ? login : create}>
        <input
          placeholder="username"
          name="username"
          value={credentials.username}
          onChange={onChange}
        />
        <input
          placeholder="password"
          name="password"
          value={credentials.password}
          onChange={onChange}
        />
        {!changeForm && (
          <>
            <input
              placeholder="confirm password"
              name="confirmPassword"
              value={credentials.confirmPassword || ''}
              onChange={onChange}
            />
            <input
              placeholder="email"
              name="email"
              value={credentials.email || ''}
              onChange={onChange}
            />
            <input
              placeholder="first name"
              name="firstName"
              value={credentials.firstName || ''}
              onChange={onChange}
            />
            <input
              placeholder="last name"
              name="lastName"
              value={credentials.lastName || ''}
              onChange={onChange}
            />
          </>
        )}
        <button>{changeForm ? 'Login' : 'Create Account'}</button>
      </form>
      <button onClick={() => setChangeForm(!changeForm)}>
        {changeForm ? 'Create Account' : 'Login'}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
