import { render, screen, waitFor } from "@testing-library/react";
import TicketsUsuario from "../pages/private/TicketsUsuario";

const mockUseAuth = jest.fn();
jest.mock("../context/AuthContext", () => ({
  useAuth: () => mockUseAuth(),
}));

const mockGetTickets = jest.fn();
jest.mock("../services/tickets.service", () => ({
  ticketsService: {
    getTickets: (...args: any[]) => mockGetTickets(...args),
  },
}));

describe("TicketsUsuario", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("1) Renderiza el título y cabeceras de tabla", async () => {
    mockUseAuth.mockReturnValue({ user: { username: "pepito" } });
    mockGetTickets.mockResolvedValue([]);

    render(<TicketsUsuario />);
    await waitFor(() => expect(mockGetTickets).toHaveBeenCalled());

    expect(screen.getByText("Mis Tickets")).toBeInTheDocument();
    expect(screen.getByText("Descripción")).toBeInTheDocument();
    expect(screen.getByText("Estado")).toBeInTheDocument();
    expect(screen.getByText("Prioridad")).toBeInTheDocument();
  });

  test("2) Llama getTickets y muestra solo los tickets del usuario", async () => {
    mockUseAuth.mockReturnValue({ user: { username: "pepito" } });
    mockGetTickets.mockResolvedValue([
      { id: 1, descripcion: "Ticket de pepito", estado: "OPEN", prioridad: "HIGH", username: "pepito" },
      { id: 2, descripcion: "Ticket de otro", estado: "CLOSED", prioridad: "LOW", username: "otro" },
    ]);

    render(<TicketsUsuario />);

    await waitFor(() => expect(mockGetTickets).toHaveBeenCalled());

    expect(await screen.findByText("Ticket de pepito")).toBeInTheDocument();
    expect(screen.queryByText("Ticket de otro")).not.toBeInTheDocument();
  });

  test("3) Si no hay tickets del usuario, muestra el mensaje vacío", async () => {
    mockUseAuth.mockReturnValue({ user: { username: "pepito" } });
    mockGetTickets.mockResolvedValue([
      { id: 2, descripcion: "Ticket de otro", estado: "CLOSED", prioridad: "LOW", username: "otro" },
    ]);

    render(<TicketsUsuario />);

    await waitFor(() => expect(mockGetTickets).toHaveBeenCalled());

    expect(await screen.findByText("No tienes tickets solicitados.")).toBeInTheDocument();
  });
});
