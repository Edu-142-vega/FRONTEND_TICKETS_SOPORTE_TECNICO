import { api } from '../api';

export const authService = {
  login: async (credentials: any) => {
    const response = await api.post('/auth/login', credentials);

    // Soporta ambos formatos: {access_token,...} o {data:{access_token,...}}
    const payload = response.data?.data ?? response.data;

    const token = payload?.access_token;
    const user = payload?.user;

    if (token) localStorage.setItem('token', token);
    if (user) localStorage.setItem('user', JSON.stringify(user));

    return payload;
  },

  register: async (userData: any) => {
    const response = await api.post('/auth/register', userData);

    // Soporta ambos formatos
    const payload = response.data?.data ?? response.data;

    // Si el backend devuelve token al registrar, lo guardamos (si no, no pasa nada)
    const token = payload?.access_token;
    const user = payload?.user;

    if (token) localStorage.setItem('token', token);
    if (user) localStorage.setItem('user', JSON.stringify(user));

    return payload;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },
};
