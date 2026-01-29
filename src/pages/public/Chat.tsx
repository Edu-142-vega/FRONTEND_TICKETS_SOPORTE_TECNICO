import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Chat() {
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState('');
  const [historial, setHistorial] = useState([
    { id: 1, texto: "Hola, ¿en qué puedo ayudarte?", soyYo: false }
  ]);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [historial]);

  const enviarMensaje = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mensaje.trim()) return;

    setHistorial(prev => [...prev, { id: Date.now(), texto: mensaje, soyYo: true }]);
    setMensaje('');
  };

  return (
    <div className="container py-4">
      <div className="card shadow mx-auto" style={{ maxWidth: '600px', height: '70vh' }}>
        <div className="card-header bg-primary text-white d-flex justify-content-between">
          <span>Chat de Soporte</span>
          <button className="btn btn-sm btn-light" onClick={() => navigate(-1)}>Cerrar</button>
        </div>
        <div className="card-body" style={{ overflowY: 'auto' }} ref={scrollRef}>
          {historial.map((msg) => (
            <div key={msg.id} className={`mb-2 d-flex ${msg.soyYo ? 'justify-content-end' : 'justify-content-start'}`}>
              <div className={`p-2 rounded ${msg.soyYo ? 'bg-primary text-white' : 'bg-light'}`}>
                {msg.texto}
              </div>
            </div>
          ))}
        </div>
        <div className="card-footer">
          <form onSubmit={enviarMensaje} className="input-group">
            <input 
              type="text" 
              className="form-control" 
              value={mensaje} 
              onChange={(e) => setMensaje(e.target.value)} 
            />
            <button className="btn btn-primary" type="submit">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
}