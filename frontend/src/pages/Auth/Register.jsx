import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Register = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate password
    if (userData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    if (userData.password !== userData.password2) {
      newErrors.password2 = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await register(userData);
    } catch (error) {
      console.error('Registration error:', error);
      if (error.response?.data) {
        setErrors(error.response.data);
      } else {
        setErrors({ general: 'Registration failed. Please try again.' });
      }
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Card sx={{ maxWidth: 400, width: '100%', m: 2 }}>
        <CardContent>
          <Typography variant="h5" component="h1" gutterBottom textAlign="center">
            Register
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={userData.username}
              onChange={handleChange}
              margin="normal"
              required
              error={!!errors.username}
              helperText={errors.username}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={userData.email}
              onChange={handleChange}
              margin="normal"
              required
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={userData.password}
              onChange={handleChange}
              margin="normal"
              required
              error={!!errors.password}
              helperText={errors.password}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              name="password2"
              type="password"
              value={userData.password2}
              onChange={handleChange}
              margin="normal"
              required
              error={!!errors.password2}
              helperText={errors.password2}
            />
            {errors.general && (
              <Typography color="error" sx={{ mt: 2 }}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
            >
              Register
            </Button>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Link href="/login" underline="hover">
                Already have an account? Login
              </Link>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register; 