

import { render, screen, waitFor } from "@testing-library/react";

import TicketsTable from "../components/tickets/TicketsTable";
import { ticketsService } from "../services/tickets.service";

jest.mock("../services/tickets.service", () => ({
  ticketsService: {
    getTickets: jest.fn(),
  },
}));

describe("TicketsTable", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("1) Muestra mensaje de carga al inicio", () => {
    (ticketsService.getTickets as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    );

    render(<TicketsTable />);
    expect(screen.getByText(/Cargando tus tickets/i)).toBeInTheDocument();
  });

  test("2) Si devuelve tickets: renderiza filas con datos", async () => {
    (ticketsService.getTickets as jest.Mock).mockResolvedValue([
      {
        id: 10,
        title: "No prende el PC",
        priority: "HIGH",
        status: "OPEN",
        createdAt: "2026-01-01T00:00:00.000Z",
      },
    ]);

    render(<TicketsTable />);

    expect(await screen.findByText(/Mis Tickets de Soporte/i)).toBeInTheDocument();
    expect(screen.getByText("#10")).toBeInTheDocument();
    expect(screen.getByText("No prende el PC")).toBeInTheDocument();
    expect(screen.getByText("HIGH")).toBeInTheDocument();
    expect(screen.getByText("OPEN")).toBeInTheDocument();
  });

  test("3) Si devuelve lista vacía: muestra mensaje 'Aún no has creado ningún ticket.'", async () => {
    (ticketsService.getTickets as jest.Mock).mockResolvedValue([]);

    render(<TicketsTable />);

    expect(await screen.findByText(/Aún no has creado ningún ticket/i)).toBeInTheDocument();
  });

  test("4) Si falla el servicio: no revienta y deja de cargar", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    (ticketsService.getTickets as jest.Mock).mockRejectedValue(new Error("boom"));

    render(<TicketsTable />);

    await waitFor(() => {
      expect(screen.queryByText(/Cargando tus tickets/i)).not.toBeInTheDocument();
    });
  });
});