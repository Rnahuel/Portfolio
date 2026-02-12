import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mover, remover } from "../features/proyectilSlice";

const Proyectiles = () => {
  const dispatch = useDispatch();
  const proyectiles = useSelector((state) => state.proyectil.listado);
  const juegoPausado = useSelector((state) => state.juego.juegoPausado);
  
  const proyectilesRef = useRef(proyectiles);
  const pausadoRef = useRef(juegoPausado);
  const requestRef = useRef();

  useEffect(() => {
    proyectilesRef.current = proyectiles;
  }, [proyectiles]);

  useEffect(() => {
    pausadoRef.current = juegoPausado;
  }, [juegoPausado]);

  const animarProyectiles = () => {
    if (!pausadoRef.current && proyectilesRef.current.length > 0) {
      const actualizaciones = [];
      const eliminaciones = [];

      proyectilesRef.current.forEach((p) => {
        const dx = p.destinoX - p.x;
        const dy = p.destinoY - p.y;
        const distancia = Math.sqrt(dx * dx + dy * dy);
        const velocidad = 8; // Velocidad reducida para mejor visualización

        if (distancia < velocidad) {
          // Llegó al destino
          eliminaciones.push(p.id);
        } else {
          // Mover
          const vx = (dx / distancia) * velocidad;
          const vy = (dy / distancia) * velocidad;
          actualizaciones.push({
            id: p.id,
            x: p.x + vx,
            y: p.y + vy,
          });
        }
      });

      if (actualizaciones.length > 0) dispatch(mover(actualizaciones));
      if (eliminaciones.length > 0) eliminaciones.forEach(id => dispatch(remover(id)));
    }
    requestRef.current = requestAnimationFrame(animarProyectiles);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animarProyectiles);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <>
      {proyectiles.map((p) => (
        <div
          key={p.id}
          style={{ position: "absolute", left: p.x, top: p.y, color: "#6B9080", fontWeight: "bold", fontSize: "1.2rem", zIndex: 50 }}
        >
          {p.texto.toUpperCase()}
        </div>
      ))}
    </>
  );
};

export default Proyectiles;