import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const MainLayout = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Fit App
          </Typography>
          <Button color="inherit" onClick={() => navigate('/workouts')}>
            Workouts
          </Button>
          <Button color="inherit" onClick={() => navigate('/nutrition')}>
            Nutrition
          </Button>
          <Button color="inherit" onClick={() => navigate('/goals')}>
            Goals
          </Button>
          <Button color="inherit" onClick={() => navigate('/profile')}>
            Profile
          </Button>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout; 