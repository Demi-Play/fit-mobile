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
import { nutritionService } from '../../api/services/nutrition.service';

const NutritionForm = () => {
  const [nutritionData, setNutritionData] = useState({
    name: '',
    meal_type: 'BREAKFAST',
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setNutritionData({
      ...nutritionData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await nutritionService.create(nutritionData);
      navigate('/nutrition');
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to create meal');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Add New Meal
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Meal Name"
              name="name"
              value={nutritionData.name}
              onChange={handleChange}
              margin="normal"
              required
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Meal Type</InputLabel>
              <Select
                name="meal_type"
                value={nutritionData.meal_type}
                onChange={handleChange}
                label="Meal Type"
              >
                <MenuItem value="BREAKFAST">Breakfast</MenuItem>
                <MenuItem value="LUNCH">Lunch</MenuItem>
                <MenuItem value="DINNER">Dinner</MenuItem>
                <MenuItem value="SNACK">Snack</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Calories"
              name="calories"
              type="number"
              value={nutritionData.calories}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Protein (g)"
              name="protein"
              type="number"
              value={nutritionData.protein}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Carbs (g)"
              name="carbs"
              type="number"
              value={nutritionData.carbs}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Fats (g)"
              name="fats"
              type="number"
              value={nutritionData.fats}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Date"
              name="date"
              type="date"
              value={nutritionData.date}
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
              Add Meal
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default NutritionForm; 