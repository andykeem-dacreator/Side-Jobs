import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateAuth } from '../store';
import { useParams } from 'react-router-dom';
import Wallet from './Wallet';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import UploadIcon from '@mui/icons-material/Upload';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
//import { Upload, Delete } from '@mui/icons-material';
import {
  Avatar,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  IconButton,
  Button,
  Card,
  CardHeader,
  Stack,
  Tooltip,
  Grid,
  Snackbar,
  Alert,
 } from '@mui/material';
 
const Profile = () => {
  const { users, auth } = useSelector((state) => state);
  const { id } = useParams();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const user = users.find((user) => user.id === id);
  const dispatch = useDispatch();
  const ref = useRef();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (ev) => {
    ev.preventDefault();
  };
  
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  
  useEffect(() => {
    if (auth.id) {
      setUsername(auth.username);
      setPassword('');
      setEmail(auth.email);
      setFirstName(auth.firstName);
      setLastName(auth.lastName);
      setAvatar(auth.avatar);
    }
  }, [auth, auth.wallet]);

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
    setOpen(true);
  };
  
  const handleClose = (ev, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  
  const handleEmailChange = (ev) => {
    if (!isValidEmail(ev.target.value)) {
      setError('Email is invalid');
    } else {
      setError(null);
    }
    setEmail(ev.target.value);
  }
  
  return (
    <div className='profile'>
      <Typography variant='h4'>Profile</Typography>
      <form onSubmit={updateProfile}>
        <Card sx={{ minWidth: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2, margin: 'auto' }}>
          <Typography variant='h6'>Profile Picture</Typography>
          <Avatar 
            src={avatar} 
            sx={{ width: 100, height: 100 }}
            alt="Avatar"
          />
          
          <Stack
            direction='row'
            spacing={2}
            justifyContent="center"
          >
            <Tooltip title='Upload profile picture'>
              <IconButton variant='contained' component='label'>
                <UploadIcon />
                <input
                  hidden
                  id='avatar'
                  name='avatar'
                  type="file" 
                  ref={ref} 
                />
              </IconButton>  
            </Tooltip>
            <Tooltip title='Delete profile picture'>
              <IconButton onClick={ () => setAvatar('https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png') }>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Card>
    
        <TextField
          label="Username"
          value={username}
          placeholder="New username"
          onChange={(ev) => setUsername(ev.target.value)}
        />
          
        <FormControl>
          <InputLabel htmlFor="my-input">First Name</InputLabel>
            <OutlinedInput
              value={firstName}
              placeholder="New First Name"
              onChange={(ev) => setFirstName(ev.target.value)}
            />
     
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="my-input">Last Name</InputLabel>
   
            <OutlinedInput
              value={lastName}
              placeholder="New Last Name"
              onChange={(ev) => setLastName(ev.target.value)}
            />
     
          </FormControl>
     
          <TextField
            label='Email'
            value={email}
            placeholder="New email Address"
            onChange={handleEmailChange}
            error={error && !isValidEmail(email)}
            helperText={error && !isValidEmail(email) ? 'Email is invalid' : ''}
          />  

          <FormControl variant='outlined'>
            <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
    
            <OutlinedInput
              value={password}
              //placeholder="New password"
              onChange={(ev) => setPassword(ev.target.value)}
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              }
              label='new password'
            />
          </FormControl>
        
        <Button 
          variant='outlined' 
          type="submit"
          disabled={!isValidEmail(email) || !username || !firstName || !lastName}
        >
          Update Profile
        </Button>
        <Snackbar 
          open={open} 
          autoHideDuration={5000} 
          onClose={handleClose} 
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Profile updated successfully!
          </Alert>
        </Snackbar>
    
        <Stack direction='row' justifyContent='space-around'>
          <Typography>  Wallet Balance: <strong>${ auth.wallet.toLocaleString() }</strong></Typography>
          
          <Stack direction='row' align-items='center'>
          <Typography >Add Funds?</Typography>
            <a href="https://venmo.com" style={{ marginLeft: '10px', marginRight: '5px' }}>
              <img src='https://images.ctfassets.net/gkyt4bl1j2fs/ym6BkLqyGjMBmiCwtM7AW/829bf561ea771c00839b484cb8edeebb/App_Icon.png?w=276&h=276&q=50&fm=png&bg=transparent' style={{ width: '20px', height: '20px' }} alt="Venmo" />
            </a>
            <a href="https://paypal.com" style={{ marginLeft: '5px', marginRight: '10px' }}>
              <img src='../static/paypal.png' style={{ width: '20px', height: '20px' }} alt="Paypal" />
            </a>
          </Stack>

        </Stack>
      </form>
    </div>
  );
};

export default Profile;
