import React, { useState, useEffect } from 'react';
import { goalService } from '../../api/services/goal.service';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Box,
  LinearProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const GoalList = () => {
  const [goals, setGoals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    try {
      const data = await goalService.getAll();
      setGoals(data);
    } catch (error) {
      console.error('Error loading goals:', error);
    }
  };

  const calculateProgress = (goal) => {
    const today = new Date();
    const targetDate = new Date(goal.target_date);
    const totalDays = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));
    return Math.max(0, Math.min(100, (30 - totalDays) * (100 / 30)));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Goals</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/goals/create')}
        >
          Create Goal
        </Button>
      </Box>

      <Grid container spacing={3}>
        {goals.map((goal) => (
          <Grid item xs={12} sm={6} md={4} key={goal.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
                  {goal.goal_type.replace('_', ' ')}
                </Typography>
                <Typography>Target Weight: {goal.target_weight} kg</Typography>
                <Typography>
                  Target Date: {new Date(goal.target_date).toLocaleDateString()}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography>Progress</Typography>
                  <LinearProgress
                    variant="determinate"
                    value={calculateProgress(goal)}
                    sx={{ mt: 1 }}
                  />
                </Box>
                <Button
                  onClick={() => navigate(`/goals/${goal.id}`)}
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

export default GoalList; 