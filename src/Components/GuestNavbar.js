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
import { useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import Login from './Login';
import { Dialog, DialogContent } from '@mui/material';
import { Img } from '../styles/styles.js';

function GuestNavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [openLoginDialog, setOpenLoginDialog] = React.useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
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
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
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
                <MenuItem onClick={handleCloseNavMenu} component={Link} to="/">
                  Home
                </MenuItem>
                <MenuItem
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to="/tasks"
                >
                  Available Jobs
                </MenuItem>
                <MenuItem
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to="/about"
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
              <MenuItem
                component={Link}
                to="/tasks"
                onClick={handleCloseNavMenu}
              >
                Available Jobs
              </MenuItem>
              <MenuItem
                component={Link}
                to="/about"
                onClick={handleCloseNavMenu}
              >
                About
              </MenuItem>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Button
                style={{ color: 'white' }}
                onClick={() => setOpenLoginDialog(true)}
              >
                Log In
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Dialog
        maxWidth="sm"
        fullWidth={true}
        open={openLoginDialog}
        onClose={() => setOpenLoginDialog(false)}
      >
        <DialogContent>
          <Login />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default GuestNavBar;
