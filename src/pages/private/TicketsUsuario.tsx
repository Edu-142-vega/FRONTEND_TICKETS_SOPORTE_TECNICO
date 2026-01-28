import React, { useEffect, useState } from 'react';
import { ticketsService } from '../../services/tickets.service';
import { useAuth } from '../../context/AuthContext';

const TicketsUsuario: React.FC = () => {
  const { user } = useAuth(); 
  const [tickets, setTickets] = useState<any[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      if (user?.username) {
        try {
          const response = await ticketsService.getByUserId(user.username);
          // Si el servicio ya limpia los datos, usamos 'response'. 
          // Si no, intentamos entrar a la estructura de paginación.
          const dataArray = response?.data?.items || response?.items || response || [];
          setTickets(dataArray);
        } catch (error) {
          console.error("Error al cargar tickets:", error);
        }
      }
    };
    fetchTickets();
  }, [user]);

  const renderPrioridad = (prioridad: string) => {
    const p = prioridad?.toUpperCase() || 'LOW';
    switch(p) {
      case 'URGENT': return <span className="badge bg-danger w-100">URGENTE</span>;
      case 'HIGH': return <span className="badge bg-warning text-dark w-100">ALTA</span>;
      case 'MEDIUM': return <span className="badge bg-primary w-100">MEDIA</span>;
      default: return <span className="badge bg-success w-100">BAJA</span>;
    }
  };

  const formatearFecha = (t: any) => {
    // Intentamos con todos los nombres posibles que puede traer el backend
    const fechaRaw = t.fecha_asignacion || t.fechaCreacion || t.createdAt;
    if (!fechaRaw) return '---';
    const d = new Date(fechaRaw);
    return isNaN(d.getTime()) ? '---' : d.toLocaleDateString();
  };

  return (
    <div className="container mt-4">
      <h2 className="text-white mb-4">SOY EL ARCHIVO CORRECTO</h2>
      <div className="table-responsive shadow-lg rounded">
        <table className="table table-dark table-hover align-middle mb-0">
          <thead className="table-active">
            <tr>
              <th style={{width: '10%'}}>ID</th>
              <th style={{width: '35%'}}>Asunto</th>
              <th style={{width: '15%'}}>Prioridad</th>
              <th style={{width: '20%'}}>Estado</th>
              <th style={{width: '20%'}}>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length > 0 ? (
              tickets.map((t) => (
                <tr key={t.id}>
                  <td className="text-muted small">#{t.id?.substring(0, 5)}</td>
                  <td>
                    <strong className="text-info">
                      {t.titulo || t.asunto || 'Sin título'}
                    </strong>
                  </td>
                  <td>{renderPrioridad(t.prioridad)}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className={`rounded-circle bg-${t.estado === 'abierto' ? 'info' : 'success'} me-2`} style={{width: '10px', height: '10px'}}></div>
                      <span className="text-uppercase small">{t.estado || 'Abierto'}</span>
                    </div>
                  </td>
                  <td className="text-muted">{formatearFecha(t)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-5 text-muted">
                  No se encontraron tickets en la base de datos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketsUsuario;