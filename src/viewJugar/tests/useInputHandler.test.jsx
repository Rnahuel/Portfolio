import { describe, it, expect, vi, beforeEach } from "vitest";
import { useInputHandler } from "../hooks/useInputHandler";
import { recortarError } from "../features/palabraSlice";
import { sumarPuntos } from "../features/estadisticasSlice";
import { useSelector, useDispatch } from "react-redux";

import { renderHook, act } from "@testing-library/react";


vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock('jwt-decode', async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      jwtDecode: () => ({ idUsuario: '123', exp: Date.now() / 1000 + 60 * 60 }), // Mock del token decodificado
    };
  });

let dispatchMock;
let mockedState;
let errorRef;

beforeEach(() => {
  dispatchMock = vi.fn();
  useDispatch.mockReturnValue(dispatchMock);

  errorRef = { current: { play: vi.fn() } }; // Mock de errorRef con función play

  mockedState = {
    juego: { tipoDeJuego: 3, juegoPausado: false },
    palabra: { listado: [{ id: 1, valor: "example", palabra: "example", esActiva: true }] },
    tablero: { width: 800, height: 600, centro: { x: 400, y: 300 } },
    jugador: { x: 100, y: 100 },
  };

  useSelector.mockImplementation((selector) => selector(mockedState));
});


describe("useInputHandler", () => {
  it("debería despachar acciones cuando se presiona una tecla válida", () => {
    const { result } = renderHook(() => useInputHandler());

    act(() => {
      result.current.procesarTecleo({ key: "e" });
    });

    expect(dispatchMock).toHaveBeenCalledWith(recortarError(1));
    expect(dispatchMock).toHaveBeenCalledWith(sumarPuntos());
  });

  it("no debería despachar acciones para teclas inválidas", () => {
    const { result } = renderHook(() => useInputHandler());

    act(() => {
      result.current.procesarTecleo({ key: "1" });
    });

    expect(dispatchMock).not.toHaveBeenCalled();
  });


});
