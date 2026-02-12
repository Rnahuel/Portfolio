import { useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import "../../styles/Jugar.css";

const CirculoOponente = (palabras) => {
    const palabraActivaRef = useRef(null);
    const palabrasRef = useRef(palabras);

    useEffect(() => {
        palabrasRef.current = palabras;
    }, [palabras]);

    useEffect(() => {
        const palabraActivaObtenida = obtenerPalabraActiva();
        if (palabraActivaObtenida) {
            palabraActivaRef.current = palabraActivaObtenida;
        } else {
            palabraActivaRef.current = null;
        }
    }, [palabras]);

    const obtenerPalabraActiva = () => {
        for (let i = 0; i < palabrasRef.current.length; i++) {
            if (palabrasRef.current[i].esActiva) return palabrasRef.current[i];
        }
        return false;
    };

    return (

        <>
            {palabraActivaRef.current && (
                <div style={{ position: "absolute", top: palabraActivaRef.current.y, left: palabraActivaRef.current.x }}>
                    <div style={{
                        width: "200px",
                        height: "200px",
                        top: "-100px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(255, 255, 255, 0)",
                        border: "1px solid white",
                        animation: "achicar 0.8s ease-out forwards",
                        zIndex: -1,
                    }}
                    className="relative -left-2/4"
                    ></div>
                </div>
            )}
        </>
    );
}
export default CirculoOponente;