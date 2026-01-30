import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import Login from "../pages/public/Login";
import { authService } from "../services/auth.service";

jest.mock("../services/auth.service", () => ({
  authService: {
    login: jest.fn(),
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

describe("Login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();

    jest.spyOn(window, "alert").mockImplementation(() => {});
    Object.defineProperty(window, "location", {
      value: { reload: jest.fn() },
      writable: true,
    });
  });

  test("1) Renderiza inputs y botón de ingresar", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Correo Electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Ingresar/i })).toBeInTheDocument();
  });

  test("2) Login exitoso ADMIN: guarda token/user, navega a /admin/dashboard y recarga", async () => {
    (authService.login as jest.Mock).mockResolvedValue({
      access_token: "TOKEN_ADMIN",
      user: { role: "ADMIN", nombre: "Admin" },
    });

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    await user.type(screen.getByLabelText(/Correo Electrónico/i), "admin@mail.com");
    await user.type(screen.getByLabelText(/Contraseña/i), "123456");
    await user.click(screen.getByRole("button", { name: /Ingresar/i }));

    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith({
        email: "admin@mail.com",
        password: "123456",
      });
    });

    expect(localStorage.getItem("token")).toBe("TOKEN_ADMIN");
    expect(localStorage.getItem("user")).toBe(JSON.stringify({ role: "ADMIN", nombre: "Admin" }));
    expect(mockNavigate).toHaveBeenCalledWith("/admin/dashboard");
    expect(window.alert).toHaveBeenCalled();
    expect(window.location.reload).toHaveBeenCalled();
  });

  test("3) Login exitoso CLIENTE: navega a /mis-tickets", async () => {
    (authService.login as jest.Mock).mockResolvedValue({
      access_token: "TOKEN_USER",
      user: { role: "CLIENTE", nombre: "Cliente" },
    });

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    await user.type(screen.getByLabelText(/Correo Electrónico/i), "user@mail.com");
    await user.type(screen.getByLabelText(/Contraseña/i), "abcdef");
    await user.click(screen.getByRole("button", { name: /Ingresar/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/mis-tickets");
    });
  });

  test("4) Si falla el login: muestra error y NO navega", async () => {
    (authService.login as jest.Mock).mockRejectedValue({
      response: { data: { message: "Correo o contraseña incorrectos" } },
    });

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    await user.type(screen.getByLabelText(/Correo Electrónico/i), "x@mail.com");
    await user.type(screen.getByLabelText(/Contraseña/i), "badpass");
    await user.click(screen.getByRole("button", { name: /Ingresar/i }));

    expect(await screen.findByText(/Correo o contraseña incorrectos/i)).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
