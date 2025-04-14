import React from "react";

export const SectionMain = () => {
  return (
    <div className="relative z-10 text-right p-8 md:p-16">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 mt-5 text-purple-700 text-center sm:text-right">
        PLANIFICACIÓN <br /> Y CRONOGRAMA
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl mb-10 mt-5 text-black lg:block hidden">
        Se organiza y estructura el contenido <br /> con un calendario <br />{" "}
        estratégico, asegurando <br /> publicaciones consistentes <br /> y
        alineadas con tus objetivos.
      </p>
      <div className="lg:block hidden">
        <button
          className="bg-pink-500 hover:bg-pink-600 text-white text-right text-lg font-bold py-5 px-10 rounded-lg mb-3 mt-3"
          onClick={() => (window.location.href = "/contactanos")}
        >
          Asesoría Gratis
        </button>
      </div>
    </div>
  );
};
