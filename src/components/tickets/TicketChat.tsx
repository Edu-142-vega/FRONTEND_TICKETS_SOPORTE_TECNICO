import { useState, useEffect } from 'react';
import { messagesService } from '../../services/messages.service';

interface Props {
  ticketId: number;
}

const TicketChat = ({ ticketId }: Props) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const data = await messagesService.getMessagesByTicket(ticketId);
        setMessages(data);
      } catch (err) {
        console.error("Error cargando mensajes");
      }
    };
    loadMessages();
  }, [ticketId]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const sent = await messagesService.sendMessage(ticketId, newMessage);
      setMessages([...messages, sent]); 
      setNewMessage('');
    } catch (err) {
      alert("No se pudo enviar el mensaje");
    }
  };

  return (
    <div className="p-3 bg-white rounded shadow-sm">
      <h4>Chat de Soporte</h4>
      <div style={{ height: '300px', overflowY: 'auto' }} className="d-flex flex-column gap-2 mb-3">
        {messages.map((msg: any) => (
          <div key={msg.id} className={`p-2 rounded ${msg.sender?.role === 'ADMIN' ? 'bg-light' : 'bg-success text-white align-self-end'}`}>
            <strong>{msg.sender?.name}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="d-flex gap-2">
        <input 
          className="form-control"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
        />
        <button type="submit" className="btn btn-primary">Enviar</button>
      </form>
    </div>
  );
};

export default TicketChat;