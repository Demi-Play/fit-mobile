import { api } from '../axios';
import { tokenService } from './token.service';

export const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login/', credentials);
      if (response.data.access && response.data.refresh) {
        tokenService.setTokens(response.data);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post('/auth/register/', userData);
      if (response.data.access && response.data.refresh) {
        tokenService.setTokens(response.data);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  logout: () => {
    tokenService.removeTokens();
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get('/users/profile/');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  refreshToken: async () => {
    try {
      const refreshToken = tokenService.getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }
      
      const response = await api.post('/auth/token/refresh/', {
        refresh: refreshToken
      });
      
      if (response.data.access) {
        tokenService.setToken(response.data.access);
      }
      return response.data;
    } catch (error) {
      tokenService.removeTokens();
      throw error;
    }
  },
};