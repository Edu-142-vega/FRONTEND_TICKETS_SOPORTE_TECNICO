import { api } from "../api";

export type CreateTicketPayload = {
  titulo: string;
  descripcion: string;
  username?: string;
};

export const ticketsService = {
  // 🔹 LEE CORRECTAMENTE la paginación de Nest
  getTickets: async (params?: { page?: number; limit?: number }) => {
    try {
      const response = await api.get("/tickets", {
        params: {
          page: params?.page ?? 1,
          limit: params?.limit ?? 50,
        },
      });

      const data = response.data?.data ?? response.data;

      // nestjs-typeorm-paginate devuelve { items, meta }
      if (Array.isArray(data?.items)) {
        return data.items;
      }

      // fallback por si algún día devuelve array directo
      if (Array.isArray(data)) {
        return data;
      }

      return [];
    } catch (error) {
      console.error("❌ Error getTickets:", error);
      return [];
    }
  },

  // ❗ Por ahora NO se puede filtrar por usuario
  getByUserId: async () => {
    return await ticketsService.getTickets();
  },

  // 🔹 CREATE (esto ya lo tenías bien)
  createTicket: async (payload: CreateTicketPayload) => {
    const response = await api.post("/tickets", payload);
    return response.data;
  },
};
