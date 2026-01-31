import axios from 'axios';

const rawUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'; 

// 1. Limpiar espacios
// 2. Eliminar prefijo accidental "VITE_API_URL="
// 3. Eliminar punto final accidental
const API_URL = rawUrl
  .trim()
  .replace(/^VITE_API_URL=/, "")
  .replace(/\.$/, "");

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});