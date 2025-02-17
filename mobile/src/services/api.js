import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Определяем BASE_URL в зависимости от платформы
const BASE_URL = Platform.select({
  ios: 'http://localhost:8000/api',
  android: 'http://10.0.2.2:8000/api', // специальный IP для Android эмулятора
});

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // добавляем таймаут в 10 секунд
});

// Добавим логирование для отладки
api.interceptors.request.use(
  async (config) => {
    console.log('Making request to:', config.url);
    console.log('Request data:', config.data);
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('Response:', response.data);
    return response;
  },
  (error) => {
    console.error('Response error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (credentials) => {
    try {
      console.log('Attempting login with:', credentials);
      const response = await api.post('/auth/login/', {
        username: credentials.email,
        password: credentials.password
      });
      console.log('Login response:', response.data);
      
      await AsyncStorage.setItem('token', response.data.token);
      const userResponse = await api.get('/users/profile/');
      return {
        user: userResponse.data,
        token: response.data.token
      };
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      throw error.response?.data || error.message;
    }
  },

  register: async (userData) => {
    try {
      await api.post('/auth/register/', userData);
      
      const response = await authService.login({
        email: userData.email,
        password: userData.password
      });
      return response;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem('token');
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get('/users/profile/');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default api; 