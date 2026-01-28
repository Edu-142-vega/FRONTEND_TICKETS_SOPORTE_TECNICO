import axios from 'axios';

const API_URL = 'http://localhost:3000'; // La URL de tu backend NestJS

export const api = axios.create({
  baseURL: API_URL,
});

// Este interceptor pega el token en cada petición automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});