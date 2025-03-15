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
          <div className='max-w-[560px]'>
            <h1 className="text-white font-bold text-3xl md:text-6xl text-end pt-10 px-5">
              ANÁLISIS Y BENCHMARKING
            </h1>
            <div className="bg-[rgba(123,34,179,0.7)] text-end py-4 px-10 rounded-tl-xl rounded-bl-xl md:text-left">
              <h3 className="text-white m-auto md:m-0 font-bold text-2xl p-2 text-end">¿Qué es benchmarking?</h3>
              <p className="text-white m-auto md:m-0 text-end">
                En inglés, benchmark significa “punto de referencia”, y benchmarking significa “evaluación comparativa". Es decir, que el benchmarking consiste en evaluar y analizar los procesos, productos, servicios y/o demás aspectos de otras compañías y tomarlos como punto de referencia para tus futuras estrategias.
              </p>
              <div className="text-white my-4">
                <h3 className='font-bold '>OFRECEMOS:</h3>
                <ul className="list-disc list-inside">
                  <li>Análisis Competitivo Profundo</li>
                  <li>Medición de Indicadores Clave (KPI)</li>
                  <li>Recomendaciones Estratégicas</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-[rgb(102,51,134)] text-white text-center m-5 p-2 rounded-xl px-5">
            <h3>¡Empieza ahora!</h3>
          </div>
        </div>

        {/* Contenido para Celular */}
        <div className="celular flex flex-col items-center justify-center align-middle h-full md:hidden">
          <div className="bg-[white] text-[rgb(102,51,134)] text-center m-5 p-2 rounded-xl px-5 border-2 border-[rgb(102,51,134)]">
            <h3>¡Empieza ahora!</h3>
          </div>
          <div className="bg-[rgba(222,201,235,0.84)] text-[rgb(102,51,134)] text-end py-4 px-10 rounded-xl ">
            <h3 className="text-center">OFRECEMOS:</h3>
            <ul className="list-disc list-inside text-start">
              <li>Análisis Competitivo Profundo</li>
              <li>Medición de Indicadores Clave (KPI)</li>
              <li>Recomendaciones Estratégicas</li>
            </ul>
          </div>
        </div>
      </main>

      {/* Sección adicional solo para móvil */}
      <div className="celular md:hidden bg-[rgb(102,51,134)] flex flex-col items-center justify-start py-14 px-10 h-[700px]">
        <h3 className="text-white max-w-96 text-start p-5 text-2xl font-bold">¿Qué es benchmarking?</h3>
        <p className="text-white max-w-96 ">
          En inglés, benchmark significa “punto de referencia”, y benchmarking significa “evaluación comparativa". Es decir, que el benchmarking consiste en evaluar y analizar los procesos, productos, servicios y/o demás aspectos de otras compañías y tomarlos como punto de referencia para tus futuras estrategias.
        </p>
      </div>
    </>
  );
};

export default Page;
