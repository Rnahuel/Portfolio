import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSegundos } from "../features/cronometroSlice";

const Cronometro = () => {
  const dispatch = useDispatch();
  const juegoPausado = useSelector((state) => state.juego.juegoPausado);
  const segundos = useSelector((state) => state.cronometro.segundos);

  useEffect(() => {
    let intervalo;
    if (!juegoPausado) {
      intervalo = setInterval(() => {
        dispatch(setSegundos(segundos + 1));
      }, 1000);
    }
    return () => clearInterval(intervalo);
  }, [juegoPausado, segundos, dispatch]);

  return null; // No renderiza nada visualmente, solo maneja la lógica
};

export default Cronometro;