import { api } from '../axios';

export const goalService = {
  getAll: async () => {
    const response = await api.get('/goals/');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/goals/${id}/`);
    return response.data;
  },

  create: async (goalData) => {
    const response = await api.post('/goals/', goalData);
    return response.data;
  },

  update: async (id, goalData) => {
    const response = await api.put(`/goals/${id}/`, goalData);
    return response.data;
  },

  delete: async (id) => {
    await api.delete(`/goals/${id}/`);
  },
}; 