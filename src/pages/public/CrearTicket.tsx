import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ticketsService } from '../../services/tickets.service';

const CrearTicket = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: ''
  });
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        titulo: formData.titulo,
        descripcion: formData.descripcion
      };

      await ticketsService.createTicket(payload);
      alert("✅ Ticket creado con éxito.");
      navigate('/mis-tickets'); 
    } catch (err: any) {
      const msg = err.response?.data?.message;
      alert(Array.isArray(msg) ? msg.join("\n") : msg || "Error al crear");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-5" style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: '#fff' }}>
      <div className="card border-0 shadow-lg bg-dark text-white p-5" style={{ borderRadius: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <h2 className="text-info text-center mb-4">🎫 Nuevo Ticket</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label text-info fw-bold">TÍTULO DEL PROBLEMA</label>
            <input 
              className="form-control bg-dark text-white border-secondary py-3" 
              value={formData.titulo}
              onChange={(e) => setFormData({...formData, titulo: e.target.value})} 
              required 
            />
          </div>

          <div className="mb-4">
            <label className="form-label text-info fw-bold">DESCRIPCIÓN DETALLADA</label>
            <textarea 
              className="form-control bg-dark text-white border-secondary py-3" 
              rows={5} 
              value={formData.descripcion}
              onChange={(e) => setFormData({...formData, descripcion: e.target.value})} 
              required 
            />
          </div>

          <button type="submit" className="btn btn-info w-100 fw-bold py-3 shadow" disabled={loading}>
            {loading ? '🚀 Enviando...' : '🚀 Crear Ticket'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CrearTicket;