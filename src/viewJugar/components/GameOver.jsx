import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { reiniciarVidas } from "../features/contadorVidasSlice";
import { reiniciarEstadisticas } from "../features/estadisticasSlice";
import { reiniciarPalabras } from "../features/palabraSlice";
import { reiniciarProyectiles } from "../features/proyectilSlice";
import { reiniciarCronometro } from "../features/cronometroSlice";
import { reanudarJuego } from "../features/juegoSlice";

const GameOver = () => {
  const dispatch = useDispatch();
  const vidas = useSelector((state) => state.contadorVidas.vidas);
  const puntos = useSelector((state) => state.estadisticas.puntos);

  if (vidas > 0) return null;

  const handleReiniciar = () => {
    dispatch(reiniciarVidas());
    dispatch(reiniciarEstadisticas());
    dispatch(reiniciarPalabras());
    dispatch(reiniciarProyectiles());
    dispatch(reiniciarCronometro());
    dispatch(reanudarJuego());
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000,
        color: "white",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem", color: "#ff6b6b" }}>GAME OVER</h1>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>Puntaje Final: {puntos}</h2>
      
      <button
        onClick={handleReiniciar}
        style={{
          padding: "15px 30px",
          fontSize: "1.2rem",
          backgroundColor: "#6B9080",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
          boxShadow: "0 4px 15px rgba(107, 144, 128, 0.4)",
        }}
      >
        Jugar de Nuevo
      </button>
    </div>
  );
};

export default GameOver;