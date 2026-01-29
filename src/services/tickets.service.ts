import { api } from '../api';

export interface Ticket {
  id: string;
  descripcion: string;
  estado: string;
  prioridad: string;
  usuarioId?: string;
  tecnicoId?: string;
}

export const ticketsService = {
  getTickets: async () => {
    const response = await api.get('/tickets');
    return response.data;
  },

  getByUserId: async (userId: string) => {
    const response = await api.get(`/tickets/user/${userId}`);
    return response.data;
  },

  assignTechnician: async (ticketId: string, tecnicoId: string) => {
    const response = await api.patch(`/tickets/${ticketId}/assign`, { tecnicoId });
    return response.data;
  },

  createTicket: async (ticketData: any) => {
    const response = await api.post('/tickets', ticketData);
    return response.data;
  },

  getCategories: async () => {
    const response = await api.get('/categories');
    const rawData = response?.data?.data?.items || response?.data?.items || response?.data?.data || response?.data || [];
    return Array.isArray(rawData) ? rawData : [];
  }
};