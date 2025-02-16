import { api } from '../axios';

export const workoutService = {
  getAll: async () => {
    const response = await api.get('/workouts/');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/workouts/${id}/`);
    return response.data;
  },

  create: async (workoutData) => {
    const response = await api.post('/workouts/', workoutData);
    return response.data;
  },

  update: async (id, workoutData) => {
    const response = await api.put(`/workouts/${id}/`, workoutData);
    return response.data;
  },

  delete: async (id) => {
    await api.delete(`/workouts/${id}/`);
  },

  getStatistics: async () => {
    const response = await api.get('/workouts/statistics/');
    return response.data;
  },
}; 