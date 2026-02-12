import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  segundos: 0,
};

export const cronometroSlice = createSlice({
  name: "cronometro",
  initialState,
  reducers: {
    setSegundos: (state, action) => {
      state.segundos = action.payload;
    },
    reiniciarCronometro: (state) => {
      state.segundos = 0;
    },
  },
});

export const { setSegundos, reiniciarCronometro } = cronometroSlice.actions;
export default cronometroSlice.reducer;