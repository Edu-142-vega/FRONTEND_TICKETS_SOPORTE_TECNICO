import { Outlet } from 'react-router-dom';
import Header from '../components/tickets/Header'; 

const PublicLayout = () => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh', 
      width: '100vw'      
    }}>
      <Header /> 
      
      <main style={{ 
        flex: 1,         
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        padding: '40px 20px'
      }}>
        <Outlet /> 
      </main>
    </div>
  );
};

export default PublicLayout;