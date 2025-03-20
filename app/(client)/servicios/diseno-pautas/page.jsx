'use client';
import React from 'react';
import ModalScroll from '../components/ModalScroll';
import ModalButton from '../components/ModalButton';
import { useState } from 'react';
import Contactanos from '../components/Contactanos';


export default function DisenoPauta() {
    return (
        <div>
            <div className='flex flex-col md:flex-row mt-4 mb-4' style={{ backgroundColor: "#8224b0" }}>{/* Contenedor principal */}
                {/* Sección de información */}
                <div className='flex flex-col justify-center items-center md:items-start md:w-1/2 p-5 md:ml-20'>{/* Agregado el margen a la izquierda solo en desktop */}
                    {/* Titulo */}
                    <div className='text-3xl sm:text-4xl md:text-5xl mb-2  text-white'>
                        <h1 className="font-[600] text-center md:text-left">Diseño de Pautas</h1>
                    </div>

                    {/* Imagen */}
                    <div className='flex justify-center w-full mb-5'>
                        <img src="/servicios/diseñoPautas/diseño_imagen.jpg" alt="imagen1" className='w-full h-auto max-w-md md:hidden' />
                    </div>

                    {/* Párrafo */}
                    <div className='text-white mb-5 text-center md:text-left md:text-xl max-w-md md:max-w-sm'>
                        <p className="leading-relaxed">
                            Creamos documentos visuales que definen la identidad, voz y tono de tu marca en redes sociales.
                        </p>
                    </div>

                    {/* Botón */}
                    <div className='flex justify-center'>
                        <button className='bg-gradient-to-r from-pink-600 via-pink-500 to-transparent hover:from-pink-600 hover:to-pink-700 text-white text-sm font-bold py-5 px-10 rounded-3xl md:font-base flex items-center space-x-3'>
                            <span>QUIERO COMENZAR AHORA</span>
                            <img src={'/servicios/diseñoPautas/arrow_outward.svg'} className="h-5 w-5" />
                        </button>
                        
                    </div>
                </div>
                
                {/* Sección de imágenes */}
                <div className='md:w-1/2 p-5 hidden md:flex'>
                    <img src="/servicios/diseñoPautas/diseño_imagen.jpg" alt="imagen1" className='w-full h-auto' />
                </div>
            </div>

            {/* Componentes debajo del Hero */}
            <div className="py-0 px-8 md:px-16">
                <ModalScroll
                text="¡DEFINE TU MARCA EN REDES!"
                fondo="/servicios/desarrollo/modal-scroll/fondo.webp"
                title="Diseño de Pautas"
                serviceName="2"
                />

                <ModalButton
                title="Haz que tu sitio sea intuitivo y visualmente atractivo"
                fondo="/servicios/uxui/modal-button/imagen.webp"
                text="Solicita una asesoría gratuita"
                serviceName="2"
                />
            </div>
        </div>
    );
}