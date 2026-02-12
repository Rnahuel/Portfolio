/* eslint-disable no-self-assign */
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { agregar } from "../features/palabraSlice";
import { setPalabrasCargadas } from "../features/juegoSlice";

let potenciadoresPorPartida = false;

// Movemos la constante fuera para evitar recrearla en cada render y asegurar su disponibilidad
const palabrasBase = ["react", "vite", "frontend", "codigo", "juego", "teclado", "portfolio", "nahuel", "desarrollo", "web", "css", "html", "redux", "javascript"];

function usePalabras(juegoFinalizadoMensaje, idSalaInt) {
  const dispatch = useDispatch();
  const juego = useSelector((state) => state.juego);
  const vidas = useSelector((state) => state.contadorVidas.vidas);
  const estadisticas = useSelector((state) => state.estadisticas);
  const segundos = useSelector((state) => state.cronometro.segundos);
  const palabras = useSelector((state) => state.palabra.listado);
  const dificultad = useSelector((state) => state.juego.dificultad);
  const tipoDeJuego = useSelector((state) => state.juego.tipoDeJuego);
  const palabrasRef = useRef(palabras);
  const tableroCargado = useSelector((state) => state.juego.tableroCargado);

  useEffect(() => {
    palabrasRef.current = palabras;
  }, [palabras]);
  // TO-DO: Mover la lógica de las oleadas a otro lado
  const tablero = useSelector((state) => state.tablero);
  const tableroRef = useRef(tablero);

  useEffect(() => {
    tableroRef.current = tablero;
  }, [tablero]);
  const [oleada, setOleada] = useState(1);
  const [numPalabrasOleada, setNumPalabrasOleada] = useState(2); // Empezamos con 2 palabras
  useEffect(() => {
    if (oleada % 7 === 0) {
      setNumPalabrasOleada((prev) => prev + 1);
    }
  }, [oleada]);
  let textoSala = [];
  const fuentePalabrasRef = useRef(null);
  const [existeTextoSala, setExisteTextoSala] = useState(false);
  
  const reiniciarValores = () => {
    setOleada(1);
    setNumPalabrasOleada(2);
    setExisteTextoSala(false);
    potenciadoresPorPartida = false; // Reiniciamos esta variable global
    fuentePalabrasRef.current = [...palabrasBase]; // Aseguramos que la fuente esté llena al inicio
  };

  useEffect(() => { reiniciarValores(); }, [window.location.pathname]);

  const obtenerFuentePalabras = async () => {

    if (fuentePalabrasRef.current) return;
    let palabrasObtenidas;

    try {
      fuentePalabrasRef.current = [...palabrasBase]; // Usamos la constante externa
      dispatch(setPalabrasCargadas());
    } catch (error) {
      console.error("Error al obtener palabras:", error);
    }
  };

  useEffect(() => {
    if (!fuentePalabrasRef.current) obtenerFuentePalabras();
  }, []);

  function calcularX(minX, maxX) {
    let x;
    const borde = Math.floor(Math.random() * 2);
    switch (borde) {
      case 0:
        return (x = Math.random() * (maxX - minX) + minX);
      case 1:
        return (x = Math.random() * (maxX - minX) + minX);
      default:
        return (x = 0);
    }
  }

  function calcularY(minY, maxY) {
    let y;
    const borde = Math.floor(Math.random() * 2);
    switch (borde) {
      case 0:
        return (y = Math.random() * (maxY - minY) + minY);
      case 1:
        return (y = Math.random() * (maxY - minY) + minY);
      default:
        return (y = 0);
    }
  }

  // TO-DO: Revisar esto por yisus
  const agregarPalabras = async (cantidad) => {
    // BLINDAJE: Si el tablero no está listo, no hacemos nada para evitar errores de cálculo
    if (!tableroRef.current || tableroRef.current.width === 0 || tableroRef.current.height === 0) {
        return;
    }

    // Autocarga: Si no hay fuente, la inicializamos
    if (!fuentePalabrasRef.current || fuentePalabrasRef.current.length === 0) {
        fuentePalabrasRef.current = [...palabrasBase];
    }

    const nuevasPalabras = [];
    let intentosSeguridad = 0;

    while (nuevasPalabras.length < cantidad && intentosSeguridad < 50) {
      intentosSeguridad++;
      
      if (!fuentePalabrasRef.current || fuentePalabrasRef.current.length === 0) {
        // Recargar palabras para juego infinito
        fuentePalabrasRef.current = [...palabrasBase];
      }

      let palabraAleatoria = fuentePalabrasRef.current.shift();
      
      // Validación simple para evitar undefined
      if (!palabraAleatoria) {
          fuentePalabrasRef.current = [...palabrasBase];
          palabraAleatoria = fuentePalabrasRef.current.shift();
      }

      const lado = obtenerLado();

      let x, y;
      let anchoPalabra;
      if (juego.tipoDeJuego === 3) {
        anchoPalabra = palabraAleatoria.palabra.length * 15;
      } else {
        anchoPalabra = palabraAleatoria.length * 15;
      }

      const aciertos = Math.min(estadisticas.racha, 100);
      let palabraPotenciada = false;
      if (vidas === 1 && aciertos >= 100 && potenciadoresPorPartida === false) {
        palabraPotenciada = true;
        potenciadoresPorPartida = true;
      }

      const altoPalabra = 50;
      const margenDeError = 5;

      // TO-DO: Reemplazar las referencias a la ventana
      const maxY = tableroRef.current.height - altoPalabra - margenDeError;
      const maxX = tableroRef.current.width - anchoPalabra - margenDeError;
      const minY = margenDeError + altoPalabra / 2;
      const minX = margenDeError + anchoPalabra / 2;

      // Seguridad extra: si la pantalla es muy chica, forzamos coordenadas seguras
      if (maxX < minX || maxY < minY) {
         x = tableroRef.current.width / 2;
         y = 50; // Arriba
      } else {
      switch (lado) {
        case 0:
          x = Math.random() * (maxX - minX) + minX;
          y = minY;
          break;
        case 1:
          x = Math.random() * (maxX - minX) + minX;
          y = maxY;
          break;
        case 2:
          x = minX;
          y = Math.random() * (maxY - minY) + minY;
          break;
        case 3:
          x = maxX;
          y = Math.random() * (maxY - minY) + minY;
          break;
        default:
          x = 0;
          y = 0;
      }
      }

      // Lógica de colisión simplificada y segura
      let conflicto = false;
      // Verificamos si la palabra empieza con la misma letra que alguna de la oleada actual
      for (const elemento of nuevasPalabras) {
          const letraNueva = typeof palabraAleatoria === 'string' ? palabraAleatoria[0] : palabraAleatoria.palabra[0];
          const letraExistente = typeof elemento.palabra === 'string' ? elemento.palabra[0] : elemento.palabra.palabra[0];
          
          if (letraNueva === letraExistente) {
              conflicto = true;
              // Devolvemos la palabra al final para usarla luego
              fuentePalabrasRef.current.push(palabraAleatoria);
              break; 
          }
      }
      if (conflicto) continue; // Saltamos al siguiente ciclo del while

      const objetivo = obtenerObjetivo();
      if (tipoDeJuego === 3) {
        nuevasPalabras.push({
          id: Date.now() + nuevasPalabras.length, // ID basada en la hora
          x,
          y,
          velocidad: 0.5 + segundos / 100, // Más lento al inicio y acelera suavemente
          objetivo: objetivo,
          valor: palabraAleatoria.palabra,
          palabra: palabraAleatoria.error,
          width: anchoPalabra,
          height: altoPalabra,
          esActiva: false,
        });
      } else {
        nuevasPalabras.push({
          id: Date.now() + nuevasPalabras.length, // ID basada en la hora
          x,
          y,
          velocidad: 0.5 + segundos / 100, // Más lento al inicio y acelera suavemente
          objetivo: objetivo,
          palabra: palabraAleatoria,
          width: anchoPalabra,
          height: altoPalabra,
          esActiva: false,
          esPotenciador: palabraPotenciada,
        });
      }
    }

    nuevasPalabras.forEach((palabra) => {
      dispatch(agregar(palabra));
    });
  };

  // TO-DO: usar "superior", "inferior", "izquierdo" y "derecho" en vez de 1, 2, 3 y 4
  const obtenerLado = () => {
    let lado;
    switch (juego.modo) {
      case "versus":
        lado = 0;
        break;

      case "jugar":
        lado = Math.floor(Math.random() * 4);
        break;

      case "jugarCelular":
        lado = 0;
        break;

      case "jugarMultijugador":
        lado = 0;
        break;

      default:
        lado = Math.floor(Math.random() * 4);
        break;
    }

    return lado;
  };

  const obtenerObjetivo = () => {
    let objetivo;
    switch (juego.modo) {
      case "jugar":
        objetivo = {
          x: tableroRef.current.width / 2,
          y: tableroRef.current.height / 2,
        };
        break;

      case "versus":
        objetivo = {
          x: tableroRef.current.width / 2,
          y: tableroRef.current.height * 0.95,
        };
        break;

      case "jugarCelular":
        objetivo = {
          x: tableroRef.current.width / 2,
          y: tableroRef.current.height * 0.95,
        };
        break;

      case "jugarMultijugador":
        objetivo = {
          x: tableroRef.current.width / 2,
          y: tableroRef.current.height * 0.95,
        };
        break;

      default:
        objetivo = {
          x: tableroRef.current.width / 2,
          y: tableroRef.current.height / 2,
        };
        break;
    }

    return objetivo;
  };

  // TO-DO: Extraer lo referido a las oleadas a un estado de Redux
  useEffect(() => {
    // Solo generamos palabras si el tablero ya calculó su tamaño (tableroCargado)
    if (segundos % 5 === 0 && !juegoFinalizadoMensaje && tableroCargado) {
      agregarPalabras(numPalabrasOleada);
      setOleada((prev) => prev + 1);
    }
  }, [segundos, juegoFinalizadoMensaje, tableroCargado]);
}

export { usePalabras };
