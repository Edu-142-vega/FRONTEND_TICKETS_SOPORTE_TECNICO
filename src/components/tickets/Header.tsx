import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      padding: '15px 10%',         
      background: '#2c3e50',          
      color: 'white',
      alignItems: 'center',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <strong style={{ fontSize: '1.4rem' }}>Soporte Técnico</strong>
      <nav style={{ display: 'flex', gap: '20px' }}>
        <Link to="/crear-ticket" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>Crear Ticket</Link>
        <Link to="/login" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>Login</Link>
        <Link to="/register" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>Registrar</Link>
      </nav>
    </header>
  );
};

export default Header;