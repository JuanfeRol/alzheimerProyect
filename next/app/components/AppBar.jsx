"use client"

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
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '../providers/GlobalContext';


const pages = ['News', 'About Us', 'Contact'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = ([]);
  const [anchorElUser, setAnchorElUser] = ([]);
  const { loggedIn, setGlobalLoggedIn } = useGlobalContext();

  React.useEffect(() => {
    let cookieValue = document.cookie;

    if (cookieValue != '') {
      cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('user'))
        .split('=')[1];

      setGlobalLoggedIn(true);
    } else {
      setGlobalLoggedIn(false);
    }
    // console.log("globalLoggedIn: ", loggedIn);
  }, []);

  const handleNavMenu = (index) => {
    if (index == 0) {
      router.push('/news');
    }

    if (index == 1) {
      router.push('/aboutus');
    }

    if (index == 2) {
      router.push('/contact');
    }
  };

  const handleOpenNavMenu = (event) => {
  };

  const handleOpenUserMenu = (event) => {
    router.push('/perfil');
  };

  const handleCloseNavMenu = () => {
  };

  const handleCloseUserMenu = () => {
  };

  return (
    <AppBar position="static" sx={{
      backgroundColor: '#EFEFEF',
    }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              color: "#000000",
              textDecoration: 'none',
            }}
          >
            ALZ
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
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
              {pages.map((page, index) => (
                <MenuItem key={page} onClick={() => handleNavMenu(index)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* Responsive design */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              color: '#000000',
              textDecoration: 'none',
            }}
          >
            ALZ
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              <Button
                key={page}
                onClick={() => handleNavMenu(index)}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          { /* Avatar */}
          {loggedIn===true ? (
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="" src="/static/images/avatar/2.jpg" />
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          ) : ( <p style={{ color: 'black' }}><a href='/'>Not logged</a></p> ) }
          
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

