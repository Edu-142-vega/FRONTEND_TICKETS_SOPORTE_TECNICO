import React from 'react';

const TicketsTable: React.FC<{ tickets: any[] }> = ({ tickets }) => {
  return (
    <div style={{ background: 'white', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
      <table className="table table-hover mb-0">
        <thead style={{ backgroundColor: '#f8f9fa' }}>
          <tr>
            <th style={{ padding: '15px', color: '#7f8c8d' }}>ID</th>
            <th style={{ padding: '15px', color: '#7f8c8d' }}>DESCRIPCIÓN</th>
            <th style={{ padding: '15px', color: '#7f8c8d' }}>ESTADO</th>
            <th style={{ padding: '15px', color: '#7f8c8d' }}>PRIORIDAD</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td style={{ padding: '15px' }}>{ticket.id}</td>
              <td style={{ padding: '15px', fontWeight: 'bold' }}>{ticket.descripcion}</td>
              <td style={{ padding: '15px' }}>
                <span className="badge bg-info text-dark">{ticket.estado}</span>
              </td>
              <td style={{ padding: '15px' }}>{ticket.prioridad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketsTable;