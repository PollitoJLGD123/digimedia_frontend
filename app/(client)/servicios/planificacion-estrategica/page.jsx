import React from 'react';

const Page = () => {
  return (
    <div>
      {/* Sección principal con imagen de fondo, usada tanto en PC como en Celular */}
      <main className="bg-[url(/servicios/planificacion-estrategica/img-main.webp)] h-[50%] bg-cover bg-[30%] md:h-[calc(140vh-67px)]">
        <div className='md:hidden flex justify-end p-2'>
          <h1 className="text-white font-bold text-3xl p-2 md:text-6xl text-end justify-end my-10 bg-[rgba(214,167,243,0.5)] rounded-xl w-[270px]">
            PLANIFICACION ESTRATEGICA
          </h1>
        </div>
        <div className="hidden md:flex flex-col items-center justify-center h-full md:justify-start md:items-end md:mx-0">
          <div className='flex flex-col max-w-[530px] justify-end align-end'>
            <h1 className="text-black font-bold text-3xl md:text-6xl text-end py-10 px-2">
              PLANIFICACION ESTRATEGICA
            </h1>
            <div className="bg-[rgba(123,34,179,0.5)] text-end py-4 px-10 rounded-tl-2xl rounded-bl-2xl md:text-left max-w-[200px]flex flex-col justify-end align-end">
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
              <div className="bg-[white] text-[rgb(102,51,134)] text-center my-5 p-2 rounded-xl px-5 border-2 border-[rgb(102,51,134)]">
                <h3>¡Empieza ahora!</h3>
              </div>
            </div>
          </div>
        </div>
        {/* Contenido para Celular */}
        <div className="celular md:hidden bg-[#7b22b3] flex flex-col items-center px-10 h-[800px] mt-[370px]">
          <div className="celular flex flex-col items-center h-full md:hidden">
            <div className="bg-[white] text-[rgb(102,51,134)] text-center m-5 p-2 rounded-xl px-5 border-2 border-[rgb(102,51,134)] text-3xl">
              <h3>¡Empieza ahora!</h3>
            </div>
            <div className="bg-[rgba(214,167,243,0.5)] text-start py-4 px-10 rounded-xl text-white text-1xl">
              <ul className="list-disc list-inside">
                <li>Mejora de la Visibilidad y el Alcance</li>
                <li>Optimización de la Experiencia del Cliente</li>
                <li>Eficiencia Operacional</li>
                <li>Toma de Decisiones Basada en Datos</li>
                <li>Competitividad</li>
              </ul>
            </div>
            <div className="my-10">
              <p className="text-white max-w-96 text-center m-10 text-2xl mt-10">
              Aquí se diseñan estrategias personalizadas con objetivos claros, segmentación precisa y tácticas eficaces para alcanzar tus metas de negocio.
              </p>
            </div> 
             
          </div>
        </div>
      </main>

      
    </div>
  );
};

export default Page;
