import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  pausa: false,
  juegoIniciado: false,
  juegoPausado: false,
  tableroCargado: false,
  palabrasCargadas: false,
  modo: 'jugar',
  tipoDeJuego: '2',
  dificultad: '0',

};

export const juegoSlice = createSlice({
  name: 'juego',
  initialState,
  reducers: {
    iniciarJuego: (state) => {
      state.juegoIniciado = true;
    },
    pausarJuego: (state) => {
      state.juegoPausado = true;
    },
    pausar: (state) => {
      state.pausa = true;
    },
    reanudarJuego: (state) => {
      state.juegoPausado = false;
      state.pausa = false;
    },
    setTableroCargado: (state) => {
      state.tableroCargado = true;
    },
    setPalabrasCargadas: (state) => {
      state.palabrasCargadas = true;
    },
    setModo: (state, action) => {
      const modo = action.payload;
      state.modo = modo;
    },
    setTipoDeJuego: (state, action) => {
      const tipoDeJuego = action.payload;
      state.tipoDeJuego = tipoDeJuego;
    },

    setDificultad: (state, action) => {
      const dificultad = action.payload;
      state.dificultad = dificultad;
    },
    reiniciarJuego: () => initialState,
  },
});

export const { pausar, iniciarJuego, pausarJuego, reanudarJuego, setTableroCargado, setPalabrasCargadas, setModo, setTipoDeJuego,setDificultad, reiniciarJuego } = juegoSlice.actions;

export default juegoSlice.reducer;