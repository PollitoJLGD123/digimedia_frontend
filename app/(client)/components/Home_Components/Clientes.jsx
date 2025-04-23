'use client'
import { useState, useEffect, useRef } from "react";

export default function Clientes() {
  const [activeIndex, setActiveIndex] = useState(0); // Comienza en la primera imagen
  const [noTransition, setNoTransition] = useState(false);
  const [itemsPerSlide, setItemsPerSlide] = useState(1); // Default to 1 item per slide
  const transitionDuration = 700;
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const clientes = [
    { src: "/image-home/contigo_voy.svg", alt: "Contigo Voy logo" },
    { src: "/image-home/digimedia.svg", alt: "Digimedia logo" },
    { src: "/image-home/nhl.svg", alt: "NHL logo" },
    { src: "/image-home/tami.svg", alt: "Tami logo" },
    { src: "/image-home/yuntas.svg", alt: "Yuntas logo" },
    { src: "/image-home/prevemedic.svg", alt: "prevemedic logo" },
    { src: "/image-home/mj_eventos.svg", alt: "MJ eventos logo" },
    { src: "/image-home/asden.svg", alt: "Asden logo" },
  ];

  // Ajusta el número de items por slide dependiendo del tamaño de la pantalla
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setItemsPerSlide(4); // 4 items por slide en pantallas grandes
      } else if (width >= 768) {
        setItemsPerSlide(3); // 3 items por slide en pantallas medianas
      } else {
        setItemsPerSlide(1); // 1 item por slide en pantallas pequeñas
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lógica para pasar de un conjunto de 4 imágenes a otro sin dejar espacios vacíos
  const nextSlide = () => {
    setNoTransition(false);
    if (activeIndex < clientes.length - itemsPerSlide) {
      setActiveIndex(prevIndex => prevIndex + 1); // Avanza 1 posición
    } else {
      // Vuelve al inicio sin espacios vacíos
      setActiveIndex(0); // Regresa al primer conjunto de imágenes
    }
  };

  const prevSlide = () => {
    setNoTransition(false);
    if (activeIndex > 0) {
      setActiveIndex(prevIndex => prevIndex - 1); // Retrocede 1 posición
    } else {
      // Si estamos en la primera imagen, saltamos al final
      setActiveIndex(clientes.length - itemsPerSlide); // Vuelve al último conjunto de imágenes
    }
  };

  const handleManualChange = (index) => {
    setNoTransition(false);
    setActiveIndex(index);
  };

  const startAutoSlide = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 4000);
  };

  const resetAutoSlide = () => {
    startAutoSlide();
  };

  useEffect(() => {
    clearTimeout(timeoutRef.current);

    // Si llegamos al índice final, volvemos al inicio sin transición
    if (activeIndex >= clientes.length) {
      timeoutRef.current = setTimeout(() => {
        setNoTransition(true);
        setActiveIndex(0);
      }, transitionDuration);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [activeIndex]);

  return (
    <section className="my-6 mx-12">
      <h3 className="text-2xl text-[#752E75]">NUESTROS CLIENTES</h3>

      <div className="relative w-full overflow-hidden" data-carousel="slide">
        <div
          className={`flex ${
            !noTransition ? "transition-transform duration-700 ease-in-out" : ""
          }`}
          style={{
            transform: `translateX(-${(activeIndex * 100) / itemsPerSlide}%)`,
          }}
        >
          {clientes.map((cliente, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-56 px-2`}
            >
              <a href={cliente.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={cliente.src}
                  alt={cliente.alt}
                  className="block w-full h-full object-contain"
                />
              </a>
            </div>
          ))}
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {clientes.map((_, index) => (
            <button
              key={index}
              className={`h-3 rounded-full transition-all duration-500 ${
                index === activeIndex
                  ? "bg-[#752E75] w-[1.25rem]"
                  : "bg-gray-300 w-3"
              }`}
              onClick={() => {
                handleManualChange(index);
                resetAutoSlide();
              }}
            />
          ))}
        </div>

        <button
          onClick={() => {
            prevSlide();
            resetAutoSlide();
          }}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 px-0"
        >
          <span className="text-[#752E75] text-3xl">&#10094;</span>
        </button>

        <button
          onClick={() => {
            nextSlide();
            resetAutoSlide();
          }}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 px-0"
        >
          <span className="text-[#752E75] text-3xl">&#10095;</span>
        </button>
      </div>
    </section>
  );
}