import { useState, MouseEvent } from 'react';
import Link from 'next/link';
import {
  Box,
  Container,
  AppBar,
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { LOGO_URL_DEFAULT } from 'utils/constants';
import MenuIcon from '@mui/icons-material/Menu';
import AccontBadge from './AccountBadge';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ height: '70px' }}>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, pr: '24px' }}>
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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Link href="/">
            <a>
              <Box sx={{ display: 'flex', cursor: 'pointer', alignItems: 'center', pr: '30px' }}>
                <img
                  height={44}
                  width={223}
                  className="w-[40px] h-[40px] mr-[12px]"
                  src={LOGO_URL_DEFAULT}
                  alt="logo"
                />
              </Box>
            </a>
          </Link>

          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button key={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                  {page}
                </Button>
              ))}
            </Box>
          </Box>

          <AccontBadge />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;