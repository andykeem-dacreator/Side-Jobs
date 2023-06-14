import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteUser, fetchUsers, deleteTask, fetchTasks } from '../store';

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
        {onlineUsers.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
      <div>
        <h3>User Management</h3>
        {users.map((user) => (
          <div key={user.id}>
            <div className="user-wrapper">
              <div className="user-text">
                <Link to={`/users/${user.id}`}>
                  {user.firstName} {user.lastName}
                </Link>
              </div>
              {!user.isAdmin && (
                <div className="user-button">
                  <button onClick={() => handleDeleteUser(user)}>Delete</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div>
        <h3>Task Management</h3>
        {tasks.map((task) => (
          <div key={task.id}>
            <div className="task-wrapper">
              <div className="task-text">
                {task.id} {"   "} {task.title}
              </div>
              <div className="task-button">
                <button onClick={() => handleDeleteTask(task)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ControlPanel;
