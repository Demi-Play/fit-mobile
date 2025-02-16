import React, { useState, useEffect } from 'react';
import { workoutService } from '../../api/services/workout.service';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadWorkouts();
  }, []);

  const loadWorkouts = async () => {
    try {
      const data = await workoutService.getAll();
      setWorkouts(data);
    } catch (error) {
      console.error('Error loading workouts:', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Workouts</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/workouts/create')}
        >
          Create Workout
        </Button>
      </Box>
      <Grid container spacing={3}>
        {workouts.map((workout) => (
          <Grid item xs={12} sm={6} md={4} key={workout.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{workout.name}</Typography>
                <Typography color="textSecondary">
                  Duration: {workout.duration} minutes
                </Typography>
                <Typography>
                  Calories Burned: {workout.calories_burned}
                </Typography>
                <Button
                  onClick={() => navigate(`/workouts/${workout.id}`)}
                  sx={{ mt: 2 }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WorkoutList; 