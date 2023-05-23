import React, { useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import Profile from './Profile';
import Tasks from './Tasks';
import TaskDetail from './TaskDetail';
import AddTask from './AddTask';
import UpdateTask from './UpdateTask';
import AddReview from './AddReview';
import Reviews from './Reviews';
import ControlPanel from './ControlPanel';
import PublicProfile from './PublicProfile';
import ToDoList from './ToDoList';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken, fetchTasks, fetchUsers, fetchReviews } from '../store';
import { Link, Routes, Route } from 'react-router-dom';
import MyTasks from "./MyTasks";

const App = () => {
  const { auth, reviews } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginWithToken());
    dispatch(fetchTasks());
    dispatch(fetchUsers());
    dispatch(fetchReviews());
  }, []);

  return (
    <div>
      <h1>Side Quests</h1>
      {auth.id ? '' : <Login />}
      {!!auth.id && !auth.isAdmin && (
        <div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/tasks">  Public Tasks</Link>
            <Link to="/addTask">Add Task</Link>
            <Link to="/reviews">My Reviews </Link>
            <Link to="/toDoList">To Do List</Link>
            <Link to="/myTasks">Created Tasks</Link>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/users/:id" element={<PublicProfile />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tasks/:id" element={<TaskDetail />} />
            <Route path="/addTask" element={<AddTask />} />
            <Route path="/updateTask" element={<UpdateTask />} />
            <Route path="/tasks/:id/review/new" element={<AddReview />} />
            <Route path="/reviews" element={<Reviews />}/>
            <Route path="/toDoList" element={<ToDoList />}/>
            <Route path="/myTasks" element={<MyTasks />}/>
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
            <Link to="/addTask">Add Task</Link>
            <Link to="/reviews">My Reviews </Link>
            <Link to="/toDoList">To Do List</Link>
            <Link to="/myTasks">Created Tasks</Link>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ControlPanel" element={<ControlPanel />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/users/:id" element={<PublicProfile />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tasks/:id" element={<TaskDetail />} />
            <Route path="/addTask" element={<AddTask />} />
            <Route path="/updateTask" element={<UpdateTask />} />
            <Route path="/tasks/:id/review/new" element={<AddReview />} />
            <Route path="/reviews" element={<Reviews />}/>
            <Route path="/toDoList" element={<ToDoList />}/>
            <Route path="/myTasks" element={<MyTasks />}/>
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
