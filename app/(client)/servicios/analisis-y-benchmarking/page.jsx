import React from 'react';

const Page = () => {
  return (
    <div className='bg-[#7b22b3] h-[1300px] md:h-auto pb-[300px] md:pb-0'>
      {/* Sección principal con imagen de fondo, usada tanto en PC como en Celular */}
      <main className="flex flex-col justify-center bg-[url(/servicios/analisis-y-benchmarking/img-main.webp)] h-[700px] bg-cover bg-[30%_40%] md:h-[calc(120vh-67px)] md:mb-0">
        
        {/* Contenido para PC */}
        <div className="hidden md:flex flex-col items-center justify-center h-full md:justify-start md:items-end md:mx-0">
          <div className='max-w-[560px]'>
            <h1 className="text-white font-bold text-3xl md:text-5xl text-end py-2 mt-4 px-10">
              ANÁLISIS Y BENCHMARKING
            </h1>
            <div className="bg-[rgba(123,34,179,0.7)] text-end py-4 px-10 rounded-tl-[50px] rounded-bl-[50px] md:text-left">
              <h3 className="text-white m-auto font-bold text-2xl p-2 text-end">¿Qué es benchmarking?</h3>
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
          <div className="bg-[rgb(102,51,134)] text-white text-center m-5 p-2 rounded-xl px-5 text-2xl">
            <h3>¡Empieza ahora!</h3>
          </div>
        </div>

        {/* Contenido para Celular */}
        <div className='flex flex-col celular md:hidden items-center h-[1000px] mt-[250px] justify-start align-start w-full'>
          <div className='md:hidden flex justify-start p-2 text-start align-top w-full'>
              <h1 className="text-white font-bold text-3xl p-2 md:text-5xl text-start justify-start my-10 w-[270px]">
                ANÁLISIS Y BENCHMARKING
              </h1>
          </div>
        
          <div className='flex flex-col celular md:hidden bg-[#7b22b3] items-center h-[800px] mt-[300px] justify-start align-start w-full mb-[20px]'>
            
            <div style={{
                boxShadow: "0px -20px 40px -10px #7b22b3", }}
            className="celular md:hidden flex flex-col items-center justify-start px-10">
              <div style={{
                backgroundColor: "white",
                boxShadow: "0px 0px 80px 40px #7b22b3", }}
                className="bg-[white] text-[rgb(102,51,134)] text-center mb-5 p-2 rounded-xl px-5 border-2 border-[rgb(102,51,134)] text-2xl">
                
                <h3>¡Empieza ahora!</h3>
              </div>
              <div className="bg-[rgba(222,201,235,0.84)] text-[rgb(102,51,134)] text-end py-6 px-4 my-4 rounded-xl ">
                <h3 className="text-start text-2xl">OFRECEMOS:</h3>
                <ul className="list-disc list-inside text-start">
                  <li>Análisis Competitivo Profundo</li>
                  <li>Medición de Indicadores Clave (KPI)</li>
                  <li>Recomendaciones Estratégicas</li>
                </ul>
              </div>
              <div className='flex flex-col justify-center mt-10 mb-20'> 
                <h3 className="text-white max-w-96 text-start pb-8 text-2xl font-bold">¿Qué es benchmarking?</h3>
                <p className="text-white max-w-96 ">
                  En inglés, benchmark significa “punto de referencia”, y benchmarking significa “evaluación comparativa". Es decir, que el benchmarking consiste en evaluar y analizar los procesos, productos, servicios y/o demás aspectos de otras compañías y tomarlos como punto de referencia para tus futuras estrategias.
                </p>

              </div>
              
            </div>
            

          </div>
          </div>
        
        
        
      </main>
    </div>
  );
};

export default Page;
