import Navbar from "../__tests__  /../components/Navbar";

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";


const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Navbar", () => {
  beforeEach(() => {
    localStorage.clear();
    mockNavigate.mockClear();
  });

  test("1) Si NO hay user: muestra Login", () => {
    render(
      <MemoryRouter>
        <Navbar user={null} />
      </MemoryRouter>
    );

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.queryByText(/Chat/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Mis Tickets/i)).not.toBeInTheDocument();
  });

  test("2) Si hay user: muestra Chat, Mis Tickets y Salir", () => {
    render(
      <MemoryRouter>
        <Navbar user={{ username: "pepito" }} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Chat/i)).toBeInTheDocument();
    expect(screen.getByText(/Mis Tickets/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Salir/i })).toBeInTheDocument();
  });

  test("3) Logout: borra storage y redirige a /login", async () => {
    localStorage.setItem("user", "x");
    localStorage.setItem("token", "y");

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Navbar user={{ username: "pepito" }} />
      </MemoryRouter>
    );

    await user.click(screen.getByRole("button", { name: /Salir/i }));

    expect(localStorage.getItem("user")).toBeNull();
    expect(localStorage.getItem("token")).toBeNull();
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
