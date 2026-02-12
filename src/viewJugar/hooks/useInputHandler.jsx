import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activar, recortar, recortarError, remover } from "../features/palabraSlice";
import { sumarPuntos, sumarErrores, sumarPalabras } from "../features/estadisticasSlice";
import { agregar } from "../features/proyectilSlice";
import { sumar } from "../features/contadorVidasSlice";

export const useInputHandler = () => {
  const dispatch = useDispatch();
  const juego = useSelector((state) => state.juego);
  const palabras = useSelector((state) => state.palabra.listado);
  const modoJuego = juego.tipoDeJuego;
  const palabrasRef = useRef(palabras);

  const pausa = useSelector((state) => state.juego.juegoPausado);
  const pausaRef = useRef(null);

  useEffect(() => {
    pausaRef.current = pausa;
  }, [pausa]);

  const musicaRef = useRef();
  const errorRef = useRef();
  const vidaRef = useRef();

  const [isMuted, setIsMuted] = useState(false);
  const [idiomaTeclado, setIdiomaTeclado] = useState("es");

  const tablero = useSelector((state) => state.tablero);
  const tableroRef = useRef(tablero);

  useEffect(() => {
    const cargarConfiguracion = async () => {
      // MOCK: Configuración por defecto
      setIsMuted(false);
      setIdiomaTeclado("es");
    };

    cargarConfiguracion();
  }, []);

  useEffect(() => {
    tableroRef.current = tablero;
  }, [tablero]);

  // Selecciona la posición del jugador en lugar del centro
  const jugador = useSelector((state) => state.jugador);
  const jugadorRef = useRef(null);

  useEffect(() => {
    jugadorRef.current = jugador;
  }, [jugador]);

  useEffect(() => {
    palabrasRef.current = palabras;
  }, [palabras]);

  useEffect(() => {
    const cargarSonido = async () => {
      // MOCK: Sonidos desactivados por ahora
      musicaRef.current = { play: () => {}, pause: () => {} };
      vidaRef.current = { play: () => {} };
      errorRef.current = { play: () => {} };
      
      if (isMuted) {
         // Simulación de play
      }
    };

    cargarSonido();

    return () => {
      if (musicaRef.current) {
        musicaRef.current.pause();
        musicaRef.current.currentTime = 0;
      }
    };
  }, [isMuted]);

  const procesarTecleo = (evento) => {
    if (!pausaRef.current) {
      const tecla = evento.key.toLowerCase();
      if (!esTeclaValida(tecla)) return;

      const palabraActiva = obtenerPalabraActiva();
      if (!palabraActiva) {
        buscarPalabra(tecla); // Pasamos tecla aquí
        return;
      }

      if (!coincideConPalabraActiva(tecla)) return;
      if (modoJuego === 3) {
        dispatch(recortarError(palabraActiva.id));
      } else {
        dispatch(recortar(palabraActiva.id));
      }
      if (modoJuego === 3) {
        if (palabraActiva.valor.length === 1) {
          dispatch(remover(palabraActiva.id));
          dispatch(sumarPalabras());
        }
      } else {
        if (palabraActiva.palabra.length === 1) {
          dispatch(remover(palabraActiva.id));
          dispatch(sumarPalabras());
          if(palabraActiva.esPotenciador){
            dispatch(sumar());
          }
        }
      }

      dispatch(sumarPuntos());

      if (jugadorRef.current) {
        dispararLetra(tecla, jugadorRef.current, palabraActiva);
      } else {
        console.error("La posición del jugador no está disponible en este momento. 1");
      }
    }
  };

  const buscarPalabra = (letra) => {
    let palabraEncontrada = null;
    let listadoInvertido = [...palabrasRef.current].reverse();
    listadoInvertido.forEach((palabra) => {
      if (modoJuego === 3) {
        if (palabra.valor.startsWith(letra)) palabraEncontrada = palabra;
      } else {
        if (palabra.palabra.startsWith(letra)) palabraEncontrada = palabra;
      }
    });
    if (!palabraEncontrada) {
      marcarError();
      return;
    }
    // Genera la nueva palabra recortando el primer carácter
    if (modoJuego === 3) {
      dispatch(recortarError(palabraEncontrada.id));
    } else {
      dispatch(recortar(palabraEncontrada.id));
    }
    // Establecer palabra activa
    dispatch(activar(palabraEncontrada.id));

    dispatch(sumarPuntos());

    if (jugadorRef.current) {
      dispararLetra(letra, jugadorRef.current, palabraEncontrada);
    } else {
      console.error("La posición del jugador no está disponible en este momento. 2");
    }
  };

  const coincideConPalabraActiva = (tecla) => {
    const palabraActiva = obtenerPalabraActiva();
    if (modoJuego === 3) {
      if (!palabraActiva.valor.startsWith(tecla)) {
        marcarError();
        return false;
      }
    } else {
      if (!palabraActiva.palabra.startsWith(tecla)) {
        marcarError();
        return false;
      }
    }
    return true;
  };

  const dispararLetra = (letra, origen, destino) => {
    if (!origen || typeof origen.x === "undefined" || typeof origen.y === "undefined") {
      console.error("La posición del jugador no está definida.");
      return;
    }

    const nuevaLetra = {
      id: Date.now(),
      texto: letra,
      x: origen.x,
      y: origen.y,
      destinoX: destino.x,
      destinoY: destino.y,
      velocidad: 5,
    };

    dispatch(agregar(nuevaLetra));
  };

  const obtenerOrigenProyectil = () => {
    let origen;
    switch (juego.modo) {
      case "versus":
        origen = {
          x: tableroRef.current.width / 2,
          y: tableroRef.current.height * 0.95,
        };
        break;

      default:
        origen = tableroRef.current.centro;
        break;
    }
    return origen;
  };

  const esTeclaValida = (tecla) => {
    return tecla.length === 1 && tecla.match(/[a-zA-Zá-ú]/i);
  };

  const marcarError = () => {
    dispatch(sumarErrores());
    errorRef.current.play();
    /*
        setPalabraError(palabraActiva.palabra); // Marca la palabra que tuvo error
        setTimeout(() => setPalabraError(null), 300); // Resetea el error después de 300ms
        */
  };

  const obtenerPalabraActiva = () => {
    for (let i = 0; i < palabrasRef.current.length; i++) {
      if (palabrasRef.current[i].esActiva) return palabrasRef.current[i];
    }
    return false;
  };

  useEffect(() => {
    window.addEventListener("keydown", procesarTecleo);
    return () => {
      window.removeEventListener("keydown", procesarTecleo);
    };
  }, []);

  // Nueva función para el teclado virtual
  const procesarTecleoVirtual = (eventoVirtual) => {
    procesarTecleo(eventoVirtual);
  };

  return { procesarTecleo, procesarTecleoVirtual };
};
