import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mover, remover } from "../features/palabraSlice";
import { restar } from "../features/contadorVidasSlice";

const PalabrasMover = () => {
  const dispatch = useDispatch();
  const palabras = useSelector((state) => state.palabra.listado);
  const jugador = useSelector((state) => state.jugador);
  const juegoPausado = useSelector((state) => state.juego.juegoPausado);
  
  // Refs para mantener el estado actualizado dentro del loop sin reiniciar el efecto
  const palabrasRef = useRef(palabras);
  const jugadorRef = useRef(jugador);
  const pausadoRef = useRef(juegoPausado);
  const requestRef = useRef();

  useEffect(() => {
    palabrasRef.current = palabras;
  }, [palabras]);

  useEffect(() => {
    jugadorRef.current = jugador;
  }, [jugador]);

  useEffect(() => {
    pausadoRef.current = juegoPausado;
  }, [juegoPausado]);

  const moverPalabras = () => {
    if (!pausadoRef.current && palabrasRef.current.length > 0) {
      const actualizaciones = [];
      const eliminaciones = [];
      let daño = false;

      palabrasRef.current.forEach((palabra) => {
        // Usamos ?. para evitar crash si jugadorRef.current es null/undefined
        const objetivoX = jugadorRef.current?.x ?? window.innerWidth / 2;
        const objetivoY = jugadorRef.current?.y ?? window.innerHeight / 2;
        
        const dx = objetivoX - palabra.x;
        const dy = objetivoY - palabra.y;
        const distancia = Math.sqrt(dx * dx + dy * dy);

        // Si toca al jugador (radio aprox 30px)
        if (distancia < 30) {
          eliminaciones.push(palabra.id);
          daño = true;
        } else {
          // Mover hacia el objetivo
          const velocidad = palabra.velocidad || 1;
          const vx = (dx / distancia) * velocidad;
          const vy = (dy / distancia) * velocidad;

          actualizaciones.push({
            id: palabra.id,
            x: palabra.x + vx,
            y: palabra.y + vy,
          });
        }
      });

      if (actualizaciones.length > 0) dispatch(mover(actualizaciones));
      if (eliminaciones.length > 0) {
        eliminaciones.forEach(id => dispatch(remover(id)));
      }
      if (daño) dispatch(restar());
    }
    requestRef.current = requestAnimationFrame(moverPalabras);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(moverPalabras);
    return () => cancelAnimationFrame(requestRef.current);
  }, []); // Array vacío: el loop corre independientemente de los renders

  return null;
};

export default PalabrasMover;