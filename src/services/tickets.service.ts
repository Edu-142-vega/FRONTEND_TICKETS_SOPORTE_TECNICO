import { api } from '../api';

export const ticketsService = {
  getTickets: async () => {
    const response = await api.get('/tickets');
    return response.data;
  },

  createTicket: async (ticketData: any) => {
    const response = await api.post('/tickets', ticketData);
    return response.data;
  },

  getCategories: async () => {
    const response = await api.get('/categories');
    const rawData =
      response?.data?.data?.items ||
      response?.data?.items ||
      response?.data?.data ||
      response?.data ||
      [];
    return Array.isArray(rawData) ? rawData : [];
  },

  // ✅ AÑADIDO: asignar técnico a un ticket
  assignTechnician: async (ticketId: string, tecnicoId: string) => {
    const response = await api.post(
      `/tickets/${ticketId}/assign-technician`,
      { tecnicoId }
    );
    return response.data;
  },
};
