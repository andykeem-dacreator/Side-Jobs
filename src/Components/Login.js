import React, { useState } from 'react';
import { attemptLogin } from '../store';
import { useDispatch } from 'react-redux';

const Login = () => {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const onChange = ev => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const login = async ev => {
    ev.preventDefault();
    try {
      await dispatch(attemptLogin(credentials));
    } catch (ex) {
      setError('Invalid combination of username and password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={login}>
        <input
          placeholder="username"
          value={credentials.username}
          name="username"
          onChange={onChange}
        />
        <input
          placeholder="password"
          type='password'
          name="password"
          value={credentials.password}
          onChange={onChange}
        />
        {error && <div>{error}</div>}
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
