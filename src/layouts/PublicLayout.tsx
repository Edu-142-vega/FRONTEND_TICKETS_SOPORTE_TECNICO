import { Outlet } from 'react-router-dom';
import Header from '../components/tickets/Header'; 

const PublicLayout = () => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh', // Ocupa el 100% del alto de la pantalla
      width: '100vw'      // Ocupa el 100% del ancho
    }}>
      <Header /> 
      
      <main style={{ 
        flex: 1,           // Empuja el footer hacia abajo y expande el contenido
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', // Centra el contenido horizontalmente
        padding: '40px 20px'
      }}>
        <Outlet /> 
      </main>
    </div>
  );
};

export default PublicLayout;