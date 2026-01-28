
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RequireAuth from './RequireAuth';
import TicketsUsuario from '../pages/private/TicketsUsuario';
import AsignarTecnico from '../pages/private/AsignarTecnico';

const PrivateRoutes: React.FC = () => (
  <Routes>
    <Route element={<RequireAuth />}>
      <Route path="tickets" element={<TicketsUsuario />} />
      <Route path="asignar-tecnico" element={<AsignarTecnico />} />
    </Route>
  </Routes>
);

export default PrivateRoutes;
