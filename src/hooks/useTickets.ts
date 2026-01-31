import { useState, useEffect } from "react";
import { ticketsService } from "../services/tickets.service";

const useTickets = (userId: string) => {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        const data = await ticketsService.getTickets();
        setTickets(data);
      } catch (error) {
        console.error("Error al obtener los tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [userId]);

  return { tickets, loading };
};

export default useTickets;
