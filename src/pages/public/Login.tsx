import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/auth.service';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const credentials = {
        email: formData.email,
        password: formData.password,
      };

      const data = await authService.login(credentials);

      if (data && data.access_token) {
        login({
          user: data.user,
          token: data.access_token,
        });

        alert('¡Sesión iniciada!');

        if (data.user?.role === 'ADMIN') {
          navigate('/admin/dashboard');
        } else {
          navigate('/mis-tickets');
        }
      }
    } catch (err: any) {
      const mensaje = err.response?.data?.message;
      setError(
        Array.isArray(mensaje)
          ? mensaje[0]
          : mensaje || 'Correo o contraseña incorrectos'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontWeight: 'bold', color: '#2c3e50' }}>Bienvenido</h2>
          <p style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>
            Ingresa tus credenciales
          </p>
        </div>

        {error && <div style={errorBanner}>{error}</div>}

        <div style={inputGroup}>
          <label style={labelStyle}>Correo Electrónico</label>
          <input
            id="correo"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
            placeholder="pepito@gmail.com"
          />
        </div>

        <div style={inputGroup}>
          <label style={labelStyle}>Contraseña</label>
          <input
            id="password"
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
          ¿No tienes cuenta?{' '}
          <Link
            to="/register"
            style={{ color: '#3498db', fontWeight: 'bold', textDecoration: 'none' }}
          >
            Regístrate aquí
          </Link>
        </p>
      </form>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '80vh',
  padding: '20px',
  background: '#f4f7f6',
};

const formStyle: React.CSSProperties = {
  background: '#fff',
  padding: '2.5rem',
  borderRadius: '15px',
  boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
  width: '100%',
  maxWidth: '400px',
};

const inputGroup: React.CSSProperties = {
  marginBottom: '1.2rem',
  display: 'flex',
  flexDirection: 'column',
};

const labelStyle: React.CSSProperties = {
  fontSize: '0.85rem',
  fontWeight: 'bold',
  color: '#2c3e50',
  marginBottom: '5px',
};

const inputStyle: React.CSSProperties = {
  padding: '12px',
  marginTop: '5px',
  borderRadius: '8px',
  border: '1px solid #ddd',
  fontSize: '1rem',
  outline: 'none',
};

const buttonStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px',
  background: '#2c3e50',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
  marginTop: '10px',
};

const errorBanner: React.CSSProperties = {
  backgroundColor: '#fdeaea',
  color: '#eb5757',
  padding: '10px',
  borderRadius: '8px',
  textAlign: 'center',
  fontSize: '0.85rem',
  marginBottom: '1rem',
  border: '1px solid #f5c2c2',
};

export default Login;
