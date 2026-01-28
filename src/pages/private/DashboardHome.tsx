import React from 'react';
import TicketsTable from '../../components/tickets/TicketsTable';

const DashboardHome: React.FC = () => {
  return (
    <div className="container mt-4">
      <h1 className="text-center">Dashboard - Administrador</h1>
      <TicketsTable />
    </div>
  );
};

export default DashboardHome;
