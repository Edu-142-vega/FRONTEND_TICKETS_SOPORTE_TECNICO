import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user }: { user: any }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={{ 
      padding: '1rem 2rem', 
      background: '#2c3e50', 
      color: 'white', 
      display: 'flex', 
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
    }}>
      <Link to="/" style={{ color: '#3498db', fontWeight: 'bold', textDecoration: 'none', fontSize: '1.2rem' }}>
        🚀 Support Tech
      </Link>

      <div>
        <Link to="/" style={{ margin: '0 10px', color: 'white', textDecoration: 'none' }}>Inicio</Link>
        
        {user ? (
          <>
            <Link to="/chat" style={{ margin: '0 10px', color: '#f1c40f', textDecoration: 'none', fontWeight: 'bold' }}>
              💬 Chat
            </Link>

            <Link to="/mis-tickets" style={{ margin: '0 10px', color: 'white', textDecoration: 'none' }}>
              Mis Tickets
            </Link>

            <button 
              onClick={handleLogout} 
              style={{ 
                marginLeft: '15px', 
                cursor: 'pointer', 
                background: '#e74c3c', 
                color: 'white', 
                border: 'none', 
                padding: '5px 12px', 
                borderRadius: '5px',
                fontWeight: 'bold'
              }}
            >
              Salir
            </button>
          </>
        ) : (
          <Link to="/login" style={{ 
            margin: '0 10px', 
            color: 'white', 
            background: '#3498db', 
            padding: '5px 15px', 
            borderRadius: '5px', 
            textDecoration: 'none' 
          }}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
