import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';

import Login from '../pages/public/Login';
import Register from '../pages/public/Register';
import ReservaCreatePage from '../pages/public/ReservaCreatePage';
import HomeDent from '../pages/public/HomeDent';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
  
        <Route index element={<HomeDent />} /> 
        
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="crear-ticket" element={<ReservaCreatePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};