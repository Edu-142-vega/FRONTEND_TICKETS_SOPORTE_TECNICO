import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { ticketsService } from "../../services/tickets.service";

const CrearTicket = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    prioridad: "LOW",
    categoriaId: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ SOLO lo que el backend acepta (según tu error)
      const payload = {
        titulo: formData.titulo.trim(),
        descripcion: formData.descripcion.trim(),
        username: user?.username, // deja esto solo si tu backend lo acepta
      };

      console.log("📤 Enviando ticket con payload:", payload);
      console.log("👤 Usuario actual:", user);

      const response = await ticketsService.createTicket(payload);
      console.log("✅ Respuesta del servidor:", response);

      alert("✅ ¡Ticket creado exitosamente!");
      setTimeout(() => navigate("/mis-tickets?refresh=" + Date.now()), 500);
    } catch (err: any) {
      console.error("❌ Error completo:", err);

      if (axios.isAxiosError(err)) {
        console.error("📌 message:", err.message);
        console.error("📌 status:", err.response?.status);
        console.error("📌 data:", err.response?.data);
        console.error("📌 request:", err.request);

        const msg =
          err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Error desconocido al crear ticket";

        alert(Array.isArray(msg) ? msg.join("\n") : String(msg));
      } else {
        alert("Error no esperado. Revisa consola.");
      }
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = () => {
    switch (formData.prioridad) {
      case "URGENT":
        return "#e74c3c";
      case "HIGH":
        return "#f39c12";
      case "MEDIUM":
        return "#f1c40f";
      default:
        return "#2ecc71";
    }
  };

  return (
    <div className="container-fluid py-5" style={mainContainerStyle}>
      <div className="card border-0 shadow-lg p-4 p-md-5" style={cardStyle}>
        <div className="text-center mb-5">
          <div style={iconBadgeStyle}>
            <span style={{ fontSize: "2.5rem" }}>🎫</span>
          </div>
          <h2 className="fw-bold" style={{ color: "#2c3e50", letterSpacing: "-1px" }}>
            Nuevo Requerimiento
          </h2>
          <p className="text-muted">Completa los detalles para que nuestro equipo técnico te ayude.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label fw-bold small" style={labelStyle}>
              TÍTULO DEL PROBLEMA
            </label>
            <input
              type="text"
              className="form-control border-0 shadow-sm py-3"
              style={inputInnerStyle}
              placeholder="Ej: Mi laptop no enciende o está muy lenta"
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              required
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-4">
              <label className="form-label fw-bold small" style={labelStyle}>
                CATEGORÍA
              </label>
              <select
                className="form-select border-0 shadow-sm py-3"
                style={inputInnerStyle}
                value={formData.categoriaId}
                onChange={(e) => setFormData({ ...formData, categoriaId: e.target.value })}
                // ✅ quitamos required porque el backend NO lo acepta
              >
                <option value="">Seleccione una opción...</option>
                <optgroup label="Infraestructura">
                  <option value="1">💻 Hardware (PC, Laptop, Monitor)</option>
                  <option value="3">🖨️ Periféricos (Impresoras, Scanners)</option>
                  <option value="4">🌐 Redes e Internet (Conexión, Wi-Fi)</option>
                </optgroup>
                <optgroup label="Sistemas y Accesos">
                  <option value="2">📁 Software (Programas, Windows, Office)</option>
                  <option value="5">🔐 Accesos y Contraseñas (ERP, Logins)</option>
                  <option value="6">📧 Correo Institucional</option>
                </optgroup>
                <optgroup label="Otros">
                  <option value="7">❓ Otros requerimientos</option>
                </optgroup>
              </select>
            </div>

            <div className="col-md-6 mb-4">
              <label className="form-label fw-bold small" style={labelStyle}>
                PRIORIDAD SUGERIDA
              </label>
              <select
                className="form-select border-0 shadow-sm py-3"
                style={{ ...inputInnerStyle, borderLeft: `6px solid ${getPriorityColor()}` }}
                value={formData.prioridad}
                onChange={(e) => setFormData({ ...formData, prioridad: e.target.value })}
                // ✅ se queda solo visual, NO se envía al backend
              >
                <option value="LOW">Baja - No Urgente</option>
                <option value="MEDIUM">Media - Atención Normal</option>
                <option value="HIGH">Alta - Prioridad Técnica</option>
                <option value="URGENT">Urgente - Bloqueo de Trabajo</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold small" style={labelStyle}>
              DESCRIPCIÓN DETALLADA
            </label>
            <textarea
              className="form-control border-0 shadow-sm py-3"
              style={{ ...inputInnerStyle, borderRadius: "15px" }}
              rows={4}
              placeholder="Cuéntanos más detalles del problema..."
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              required
            />
          </div>

          <div className="d-grid mt-5">
            <button
              type="submit"
              className="btn btn-lg fw-bold text-white shadow py-3"
              style={submitButtonStyle}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1a252f")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2c3e50")}
              disabled={loading}
            >
              {loading ? "🚀 Enviando Ticket..." : "Confirmar y Enviar Requerimiento"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mainContainerStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
  minHeight: "92vh",
  display: "flex",
  alignItems: "center",
};

const cardStyle: React.CSSProperties = {
  borderRadius: "30px",
  maxWidth: "850px",
  margin: "0 auto",
  background: "#ffffff",
  width: "100%",
};

const iconBadgeStyle: React.CSSProperties = {
  backgroundColor: "rgba(52, 152, 219, 0.1)",
  width: "90px",
  height: "90px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  marginBottom: "1rem",
};

const labelStyle: React.CSSProperties = {
  color: "#7f8c8d",
  letterSpacing: "1px",
  marginBottom: "8px",
};

const inputInnerStyle: React.CSSProperties = {
  backgroundColor: "#f8f9fa",
  borderRadius: "12px",
  fontSize: "1rem",
};

const submitButtonStyle: React.CSSProperties = {
  backgroundColor: "#2c3e50",
  borderRadius: "15px",
  fontSize: "1.1rem",
  transition: "all 0.3s ease",
  border: "none",
};

export default CrearTicket;
