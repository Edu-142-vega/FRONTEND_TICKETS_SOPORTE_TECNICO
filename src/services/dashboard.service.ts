import { api } from '../api';

export const dashboardService = {
  getStats: async () => {
    const response = await api.get('/tickets/stats');
    return response.data;
  },

  getAllTickets: async () => {
    const response = await api.get('/tickets/admin/all');
    return response.data;
  }
};