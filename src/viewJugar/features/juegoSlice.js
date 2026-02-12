import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  juegoPausado: true, // Empieza pausado hasta que Jugar.jsx lo active
  pausa: false, // Pausa manual del usuario
  tipoDeJuego: 1,
  dificultad: 1,
  modo: "jugar",
  palabrasCargadas: false,
  tableroCargado: false,
};

export const juegoSlice = createSlice({
  name: "juego",
  initialState,
  reducers: {
    pausarJuego: (state) => {
      state.juegoPausado = true;
    },
    reanudarJuego: (state) => {
      state.juegoPausado = false;
      state.pausa = false;
    },
    pausar: (state) => {
      state.pausa = true;
    },
    setPalabrasCargadas: (state) => {
      state.palabrasCargadas = true;
    },
    setTableroCargado: (state) => {
      state.tableroCargado = true;
    },
    setModo: (state, action) => {
        state.modo = action.payload;
    }
  },
});

export const { pausarJuego, reanudarJuego, pausar, setPalabrasCargadas, setTableroCargado, setModo } = juegoSlice.actions;
export default juegoSlice.reducer;