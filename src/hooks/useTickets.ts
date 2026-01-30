import { useState, useEffect } from 'react';
import { ticketsService, type Ticket } from '../services/tickets.service';

export const useTickets = (userId?: string) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = userId 
          ? await ticketsService.getByUserId(Number(userId))
          : await ticketsService.getTickets();
        setTickets(data);
      } catch (err) {
        console.error('Error al cargar tickets', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, [userId]);

  return { tickets, loading };
};