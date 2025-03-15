import React from 'react';

const Page = () => {
  return (
    <>
      {/* Sección principal con imagen de fondo, usada tanto en PC como en Celular */}
      <main className="bg-[url(/image-home/inicio.webp)] bg-cover bg-[30%] h-[calc(100vh-67px)] ">
        <div className='md:hidden flex justify-end p-2'>
          <h1 className="text-white font-bold text-3xl p-2 md:text-6xl text-end justify-end my-10 bg-[rgba(214,167,243,0.5)] rounded-xl w-[270px]">
            PLANIFICACION ESTRATEGICA
          </h1>
        </div>
        <div className="hidden md:flex flex-col items-center justify-center h-full md:justify-end md:items-end md:mx-0">
          <div className='max-w-[540px]'>
            <h1 className="text-white font-bold text-3xl md:text-6xl text-end py-10 px-5">
              PLANIFICACION ESTRATEGICA
            </h1>
            <div className="bg-[rgba(123,34,179,0.5)] text-end py-4 px-10 rounded-tl-xl rounded-bl-xl md:text-left">
              <p className="text-white m-auto md:m-0 text-center">
                Aquí se diseñan estrategias personalizadas con objetivos claros, segmentación precisa y tácticas eficaces para alcanzar tus metas de negocio.
              </p>
              <div className="text-white my-4">
                <ul className="list-disc list-inside">
                  <li>Mejora de la Visibilidad y el Alcance</li>
                  <li>Optimización de la Experiencia del Cliente</li>
                  <li>Eficiencia Operacional</li>
                  <li>Toma de Decisiones Basada en Datos</li>
                  <li>Competitividad</li>
                </ul>
              </div>
            </div>
            <div className='flex justify-center'>
              <div className="bg-[white] text-[rgb(102,51,134)] text-center m-5 p-2 rounded-xl px-5 border-2 border-[rgb(102,51,134)]">
                <h3>¡Empieza ahora!</h3>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Sección adicional solo para móvil */}
      <div className="celular md:hidden bg-[rgb(102,51,134)] flex flex-col items-center px-10 h-[700px]">
        <div className="celular flex flex-col items-center h-full md:hidden">
          <div className="bg-[white] text-[rgb(102,51,134)] text-center m-5 p-2 rounded-xl px-5 border-2 border-[rgb(102,51,134)]">
            <h3>¡Empieza ahora!</h3>
          </div>
          <div className="bg-[rgba(214,167,243,0.5)] text-start py-4 px-10 rounded-xl text-white">
            <ul className="list-disc list-inside">
              <li>Mejora de la Visibilidad y el Alcance</li>
              <li>Optimización de la Experiencia del Cliente</li>
              <li>Eficiencia Operacional</li>
              <li>Toma de Decisiones Basada en Datos</li>
              <li>Competitividad</li>
            </ul>
          </div>
          <div>
            <p className="text-white max-w-96 text-center m-10">
            Aquí se diseñan estrategias personalizadas con objetivos claros, segmentación precisa y tácticas eficaces para alcanzar tus metas de negocio.
            </p>
          </div> 
        </div>
        
      </div>
    </>
  );
};

export default Page;
