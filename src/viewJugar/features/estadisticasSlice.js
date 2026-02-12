import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  puntos: 0,
  errores: 0,
  palabras: 0,
  racha: 0,
};

export const estadisticasSlice = createSlice({
  name: "estadisticas",
  initialState,
  reducers: {
    sumarPuntos: (state) => {
      state.puntos += 10;
      state.racha += 1;
    },
    sumarErrores: (state) => {
      state.errores += 1;
      state.racha = 0;
    },
    sumarPalabras: (state) => {
      state.palabras += 1;
    },
    reiniciarEstadisticas: (state) => {
      state.puntos = 0;
      state.errores = 0;
      state.palabras = 0;
      state.racha = 0;
    },
  },
});

export const { sumarPuntos, sumarErrores, sumarPalabras, reiniciarEstadisticas } = estadisticasSlice.actions;
export default estadisticasSlice.reducer;