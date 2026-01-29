import { api } from '../api';

export const messagesService = {
  sendMessage: async (ticketId: number, content: string) => {
    const response = await api.post('/messages', {
      content,
      ticketId
    });
    return response.data;
  },

  getMessagesByTicket: async (ticketId: number) => {
    const response = await api.get(`/messages/ticket/${ticketId}`);
    return response.data;
  }
};