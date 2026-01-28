import { useState, useEffect } from 'react';
import { TicketsService, type Ticket } from '../services/tickets.service';

const useTickets = (userId: string) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        const data = await TicketsService.getByUserId(userId);
        setTickets(data);
      } catch (error) {
        console.error('Error al obtener los tickets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [userId]);

  return { tickets, loading };
};

export default useTickets;
