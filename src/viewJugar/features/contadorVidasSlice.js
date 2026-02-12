import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vidas: 3,
};

export const contadorVidasSlice = createSlice({
  name: "contadorVidas",
  initialState,
  reducers: {
    restar: (state) => {
      if (state.vidas > 0) state.vidas -= 1;
    },
    sumar: (state) => {
      if (state.vidas < 3) state.vidas += 1;
    },
    reiniciarVidas: (state) => {
      state.vidas = 3;
    },
  },
});

export const { restar, sumar, reiniciarVidas } = contadorVidasSlice.actions;
export default contadorVidasSlice.reducer;