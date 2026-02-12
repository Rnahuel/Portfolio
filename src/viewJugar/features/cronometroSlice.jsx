import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  segundos: 0,
};

export const cronometroSlice = createSlice({
    name: 'cronometro',
    initialState,
    reducers: {
      sumar: (state) => {
        state.segundos += 1;
      },
      reiniciarCronometro: () => initialState,
    },
  });
  
  export const { sumar, reiniciarCronometro } = cronometroSlice.actions;
  
  export default cronometroSlice.reducer;