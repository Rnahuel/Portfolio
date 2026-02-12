import PalabraMover from "./PalabrasMover";
import Palabra from "./Palabra";
import PalabraError from "./PalabraError";
import { useState } from "react";
import { useSelector } from "react-redux";
import "../../styles/Jugar.css";

const Palabras = () => {
    const palabras = useSelector((state) => state.palabra.listado);
    const tipoDeJuego = useSelector((state) => state.juego.tipoDeJuego);
    const [mostrarCirculo, setMostrarCirculo] = useState(false);
    const [palabraError, setPalabraError] = useState(null);
    
    return (
        <>
            {palabras.map((palabra, index) => (
         tipoDeJuego === "3" ? (  <PalabraError
            key={index}
            estilosPosicion={{
                position: "absolute",
                top: palabra.y,
                left: palabra.x,
                width: palabra.width,
                height: palabra.height - 20,
            }}
            estilos={{
                width: palabra.width,
                height: palabra.height - 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                background:
                    palabra.esActiva
                        ? "rgba(38, 181, 229, 1)"
                        : "transparent",
                zIndex: palabra.esActiva ? 2 : 1,
                border:
                    palabraError === palabra.palabra ? "2px solid red" : "none", // Añadir borde rojo si hay error
                opacity: palabraError === palabra.palabra ? 0.7 : 1, // Cambiar opacidad si hay error
                transition: "border 0.1s, opacity 0.1s", // Suaviza la transición
               
            }}
            texto={palabra.palabra}
            valor= {palabra.valor}
            esActiva={palabra.esActiva}
            mostrarCirculo={mostrarCirculo}
        />) :(
                <Palabra
                    key={index}
                    estilosPosicion={{
                        position: "absolute",
                        top: palabra.y,
                        left: palabra.x,
                        width: palabra.width,
                        height: palabra.height - 20,
                    }}
                    estilos={{
                        width: palabra.width,
                        height: palabra.height - 20,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        background:
                            palabra.esActiva
                                ? "rgba(38, 181, 229, 1)"
                                : "transparent",
                        zIndex: palabra.esActiva ? 2 : 1,
                        border:
                            palabraError === palabra.palabra ? "2px solid red" : "none", // Añadir borde rojo si hay error
                        opacity: palabraError === palabra.palabra ? 0.7 : 1, // Cambiar opacidad si hay error
                        transition: "border 0.1s, opacity 0.1s", // Suaviza la transición
                        animation: palabra.esPotenciador ? "titilar 1s infinite" : "none",
                    }}
                    texto={palabra.palabra}
                    esActiva={palabra.esActiva}
                    mostrarCirculo={mostrarCirculo}
                />)
            ))} 
            <PalabraMover />
        </>
    );
};

export default Palabras;