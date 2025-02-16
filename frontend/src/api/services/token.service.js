export const tokenService = {
  getToken: () => {
    return localStorage.getItem('token');
  },

  getRefreshToken: () => {
    return localStorage.getItem('refreshToken');
  },

  setToken: (token) => {
    localStorage.setItem('token', token);
  },

  setRefreshToken: (refreshToken) => {
    localStorage.setItem('refreshToken', refreshToken);
  },

  setTokens: (tokens) => {
    localStorage.setItem('token', tokens.access);
    localStorage.setItem('refreshToken', tokens.refresh);
  },

  removeTokens: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  },
}; 