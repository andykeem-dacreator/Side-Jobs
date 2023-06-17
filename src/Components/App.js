import React, { useEffect, useState, useRef } from 'react';
import Home from './Home';
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
import Navbar from './Navbar';
import AdminNavbar from './AdminNavbar';
import GuestNavBar from './GuestNavbar';
import About from './About';
import { useSelector, useDispatch } from 'react-redux';
import {
  loginWithToken,
  fetchTasks,
  fetchUsers,
  fetchReviews,
  fetchOnlineUsers,
} from '../store';
import { Routes, Route } from 'react-router-dom';
import MyTasks from './MyTasks';
//const { faker } = require('@faker-js/faker');
import {
  IconButton,
  useTheme,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
//import { CollectionsOutlined } from '@mui/icons-material';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const App = () => {
  const { auth } = useSelector((state) => state);
  const prevAuth = useRef(auth);
  const dispatch = useDispatch();
  //const [dropdownOpen, setDropdownOpen] = useState(false);
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  // const toggleDropdown = () => {
  //   setDropdownOpen(!dropdownOpen);
  // };

  useEffect(() => {
    dispatch(loginWithToken());
    dispatch(fetchTasks());
    dispatch(fetchUsers());
    dispatch(fetchReviews());
  }, []);

  useEffect(() => {
    if (!prevAuth.current.id && auth.id) {
      console.log('you just logged in.');
      window.socket = new WebSocket(
        window.location.origin.replace('http', 'ws')
      );
      window.socket.addEventListener('open', () => {
        window.socket.send(
          JSON.stringify({ token: window.localStorage.getItem('token') })
        );
      });
      window.socket.addEventListener('message', (ev) => {
        const message = JSON.parse(ev.data);
        if (message.type) {
          dispatch(message);
        }
      });
      dispatch(fetchOnlineUsers());
    }
    if (prevAuth.current.id && !auth.id) {
      window.socket.close();
      dispatch({ type: 'LOGOUT', user: { id: prevAuth.current.id } });
      setTimeout(() => {
        dispatch(fetchOnlineUsers());
      }, 100);
    }
  }, [auth]);

  useEffect(() => {
    prevAuth.current = auth;
  });

  useEffect(() => {
    document.body.className = theme.palette.mode;
  }, [theme.palette.mode]);
  return (
    <div>
      {auth.id ? (
        ''
      ) : (
        <div className="navbar">
          <nav id="menu">
            <GuestNavBar />
          </nav>
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/about" element={<Home />} />
            <Route path="/tasks" element={<Tasks />} />
          </Routes>
        </div>
      )}
      {!!auth.id && !auth.isAdmin && (
        <div className="navbar">
          <nav id="menu">
            <Navbar />
          </nav>
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/users/:id" element={<PublicProfile />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tasks/:id" element={<TaskDetail />} />
            <Route path="/addTask" element={<AddTask />} />
            <Route path="/updateTask" element={<UpdateTask />} />
            <Route path="/tasks/:id/review/new" element={<AddReview />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/toDoList" element={<ToDoList />} />
            <Route path="/myTasks" element={<MyTasks />} />
            <Route path="/navtest" element={<Navbar />} />
          </Routes>
        </div>
      )}
      {!!auth.id && auth.isAdmin && (
        <div>
          <nav className="navbar">
            <AdminNavbar />
          </nav>
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/ControlPanel" element={<ControlPanel />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/users/:id" element={<PublicProfile />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tasks/:id" element={<TaskDetail />} />
            <Route path="/addTask" element={<AddTask />} />
            <Route path="/updateTask" element={<UpdateTask />} />
            <Route path="/tasks/:id/review/new" element={<AddReview />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/toDoList" element={<ToDoList />} />
            <Route path="/myTasks" element={<MyTasks />} />
          </Routes>
        </div>
      )}
      <footer
        className="footer"
        style={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
          backgroundColor: '#F4F4F4',
        }}
      >
        <div className="screenMode">
          {theme.palette.mode} mode
          <IconButton
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
            color="inherit"
          >
            {theme.palette.mode === 'dark' ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </div>
        <div className="copyright">
          <img id='copyright' src="https://logos-world.net/wp-content/uploads/2021/08/Copyright-Logo.png" />
          <div style={{ color: 'black'}}>Copyright</div>
        </div>
        <div className='logo_footer'>
          <img 
            src="../static/side_jobs_logo/png/side-jobs-high-resolution-logo-black-on-transparent-background.png" 
          />
        </div>
      </footer>
    </div>
  );
};
export default function ToggleColorMode() {
  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
