import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import CrearTicket from "../pages/public/CrearTicket";
import { ticketsService } from "../services/tickets.service";

jest.mock("../services/tickets.service", () => ({
  ticketsService: {
    createTicket: jest.fn(),
  },
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("CrearTicket", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  test("1) Renderiza el formulario y botón", () => {
    render(
      <MemoryRouter>
        <CrearTicket />
      </MemoryRouter>
    );

    expect(screen.getByText(/Nuevo Ticket/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Crear Ticket/i })).toBeInTheDocument();
  });

  test("2) Envía: llama createTicket con payload y navega a /mis-tickets", async () => {
    (ticketsService.createTicket as jest.Mock).mockResolvedValue({ ok: true });

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <CrearTicket />
      </MemoryRouter>
    );

    const boxes = screen.getAllByRole("textbox");
    const titulo = boxes[0];
    const descripcion = boxes[1];

    await user.type(titulo, "Problema de impresora");
    await user.type(descripcion, "No imprime desde ayer");

    await user.click(screen.getByRole("button", { name: /Crear Ticket/i }));

    await waitFor(() => {
      expect(ticketsService.createTicket).toHaveBeenCalledWith({
        titulo: "Problema de impresora",
        descripcion: "No imprime desde ayer",
      });
    });

    expect(window.alert).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/mis-tickets");
  });

  test("3) Si falla: muestra alert y NO navega", async () => {
    (ticketsService.createTicket as jest.Mock).mockRejectedValue({
      response: { data: { message: "Error al crear" } },
    });

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <CrearTicket />
      </MemoryRouter>
    );

    const boxes = screen.getAllByRole("textbox");
    await user.type(boxes[0], "Ticket");
    await user.type(boxes[1], "Detalle");

    await user.click(screen.getByRole("button", { name: /Crear Ticket/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalled();
    });

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
