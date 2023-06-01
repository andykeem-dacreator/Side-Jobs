import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useTheme } from '@mui/material'
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { useDispatch } from 'react-redux';

// const pages = ['Home', 'Jobs', 'About'];
// const settings = ['Profile', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElJob, setAnchorElJob] = React.useState(null);
  const theme = useTheme();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleJobOpen = (event) => {
    setAnchorElJob(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleJobClose = () => {
    setAnchorElJob(null);
  };

  // useEffect(() => {
  //   document.body.className = theme.palette.mode;
  // }, [theme.palette.mode]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Side Jobs
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))} */}

            <MenuItem>
              <Link to={"/"} style={{color: theme.palette.mode === 'dark' ? 'white' : 'black'}}>Home</Link>
            </MenuItem>
            <MenuItem>
              <Link to={"/tasks"} style={{color: theme.palette.mode === 'dark' ? 'white' : 'black'}}>Available Jobs</Link>
            </MenuItem>
            <MenuItem>
              <Link to={"/addTask"} style={{color: theme.palette.mode === 'dark' ? 'white' : 'black'}}>Post A Job</Link>
            </MenuItem>
            <MenuItem>
              <Link to={"/about"} style={{color: theme.palette.mode === 'dark' ? 'white' : 'black'}}>About</Link>
            </MenuItem>
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Side Jobs
          </Typography>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <MenuItem>
              <Link to={"/"} style={{color: 'white'}}>Home</Link>
            </MenuItem>
            <MenuItem>
              <Link to={"/tasks"} style={{color: 'white'}}>Available Jobs</Link>
            </MenuItem>
            <MenuItem>
              <Link to={"/addTask"} style={{color: 'white'}}>Post A Job</Link>
            </MenuItem>
            <MenuItem>
              <Link to={"/about"} style={{color: 'white'}}>About</Link>
            </MenuItem>

              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
              </Button>
              
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem>
                <Link to={"/profile"} style={{color: 'black'}}>Profile</Link>
              </MenuItem>
              <MenuItem>
                <Link to={"/toDoList"} style={{color: 'black'}}>Jobs I Accepted</Link>
              </MenuItem>
              <MenuItem>
                <Link to={"/myTasks"} style={{color: 'black'}}>Jobs I posted</Link>
              </MenuItem>
              <MenuItem>
                <Link to={"/reviews"} style={{color: 'black'}}>My Reviews</Link>
              </MenuItem>
              <MenuItem>
                <button onClick={handleLogout} style={{color: 'black'}}>Logout</button>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      
    </AppBar>
  );
}
export default ResponsiveAppBar;