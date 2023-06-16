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
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { Img } from '../styles/styles.js';

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { auth } = useSelector((state) => state);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
            <Img
              src="../static/side_jobs_logo/png/side-jobs-high-resolution-logo-white-on-transparent-background.png"
              alt="Side Jobs Logo"
              style={{ width: 'auto', height: '90px' }}
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                color: 'inherit',
              }}
            />
          </Link>

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
              <MenuItem component={Link} to="/" onClick={handleCloseNavMenu}>
                Home
              </MenuItem>
              <MenuItem
                component={Link}
                to="/tasks"
                onClick={handleCloseNavMenu}
              >
                Available Jobs
              </MenuItem>
              <MenuItem
                component={Link}
                to="/addTask"
                onClick={handleCloseNavMenu}
              >
                Post A Job
              </MenuItem>
              <MenuItem
                component={Link}
                to="/about"
                onClick={handleCloseNavMenu}
              >
                About
              </MenuItem>
            </Menu>
          </Box>
          <Link to="/">
            <Img
              src="../static/side_jobs_logo/png/side-jobs-high-resolution-logo-white-on-transparent-background.png"
              alt="Side Jobs Logo"
              style={{ width: 'auto', height: '60px' }}
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
              }}
            />
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <MenuItem component={Link} to="/" onClick={handleCloseNavMenu}>
              Home
            </MenuItem>
            <MenuItem component={Link} to="/tasks" onClick={handleCloseNavMenu}>
              Available Jobs
            </MenuItem>
            <MenuItem
              component={Link}
              to="/addTask"
              onClick={handleCloseNavMenu}
            >
              Post A Job
            </MenuItem>
            <MenuItem component={Link} to="/about" onClick={handleCloseNavMenu}>
              About
            </MenuItem>
            <div style={{ flexGrow: 1 }}></div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginRight: '16px',
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Hi, {auth.firstName}!
              </Typography>
            </div>
            {/*<Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
              </Button>
              */}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src={auth.avatar} />
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
              <MenuItem
                component={Link}
                to="/profile"
                onClick={handleCloseUserMenu}
              >
                Profile
              </MenuItem>
              <MenuItem
                component={Link}
                to="/toDoList"
                onClick={handleCloseUserMenu}
              >
                Jobs I Accepted
              </MenuItem>
              <MenuItem
                component={Link}
                to="/myTasks"
                onClick={handleCloseUserMenu}
              >
                Jobs I Posted
              </MenuItem>
              <MenuItem
                component={Link}
                to="/reviews"
                onClick={handleCloseUserMenu}
              >
                My Reviews
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
