import { api } from "../api";

export interface Ticket {
  id: number;
  titulo: string;
  descripcion: string;
  estado: string;
  usuarioId: number;
  tecnicoId?: number;
  createdAt?: string;
}

export type CreateTicketPayload = {
  titulo: string;
  descripcion: string;
  username?: string;
};

export const ticketsService = {
  getTickets: async (params?: { page?: number; limit?: number }) => {
    try {
      const response = await api.get("/tickets", {
        params: {
          page: params?.page ?? 1,
          limit: params?.limit ?? 50,
        },
      });

      const data = response.data?.data ?? response.data;

      if (Array.isArray(data?.items)) return data.items;
      if (Array.isArray(data)) return data;

      return [];
    } catch (error) {
      console.error("❌ Error getTickets:", error);
      return [];
    }
  },

 getByUserId: async (userId: number) => {
  try {
    const response = await api.get(`/tickets/user/${userId}`);
    const data = response.data?.data ?? response.data;

    if (Array.isArray(data?.items)) return data.items;
    if (Array.isArray(data)) return data;

    return [];
  } catch (error) {
    console.error("❌ Error getByUserId:", error);
    return [];
  }
},
   assignTechnician: async (ticketId: number, tecnicoId: number) => {
    const response = await api.put(
      `/tickets/${ticketId}/assign`,
      { tecnicoId }
    );
    return response.data;
  },

  createTicket: async (payload: CreateTicketPayload) => {
    const response = await api.post("/tickets", payload);
    return response.data;
  },
};
