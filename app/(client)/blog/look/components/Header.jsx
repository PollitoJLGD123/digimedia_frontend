export default function Header({

  /*SI Referenciables para el cambio de contenido*/
  url_image,
  tituloPrincipal = "TU BAR EN LA MIRA",
  tituloSecundario = "El Letro Perfecto para Cautivar a los Clientes",
  descripcion = "Haz que tu bar sea tu mejor amigo en la mira de tus clientes",

    /*NO referenciables*/
    backgroundOverlay = "bg-gradient-to-r from-transparent via-transparent to-black/80",
    tituloClase = "text-5xl md:text-6xl font-extrabold mb-4 neon-textov4",
    subtituloClase = "text-2xl md:text-xl font-bold mb-4",
    descripcionClase = "text-lg text-gray-300 font-light",
    decoracion = true,
  }) {
    return (
      <div
        className="w-full h-screen md:h-[80vh] relative flex items-center justify-end text-center px-6 sm:px-12 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${url_image})` }}
      >
        <div className={`absolute inset-0 ${backgroundOverlay}`}></div>
  
        <div className="relative z-10 max-w-3xl text-right pr-5 text-white">
          <h1 className={tituloClase}>{tituloPrincipal}</h1>
  
          <h2 className={subtituloClase}>{tituloSecundario}</h2>
  
          <p className={descripcionClase}>{descripcion}</p>
  
          {decoracion && <div className=" w-20 h-1 bg-white mt-6 ml-auto"></div>}
        </div>
      </div>
  );
}
