import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listado: [],
};

export const proyectilSlice = createSlice({
  name: "proyectil",
  initialState,
  reducers: {
    agregar: (state, action) => {
      state.listado.push(action.payload);
    },
    remover: (state, action) => {
      state.listado = state.listado.filter((p) => p.id !== action.payload);
    },
    mover: (state, action) => {
      action.payload.forEach((update) => {
        const proyectil = state.listado.find((p) => p.id === update.id);
        if (proyectil) {
          proyectil.x = update.x;
          proyectil.y = update.y;
        }
      });
    },
    reiniciarProyectiles: (state) => {
      state.listado = [];
    }
  },
});

export const { agregar, remover, mover, reiniciarProyectiles } = proyectilSlice.actions;
export default proyectilSlice.reducer;