import React, { useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import Profile from './Profile';
import Tasks from './Tasks';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken, fetchTasks } from '../store';
import { Link, Routes, Route } from 'react-router-dom';

const App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(loginWithToken());
    dispatch(fetchTasks());
  }, []);

  return (
    <div>
      <h1>FS App Template</h1>
      {auth.id ? '' : <Login />}
      {!!auth.id && (
        <div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/tasks">Tasks</Link>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/tasks" element={<Tasks />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
