import { useState, useEffect } from "react";
import { messagesService } from "../../services/messages.service";

interface Props {
  ticketId: number;
}

const TicketChat = ({ ticketId }: Props) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const data = await messagesService.getMessagesByTicket(ticketId);
        setMessages(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error cargando mensajes");
        setMessages([]);
      }
    };
    loadMessages();
  }, [ticketId]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const sent = await messagesService.sendMessage(ticketId, newMessage);
      setMessages((prev) => [...prev, sent]); // ✅ mejor que usar messages directo
      setNewMessage("");
    } catch (err) {
      alert("No se pudo enviar el mensaje");
    }
  };

  return (
    <div style={chatContainer}>
      <h4 style={{ borderBottom: "1px solid #ddd", paddingBottom: "10px" }}>
        Conversación de Soporte
      </h4>

      <div style={messageList}>
        {messages.map((msg: any) => (
          <div
            key={msg.id}
            style={{
              ...messageItem,
              alignSelf: msg.sender?.role === "ADMIN" ? "flex-start" : "flex-end",
              backgroundColor:
                msg.sender?.role === "ADMIN" ? "#f1f0f0" : "#dcf8c6",
            }}
          >
            <strong>{msg.sender?.name}:</strong>
            <p style={{ margin: 0 }}>{msg.content}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button type="submit" style={sendButton}>
          Enviar
        </button>
      </form>
    </div>
  );
};

const chatContainer: React.CSSProperties = {
  marginTop: "20px",
  padding: "20px",
  background: "#fff",
  borderRadius: "8px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
};

const messageList: React.CSSProperties = {
  height: "300px",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  marginBottom: "15px",
  padding: "10px",
};

const messageItem: React.CSSProperties = {
  maxWidth: "80%",
  padding: "10px",
  borderRadius: "10px",
  fontSize: "0.9rem",
};

const sendButton: React.CSSProperties = {
  padding: "10px 20px",
  background: "#2c3e50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default TicketChat;
