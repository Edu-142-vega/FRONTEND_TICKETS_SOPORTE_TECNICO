// routes/public.routes.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CrearTicket from '../pages/public/CrearTicket'; // Página para crear un ticket
import Login from '../pages/public/Login'; // Página de login
import Register from '../pages/public/Register'; // Página de registro
import PublicLayout from '../layouts/PublicLayout'; // Layout para páginas públicas

const PublicRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout children={undefined} />}>
        {/* Las rutas deben estar dentro de PublicLayout */}
        <Route path="crear-ticket" element={<CrearTicket />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;
