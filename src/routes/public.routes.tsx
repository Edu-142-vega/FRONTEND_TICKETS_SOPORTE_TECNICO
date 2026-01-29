import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CrearTicket from '../pages/public/CrearTicket';
import Login from '../pages/public/Login';
import Register from '../pages/public/Register';
import PublicLayout from '../layouts/PublicLayout';

const PublicRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route path="crear-ticket" element={<CrearTicket />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;