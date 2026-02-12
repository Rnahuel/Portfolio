import { useSelector } from "react-redux";
import { useRef, useEffect, useState } from "react";

const maxAciertos = 100; // Ahora 100 aciertos es el máximo total
const maxAciertosPrimeraCapa = 50; // Límite para la primera capa

export default function BarraProgreso(/* { className = "" } */) {
  const juego = useSelector((state) => state.juego);
  const estadisticas = useSelector((state) => state.estadisticas);
  const powerRef = useRef();
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const cargarConfiguracion = async () => {
      // MOCK: Configuración por defecto
      setIsMuted(false);
    };

    cargarConfiguracion();
  }, []);

  useEffect(() => {
    const cargarSonido = async () => {
      // MOCK: Sonido
      powerRef.current = { play: () => {} };
    };

    cargarSonido();
  }, [isMuted]);

  const aciertos = Math.min(estadisticas.racha, maxAciertos);
  const porcentajePrimeraCapa = Math.min((aciertos / maxAciertosPrimeraCapa) * 100, 100);
  const porcentajeSegundaCapa =
    aciertos > maxAciertosPrimeraCapa
      ? ((aciertos - maxAciertosPrimeraCapa) / (maxAciertos - maxAciertosPrimeraCapa)) * 100
      : 0;

  if (aciertos === 50 || aciertos === 100) {
    powerRef.current.play();
  }

  // Simplificamos para el portfolio: siempre usa el estilo por defecto
  const className = "barra-progreso-contenedor";

  return (
    <>
      <div className={`${className}`}>
        <div
          style={{
            width: "100%",
            height: `${porcentajePrimeraCapa}%`,
            backgroundColor: "#6ce5e8",
            position: "absolute",
            bottom: 0,
            transition: "height 0.5s ease, box-shadow 0.5s ease",
            boxShadow: `0px 0px ${aciertos / 5}px ${aciertos / 40}px #6ce5e8`,
          }}
        ></div>
        <div
          style={{
            width: "100%",
            height: `${porcentajeSegundaCapa}%`,
            backgroundColor: "#d9d9d9",
            position: "absolute",
            bottom: 0,
            transition: "height 0.5s ease, box-shadow 0.5s ease",
            boxShadow: `0px 0px ${aciertos / 5}px ${aciertos / 40}px #6ce5e8`,
          }}
        ></div>
      </div>
      <h2
        style={{
          position: "absolute",
          display: aciertos >= 50 && aciertos < 100 ? "block" : "none",
          color: "rgb(37, 150, 190, 0.1)",
          transition: "1s",
          fontSize: "200px",
          marginTop: "50px",
          marginLeft: "5%",
        }}
      >
        X2
      </h2>
      <h2
        style={{
          position: "absolute",
          display: aciertos >= 100 ? "block" : "none",
          color: "rgb(37, 150, 190, 0.1)",
          transition: "1s",
          fontSize: "200px",
          marginTop: "50px",
          marginLeft: "5%",
        }}
      >
        X4
      </h2>
    </>
  );
}
