import corazonLleno from "../../assets/images/corazon_lleno.webp";
import corazonRoto from "../../assets/images/corazon_roto.webp";
import { useSelector } from "react-redux";

export default function Vidas() {
    const nroVidas = useSelector((estado) => estado.contadorVidas.vidas);
    const juego = useSelector((state) => state.juego);
    const corazones = Array(3).fill(0).map((_, index) => (
        <img
            key={index}
            src={index < nroVidas ? corazonLleno : corazonRoto}
            alt={index < nroVidas ? "Corazón lleno" : "Corazón roto"}
            style={{ width: '30px', height: '30px' }}
        />
    ));

    return (
        <div className="vidas-contenedor">
        {corazones}
        </div>
    );
}
