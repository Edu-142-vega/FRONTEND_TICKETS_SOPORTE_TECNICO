import { Link } from "react-router-dom";
import HowItWorks from "../../components/HowItWorks";

export default function HomeDent() {
  const isAuthenticated = !!localStorage.getItem('token');

  const cardStyle: React.CSSProperties = {
    transition: 'all 0.3s ease',
    borderRadius: '15px',
    cursor: 'pointer',
    textDecoration: 'none',
  };

  return (
    <>
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
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 1,
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 2,
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '3rem 1rem',
            color: 'white',
          }}
        >
          <div className="container text-center mb-5">
            <h1 className="fw-bold mb-3" style={{ fontSize: '3.5rem' }}>
              Soporte de Tickets
            </h1>
            <p className="fs-5 opacity-75 mx-auto" style={{ maxWidth: '700px' }}>
              Soluciones tecnológicas a un clic. Registra, gestiona y da seguimiento
              a tus incidentes técnicos de forma profesional.
            </p>

            <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/login"
                    className="btn btn-primary btn-lg px-4 shadow"
                    style={cardStyle}
                  >
                    Iniciar sesión
                  </Link>

                  <Link
                    to="/register"
                    className="btn btn-outline-light btn-lg px-4"
                    style={cardStyle}
                  >
                    Crear cuenta
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/mis-tickets"
                    className="btn btn-primary btn-lg px-4 shadow"
                    style={cardStyle}
                  >
                    📋 Ver mis Tickets
                  </Link>

                  <Link
                    to="/crear-ticket"
                    className="btn btn-success btn-lg px-4 shadow"
                    style={cardStyle}
                  >
                    ➕ Nuevo Requerimiento
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <section style={{ backgroundColor: '#f8f9fa', padding: '5rem 0' }}>
        <div className="container">
          <HowItWorks />
        </div>
      </section>
    </>
  );
}
