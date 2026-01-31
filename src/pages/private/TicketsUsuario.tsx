import { useEffect, useState } from 'react';
import { ticketsService } from '../../services/tickets.service';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import TicketsTable from '../../components/tickets/TicketsTable';

const TicketsUsuario = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Estado para abrir/cerrar el chat
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    if (!user) return;

    setLoading(true);

    // ✅ AHORA: trae solo MIS tickets (requiere backend: GET /tickets/mis-tickets)
    ticketsService
      .getMyTickets()
      .then((data: any) => {
        console.log('📦 Mis tickets recibidos:', data);
        setTickets(Array.isArray(data) ? data : []);
      })
      .catch((err: any) => {
        console.error('❌ Error:', err);
        setTickets([]);
      })
      .finally(() => setLoading(false));
  }, [user]);

  if (!user)
    return (
      <div className="p-5 text-center">
        <h3>Sesión expirada</h3>
        <Link to="/login">Volver al Login</Link>
      </div>
    );

  return (
    <div
      style={{
        background: '#f4f7f6',
        minHeight: '100vh',
        padding: '40px',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Tarjeta de Usuario */}
        <div style={userCardStyle}>
          <img
            src={`https://ui-avatars.com/api/?name=${user.username}&background=2c3e50&color=fff`}
            style={avatarStyle}
          />
          <div>
            <h4 style={{ margin: 0 }}>{user.username}</h4>
            <p style={{ color: '#f1c40f', margin: 0, fontWeight: 'bold' }}>
              ⭐⭐⭐ Usuario Verificado
            </p>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px',
          }}
        >
          <h2 style={{ fontWeight: 'bold', color: '#2c3e50' }}>
            Mis Requerimientos 📋
          </h2>
          <Link
            to="/crear-ticket"
            className="btn btn-dark"
            style={{ borderRadius: '10px' }}
          >
            + Nuevo Ticket
          </Link>
        </div>

        {/* Tabla */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#7f8c8d' }}>
            ⏳ Cargando tickets...
          </div>
        ) : tickets.length > 0 ? (
          <TicketsTable tickets={tickets} />
        ) : (
          <div
            style={{
              background: 'white',
              borderRadius: '15px',
              padding: '40px',
              textAlign: 'center',
              color: '#7f8c8d',
              border: '1px dashed #bdc3c7',
            }}
          >
            <p>No tienes requerimientos registrados todavía.</p>
            <small>Usa el botón "+ Nuevo Ticket" para empezar.</small>
          </div>
        )}
      </div>

      {/* --- CHAT (CON CLIC) --- */}
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
        {/* Ventana que se abre/cierra */}
        {isChatOpen && (
          <div style={chatBoxStyle}>
            <div
              style={{
                background: '#2c3e50',
                color: 'white',
                padding: '10px',
                borderRadius: '10px 10px 0 0',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>Soporte en línea</span>
              <button
                onClick={() => setIsChatOpen(false)}
                style={{
                  border: 'none',
                  background: 'none',
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                ✖
              </button>
            </div>
            <div
              style={{
                padding: '15px',
                height: '200px',
                overflowY: 'auto',
                background: '#f9f9f9',
              }}
            >
              <p
                style={{
                  background: '#eee',
                  padding: '10px',
                  borderRadius: '10px',
                  fontSize: '13px',
                }}
              >
                ¡Hola! Soy tu asistente. ¿En qué puedo ayudarte hoy?
              </p>
            </div>
            <input
              type="text"
              placeholder="Escribe aquí..."
              style={{ width: '100%', padding: '10px', border: '1px solid #eee' }}
            />
          </div>
        )}

        {/* Burbuja Flotante */}
        <div
          onClick={() => setIsChatOpen(!isChatOpen)}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <div
            style={{
              background: '#333',
              color: 'white',
              padding: '8px 15px',
              borderRadius: '20px',
              fontSize: '13px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
            }}
          >
            ¿Necesitas ayuda?
          </div>
          <div style={{ position: 'relative' }}>
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                border: '3px solid white',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              }}
            />
            {!isChatOpen && <span style={notifBadgeStyle}>1</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

// Estilos
const userCardStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  background: 'white',
  padding: '20px',
  borderRadius: '15px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  marginBottom: '30px',
  borderLeft: '5px solid #2c3e50',
};

const avatarStyle: React.CSSProperties = {
  width: '60px',
  height: '60px',
  borderRadius: '50%',
};

const chatBoxStyle: React.CSSProperties = {
  width: '300px',
  background: 'white',
  borderRadius: '10px',
  boxShadow: '0 5px 25px rgba(0,0,0,0.2)',
  marginBottom: '15px',
  border: '1px solid #ddd',
};

const notifBadgeStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: '0',
  right: '0',
  background: '#e74c3c',
  color: 'white',
  borderRadius: '50%',
  width: '25px',
  height: '25px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12px',
  fontWeight: 'bold',
};

export default TicketsUsuario;
