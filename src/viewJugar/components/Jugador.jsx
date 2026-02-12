import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosicionJugador } from "../features/jugadorSlice";
import tecleadorBlanco from "../../assets/images/TecleadorBlanco.webp";
import { modificarAngulo } from '../features/jugadorSlice';

export default function Jugador({ dimension = 50 }) {
  const dispatch = useDispatch();
  const juego = useSelector((state) => state.juego);
  const [posicionAvatar, setPosicionAvatar] = useState({ x: 0, y: 0 });
  const palabras = useSelector((state) => state.palabra.listado);
  const tablero = useSelector((state) => state.tablero);
  const tableroRef = useRef(null);
  const modo = useSelector((state) => state.juego.modo);
  const posicionJugador = useSelector((state) => state.jugador);
  const [angulo, setAngulo] = useState(0);

  useEffect(() => {
    tableroRef.current = tablero;
    tableroRef.current = tablero;
  }, [tablero]);

  useEffect(() => {
    const obtenerPosicionAvatar = () => {
      switch (modo) {
        case "jugar":
          return {
            x: tableroRef.current.width * 0.5,
            y: tableroRef.current.height * 0.5,
          };
        case "jugarCelular":
          return {
            x: tableroRef.current.width * 0.5,
            y: tableroRef.current.height * 0.93,
          };
        case "jugarMultijugador":
          return {
            x: tableroRef.current.width * 0.5,
            y: tableroRef.current.height *  0.95,
          };
        case "versus":
          return {
            x: tableroRef.current.width * 0.5,
            y: tableroRef.current.height *  0.95,
          };
        default:
          return { x: 0, y: 0 };
      }
    };

    const posicionInicial = obtenerPosicionAvatar();
    dispatch(setPosicionJugador(posicionInicial));
  }, [dispatch, modo, tablero.width, tablero.height]);

  useEffect(() => {
    const palabraActiva = obtenerPalabraActiva();
    if (palabraActiva) {
      actualizarAnguloJugador(palabraActiva);
    }
  }, [palabras]);

  const actualizarAnguloJugador = (palabraActiva) => {
    const nuevoAngulo =
      calcularAngulo(
        posicionJugador.x,
        posicionJugador.y,
        palabraActiva.x,
        palabraActiva.y
      ) + 90;
    setAngulo(nuevoAngulo);
    dispatch(modificarAngulo(nuevoAngulo));
  };

  const calcularAngulo = (x1, y1, x2, y2) => {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    return Math.atan2(deltaY, deltaX) * (180 / Math.PI);
  };

  const obtenerPalabraActiva = () => palabras.find((palabra) => palabra.esActiva);

  return (
    <div
      className="jugador-contenedor"
      style={{
        width: dimension,
        height: dimension,
        top: posicionJugador.y,
        left: posicionJugador.x,
        transform: "translate(0%, 0%)",
      }}
    >
      <img
        src={tecleadorBlanco}
        alt="GIF"
        className="jugador-centro"
        style={{
          width: dimension,
          height: dimension,
          transform: `rotate(${angulo}deg)`,
        }}
      />
    </div>
  );
}
