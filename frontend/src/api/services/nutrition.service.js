import { api } from '../axios';

export const nutritionService = {
  getAll: async () => {
    const response = await api.get('/nutrition/');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/nutrition/${id}/`);
    return response.data;
  },

  create: async (nutritionData) => {
    const response = await api.post('/nutrition/', nutritionData);
    return response.data;
  },

  update: async (id, nutritionData) => {
    const response = await api.put(`/nutrition/${id}/`, nutritionData);
    return response.data;
  },

  delete: async (id) => {
    await api.delete(`/nutrition/${id}/`);
  },

  getDailySummary: async () => {
    const response = await api.get('/nutrition/summary/');
    return response.data;
  },
}; 