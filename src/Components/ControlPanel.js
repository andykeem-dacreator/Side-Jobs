import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteUser, fetchUsers } from '../store';

const UserControl = () => {
  const { auth, users } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleDeleteUser = (user) => {
    dispatch(deleteUser(user))
      .then(() => {
        dispatch(fetchUsers());
      })
      .catch((error) => {
        console.log('Error deleting user:', error);
      });
  };

  return (
    <div>
      <h1>Control Panel</h1>
      <h2>Welcome Admin {auth.firstName}</h2>
      <div>
      <h3>Users Management</h3>
      {users.map((user) => (
        <div key={user.id}>
          <div>{user.firstName} {user.lastName}</div>
          {!user.isAdmin && (
            <div>
              <button onClick={() => handleDeleteUser(user)}>Delete</button>
            </div>
          )}
        </div>
      ))}
      </div>
    </div>
  );
};

export default UserControl;