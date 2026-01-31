import { Link } from 'react-router-dom';

export default function Home() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundImage:
          'url("https://www.tecnohelp.es/wp-content/uploads/2016/10/tecnohelp-mantenimiento-informatico-2.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
      }}
    >
      {/* Overlay oscuro */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.65)',
          zIndex: 1,
        }}
      />

      {/* Contenido */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 20px',
          color: 'white',
        }}
      >
        <h1
          className="fw-bold mb-3"
          style={{
            fontSize: '4rem',
            textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
          }}
        >
          Soporte de Tickets
        </h1>

        <p className="fs-4 opacity-75 mb-5" style={{ maxWidth: '800px' }}>
          Soluciones tecnológicas a un clic. Registra y gestiona tus incidentes
          técnicos de forma profesional.
        </p>

        <div className="d-flex justify-content-center gap-4 flex-wrap">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="btn btn-primary btn-lg px-5 py-3 fw-bold shadow-lg"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                className="btn btn-outline-light btn-lg px-5 py-3 fw-bold"
              >
                Crear cuenta
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/mis-tickets"
                className="btn btn-primary btn-lg px-5 py-3 fw-bold shadow-lg"
              >
                Mis Tickets
              </Link>
              <Link
                to="/crear-ticket"
                className="btn btn-success btn-lg px-5 py-3 fw-bold shadow-lg"
              >
                Nuevo Reporte
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
