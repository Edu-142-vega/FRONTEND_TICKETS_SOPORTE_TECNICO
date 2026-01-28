
import React, { useEffect, useState } from 'react';
import { TicketsService } from '../../services/tickets.service';
import { useAuth } from '../../context/AuthContext';

const TicketsUsuario: React.FC = () => {
  const { user } = useAuth(); 
  const [tickets, setTickets] = useState<any[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      if (user) {
        const data = await TicketsService.getByUserId(user.username);
        setTickets(data);
      }
    };

    fetchTickets();
  }, [user]);

  return (
    <div className="container mt-4">
      <h1>Mis Tickets</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Prioridad</th>
          </tr>
        </thead>
        <tbody>
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.descripcion}</td>
                <td>{ticket.estado}</td>
                <td>{ticket.prioridad}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No tienes tickets solicitados.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TicketsUsuario;
