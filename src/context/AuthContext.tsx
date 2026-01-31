
import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  // ✅ Esto recupera al usuario al encender la app
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const login = (userData: any) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // ✅ Guarda en disco
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // ✅ Limpia al salir
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

function useEffect(arg0: () => void, arg1: never[]) {
  throw new Error('Function not implemented.');
}
