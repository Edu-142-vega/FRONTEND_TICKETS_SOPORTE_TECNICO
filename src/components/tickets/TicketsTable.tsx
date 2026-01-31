// src/components/tickets/TicketsTable.tsx

interface Props {
  tickets: any[];
}

const TicketsTable = ({ tickets }: Props) => {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="table table-hover bg-white shadow-sm rounded">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Estado</th>
            <th>Prioridad</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {tickets.length > 0 ? (
            tickets.map((ticket: any) => (
              <tr key={ticket.id}>
                <td>#{ticket.id}</td>
                <td>{ticket.title || ticket.titulo}</td>
                <td>{ticket.status || ticket.estado}</td>
                <td>{ticket.priority || ticket.prioridad}</td>
                <td>
                  {ticket.createdAt
                    ? new Date(ticket.createdAt).toLocaleDateString()
                    : '—'}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center text-muted py-4">
                No hay tickets para mostrar
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TicketsTable;
