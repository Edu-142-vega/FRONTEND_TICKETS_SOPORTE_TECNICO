import { useEffect, useState } from 'react';
import { ticketsService } from '../../services/tickets.service';

const TicketsTable = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await ticketsService.getTickets();
        setTickets(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error al obtener tickets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        Cargando tus tickets...
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', width: '100%' }}>
      <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>
        Mis Tickets de Soporte
      </h2>

      <div style={{ overflowX: 'auto', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' }}>
          <thead>
            <tr style={{ backgroundColor: '#2c3e50', color: 'white', textAlign: 'left' }}>
              <th style={headerStyle}>ID</th>
              <th style={headerStyle}>Asunto</th>
              <th style={headerStyle}>Prioridad</th>
              <th style={headerStyle}>Estado</th>
              <th style={headerStyle}>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length > 0 ? (
              tickets.map((ticket: any) => (
                <tr key={ticket.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={cellStyle}>#{ticket.id}</td>
                  <td style={cellStyle}>{ticket.title}</td>
                  <td style={cellStyle}>
                    <span style={getPriorityStyle(ticket.priority)}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td style={cellStyle}>
                    <span style={getStatusStyle(ticket.status)}>
                      {ticket.status}
                    </span>
                  </td>
                  <td style={cellStyle}>
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '30px', color: '#7f8c8d' }}>
                  Aún no has creado ningún ticket.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const headerStyle = {
  padding: '15px',
  fontWeight: 'bold',
};

const cellStyle = {
  padding: '15px',
};

const getPriorityStyle = (priority: string) => ({
  padding: '4px 8px',
  borderRadius: '4px',
  fontSize: '0.85rem',
  fontWeight: 'bold',
  backgroundColor:
    priority === 'HIGH'
      ? '#e74c3c'
      : priority === 'MEDIUM'
      ? '#f1c40f'
      : '#3498db',
  color: 'white',
});

const getStatusStyle = (status: string) => ({
  padding: '4px 10px',
  borderRadius: '12px',
  fontSize: '0.85rem',
  border: `1px solid ${status === 'OPEN' ? '#2ecc71' : '#95a5a6'}`,
  color: status === 'OPEN' ? '#27ae60' : '#7f8c8d',
});

export default TicketsTable;
