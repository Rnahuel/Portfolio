import tecleadorBlanco from "../../assets/images/TecleadorBlanco.webp";

export default function JugadorOponente({ anguloNuevo }) {

  return (
    <div
      className="absolute left-2/4 top-[95%]"
      style={{
        width: 50,
        height: 50,
      }}
    >
      <img
        src={tecleadorBlanco}
        alt="GIF"
        className="relative -top-2/4 -left-2/4"
        style={{
          width: 50,
          height: 50,
          transform: `rotate(${anguloNuevo}deg)`,
        }}
      />
    </div>
  );
}
