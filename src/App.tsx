import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Importaciones de páginas
import Home from './pages/public/Home';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import CrearTicket from './pages/public/CrearTicket';
import Dashboard from './pages/admin/Dashboard';
import HomeDent from './pages/public/HomeDent';
import TicketsUsuario from './pages/private/TicketsUsuario'; 
import Navbar from "./components/Navbar";
import FloatingChat from './components/FloatingChat';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Navbar user={user} /> 
      <Routes>
        <Route path="/" element={user ? <HomeDent /> : <Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas Protegidas */}
        <Route 
          path="/crear-ticket" 
          element={user ? <CrearTicket /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/mis-tickets" 
          element={user ? <TicketsUsuario /> : <Navigate to="/login" />} 
        />
        
        <Route 
          path="/admin/dashboard" 
          element={user?.role === 'ADMIN' ? <Dashboard /> : <Navigate to="/" />} 
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <FloatingChat />
    </Router>
  );
}

export default App;