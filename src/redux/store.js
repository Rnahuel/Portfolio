import { configureStore } from '@reduxjs/toolkit';

// Importamos los reducers desde la carpeta del juego
import tableroReducer from '../viewJugar/features/tableroSlice';
import juegoReducer from '../viewJugar/features/juegoSlice';
import palabraReducer from '../viewJugar/features/palabraSlice';
import estadisticasReducer from '../viewJugar/features/estadisticasSlice';
import proyectilReducer from '../viewJugar/features/proyectilSlice';
import contadorVidasReducer from '../viewJugar/features/contadorVidasSlice';
// Asumo que estos existen por el uso en los hooks:
import cronometroReducer from '../viewJugar/features/cronometroSlice'; 
import jugadorReducer from '../viewJugar/features/jugadorSlice';

export const store = configureStore({
  reducer: {
    tablero: tableroReducer,
    juego: juegoReducer,
    palabra: palabraReducer,
    estadisticas: estadisticasReducer,
    proyectil: proyectilReducer,
    contadorVidas: contadorVidasReducer,
    cronometro: cronometroReducer,
    jugador: jugadorReducer,
  },
});
