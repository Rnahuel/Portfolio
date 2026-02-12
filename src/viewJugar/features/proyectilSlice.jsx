import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listado: [],
};

export const proyectilSlice = createSlice({
    name: 'proyectil',
    initialState,
    reducers: {
        agregar: (state, action) => {
            const proyectil = action.payload;
            state.listado.push(proyectil);
        },
        remover: (state, action) => {
            const id = action.payload;
            const i = state.listado.findIndex(p => p.id === id);
            state.listado.splice(i, 1);
        },
        mover: (state, action) => {
            const { id, x, y } = action.payload;
            const proyectil = state.listado.find(p => p.id === id);
            if (proyectil) {
                proyectil.x = x;
                proyectil.y = y;
            }
        },
        reiniciarProyectil: () => initialState,
    }
});

export const { agregar, remover, mover, reiniciarProyectil } = proyectilSlice.actions;

export default proyectilSlice.reducer;