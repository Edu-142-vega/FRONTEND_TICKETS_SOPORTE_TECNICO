import axios from 'axios';

const API_URL = 'http://127.0.0.1:3000';

export const dashboardService = {
  getStats: async () => {
    const token = localStorage.getItem('token');
    
    const response = await axios.get(`${API_URL}/tickets/stats`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },

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