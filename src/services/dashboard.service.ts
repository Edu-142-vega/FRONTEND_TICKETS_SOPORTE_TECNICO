// src/services/dashboard.service.ts
import axios from 'axios';

const API_URL = 'http://127.0.0.1:3000';

// ✅ Asegúrate de que el nombre sea exactamente 'dashboardService'
export const dashboardService = {
  getStats: async () => {
    // Obtenemos el token para la autorización
    const token = localStorage.getItem('token');
    
    const response = await axios.get(`${API_URL}/tickets/stats`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },

  // Puedes agregar más métodos para el administrador aquí
  getAllTickets: async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/tickets/admin/all`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }
};