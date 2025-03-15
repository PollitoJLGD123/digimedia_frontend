import React from 'react';
import Contactanos from '../components/Contactanos';
import Description from '../components/Description';
import Main from '../components/Main';
import ModalScroll from '../components/ModalScroll';
import ModalButton from '../components/ModalButton';
import './globals.css';

export default function UXUI() {
  return (
    <div className="relative min-h-screen flex flex-col items-center bg-gray-100">
      
      {/* Imagen de fondo con mejor responsividad y sin espacio blanco */}
      <div className="absolute inset-0 bg-cover bg-center opacity-30 md:opacity-30 lg:opacity-30" 
        style={{ backgroundImage: "url('/servicios/DiseñoUI/Digimediaui.jpg')" }} alt="Fondo UX/UI">
      </div>

      <div className="relative z-10 w-full">
        <ModalScroll
          text="¡MEJORA TU EXPERIENCIA DIGITAL!"
          fondo="/servicios/desarrollo/modal-scroll/fondo.webp"
          title="DISEÑOS UX Y UI ATRACTIVOS"
          serviceName="2"
        />

        <ModalButton
          title="Haz que tu sitio sea intuitivo y visualmente atractivo"
          fondo="/servicios/uxui/modal-button/imagen.webp"
          text="Solicita una asesoría gratuita"
          serviceName="2"
        />

        {/* Contenedor principal con imagen de fondo y texto */}
        <div className="relative w-full h-full bg-cover bg-center">

          {/* Contenedor principal con flexbox para alinear horizontalmente */}
          <div className="flex justify-between items-center py-16 px-4 md:px-0 relative z-10">
            {/* Contenedor del título con fondo morado pegado a la derecha */}
            <div className="flex-1 text-center md:text-center relative z-10 text-white ml-auto"> {/* Agregado ml-auto */}
              <div className="bg-gradient-to-r from-purple-600 via-pink-500 opacity-200 p-8">
                <h1 className="text-4xl font-extrabold mb-4">DISEÑOS<br /> UX Y UI</h1>
              </div>
            </div>

            {/* Espacio en blanco para centrar el contenido */}
            <div className='w-xs'></div> 

            {/* Contenedor del párrafo sin fondo */}
            <div className="flex-1 text-left md:text-left pl-4">
              <p className="text-lg md:text-xl font-semibold ml-px">
                Ofrecemos diseño UX para usabilidad y satisfacción, y UI para una interfaz atractiva.
                Juntos, creamos productos digitales intuitivos, agradables y efectivos.
              </p>
            </div>
          </div>
        </div>

        {/* Sección de características con Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2 px-4 w-full">
          {/* Primer bloque */}
          <div className="flex flex-col items-center md:items-center md:translate-x-[-10px] md:translate-y-[20px]">
            <p className="font-montserrat text-black text-lg md:text-xl font-extrabold uppercase tracking-wide">USABILIDAD</p>
            <img src="/servicios/DiseñoUI/servicio12.jpg" alt="Usabilidad y satisfacción" className="w-60 h-auto mt-4" />
          </div>

          {/* Segundo bloque */}
          <div className="flex flex-col items-center md:items-center md:translate-x-[10px] md:translate-y-[20px]">
            <p className="font-montserrat text-black text-lg md:text-xl font-extrabold uppercase tracking-wide">CREATIVIDAD</p>
            <img src="/servicios/DiseñoUI/servicios13.jpg" alt="Creatividad" className="w-60 h-auto mt-4" />
          </div>

          {/* Tercer bloque */}
          <div className="flex flex-col items-center md:items-center md:translate-x-[10px] md:translate-y-[20px]">
            <p className="font-montserrat text-black text-lg md:text-xl font-extrabold uppercase tracking-wide">INTERFAZ VISUAL</p>
            <img src="/servicios/DiseñoUI/servicio14.jpg" alt="Interfaz visual" className="w-60 h-auto mt-4" />
          </div>
        </div>

        {/* Nueva sección específica para esta página, colocada más abajo */}
        <div className="relative z-10 mt-[120px] px-4">
          <Description
            title="Diseño de Experiencia de Usuario (UX) y Diseño de Interfaz (UI)"
            text="Nos enfocamos en crear experiencias digitales centradas en los usuarios, mejorando la usabilidad y la interacción con los productos digitales."
          />

          <Contactanos
            text="Optimiza la experiencia digital de tus clientes con nuestros servicios UX/UI"
            iconLeft="/servicios/uxui/icon-left.svg"
            iconRight="/servicios/uxui/icon-right.svg"
          />
        </div>
      </div>
    </div>
  );
}

