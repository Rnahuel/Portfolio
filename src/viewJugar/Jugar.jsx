import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useInputHandler } from "./hooks/useInputHandler";
import { usePalabras } from "./hooks/usePalabras";
import { useCalcularTablero } from "./hooks/useCalcularTablero";
import Jugador from "./components/Jugador";
import Palabras from "./components/Palabras";
import Proyectiles from "./components/Proyectiles";
import Vidas from "./components/Vidas";
import BarraProgreso from "./components/BarraProgreso";
import Pausa from "./components/Pausa";
import Tooltip from "./components/Tooltip";
import Cronometro from "./components/Cronometro";
import GameOver from "./components/GameOver";
import { reiniciarVidas } from "./features/contadorVidasSlice";
import { reiniciarEstadisticas } from "./features/estadisticasSlice";
import { reiniciarPalabras } from "./features/palabraSlice";
import { reiniciarProyectiles } from "./features/proyectilSlice";
import { reiniciarCronometro } from "./features/cronometroSlice";
import { reanudarJuego } from "./features/juegoSlice";
import "../styles/Jugar.css"; // Ruta corregida a src/styles/Jugar.css

const Jugar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tableroRef = useRef(null);
  
  useCalcularTablero(tableroRef);
  // Inicializamos los hooks del juego
  // useInputHandler maneja el tecleo y usePalabras la generación de enemigos
  useInputHandler();
  usePalabras(false, 0); 

  // Forzamos el reinicio TOTAL del estado del juego al cargar
  useEffect(() => {
    dispatch(reiniciarVidas());
    dispatch(reiniciarEstadisticas());
    dispatch(reiniciarPalabras());
    dispatch(reiniciarProyectiles());
    dispatch(reiniciarCronometro());
    dispatch(reanudarJuego());
  }, [dispatch]);

  return (
    <div className="juego-container">
      <div className="tablero" ref={tableroRef}>
        {/* El Cronómetro es necesario para que el juego avance, aunque esté oculto */}
        <div style={{ display: 'none' }}>
            <Cronometro />
        </div>
        {/* Componentes del juego */}
        <Jugador />
        <Palabras />
        <Proyectiles />
        <Vidas />
        <BarraProgreso />
        <Pausa />
        <Tooltip />
        <GameOver />
        
        {/* Botón para volver al Portfolio */}
        <button 
            onClick={() => navigate('/')}
            style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                padding: '10px 20px',
                background: '#6B9080', // Verde Salvia del theme
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                zIndex: 100,
                fontFamily: 'Inter, sans-serif',
                fontWeight: 'bold',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
            }}
        >
            ← Volver al Portfolio
        </button>
      </div>
    </div>
  );
};

export default Jugar;