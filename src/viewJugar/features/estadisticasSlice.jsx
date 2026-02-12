import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    puntos: 0,
    palabras: 0,
    racha: 0,
    errores: 0,
};

export const estadisticasSlice = createSlice({
    name: 'estadisticas',
    initialState,
    reducers: {
        sumarPuntos: (state) => {
            if (state.racha >= 50 && state.racha < 100) {
                state.puntos += 2;
            } else if (state.racha >= 100) {
                state.puntos += 4;
            } else {
                state.puntos += 1;
            }
            state.racha += 1;
        },
        sumarErrores: (state) => {
            state.errores += 1;
            state.racha = 0;
        },
        sumarPalabras: (state) => {
            state.palabras += 1;
        },
        reiniciarEstadisticas: () => initialState,
    },
});

export const { sumarPuntos, sumarErrores, sumarPalabras, reiniciarEstadisticas } = estadisticasSlice.actions;

export default estadisticasSlice.reducer;