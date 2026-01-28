// src/pages/public/ReservaCreatePage.tsx
import React, { useState } from 'react';

const ReservaCreatePage = () => {
  const [ticket, setTicket] = useState({ titulo: '', descripcion: '', prioridad: 'Media' });

  const enviarTicket = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Ticket enviado:", ticket);
    alert("Ticket creado. Un técnico lo revisará pronto.");
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Solicitar Soporte Técnico</h2>
      <form onSubmit={enviarTicket} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '500px' }}>
        <input type="text" placeholder="¿Qué problema tienes? (Ej: Mi PC no enciende)" 
          onChange={e => setTicket({...ticket, titulo: e.target.value})} />
        
        <textarea placeholder="Describe el problema detalladamente..." rows={5}
          onChange={e => setTicket({...ticket, descripcion: e.target.value})} />
        
        <select onChange={e => setTicket({...ticket, prioridad: e.target.value})}>
          <option value="Baja">Baja</option>
          <option value="Media">Media</option>
          <option value="Alta">Alta</option>
        </select>

        <button type="submit" style={{ background: '#28a745', color: 'white', padding: '10px', cursor: 'pointer' }}>
          Enviar Ticket
        </button>
      </form>
    </div>
  );
};

export default ReservaCreatePage;