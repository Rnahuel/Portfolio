const PantallaJuegoFinalizado = ({ display }) => {
  return (
    <div
      className="z-10 absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-4 sm:px-8"
      style={{ display: display }}
    >
      <div
        width={"w-128"}
        className="bg-[#314e52] max-w-sm sm:max-w-md lg:max-w-lg mx-auto p-4 sm:p-8 rounded-md shadow-lg space-y-6"
      >
        <p className="text-center font-bold text-lg sm:text-xl">
          Perdiste el juego :(
        </p>
        <div className="flex flex-col items-center space-y-4 text-sm sm:text-base">
          <h2 className="text-center">
            Puedes seguir viendo como se actualiza el ranking hasta que los
            demas jugadores terminen sus partidas para ver las estadisticas
            finales.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default PantallaJuegoFinalizado;
