// routes/private.routes.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RequireAuth from './RequireAuth';
import TicketsUsuario from '../pages/private/TicketsUsuario';
import AsignarTecnico from '../pages/private/AsignarTecnico';

const PrivateRoutes: React.FC = () => (
  <Routes>
    <Route element={<RequireAuth />}>
      {/* Ruta privada para ver los tickets */}
      <Route path="tickets" element={<TicketsUsuario />} />

      {/* Ruta privada para asignar técnico */}
      <Route path="asignar-tecnico" element={<AsignarTecnico />} />
    </Route>
  </Routes>
);

export default PrivateRoutes;
