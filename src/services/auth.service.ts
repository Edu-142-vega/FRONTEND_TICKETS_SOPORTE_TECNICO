// src/services/auth.service.ts
import axios from 'axios';

const API_URL = 'http://127.0.0.1:3000';

export const authService = {
  login: async (credentials: any) => {
    // Es buena práctica envolver en un try/catch aquí o donde lo llames
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    
    // Cambié access_token por token si es que tu backend usa ese nombre
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