import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import { workoutService } from '../../api/services/workout.service';
import { nutritionService } from '../../api/services/nutrition.service';

const Profile = () => {
  const [workoutStats, setWorkoutStats] = useState(null);
  const [nutritionStats, setNutritionStats] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [workoutData, nutritionData] = await Promise.all([
        workoutService.getStatistics(),
        nutritionService.getDailySummary(),
      ]);
      setWorkoutStats(workoutData);
      setNutritionStats(nutritionData);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>Profile</Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Workout Statistics</Typography>
              {workoutStats && (
                <>
                  <Typography>
                    Total Workouts: {workoutStats.total_workouts}
                  </Typography>
                  <Typography>
                    Total Calories Burned: {workoutStats.total_calories_burned}
                  </Typography>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Today's Nutrition</Typography>
              {nutritionStats && (
                <>
                  <Typography>
                    Total Calories: {nutritionStats.total_calories || 0} kcal
                  </Typography>
                  <Typography>
                    Protein: {nutritionStats.total_protein || 0}g
                  </Typography>
                  <Typography>
                    Carbs: {nutritionStats.total_carbs || 0}g
                  </Typography>
                  <Typography>
                    Fats: {nutritionStats.total_fats || 0}g
                  </Typography>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile; 