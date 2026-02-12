import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    angulo: 0,
    x: 0,
    y: 0,
};

const jugadorSlice = createSlice({
  name: 'jugador',
  initialState,
  reducers: {
    setPosicionJugador: (state, action) => {
      state.x = action.payload.x;
      state.y = action.payload.y;
    },
    modificarAngulo: (state, action) => {
        state.angulo = action.payload;
    },
    reiniciarAngulo: () => initialState,
  },
});

export const { setPosicionJugador, modificarAngulo, reiniciarAngulo } = jugadorSlice.actions;
export default jugadorSlice.reducer;