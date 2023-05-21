import React, { useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import Profile from './Profile';
import Tasks from './Tasks';
import TaskDetail from './TaskDetail';
import AddTask from './AddTask';
import UpdateTask from './UpdateTask';
import ControlPanel from './ControlPanel';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken, fetchTasks, fetchUsers } from '../store';
import { Link, Routes, Route } from 'react-router-dom';

const App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginWithToken());
    dispatch(fetchTasks());
    dispatch(fetchUsers());
  }, []);

  return (
    <div>
      <h1>FS App Template</h1>
      {auth.id ? '' : <Login />}
      {!!auth.id && !auth.isAdmin && (
        <div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/tasks">Tasks</Link>
            <Link to="/addTask">Add Task</Link>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tasks/:id" element={<TaskDetail />} />
            <Route path="/addTask" element={<AddTask />} />
            <Route path="/updateTask" element={<UpdateTask />} />
          </Routes>
        </div>
      )}
      {!!auth.id && auth.isAdmin && (
        <div>
          <nav>
            <Link to="/">Home</Link>
            <Link to ="/controlPanel">Control Panel</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/tasks">Tasks</Link>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ControlPanel" element={<ControlPanel />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/tasks" element={<Tasks />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
