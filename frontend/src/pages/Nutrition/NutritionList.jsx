import React, { useState, useEffect } from 'react';
import { nutritionService } from '../../api/services/nutrition.service';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Box,
  Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NutritionList = () => {
  const [meals, setMeals] = useState([]);
  const [summary, setSummary] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadMeals();
    loadDailySummary();
  }, []);

  const loadMeals = async () => {
    try {
      const data = await nutritionService.getAll();
      setMeals(data);
    } catch (error) {
      console.error('Error loading meals:', error);
    }
  };

  const loadDailySummary = async () => {
    try {
      const data = await nutritionService.getDailySummary();
      setSummary(data);
    } catch (error) {
      console.error('Error loading summary:', error);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Nutrition</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/nutrition/new')}
        >
          Add Meal
        </Button>
      </Box>

      {summary && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6">Daily Summary</Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
              <Chip label={`Calories: ${summary.total_calories || 0} kcal`} />
              <Chip label={`Protein: ${summary.total_protein || 0}g`} />
              <Chip label={`Carbs: ${summary.total_carbs || 0}g`} />
              <Chip label={`Fats: ${summary.total_fats || 0}g`} />
            </Box>
          </CardContent>
        </Card>
      )}

      <Grid container spacing={3}>
        {meals.map((meal) => (
          <Grid item xs={12} sm={6} md={4} key={meal.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
                  {meal.meal_type}
                </Typography>
                <Typography>Calories: {meal.calories} kcal</Typography>
                <Typography>Protein: {meal.protein}g</Typography>
                <Typography>Carbs: {meal.carbohydrates}g</Typography>
                <Typography>Fats: {meal.fats}g</Typography>
                <Button
                  onClick={() => navigate(`/nutrition/${meal.id}`)}
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

export default NutritionList; 