
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import RequireAuth from "../routes/RequireAuth";

const mockUseAuth = jest.fn();
jest.mock("../context/AuthContext", () => ({
  useAuth: () => mockUseAuth(),
}));

function renderWithRouter(initialPath: string) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="/privado" element={<h1>Contenido Privado</h1>} />
        </Route>

        <Route path="/login" element={<h1>Página Login</h1>} />
      </Routes>
    </MemoryRouter>
  );
}

describe("RequireAuth", () => {
  test("1) Si está autenticado: renderiza el contenido protegido", () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: true });

    renderWithRouter("/privado");
    expect(screen.getByText("Contenido Privado")).toBeInTheDocument();
  });

  test("2) Si NO está autenticado: redirige a /login", () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: false });

    renderWithRouter("/privado");
    expect(screen.getByText("Página Login")).toBeInTheDocument();
  });

  test("3) Si NO está autenticado: NO muestra contenido privado", () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: false });

    renderWithRouter("/privado");
    expect(screen.queryByText("Contenido Privado")).not.toBeInTheDocument();
  });
});