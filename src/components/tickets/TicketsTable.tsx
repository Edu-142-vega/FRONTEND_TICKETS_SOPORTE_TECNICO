import React, { useEffect, useState } from 'react';
import { ticketsService } from '../../services/tickets.service';

const TicketsTable = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        // Usamos el servicio que ya maneja la estructura de paginación
        const data = await ticketsService.getTickets();
        setTickets(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error al obtener tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px', color: 'white' }}>Cargando tus tickets...</div>;

  return (
    <div style={{ padding: '20px', width: '100%' }}>
      <h2 style={{ marginBottom: '20px', color: 'white' }}>Mis Tickets de Soporte</h2>
      
      <div style={{ overflowX: 'auto', boxShadow: '0 4px 6px rgba(0,0,0,0.3)', borderRadius: '8px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#1e1e1e', color: 'white' }}>
          <thead>
            <tr style={{ backgroundColor: '#333', color: 'white', textAlign: 'left' }}>
              <th style={headerStyle}>ID</th>
              <th style={headerStyle}>Asunto</th>
              <th style={headerStyle}>Prioridad</th>
              <th style={headerStyle}>Estado</th>
              <th style={headerStyle}>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length > 0 ? (
              tickets.map((ticket: any) => {
                const prio = translatePriority(ticket.prioridad);
                return (
                  <tr key={ticket.id} style={{ borderBottom: '1px solid #444' }}>
                    <td style={{ ...cellStyle, color: '#888', fontSize: '0.8rem' }}>#{ticket.id?.substring(0, 8)}</td>
                    <td style={{ ...cellStyle, fontWeight: 'bold' }}>{ticket.titulo}</td>
                    <td style={cellStyle}>
                      <span style={getPriorityStyle(ticket.prioridad)}>
                        {prio}
                      </span>
                    </td>
                    <td style={cellStyle}>
                      <span style={getStatusStyle(ticket.estado)}>
                        {String(ticket.estado).toUpperCase()}
                      </span>
                    </td>
                    <td style={{ ...cellStyle, color: '#aaa' }}>
                      {ticket.fecha_asignacion 
                        ? new Date(ticket.fecha_asignacion).toLocaleDateString() 
                        : 'Sin fecha'}
                    </td>
                  </tr>
                );
              })
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

const headerStyle = { padding: '15px', fontWeight: 'bold' };
const cellStyle = { padding: '15px' };

// Función para traducir prioridad de Backend a Español
const translatePriority = (priority: string) => {
  const p = String(priority).toUpperCase();
  if (p === 'URGENT') return 'URGENTE';
  if (p === 'HIGH') return 'ALTA';
  if (p === 'MEDIUM') return 'MEDIA';
  return 'BAJA';
};

const getPriorityStyle = (priority: string) => {
  const p = String(priority).toUpperCase();
  let color = '#2ecc71'; // Verde para LOW/DEFAULT
  if (p === 'URGENT') color = '#e74c3c'; // Rojo
  if (p === 'HIGH') color = '#f39c12';   // Naranja
  if (p === 'MEDIUM') color = '#3498db'; // Azul

  return {
    padding: '5px 12px',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: 'bold' as const,
    backgroundColor: color,
    color: 'white',
    display: 'inline-block',
    minWidth: '80px',
    textAlign: 'center' as const
  };
};

const getStatusStyle = (status: string) => ({
  padding: '4px 10px',
  borderRadius: '12px',
  fontSize: '0.75rem',
  fontWeight: 'bold' as const,
  border: `1px solid #17a2b8`,
  color: '#17a2b8'
});

export default TicketsTable;