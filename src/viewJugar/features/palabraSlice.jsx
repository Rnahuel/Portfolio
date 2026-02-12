import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listado: [],
};

export const palabraSlice = createSlice({
    name: 'palabra',
    initialState,
    reducers: {
        agregar: (state, action) => {
            const palabra = action.payload;
            state.listado.push(palabra);
        },
        remover: (state, action) => {
            const id = action.payload;
            const i = state.listado.findIndex(p => p.id === id);
            state.listado.splice(i, 1);
        },
        activar: (state, action) => {
            const id = action.payload;
            const palabra = state.listado.find(p => p.id === id);
            palabra.esActiva = true;
        },
        mover: (state, action) => {
            const { id, x, y } = action.payload;
            const palabra = state.listado.find(p => p.id === id);
            if (palabra) {
                palabra.x = x;
                palabra.y = y;
            }
        },
        recortar: (state, action) => {
            const id = action.payload;
            const palabra = state.listado.find(p => p.id === id);
            palabra.palabra = palabra.palabra.slice(1);
        },
        recortarError: (state, action) => {
            const id = action.payload;
            const palabra = state.listado.find(p => p.id === id);
            palabra.valor = palabra.valor.slice(1);
            palabra.palabra = palabra.palabra.slice(1);
        },
        reiniciarPalabra: () => initialState,
    }
});

export const { agregar, remover, activar, mover, recortar, recortarError, reiniciarPalabra } = palabraSlice.actions;

export default palabraSlice.reducer;