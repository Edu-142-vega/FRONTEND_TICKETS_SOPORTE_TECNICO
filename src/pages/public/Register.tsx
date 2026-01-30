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

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);

    try {
      const datosParaBackend = {
        nombre: formData.nombre,   
        email: formData.correo,    
        password: formData.password
      };

      console.log("Enviando a la base de datos:", datosParaBackend);
      
      await authService.login(datosParaBackend as any);


      alert("¡Cuenta creada con éxito! Ya estás en la base de datos.");
      navigate('/login');

    } catch (err: any) {
      const mensaje = err.response?.data?.message;
      setError(Array.isArray(mensaje) ? mensaje[0] : mensaje || "Error al registrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Crear Cuenta</h2>
        
        {error && (
          <p style={{ color: 'red', textAlign: 'center', fontSize: '0.9rem', marginBottom: '1rem' }}>
            {error}
          </p>
        )}

        <div style={inputGroup}>
          <label>Nombre Completo</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div style={inputGroup}>
          <label>Correo Electrónico</label>
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div style={inputGroup}>
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div style={inputGroup}>
          <label>Confirmar Contraseña</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ ...buttonStyle, opacity: loading ? 0.7 : 1 }}
        >
          {loading ? 'Creando cuenta...' : 'Registrarse'}
        </button>

        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          ¿Ya tienes cuenta? <Link to="/login" style={{color: '#3498db', textDecoration: 'none'}}>Inicia sesión</Link>
        </p>
      </form>
    </div>
  );
};

const containerStyle: React.CSSProperties = { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '20px' };
const formStyle: React.CSSProperties = { background: '#fff', padding: '2rem', borderRadius: '10px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' };
const inputGroup: React.CSSProperties = { marginBottom: '1rem', display: 'flex', flexDirection: 'column' };
const inputStyle = { padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ddd' };
const buttonStyle = { width: '100%', padding: '12px', background: '#3498db', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' as const };

export default Register;