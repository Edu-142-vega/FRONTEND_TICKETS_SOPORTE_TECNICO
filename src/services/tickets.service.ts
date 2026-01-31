import { api } from '../api';

export const ticketsService = {
  // ✅ Admin / listar todos (si lo necesitas)
  getTickets: async () => {
    const response = await api.get('/tickets');
    return response.data?.data?.items || response.data?.data || response.data || [];
  },

  // ✅ Mis tickets (SOLO del usuario logueado) - backend debe tener /tickets/mis-tickets
  getMyTickets: async () => {
    const response = await api.get('/tickets/mis-tickets');
    // si tu backend devuelve paginado o normal, cubrimos ambos
    return response.data?.data?.items || response.data?.data || response.data || [];
  },

  // (opcional) si todavía tienes un endpoint /tickets/user/:id
  getByUserId: async (userId: string) => {
    const response = await api.get(`/tickets/user/${userId}`);
    return response.data?.data?.items || response.data?.data || response.data || [];
  },

  // ✅ Crear ticket (el backend debe asignar userId desde el token)
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
};
