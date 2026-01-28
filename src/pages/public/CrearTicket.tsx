import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ticketsService } from '../../services/tickets.service';

const CrearTicket = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    prioridad: 'LOW', // Se queda para la interfaz, pero no se envía
    categoriaId: ''   // Se queda para la interfaz, pero no se envía
  });
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ ELIMINAMOS TODO LO QUE EL SERVIDOR RECHAZA
      // Tus imágenes muestran que 'prioridad' y 'categoriaId' NO deben existir.
      const payload = {
        titulo: formData.titulo,
        descripcion: formData.descripcion
      };

      await ticketsService.createTicket(payload);
      alert("✅ ¡Ticket creado exitosamente!");
      
      // Pequeño delay para asegurar que el backend procese antes de redirigir
      setTimeout(() => navigate('/mis-tickets'), 500); 
    } catch (err: any) {
      const msg = err.response?.data?.message;
      alert(Array.isArray(msg) ? msg.join("\n") : msg || "Error al crear");
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = () => {
    switch(formData.prioridad) {
      case 'URGENT': return '#ff4d4d';
      case 'HIGH': return '#ff944d';
      case 'MEDIUM': return '#ffdb4d';
      default: return '#4dff88';
    }
  };

  return (
    <div className="container-fluid py-5" style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: '#fff' }}>
      <div className="card border-0 shadow-lg bg-dark text-white p-5" style={{ borderRadius: '20px', maxWidth: '700px', margin: '0 auto' }}>
        <h2 className="text-info text-center mb-4 fw-bold">🎫 Nuevo Ticket</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label text-info fw-bold small">TÍTULO DEL PROBLEMA</label>
            <input 
              type="text"
              className="form-control bg-dark text-white border-secondary py-3" 
              placeholder="Ej: Mi computadora necesita una limpieza" 
              value={formData.titulo}
              onChange={(e) => setFormData({...formData, titulo: e.target.value})} 
              required 
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-4">
              <label className="form-label text-info fw-bold small">TIPO DE SOPORTE</label>
              <select 
                className="form-select bg-dark text-white border-secondary py-3"
                value={formData.categoriaId}
                onChange={(e) => setFormData({...formData, categoriaId: e.target.value})}
                required
              >
                <option value="">Seleccione...</option>
                <option value="1">💻 Hardware (Físico)</option>
                <option value="2">📁 Software (Programas)</option>
              </select>
            </div>

            <div className="col-md-6 mb-4">
              <label className="form-label text-info fw-bold small">PRIORIDAD</label>
              <select 
                className="form-select bg-dark text-white py-3"
                style={{ border: '1px solid #6c757d', borderLeft: `5px solid ${getPriorityColor()}` }}
                value={formData.prioridad}
                onChange={(e) => setFormData({...formData, prioridad: e.target.value})}
              >
                <option value="LOW">Baja</option>
                <option value="MEDIUM">Media</option>
                <option value="HIGH">Alta</option>
                <option value="URGENT">Urgente</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label text-info fw-bold small">DESCRIPCIÓN DETALLADA</label>
            <textarea 
              className="form-control bg-dark text-white border-secondary py-3" 
              rows={5} 
              placeholder="Ej: El equipo se calienta mucho..." 
              value={formData.descripcion}
              onChange={(e) => setFormData({...formData, descripcion: e.target.value})} 
              required 
            />
          </div>

          <button type="submit" className="btn btn-info w-100 fw-bold py-3 shadow text-white" disabled={loading}>
            {loading ? '🚀 Enviando...' : '🚀 Crear Ticket'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CrearTicket;