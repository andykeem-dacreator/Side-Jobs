import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteUser, fetchUsers, deleteTask, fetchTasks } from '../store';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutline';

const ControlPanel = () => {
  const { auth, users, tasks, onlineUsers } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDeleteUser = (user) => {
    dispatch(deleteUser(user))
      .then(() => {
        dispatch(fetchUsers());
        dispatch(fetchTasks());
      })
      .catch((error) => {
        console.log('Error deleting user:', error);
      });
  };

  const handleDeleteTask = (task) => {
    dispatch(deleteTask(task))
      .then(() => {
        dispatch(fetchTasks());
      })
      .catch((error) => {
        console.log('Error deleting task:', error);
      });
  };

  return (
    <div className="control-panel">
      <h1>Control Panel</h1>
      <h2>Welcome Admin {auth.firstName}</h2>
      <h3>Online Users ({onlineUsers.length})</h3>
      <ul>
      {onlineUsers.map((user, index) => (
        <li key={`online-user-${index}`}>{user.username}</li>
      ))}
    </ul>
      <div>
        <h3>User Management</h3>
        {users.map((user, index) => (
          <div key={`user-${index}`}>
            <div className="user-wrapper">
              <div className="user-text">
                <Link to={`/users/${user.id}`}>
                  {user.firstName} {user.lastName}
                </Link>
              </div>
              {!user.isAdmin && (
                <div className="user-button">
                  <IconButton onClick={() => handleDeleteUser(user)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div>
        <h3>Task Management</h3>
        {tasks.map((task, index) => (
        <div key={`task-${index}`}>
            <div className="task-wrapper">
              <div className="task-text">
                {task.id} {'   '} {task.title}
              </div>
              <div className="task-button">
                <IconButton onClick={() => handleDeleteTask(task)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ControlPanel;
