import { useSelector } from "react-redux";

export default function Estadisticas({ disposicion = "row"}) {

    const puntos = useSelector(state => state.estadisticas.puntos);
    const racha = useSelector(state => state.estadisticas.racha);
    const palabras = useSelector(state => state.estadisticas.palabras);
    const errores = useSelector(state => state.estadisticas.errores);
    const juego = useSelector((state) => state.juego);

    let className, displayPuntos, displayPalabras, displayRacha, displayErrores;
    switch (juego.modo) {
    case 'versus':
        displayPuntos= "Block";
        displayPalabras= "Block";
        displayRacha= "Block";
        displayErrores= "Block";
        disposicion = `column`
        className= `w-1/2 flex justify-center p-1.5 border-2 border-verde font-black`;
        break;

    case 'jugarMultijugador':
        displayPuntos= "Block";
        displayPalabras= "Block";
        displayRacha= "Block";
        displayErrores= "Block";
        className = ``;
        break;

    case 'jugarCelular':
        displayPuntos= "Block";
        displayPalabras= "None";
        displayRacha= "None";
        displayErrores= "None";
        className="w-10% flex justify-around p-1.5 border-2 border-verde font-black absolute bottom-0 text-sm"
        break;            

    default:
        displayPuntos= "Block ";
        displayPalabras= "Block";
        displayRacha= "Block";
        displayErrores= "Block";
        className="w-full flex justify-around p-2 border-2 border-verde font-black absolute bottom-0";
        break;
    }

    return (
        <>
            <div 
                style={{flexDirection: disposicion}}
                className={`${className}`}
            >    
                <p className="text-blue-300 " style = {{display: `${displayPuntos}`}}>PUNTOS: {puntos}</p>
                <p className="text-emerald-400" style = {{display: `${displayPalabras}`}}>PALABRAS: {palabras}</p>
                <p className="text-yellow-300" style = {{display: `${displayRacha}`}}>RACHA: {racha}</p>
                <p className="text-red-400" style = {{display: `${displayErrores}`}}>ERRORES: {errores}</p>
            </div>
        </>
    );
}