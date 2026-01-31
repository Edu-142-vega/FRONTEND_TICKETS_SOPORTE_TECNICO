import React, { useState } from 'react';

const FloatingChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([
    { text: '¡Hola! 👋 Soy tu asistente de soporte. ¿En qué puedo ayudarte hoy?', sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');

  // Respuestas automáticas del bot
  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    if (message.includes('hola') || message.includes('hi')) {
      return '¡Hola! 👋 ¿Cómo estás? ¿En qué puedo asistirte?';
    }
    if (message.includes('ticket') || message.includes('requerimiento')) {
      return '📋 Puedes crear un nuevo ticket haciendo clic en "+ Nuevo Ticket". Ahí podrás describir tu problema en detalle.';
    }
    if (message.includes('ayuda') || message.includes('help')) {
      return '🆘 Claro, estoy aquí para ayudarte. ¿Cuál es tu problema específico?';
    }
    if (message.includes('gracias') || message.includes('thanks')) {
      return '¡De nada! 😊 Estoy aquí si necesitas algo más.';
    }
    if (message.includes('problema') || message.includes('error')) {
      return '⚠️ Lamento escuchar que tienes un problema. Por favor describe con detalle qué está pasando y te ayudaré lo antes posible.';
    }
    if (message.includes('cuenta') || message.includes('usuario')) {
      return '👤 ¿Hay algún problema con tu cuenta? Cuéntame más detalles para poder ayudarte.';
    }
    if (message.includes('contraseña') || message.includes('password')) {
      return '🔐 Si olvidaste tu contraseña, utiliza la opción "¿Olvidaste tu contraseña?" en la página de login.';
    }
    
    // Respuesta por defecto
    return 'Entiendo, déjame ayudarte. ¿Podrías darme más detalles sobre lo que necesitas?';
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      // Agregar mensaje del usuario
      const newMessages = [...messages, { text: inputValue, sender: 'user' as const }];
      setMessages(newMessages);
      
      // Simular respuesta del bot después de 500ms
      setTimeout(() => {
        const botResponse = getBotResponse(inputValue);
        setMessages(prev => [...prev, { text: botResponse, sender: 'bot' as const }]);
      }, 500);
      
      setInputValue('');
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
      {/* Ventana de Chat */}
      {isOpen && (
        <div style={{
          width: '350px',
          background: 'white',
          borderRadius: '10px',
          boxShadow: '0 5px 40px rgba(0,0,0,0.16)',
          marginBottom: '15px',
          overflow: 'hidden',
          border: '1px solid #ddd'
        }}>
          {/* Header */}
          <div style={{
            background: '#2c3e50',
            color: 'white',
            padding: '15px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>💬 Soporte en línea</h4>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                border: 'none',
                background: 'none',
                color: 'white',
                cursor: 'pointer',
                fontSize: '20px'
              }}
            >
              ✕
            </button>
          </div>

          {/* Mensajes */}
          <div style={{
            height: '250px',
            overflowY: 'auto',
            padding: '15px',
            background: '#f9f9f9',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: msg.sender === 'bot' ? 'flex-start' : 'flex-end',
                  background: msg.sender === 'bot' ? '#e8f4f8' : '#2c3e50',
                  color: msg.sender === 'bot' ? '#333' : 'white',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  maxWidth: '80%',
                  wordWrap: 'break-word',
                  lineHeight: '1.4'
                }}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{
            padding: '12px',
            borderTop: '1px solid #eee',
            display: 'flex',
            gap: '8px'
          }}>
            <input
              type="text"
              placeholder="Escribe tu mensaje..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
              style={{
                flex: 1,
                border: '1px solid #ddd',
                borderRadius: '5px',
                padding: '8px',
                fontSize: '13px',
                fontFamily: 'inherit'
              }}
            />
            <button
              onClick={handleSendMessage}
              style={{
                background: '#2c3e50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                padding: '8px 12px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              Enviar
            </button>
          </div>
        </div>
      )}

      {/* Burbuja Flotante */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          justifyContent: 'flex-end'
        }}
      >
        {!isOpen && (
          <div style={{
            background: '#333',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '25px',
            fontSize: '18px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            whiteSpace: 'nowrap',
            fontWeight: '500'
          }}>
            Hola, ¿puedo ayudarte a resolver algo?
          </div>
        )}
        <div style={{ position: 'relative' }}>
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&h=100&auto=format&fit=crop"
            alt="Chat"
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              border: '3px solid white',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              objectFit: 'cover',
              cursor: 'pointer'
            }}
          />
          {!isOpen && (
            <span style={{
              position: 'absolute',
              bottom: '0',
              right: '0',
              background: '#e74c3c',
              color: 'white',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              border: '3px solid white'
            }}>
              1
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default FloatingChat;
