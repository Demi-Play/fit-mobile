import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const workoutsService = {
  getWorkouts: async () => {
    try {
      const response = await api.get('/workouts/');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getWorkout: async (id) => {
    try {
      const response = await api.get(`/workouts/${id}/`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  createWorkout: async (workoutData) => {
    try {
      // Получаем текущего пользователя из токена
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('Not authenticated');
      }

      // Добавляем дополнительные поля, если они не установлены
      const enrichedData = {
        ...workoutData,
        calories_burned: workoutData.calories_burned || 0,
        date: workoutData.date || new Date().toISOString().split('T')[0],
      };

      const response = await api.post('/workouts/', enrichedData);
      return response.data;
    } catch (error) {
      console.error('Create workout error:', error.response?.data || error.message);
      throw error.response?.data || error.message;
    }
  },

  updateWorkout: async (id, workoutData) => {
    try {
      const response = await api.put(`/workouts/${id}/`, workoutData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  deleteWorkout: async (id) => {
    try {
      await api.delete(`/workouts/${id}/`);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
}; 