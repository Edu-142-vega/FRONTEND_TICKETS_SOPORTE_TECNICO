// src/layouts/PrivateLayout.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface PrivateLayoutProps {
  children?: React.ReactNode;
}

const PrivateLayout: React.FC<PrivateLayoutProps> = ({ children }) => {
  return (
    <div>
      {/* Barra de navegación o header */}
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/dashboard">Dashboard</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard/tickets">Mis Tickets</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard/asignar-tecnico">Asignar Técnico</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/logout">Cerrar sesión</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {/* Contenido principal de la página */}
      <main>{children}</main>
    </div>
  );
};

export default PrivateLayout;
