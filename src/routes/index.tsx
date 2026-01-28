import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import HomePage from '../pages/public/Home';
import Login from '../pages/public/Login';
import Register from '../pages/public/Register';
import ReservaCreatePage from '../pages/public/ReservaCreatePage'; // Tu página de tickets

export const AppRoutes = () => {
  return (
    <Routes>
      {/* RUTAS PÚBLICAS: Usan el Layout que tiene el menú */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="crear-ticket" element={<ReservaCreatePage />} />
      </Route>

      {/* Redirección por defecto si la ruta no existe */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};