import { api } from '../api';

export const ticketsService = {
  // Obtener la lista de tickets del usuario actual
  getTickets: async () => {
    const response = await api.get('/tickets');
    return response.data;
  },

  // ✅ AGREGADO: Crear un nuevo ticket
  createTicket: async (ticketData: any) => {
    const response = await api.post('/tickets', ticketData);
    return response.data;
  },

  // ✅ AGREGADO: Obtener categorías para los selectores
  // Usamos la misma lógica que en tu componente de Categorías
  getCategories: async () => {
    const response = await api.get('/categories');
    // Esto asegura que devolvemos solo el array de items, sea cual sea el formato
    const rawData = response?.data?.data?.items || response?.data?.items || response?.data?.data || response?.data || [];
    return Array.isArray(rawData) ? rawData : [];
  }
};