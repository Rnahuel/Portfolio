import "../../styles/Jugar.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pausarJuego, reanudarJuego } from "../features/juegoSlice";

const Tooltip = () => {
  const dispatch = useDispatch();
  const segundos = useSelector((state) => state.cronometro.segundos);
  const centro = useSelector((state) => state.tablero.centro);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasInput, setHasInput] = useState(false);

    useEffect(() => {
        if (!hasInput && segundos >= 10) {
            dispatch(pausarJuego());
            setShowTooltip(true);
        }
    }, [segundos]);


    const handleUserInput = () => {
        setHasInput(true);
        setShowTooltip(false);
        dispatch(reanudarJuego());
    };
    

    useEffect(() => {
        window.addEventListener('keydown', handleUserInput);
        return () => {
            window.removeEventListener('keydown', handleUserInput);
        };
    }, [])

    return (
        <>
            {showTooltip && (
                <>
                    <div className="mt-200">
                        <div style={{ position: 'absolute', top: 300, left: centro.x }}>
                            <div className="relative -top-2/4 -left-2/4">¡Tipeá las palabras lo más rápido que puedas!</div>
                        </div>
                        <div style={{ position: 'absolute', top: 400, left: centro.x }}>
                            <div className="relative -top-2/4 -left-2/4">^</div>
                        </div>
                        <div style={{ position: 'absolute', top: 425, left: centro.x }}>
                            <div className="relative -top-2/4 -left-2/4">Evitá que las palabras alcancen al tipeador.</div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Tooltip;
