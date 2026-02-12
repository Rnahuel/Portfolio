import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { pausarJuego, reanudarJuego, pausar } from "../features/juegoSlice";

export default function Pausa() {
  const dispatch = useDispatch();
  const estadoPausa = useSelector((state) => state.juego.juegoPausado);
  const pausa = useSelector((state) => state.juego.pausa);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !pausa) {
        dispatch(pausarJuego());
        dispatch(pausar());
      } else if (event.key === "Escape" && pausa) {
        dispatch(reanudarJuego());
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pausa]);

  function pausado() {
    if (!pausa) {
      dispatch(pausarJuego());
      dispatch(pausar());
    } else {
      dispatch(reanudarJuego());
    }
  }

  return (
    <>
      <button 
        onClick={pausado} 
        className="m-1"
        style={{ 
          padding: '8px 16px', 
          cursor: 'pointer', 
          background: '#6B9080', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          position: 'absolute',
          top: '70px',
          right: '20px',
          zIndex: 100
        }}
      >
        {pausa ? "Continuar" : "Pausar"}
      </button>

      {pausa && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontSize: "40px",
              paddingBottom: "20px",
            }}
          >
            <p>Pausa</p>
          </div>
          <button onClick={pausado}>Continuar</button>
        </div>
      )}
    </>
  );
}
