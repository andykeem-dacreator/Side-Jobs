import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateAuth } from '../store';
import { useParams } from 'react-router-dom';
import Wallet from './Wallet';

const Profile = () => {
  const { users, auth } = useSelector((state) => state);
  const { id } = useParams();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');
  const user = users.find((user) => user.id === id);
  console.log(auth);
  const dispatch = useDispatch();
  const ref = useRef();

  useEffect(() => {
    if (auth.id) {
      setUsername(auth.username);
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
      dispatch(updateAuth({ username, email, firstName, lastName, avatar }));
    } else {
      dispatch(
        updateAuth({ username, password, email, firstName, lastName, avatar })
      );
    }
    setPassword('');
    setUpdateMessage('Profile updated successfully!');
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
          Password:
          <input
            value={password}
            placeholder="New password"
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
        <label>
          Wallet Balance: { auth.wallet }
        </label>
        <label>
          Add Funds? 
          <a href="https://venmo.com" style={{ marginLeft: '10px', marginRight: '5px' }}>
            <img src='https://images.ctfassets.net/gkyt4bl1j2fs/ym6BkLqyGjMBmiCwtM7AW/829bf561ea771c00839b484cb8edeebb/App_Icon.png?w=276&h=276&q=50&fm=png&bg=transparent' style={{ width: '20px', height: '20px' }} alt="Venmo" />
          </a>
          <a href="https://paypal.com" style={{ marginLeft: '5px', marginRight: '10px' }}>
            <img src='https://assets.stickpng.com/images/62977ac0e01809629f11355f.png' style={{ width: '20px', height: '20px' }} alt="Paypal" />
          </a>

        </label>
        <button type="submit">Update Profile</button>
      </form>
      {updateMessage && <p>{updateMessage}</p>}
    </div>
  );
};

export default Profile;
