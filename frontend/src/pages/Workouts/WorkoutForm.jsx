import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { workoutService } from '../../api/services/workout.service';

const WorkoutForm = () => {
  const [workoutData, setWorkoutData] = useState({
    title: '',
    description: '',
    duration: '',
    workout_type: 'CARDIO',
    calories_burned: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setWorkoutData({
      ...workoutData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await workoutService.create(workoutData);
      navigate('/workouts');
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to create workout');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Create New Workout
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={workoutData.title}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={workoutData.description}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={3}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Workout Type</InputLabel>
              <Select
                name="workout_type"
                value={workoutData.workout_type}
                onChange={handleChange}
                label="Workout Type"
              >
                <MenuItem value="CARDIO">Cardio</MenuItem>
                <MenuItem value="STRENGTH">Strength</MenuItem>
                <MenuItem value="FLEXIBILITY">Flexibility</MenuItem>
                <MenuItem value="HIIT">HIIT</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Duration (minutes)"
              name="duration"
              type="number"
              value={workoutData.duration}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Calories Burned"
              name="calories_burned"
              type="number"
              value={workoutData.calories_burned}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Date"
              name="date"
              type="date"
              value={workoutData.date}
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
              Create Workout
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default WorkoutForm; 