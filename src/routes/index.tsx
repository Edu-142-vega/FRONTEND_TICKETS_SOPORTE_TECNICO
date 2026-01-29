import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import HomePage from '../pages/public/Home';
import Login from '../pages/public/Login';
import Register from '../pages/public/Register';
import ReservaCreatePage from '../pages/public/ReservaCreatePage';
import HomeDent from '../pages/public/HomeDent';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        {/* AQUÍ ESTÁ EL CAMBIO: Ahora usamos HomeDent */}
        <Route index element={<HomeDent />} /> 
        
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="crear-ticket" element={<ReservaCreatePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};