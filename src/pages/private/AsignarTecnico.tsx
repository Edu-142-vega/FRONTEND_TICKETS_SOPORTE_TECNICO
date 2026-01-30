import { useState, useEffect } from 'react';
import { ticketsService } from '../../services/tickets.service';
import { useNavigate, useParams } from 'react-router-dom';

const AsignarTecnico = () => {
  const [tecnicos, setTecnicos] = useState<any[]>([]);
  const [tecnicoId, setTecnicoId] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const { ticketId } = useParams<{ ticketId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    setTecnicos([
      { id: 1, nombre: 'Juan Pérez' },
      { id: 2, nombre: 'Ana García' },
    ]);
  }, []);

  const handleAsignarTecnico = async () => {
    if (!ticketId || !tecnicoId) return;

    setLoading(true);
    try {
      await ticketsService.assignTechnician(
        Number(ticketId),
        Number(tecnicoId)
      );

      navigate('/dashboard');
    } catch (error) {
      console.error('Error al asignar técnico:', error);
      alert('Error al asignar el técnico');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Asignar Técnico a Ticket</h1>

      <div className="form-group">
        <label htmlFor="tecnico">Seleccionar Técnico</label>
        <select
          id="tecnico"
          className="form-control"
          value={tecnicoId}
          onChange={(e) => setTecnicoId(e.target.value)}
        >
          <option value="">Seleccione un técnico</option>
          {tecnicos.map((tecnico) => (
            <option key={tecnico.id} value={tecnico.id}>
              {tecnico.nombre}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleAsignarTecnico}
        className="btn btn-primary mt-3"
        disabled={loading || !tecnicoId}
      >
        {loading ? 'Asignando...' : 'Asignar Técnico'}
      </button>
    </div>
  );
};

export default AsignarTecnico;
