import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Chat() {
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState('');
  const [historial, setHistorial] = useState([
    { id: 1, texto: "Hola, ¿puedo ayudarte a resolver un problema?", soyYo: false }
  ]);
  
  const scrollRef = useRef(null);

  // Auto-scroll al final cuando llega un mensaje nuevo
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [historial]);

  const enviarMensaje = (e) => {
    e.preventDefault();
    if (!mensaje.trim()) return;

    // Añadir el mensaje del usuario
    const nuevoMensaje = {
      id: Date.now(),
      texto: mensaje,
      soyYo: true
    };

    setHistorial([...historial, nuevoMensaje]);
    setMensaje('');

    // Simular una respuesta automática después de 1 segundo
    setTimeout(() => {
      setHistorial(prev => [...prev, {
        id: Date.now() + 1,
        texto: "Entendido. Un agente de soporte revisará tu caso pronto.",
        soyYo: false
      }]);
    }, 1000);
  };

  return (
    <div className="container py-4">
      <div className="card shadow mx-auto" style={{ maxWidth: '600px', height: '80vh' }}>
        {/* Cabecera del Chat */}
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=50&h=50&auto=format&fit=crop" 
              className="rounded-circle me-2" 
              alt="Soporte" 
              style={{ width: '40px', height: '40px' }}
            />
            <h6 className="mb-0">Soporte Técnico en Línea</h6>
          </div>
          <button className="btn btn-sm btn-light" onClick={() => navigate(-1)}>Volver</button>
        </div>

        {/* Cuerpo del Chat */}
        <div 
          className="card-body bg-light" 
          style={{ overflowY: 'auto' }}
          ref={scrollRef}
        >
          {historial.map((msg) => (
            <div key={msg.id} className={`d-flex mb-3 ${msg.soyYo ? 'justify-content-end' : 'justify-content-start'}`}>
              <div 
                className={`p-3 rounded-3 shadow-sm ${msg.soyYo ? 'bg-primary text-white' : 'bg-white text-dark'}`}
                style={{ maxWidth: '80%', fontSize: '0.95rem' }}
              >
                {msg.texto}
              </div>
            </div>
          ))}
        </div>

        {/* Input de Texto */}
        <div className="card-footer bg-white border-top-0">
          <form onSubmit={enviarMensaje} className="input-group">
            <input 
              type="text" 
              className="form-control border-0 bg-light" 
              placeholder="Escribe tu mensaje aquí..." 
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
            />
            <button className="btn btn-primary px-4" type="submit">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}