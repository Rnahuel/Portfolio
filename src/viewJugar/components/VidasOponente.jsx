import corazonLleno from "../../assets/images/corazon_lleno.webp";
import corazonRoto from "../../assets/images/corazon_roto.webp";

export default function VidasOponente({ nroVidas }) {
    const corazones = Array(3).fill(0).map((_, index) => (
        <img
            key={index}
            src={index < nroVidas ? corazonLleno : corazonRoto}
            alt={index < nroVidas ? "Corazón lleno" : "Corazón roto"}
            className="w-8 h-7" // Ajusta el tamaño según sea necesario
        />
    ));

    return (
        <div
        className=""
       
        >
        {corazones}
        </div>
    );
}
