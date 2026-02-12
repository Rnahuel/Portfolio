import target from "../../assets/images/Target.webp";

const Palabra = ({ estilosPosicion, estilos, texto, esActiva, mostrarCirculo,  }) => {
    return (
        <div style={estilosPosicion}>
            <div style={estilos} className="palabra-centro">
                {mostrarCirculo && esActiva && (
                    <div className="efecto-circulo"></div> // Círculo animado
                )}
                <img
                    src={target}
                    alt="icono"
                    style={{
                        position: "absolute",
                        top: "-15px", // Ajusta la posición del icono sobre la palabra
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "10px", // Tamaño del ícono
                        height: "10px",
                        color: "white",
                    }}
                />
                <p>{texto}</p>
            </div>
        </div>
    );
}

export default Palabra;