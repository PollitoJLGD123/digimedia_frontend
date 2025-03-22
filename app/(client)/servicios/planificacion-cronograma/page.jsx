'use client'
import React from 'react';

import ModalButton from '../components/ModalButton';


export default function PlanificacionCronograma() {
    return (
        <div>
            {/* Hero Section para Desktop */}
            <div className="relative bg-cover bg-no-repeat bg-center h-auto" style={{ backgroundImage: 'url("/servicios/planificacion/planificacion-background.png")' }}>
             {/* Fondo blanco transparente solo sobre la imagen */}
             <div className="absolute inset-0 bg-white bg-opacity-80 lg:hidden"></div>
                <div className="relative z-10 text-right p-8 md:p-16">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 mt-5 text-purple-700 text-center sm:text-right">
                        PLANIFICACIÓN <br /> Y CRONOGRAMA
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl mb-10 mt-5 text-black lg:block hidden">
                        Se organiza y estructura el contenido <br /> con un calendario <br /> estratégico, asegurando <br /> publicaciones consistentes <br /> y alineadas con tus objetivos.
                    </p>
                    <div className='lg:block hidden'>
                        
                    <button
                        className="bg-pink-500 hover:bg-pink-600 text-white text-right text-lg font-bold py-5 px-10 rounded-lg mb-3 mt-3"
                        onClick={() => window.location.href = '/contactanos'}>
                         Asesoría Gratis
                    </button>
                       
                    </div>
                   </div>
            </div>


            {/* Sección para Pantallas Móviles */}
            <div className="lg:hidden bg-purple-400 p-8 md:p-16 text-center">
                <p className="text-lg sm:text-xl md:text-2xl text-black mb-5">
                    Se organiza y estructura el contenido con un calendario estratégico, asegurando publicaciones consistentes y alineadas con tus objetivos.
                </p>
                <button className="bg-pink-500 hover:bg-pink-600 text-white text-lg font-bold py-5 px-10 rounded-lg mb-5 mx-auto block">
                    Asesoría Gratis
                </button>

                {/* Nueva imagen con Gradiente debajo del Párrafo (solo en pantallas pequeñas) */}
                <div className='border-4 border-white rounded-lg overflow-hidden'>
                    <img src='/servicios/planificacion/planificacion_imagen2.png' alt="Imagen con gradiente" className="object-cover w-full h-auto" />
                </div>
            </div>

            {/* Componentes debajo del Hero */}
            <div className="py-0 px-8 md:px-16">
            </div>
        </div>
    );

  }