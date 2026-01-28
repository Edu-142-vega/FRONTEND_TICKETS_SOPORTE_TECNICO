import { Link } from 'react-router-dom';
import HowItWorks from '../../components/HowItWorks';

export default function Home() {
  return (
    <>
      {/* HERO CON FONDO */}
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
        {/* Overlay oscuro para que el texto se lea bien */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 1,
          }}
        />

        {/* Contenido Principal */}
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
          {/* HERO TEXT */}
          <div className="container text-center mb-5">
            <h1 className="fw-bold mb-3" style={{ fontSize: '3.5rem' }}>Soporte de Tickets</h1>
            <p className="fs-5 opacity-75 mx-auto" style={{ maxWidth: '700px' }}>
              Soluciones tecnológicas a un clic. Registra, gestiona y da seguimiento 
              a tus incidentes técnicos de forma profesional.
            </p>

            <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
              <Link to="/login" className="btn btn-primary btn-lg px-4">
                Iniciar sesión
              </Link>

              <Link to="/register" className="btn btn-outline-light btn-lg px-4">
                Crear cuenta
              </Link>

              <Link to="/crear-ticket" className="btn btn-light btn-lg px-4">
                Solicitar Soporte
              </Link>
            </div>
          </div>

          {/* FEATURES CARDS */}
          <div className="container">
            <div className="row g-4">
              <div className="col-md-4">
                <div className="card h-100 shadow border-0 text-dark">
                  <div className="card-body p-4">
                    <h5 className="fw-bold">🛠 Crear tickets</h5>
                    <p className="text-muted">
                      Reporta problemas de red, software, hardware o accesos en segundos.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card h-100 shadow border-0 text-dark">
                  <div className="card-body p-4">
                    <h5 className="fw-bold">📊 Seguimiento Real</h5>
                    <p className="text-muted">
                      Mira el estado de tu solicitud: Pendiente, En Proceso o Finalizado.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card h-100 shadow border-0 text-dark">
                  <div className="card-body p-4">
                    <h5 className="fw-bold">🔍 Gestión Eficiente</h5>
                    <p className="text-muted">
                      Filtra por prioridad y recibe atención personalizada de nuestros técnicos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN ADICIONAL: Cómo funciona (Aquí activamos el import gris) */}
      <section style={{ backgroundColor: '#f8f9fa', padding: '5rem 0' }}>
        <div className="container">
          <HowItWorks />
        </div>
      </section>
    </>
  );
}