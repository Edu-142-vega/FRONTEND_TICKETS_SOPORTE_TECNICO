import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../__tests__/../components/Navbar";

describe("Navbar", () => {
  beforeEach(() => {
 
    delete (window as any).location;
    (window as any).location = { href: "" };

    localStorage.clear();
  });

  test("1) Si hay user: renderiza el botón Salir", () => {
    render(
      <MemoryRouter>
        <Navbar user={{ username: "pepito" }} />
      </MemoryRouter>
    );

    expect(screen.getByRole("button", { name: /salir/i })).toBeInTheDocument();
  });

  test("2) Logout: borra storage y redirige a /login", async () => {
    localStorage.setItem("user", JSON.stringify({ username: "pepito" }));
    localStorage.setItem("token", "123");

    render(
      <MemoryRouter>
        <Navbar user={{ username: "pepito" }} />
      </MemoryRouter>
    );

    await userEvent.click(screen.getByRole("button", { name: /salir/i }));

    expect(localStorage.getItem("user")).toBeNull();
    expect(localStorage.getItem("token")).toBeNull();
    expect(window.location.href).toBe("/login");
  });

  test("3) Si NO hay user: muestra Login", () => {
    render(
      <MemoryRouter>
        <Navbar user={null} />
      </MemoryRouter>
    );

    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });
});