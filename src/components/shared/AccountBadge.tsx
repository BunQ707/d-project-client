import { useState, MouseEvent } from 'react';
import { Avatar, IconButton, Menu, MenuItem, Tooltip, Typography, Box, Button } from '@mui/material';
import { useAuth } from 'contexts/auth';
import { useRouter } from 'next/router';

const settings: string[] = [];

const AccontBadge = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { isAuthenticated, handleLogout } = useAuth();

  const router = useRouter();

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return isAuthenticated ? (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src="/avatar.png" />
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
            <Typography textAlign="center" sx={{ textTransform: 'none', fontSize: '18px' }}>
              {setting}
            </Typography>
          </MenuItem>
        ))}
        <MenuItem onClick={handleLogout}>
          <Typography textAlign="center" sx={{ textTransform: 'none', fontSize: '18px' }}>
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  ) : (
    <Box sx={{ flexGrow: 0 }}>
      {router?.pathname !== '/login' && (
        <Button
          onClick={() => router.push(`/login?redirectUrl=${window.location.pathname}`)}
          sx={{ textTransform: 'none', fontSize: '18px' }}
          color={'primary'}
        >
          Login
        </Button>
      )}
    </Box>
  );
};

export default AccontBadge;
