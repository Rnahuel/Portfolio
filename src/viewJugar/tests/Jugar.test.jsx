import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Provider } from "react-redux";
import { MemoryRouter, useNavigate } from "react-router-dom";
import Jugar from "../Jugar";
import configureStore from "redux-mock-store";
import { useMediaQuery } from "react-responsive";

const mockStore = configureStore([]);

// Mock de dependencias
vi.mock("react-responsive", () => ({
  useMediaQuery: vi.fn(),
}));
vi.mock("../hooks/usePalabras", () => ({
  usePalabras: vi.fn(),
}));
vi.mock("../hooks/useInputHandler", () => ({
  useInputHandler: vi.fn(),
}));
vi.mock("../hooks/useCalcularTablero", () => ({
  useCalcularTablero: vi.fn(),
}));
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("Jugar Component - Test Complejo", () => {
  let store;
  let navigate;

  beforeEach(() => {
    const mockToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzdWFyaW8iOjEyMywiZW1haWwiOiJ1c3VhcmlvQGVqZW1wbG8uY29tIn0.dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk";
    sessionStorage.setItem("token", mockToken);

    useMediaQuery.mockReturnValue(false);
    navigate = vi.fn();
    useNavigate.mockReturnValue(navigate);

    const initialState = {
      juego: {
        palabrasCargadas: true,
        tableroCargado: true,
        juegoIniciado: true,
      },
      contadorVidas: { vidas: 3 },
      cronometro: { segundos: 10 },
      estadisticas: { puntos: 100, palabras: 5, errores: 0 },
      palabra: { listado: ["palabra1", "palabra2", "palabra3"] },
      tablero: {
        dimensiones: { ancho: 10, alto: 10 },
        centro: { x: 50, y: 50 },
      },
      jugador: { posicionJugador: { x: 0, y: 0 } },
      proyectil: { listado: [] },
    };

    store = mockStore(initialState);
  });

  it("debería manejar la pérdida de vidas y navegar a la vista de estadísticas", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Jugar />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId("contenedor-juego")).toBeInTheDocument();
    expect(screen.getByText(/Tiempo/i)).toBeInTheDocument();

    store = mockStore({
      juego: {
        palabrasCargadas: true,
        tableroCargado: true,
        juegoIniciado: true,
      },
      contadorVidas: { vidas: 0 },
      palabra: { listado: ["palabra1", "palabra2", "palabra3"] },
      cronometro: { segundos: 15 },
      jugador: { posicionJugador: { x: 50, y: 10 } },
      estadisticas: { puntos: 150, palabras: 8, errores: 2 },
      tablero: {
        dimensiones: { ancho: 10, alto: 10 },
        centro: { x: 50, y: 50 },
      },
      proyectil: { listado: [] },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Jugar />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("/estadisticaJuego", {
        state: {
          puntos: 150,
          palabrasTipeadas: 8,
          segundos: 15,
          errores: 2,
          ppm: parseFloat(((8 / 15) * 60).toFixed(2)),
          idModoJuego: 2,
          idDificultad: 1,
          fromJuegoMultijugador: false,
        },
      });
    });
  });

  it("debería reiniciar el estado del juego al desmontar el componente", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Jugar />
        </MemoryRouter>
      </Provider>
    );

    const popStateEvent = new PopStateEvent("popstate");
    window.dispatchEvent(popStateEvent);

    const actions = store.getActions();
    expect(actions).toContainEqual({
      type: "contadorVidas/reiniciarContadoVidas",
    });
    expect(actions).toContainEqual({ type: "cronometro/reiniciarCronometro" });
    expect(actions).toContainEqual({
      type: "estadisticas/reiniciarEstadisticas",
    });
    expect(actions).toContainEqual({ type: "palabra/reiniciarPalabra" });
    expect(actions).toContainEqual({ type: "proyectil/reiniciarProyectil" });
    expect(actions).toContainEqual({ type: "tablero/reiniciarTablero" });
    expect(actions).toContainEqual({ type: "juego/reiniciarJuego" });
  });

  it("debería calcular PPM correctamente al finalizar el juego", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Jugar />
        </MemoryRouter>
      </Provider>
    );

    store = mockStore({
      juego: {
        palabrasCargadas: true,
        tableroCargado: true,
        juegoIniciado: true,
      },
      contadorVidas: { vidas: 0 },
      cronometro: { segundos: 30 },
      palabra: { listado: ["palabra1", "palabra2", "palabra3"] },
      jugador: { posicionJugador: { x: 50, y: 10 } },
      estadisticas: { puntos: 200, palabras: 10, errores: 1 },
      proyectil: { listado: [] },
      tablero: {
        dimensiones: { ancho: 10, alto: 10 },
        centro: { x: 50, y: 50 },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Jugar />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("/estadisticaJuego", {
        state: {
          puntos: 200,
          palabrasTipeadas: 10,
          segundos: 30,
          errores: 1,
          ppm: parseFloat(((10 / 30) * 60).toFixed(2)),
          idModoJuego: 2,
          idDificultad: 1,
          fromJuegoMultijugador: false,
        },
      });
    });
  });
});
