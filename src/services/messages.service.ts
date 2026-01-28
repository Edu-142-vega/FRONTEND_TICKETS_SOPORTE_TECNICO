import { api } from '../api';

export const messagesService = {
  // Enviar un mensaje nuevo a un ticket específico
  sendMessage: async (ticketId: number, content: string) => {
    // Tu backend probablemente espera { content, ticketId }
    const response = await api.post('/messages', {
      content,
      ticketId
    });
    return response.data;
  },

  // Obtener todos los mensajes de un ticket
  getMessagesByTicket: async (ticketId: number) => {
    const response = await api.get(`/messages/ticket/${ticketId}`);
    return response.data;
  }
};