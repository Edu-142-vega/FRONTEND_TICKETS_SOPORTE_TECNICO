import { useEffect, useState } from 'react';
import { ticketsService } from '../../services/tickets.service';
import { useAuth } from '../../context/AuthContext';

const TicketsUsuario = () => {
  const { user: authData } = useAuth(); // Esto recibe lo que mandaste en login()
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      // 🕵️‍♂️ EXTRACCIÓN PRECISA DEL ID
      // Según tu Login, el usuario está en data.user, por lo que aquí es authData.user
      const userObj = authData?.user || authData; 
      const identifier = userObj?.id || userObj?._id || userObj?.username;

      if (identifier) {
        try {
          console.log("🚀 Buscando tickets para el ID:", identifier);
          const data = await ticketsService.getByUserId(identifier);
          
          // Validamos la respuesta del service
          const finalData = Array.isArray(data) ? data : (data.data || []);
          setTickets(finalData);
        } catch (error) {
          console.error("❌ Error al obtener tickets:", error);
        } finally {
          setLoading(false);
        }
      } else if (authData !== undefined) {
        // Si ya cargó el auth y sigue sin haber ID, paramos el loading
        setLoading(false);
      }
    };

    fetchTickets();
  }, [authData]);

  if (loading) return <div className="container mt-5 text-center"><h5>Cargando historial...</h5></div>;

  return (
    <div className="container mt-4">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-dark text-white p-3 d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Mis Tickets</h4>
          <span className="badge bg-info">
            Usuario: {authData?.user?.username || authData?.username || 'Sesión activa'}
          </span>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Descripción</th>
                  <th>Estado</th>
                  <th>Prioridad</th>
                </tr>
              </thead>
              <tbody>
                {tickets.length > 0 ? (
                  tickets.map((t) => (
                    <tr key={t.id || t._id}>
                      <td className="small text-muted">{t.id || t._id}</td>
                      <td className="fw-bold">{t.descripcion || t.description}</td>
                      <td>
                        <span className={`badge ${t.estado === 'Abierto' ? 'bg-success' : 'bg-warning text-dark'}`}>
                          {t.estado}
                        </span>
                      </td>
                      <td>{t.prioridad}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-5">
                      <p className="text-muted">No tienes tickets registrados aún.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketsUsuario;