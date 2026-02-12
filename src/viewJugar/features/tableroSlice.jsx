import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    centro: { x: 0, y: 0 },
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: 0,
    height: 0,
};

export const tableroSlice = createSlice({
    name: 'tablero',
    initialState,
    reducers: {
        setCentro: (state, action) => {
            state.centro = action.payload;
        },
        setTop: (state, action) => {
            state.top = action.payload;
        },
        setRight: (state, action) => {
            state.right = action.payload;
        },
        setBottom: (state, action) => {
            state.bottom = action.payload;
        },
        setLeft: (state, action) => {
            state.left = action.payload;
        },
        setWidth: (state, action) => {
            state.width = action.payload;
        },
        setHeight: (state, action) => {
            state.height = action.payload;
        },
        reiniciarTablero: () => initialState,
    },
});

export const { setCentro, setTop, setRight, setBottom, setLeft, setWidth, setHeight, reiniciarTablero } = tableroSlice.actions;
export default tableroSlice.reducer;
