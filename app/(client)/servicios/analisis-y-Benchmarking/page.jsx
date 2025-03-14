import React from 'react';

const Page = () => {
  return (
    <>
      {/* Sección principal con imagen de fondo, usada tanto en PC como en Celular */}
      <main className="bg-[url(/image-home/inicio.webp)] bg-cover bg-[30%] h-[calc(100vh-67px)] ">
        <div className='md:hidden flex justify-start p-2'>
          <h1 className="text-white font-bold text-3xl p-2 md:text-6xl text-start justify-start my-10 w-[270px]">
            ANÁLISIS Y BENCHMARKING
          </h1>
        </div>
        {/* Contenido para PC */}
        <div className="hidden md:flex flex-col items-center justify-center h-full md:justify-end md:items-end md:mx-0">
          <div className='max-w-[600px] px-5'>
            <h1 className="text-white font-bold text-3xl md:text-6xl text-end pt-10">
              ANÁLISIS Y BENCHMARKING
            </h1>
            <div className="bg-[rgba(123,34,179,0.5)] text-end py-4 px-10 rounded-xl md:text-left">
              <h3 className="text-white m-auto md:m-0 font-bold text-2xl p-2 text-end">¿Qué es benchmarking?</h3>
              <p className="text-white m-auto md:m-0 text-end">
                En inglés, benchmark significa “punto de referencia”, y benchmarking significa “evaluación comparativa". Es decir, que el benchmarking consiste en evaluar y analizar los procesos, productos, servicios y/o demás aspectos de otras compañías y tomarlos como punto de referencia para tus futuras estrategias.
              </p>
              <div className="text-white my-4">
                <h3>OFRECEMOS:</h3>
                <ul className="list-disc list-inside">
                  <li>Análisis Competitivo Profundo</li>
                  <li>Medición de Indicadores Clave (KPI)</li>
                  <li>Recomendaciones Estratégicas</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-[rgb(102,51,134)] text-white text-center m-5 p-2 rounded-xl">
            <h3>¡Empieza ahora!</h3>
          </div>
        </div>

        {/* Contenido para Celular */}
        <div className="celular flex flex-col items-center justify-center h-full md:hidden">
          <div className="bg-[rgba(148,58,176,0.45)] text-white text-center m-5 p-2 rounded-xl">
            <h3>¡Empieza ahora!</h3>
          </div>
          <div className="bg-[rgba(123,34,179,0.5)] text-end py-4 px-10 rounded-xl text-white">
            <h3 className="text-center">OFRECEMOS:</h3>
            <ul className="list-disc list-inside text-center">
              <li>Análisis Competitivo Profundo</li>
              <li>Medición de Indicadores Clave (KPI)</li>
              <li>Recomendaciones Estratégicas</li>
            </ul>
          </div>
        </div>
      </main>

      {/* Sección adicional solo para móvil */}
      <div className="celular md:hidden bg-[rgb(102,51,134)] flex flex-col items-center justify-start py-14 px-10 h-[700px]">
        <h3 className="text-white max-w-96 text-start p-5">¿Qué es benchmarking?</h3>
        <p className="text-white max-w-96 ">
          En inglés, benchmark significa “punto de referencia”, y benchmarking significa “evaluación comparativa". Es decir, que el benchmarking consiste en evaluar y analizar los procesos, productos, servicios y/o demás aspectos de otras compañías y tomarlos como punto de referencia para tus futuras estrategias.
        </p>
      </div>
    </>
  );
};

export default Page;
