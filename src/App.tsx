import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// IMPORTACIONES DE TUS PÁGINAS
import Home from './pages/public/Home';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import CrearTicket from './pages/public/CrearTicket';
import TicketsTable from './components/tickets/TicketsTable';
import Dashboard from './pages/admin/Dashboard';
import Chat from './pages/public/Chat'; 

// IMPORTACIÓN DE COMPONENTES GLOBALES
import Navbar from "./components/Navbar"; 

function App() {
  const [user, setUser] = useState<any>(null);
  const [isReady, setIsReady] = useState(false); // 👈 Control de carga inicial

  useEffect(() => {
    const initAuth = () => {
      const savedUser = localStorage.getItem('user');
      
      if (savedUser && savedUser !== "undefined" && savedUser !== "null") {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          console.error("Error al parsear el usuario", error);
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }
      }
      setIsReady(true); // 👈 Marcamos como listo después de revisar el storage
    };
    
    initAuth();
  }, []);

  // ⚠️ IMPORTANTE: Si no está listo, no renderizamos las rutas para evitar redirecciones erróneas
  if (!isReady) return null;

  return (
    <Router>
      <Navbar user={user} /> 

      <Routes>
        {/* RUTAS PÚBLICAS */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* RUTAS PROTEGIDAS */}
        <Route 
          path="/crear-ticket" 
          element={user ? <CrearTicket /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/mis-tickets" 
          element={user ? <TicketsTable /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/chat" 
          element={user ? <Chat /> : <Navigate to="/login" />} 
        />

        {/* RUTA DE ADMINISTRADOR */}
        <Route 
          path="/admin/dashboard" 
          element={user?.role === 'ADMIN' ? <Dashboard /> : <Navigate to="/" />} 
        />

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;