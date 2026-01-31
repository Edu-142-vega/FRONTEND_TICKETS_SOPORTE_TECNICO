import axios from 'axios';

const API_URL = 'http://127.0.0.1:3000';

export const authService = {
  login: async (credentials: any) => {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
};