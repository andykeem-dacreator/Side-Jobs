import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../store';
const bcrypt = require('bcrypt');

const Profile = () => {
  const { auth } = useSelector((state) => state);
  const [username, setUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [avatar, setAvatar] = useState('');
  const dispatch = useDispatch();
  const ref = useRef();

  useEffect(() => {
    if (auth.id) {
      setUsername(auth.username);
      setCurrentPassword('');
      setPassword('');
      setEmail(auth.email);
      setFirstName(auth.firstName);
      setLastName(auth.lastName);
      setAvatar(auth.avatar);
    }
  }, [auth]);

  useEffect(() => {
    ref.current.addEventListener('change', (ev) => {
      const file = ev.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener('load', () => {
        setAvatar(reader.result);
      });
    });
  }, [ref]);

  const updateProfile = (ev) => {
    ev.preventDefault();
    if (password.length === 0) {
      dispatch(updateUser({ username, email, firstName, lastName, avatar }));
    } else {
      // Check if current password matches
      if (!bcrypt.compare(currentPassword, auth.password)) {
        alert('Current password is incorrect.');
        return;
      }
      dispatch(
        updateUser({
          username,
          currentPassword,
          password,
          email,
          firstName,
          lastName,
          avatar,
        })
      );
    }
    setCurrentPassword('');
    setPassword('');
  };

  return (
    <div>
      <h2>Profile</h2>
      {!!avatar && <img src={avatar} width="100" alt="Avatar" />}
      <form onSubmit={updateProfile}>
        <label>
          Username:
          <input
            value={username}
            placeholder="New username"
            onChange={(ev) => setUsername(ev.target.value)}
          />
        </label>
        <label>
          Current Password:
          <input
            value={currentPassword}
            placeholder="Current password"
            type="password"
            onChange={(ev) => setCurrentPassword(ev.target.value)}
          />
        </label>
        <label>
          New Password:
          <input
            value={password}
            placeholder="New password"
            type="password"
            onChange={(ev) => setPassword(ev.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            value={email}
            placeholder="New email Address"
            onChange={(ev) => setEmail(ev.target.value)}
          />
        </label>
        <label>
          First Name:
          <input
            value={firstName}
            placeholder="New First Name"
            onChange={(ev) => setFirstName(ev.target.value)}
          />
        </label>
        <label>
          Last Name:
          <input
            value={lastName}
            placeholder="New Last Name"
            onChange={(ev) => setLastName(ev.target.value)}
          />
        </label>
        <label>
          Avatar:
          <input type="file" ref={ref} />
        </label>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
