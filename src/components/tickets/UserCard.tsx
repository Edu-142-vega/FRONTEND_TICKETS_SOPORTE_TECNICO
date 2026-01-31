import React from 'react';

interface UserCardProps {
  nombre: string;
  foto?: string;
  estrellas: number;
  rango: string;
}

const UserCard: React.FC<UserCardProps> = ({ nombre, foto, estrellas, rango }) => {
  return (
    <div style={cardStyle}>
      <img 
        src={foto || 'https://ui-avatars.com/api/?name=' + nombre} 
        alt="Perfil" 
        style={avatarStyle} 
      />
      <div>
        <h5 style={{ margin: 0, fontSize: '1rem', color: '#2c3e50' }}>{nombre}</h5>
        <div style={{ color: '#f1c40f', fontSize: '0.8rem' }}>
          {'⭐'.repeat(estrellas)} 
          <span style={{ color: '#95a5a6', marginLeft: '5px', fontWeight: 'bold' }}>
            ({rango})
          </span>
        </div>
      </div>
    </div>
  );
};

const cardStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  background: '#fff',
  padding: '10px 15px',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  border: '1px solid #eee',
  marginBottom: '20px',
  width: 'fit-content'
};

const avatarStyle: React.CSSProperties = {
  width: '45px',
  height: '45px',
  borderRadius: '50%',
  objectFit: 'cover',
  border: '2px solid #3498db'
};

export default UserCard;