import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { goalService } from '../../api/services/goal.service';

const GoalForm = () => {
  const [goalData, setGoalData] = useState({
    title: '',
    description: '',
    target_value: '',
    current_value: '',
    goal_type: 'WEIGHT_LOSS', // или другие типы
    target_date: new Date().toISOString().split('T')[0],
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setGoalData({
      ...goalData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await goalService.create(goalData);
      navigate('/goals');
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to create goal');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Create New Goal
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={goalData.title}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={goalData.description}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={3}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Goal Type</InputLabel>
              <Select
                name="goal_type"
                value={goalData.goal_type}
                onChange={handleChange}
                label="Goal Type"
              >
                <MenuItem value="WEIGHT_LOSS">Weight Loss</MenuItem>
                <MenuItem value="MUSCLE_GAIN">Muscle Gain</MenuItem>
                <MenuItem value="ENDURANCE">Endurance</MenuItem>
                <MenuItem value="STRENGTH">Strength</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Target Value"
              name="target_value"
              type="number"
              value={goalData.target_value}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Current Value"
              name="current_value"
              type="number"
              value={goalData.current_value}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Target Date"
              name="target_date"
              type="date"
              value={goalData.target_date}
              onChange={handleChange}
              margin="normal"
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
            >
              Create Goal
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default GoalForm; 