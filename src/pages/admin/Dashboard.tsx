import React, { useEffect, useState } from 'react';
import { dashboardService } from '../../services/dashboard.service';
import TicketsTable from '../../components/tickets/TicketsTable';

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, open: 0, closed: 0, pending: 0 });

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await dashboardService.getStats();
        setStats(data);
      } catch (err) {
        console.error("Error cargando estadísticas");
      }
    };
    loadData();
  }, []);

  return (
    <div style={{ padding: '30px' }}>
      <h2 style={{ marginBottom: '25px' }}>Panel de Control Administrativo</h2>
      
      <div style={gridContainer}>
        <StatCard title="Total Tickets" value={stats.total} color="#3498db" />
        <StatCard title="Abiertos" value={stats.open} color="#e74c3c" />
        <StatCard title="En Proceso" value={stats.pending} color="#f1c40f" />
        <StatCard title="Finalizados" value={stats.closed} color="#2ecc71" />
      </div>

      <div style={{ marginTop: '40px' }}>
        <h3>Actividad Reciente</h3>
        <TicketsTable /> 
      </div>
    </div>
  );
};


const StatCard = ({ title, value, color }: any) => (
  <div style={{ ...cardStyle, borderLeft: `5px solid ${color}` }}>
    <span style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>{title}</span>
    <h2 style={{ margin: '10px 0 0 0' }}>{value}</h2>
  </div>
);

const gridContainer = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '20px'
};

const cardStyle = {
  background: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
};

export default Dashboard;