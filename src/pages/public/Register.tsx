import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/auth.service';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validación básica de contraseñas
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);

    try {
      // ✅ CORRECCIÓN CLAVE: El servidor rechazaba 'username'
      // Enviamos 'nombre' y 'email' como pide el error 400 del backend
      const datosParaBackend = {
        nombre: formData.nombre,   
        email: formData.correo,    
        password: formData.password
      };
      
      console.log('📤 Enviando registro corregido:', datosParaBackend);
      
<<<<<<< HEAD
      await authService.login(datosParaBackend as any);


      alert("¡Cuenta creada con éxito! Ya estás en la base de datos.");
=======
      await authService.register(datosParaBackend);
      alert("¡Cuenta creada con éxito!");
>>>>>>> 2edd4e1 (Mejoras en componentes y servicios)
      navigate('/login');

    } catch (err: any) {
      // Capturamos los errores específicos del servidor para mostrarlos en el banner rojo
      console.error('❌ Error en registro:', err.response?.data);
      const mensaje = err.response?.data?.message;
      setError(Array.isArray(mensaje) ? mensaje.join(', ') : mensaje || "Error al registrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <form 
        onSubmit={handleSubmit} 
        style={formStyle}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontWeight: 'bold', color: '#2c3e50', marginBottom: '0.5rem' }}>Crear Cuenta</h2>
          <p style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>Únete a nuestra plataforma de soporte</p>
        </div>
        
        {/* Banner de error para mostrar fallos de validación del backend */}
        {error && (
          <div style={errorBanner}>
            ⚠️ {error}
          </div>
        )}

        <div style={inputGroup}>
          <label style={labelStyle}>Nombre Completo</label>
          <input
            type="text"
            name="nombre"
            placeholder="Ej. Juan Pérez"
            value={formData.nombre}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div style={inputGroup}>
          <label style={labelStyle}>Correo Electrónico</label>
          <input
            type="email"
            name="correo"
            placeholder="correo@ejemplo.com"
            value={formData.correo}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div style={inputGroup}>
          <label style={labelStyle}>Contraseña</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div style={inputGroup}>
          <label style={labelStyle}>Confirmar Contraseña</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a252f'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2c3e50'}
          style={{ ...buttonStyle, opacity: loading ? 0.7 : 1 }}
        >
          {loading ? 'Procesando...' : 'Registrarse Ahora'}
        </button>

        <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: '#7f8c8d' }}>
          ¿Ya tienes cuenta? <Link to="/login" style={{color: '#3498db', fontWeight: 'bold', textDecoration: 'none'}}>Inicia sesión</Link>
        </p>
      </form>
    </div>
  );
};

// --- ESTILOS (Se mantienen igual para conservar tu diseño profesional) ---

const containerStyle: React.CSSProperties = { 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
  minHeight: '90vh', 
  padding: '20px',
  background: '#f4f7f6' 
};

const formStyle: React.CSSProperties = { 
  background: '#fff', 
  padding: '2.5rem', 
  borderRadius: '15px', 
  boxShadow: '0 10px 25px rgba(0,0,0,0.05)', 
  width: '100%', 
  maxWidth: '450px' 
};

const inputGroup: React.CSSProperties = { 
  marginBottom: '1.2rem', 
  display: 'flex', 
  flexDirection: 'column' 
};

const labelStyle: React.CSSProperties = {
  fontSize: '0.85rem',
  fontWeight: 'bold',
  color: '#2c3e50',
  marginBottom: '5px'
};

const inputStyle: React.CSSProperties = { 
  padding: '12px', 
  borderRadius: '8px', 
  border: '1px solid #dcdde1',
  fontSize: '1rem',
  outline: 'none'
};

const buttonStyle: React.CSSProperties = { 
  width: '100%', 
  padding: '14px', 
  background: '#2c3e50', 
  color: 'white', 
  border: 'none', 
  borderRadius: '8px', 
  cursor: 'pointer', 
  fontWeight: 'bold',
  marginTop: '1rem'
};

const errorBanner: React.CSSProperties = {
  backgroundColor: '#fdeaea',
  color: '#eb5757',
  padding: '10px',
  borderRadius: '8px',
  textAlign: 'center',
  fontSize: '0.85rem',
  marginBottom: '1.5rem',
  border: '1px solid #f5c2c2'
};

export default Register;