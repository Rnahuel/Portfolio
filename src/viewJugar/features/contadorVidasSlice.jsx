import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  vidas: 3,
};

export const contadorVidasSlice = createSlice({
  name: 'contadorVidas',
  initialState,
  reducers: {
    sumar: (state) => {
      state.vidas += 1;
    },
    restar: (state) => {
      state.vidas -= 1;
    },
    sumarCantidad: (state, action) => {
      state.vidas += action.payload;
    },
    reiniciarContadoVidas: () => initialState,
  },
});

export const { sumar, restar, sumarCantidad, reiniciarContadoVidas } = contadorVidasSlice.actions;

export default contadorVidasSlice.reducer;