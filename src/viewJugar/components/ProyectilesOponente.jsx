
const ProyectilesOponente = (proyectiles) => {

    return (
        <>
            {proyectiles.proyectiles && (proyectiles.proyectiles.map((proyectil, index) => (
                <>
                    {proyectil && (
                        <div
                            key={index}
                            style={{
                                position: "absolute",
                                top: proyectil.y,
                                left: proyectil.x,
                                color: "white",
                            }}
                        >
                            {proyectil.texto}
                        </div>
                    )}
                </>
            )))}
        </>
    );
};

export default ProyectilesOponente;