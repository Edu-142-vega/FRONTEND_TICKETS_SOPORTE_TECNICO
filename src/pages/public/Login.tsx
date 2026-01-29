import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/auth.service';

const Login = () => {
  const [formData, setFormData] = useState({
    correo: '',
    password: ''
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
    setLoading(true);

    try {
      const credentials = {
        email: formData.correo,
        password: formData.password
      };

      const data = await authService.login(credentials);

      if (data && data.access_token) {
        localStorage.setItem('token', data.access_token);

        alert("¡Sesión iniciada!");

        if (data.user?.role === 'ADMIN') {
          navigate('/admin/dashboard');
        } else {
          navigate('/mis-tickets');
        }

        window.location.reload();
      }

    } catch (err: any) {
      const mensaje = err.response?.data?.message;
      setError(Array.isArray(mensaje) ? mensaje[0] : mensaje || "Correo o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Iniciar Sesión</h2>
        
        {error && (
          <p style={{ color: 'red', textAlign: 'center', fontSize: '0.9rem', marginBottom: '1rem' }}>
            {error}
          </p>
        )}

        <div style={inputGroup}>
          <label>Correo Electrónico</label>
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            required
            style={inputStyle}
            placeholder="pepito@gmail.com"
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
            placeholder="******"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ ...buttonStyle, opacity: loading ? 0.7 : 1 }}
        >
          {loading ? 'Entrando...' : 'Ingresar'}
        </button>

        <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
          ¿No tienes cuenta? <Link to="/register" style={{ color: '#3498db', textDecoration: 'none' }}>Regístrate aquí</Link>
        </p>
      </form>
    </div>
  );
};

const containerStyle: React.CSSProperties = { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '20px' };
const formStyle: React.CSSProperties = { background: '#fff', padding: '2.5rem', borderRadius: '10px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' };
const inputGroup: React.CSSProperties = { marginBottom: '1rem', display: 'flex', flexDirection: 'column' };
const inputStyle = { padding: '12px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '1rem' };
const buttonStyle = { width: '100%', padding: '12px', background: '#2c3e50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' as const };

export default Login;