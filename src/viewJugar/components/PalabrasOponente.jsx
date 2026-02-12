import Palabra from "./Palabra";

const PalabrasOponente = ({ palabras, porcentajeEjeY, porcentajeEjeX }) => {
    return (
        <>
            {palabras && (palabras.map((palabra, index) => (
                <Palabra
                    key={index}
                    estilosPosicion={{
                        position: "absolute",
                        top: porcentajeEjeY ? palabra.y * porcentajeEjeY : palabra.y,
                        left: porcentajeEjeX ? palabra.x * porcentajeEjeX : palabra.x,
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
                        transition: "border 0.1s, opacity 0.1s", // Suaviza la transición
                    }}
                    texto={palabra.palabra}
                    esActiva={palabra.esActiva}
                />
            )))}
        </>
    );
};

export default PalabrasOponente;