import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listado: [],
};

export const palabraSlice = createSlice({
  name: "palabra",
  initialState,
  reducers: {
    agregar: (state, action) => {
      state.listado.push(action.payload);
    },
    remover: (state, action) => {
      state.listado = state.listado.filter((p) => p.id !== action.payload);
    },
    activar: (state, action) => {
      const palabra = state.listado.find((p) => p.id === action.payload);
      if (palabra) palabra.esActiva = true;
    },
    recortar: (state, action) => {
      const palabra = state.listado.find((p) => p.id === action.payload);
      if (palabra) {
        palabra.palabra = palabra.palabra.slice(1);
      }
    },
    recortarError: (state, action) => {
      const palabra = state.listado.find((p) => p.id === action.payload);
      if (palabra) {
        palabra.valor = palabra.valor.slice(1);
      }
    },
    mover: (state, action) => {
      action.payload.forEach((update) => {
        const palabra = state.listado.find((p) => p.id === update.id);
        if (palabra) {
          palabra.x = update.x;
          palabra.y = update.y;
        }
      });
    },
    reiniciarPalabras: (state) => {
      state.listado = [];
    }
  },
});

export const { agregar, remover, activar, recortar, recortarError, mover, reiniciarPalabras } = palabraSlice.actions;
export default palabraSlice.reducer;