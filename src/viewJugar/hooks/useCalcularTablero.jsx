import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCentro, setTop, setRight, setBottom, setLeft, setWidth, setHeight } from '../features/tableroSlice';
import { setTableroCargado } from '../features/juegoSlice';

export const useCalcularTablero = (divTableroRef) => {
  const dispatch = useDispatch();
  const tablero = useSelector((state) => state.tablero);
  const tableroRef = useRef(tablero);
  const tipoDeJuego = useSelector((state) => state.juego.modo);
  const juego = useSelector((state) => state.juego);

  useEffect(() => { tableroRef.current = tablero; }, [tablero]);
  const calcularPropiedades = () => {
    if (!divTableroRef.current) return;

    const rect = divTableroRef.current.getBoundingClientRect();
    const centroX = rect.width / 2;
    let centroY = "";

    switch (tipoDeJuego) {
      case "jugar":
        centroY = rect.height / 2;
        break;
      case "jugarCelular":
        centroY = rect.height * 0.8;
        break;
      case "jugarMultijugador":
        centroY = rect.height;
        break;
      default:
        centroY = rect.height / 2;
    }

    dispatch(setCentro({ x: centroX, y: centroY }));
    dispatch(setTop(rect.top));
    dispatch(setRight(rect.right));
    dispatch(setBottom(rect.bottom));
    dispatch(setLeft(rect.left));
    dispatch(setWidth(rect.width));
    dispatch(setHeight(rect.height));
  };

  useEffect(() => {
    if (divTableroRef.current) {
      calcularPropiedades();
      dispatch(setTableroCargado());
    }
    window.addEventListener('resize', calcularPropiedades);

    return () => {
      window.removeEventListener('resize', calcularPropiedades);
    };
  }, [divTableroRef, tipoDeJuego, dispatch]); // Añade `tipoDeJuego` como dependencia
};
