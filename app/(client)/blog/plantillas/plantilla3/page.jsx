'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Swal from 'sweetalert2';
import { useEffect, useState } from "react"
import { useSearchParams } from 'next/navigation';
import Fetch from '../../services/fetch';

const Page = () => {

  const [data, setDataResponse] = useState(null);
  const searchParams = useSearchParams();
  const id_blog = searchParams.get("id_blog");
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    try {
      setIsLoading(true);
      const response = await Fetch.fetchBlogById(id_blog);
      console.log(response);
      setDataResponse(response);
      console.log(data)
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error inesperado.",
        icon: "error",
        confirmButtonText: "OK"
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <h1></h1>;
  }

  return (
    <div>
      {
        isLoading ? (<h1></h1>) : (
          <Header
            id_blog_head={3}
          />
        )
      }

      <div className="container mx-auto px-4 py-12 relative bg-gradient-to-r text-black min-h-screen w-full">

        <div className="hidden lg:block w-20 xl:w-24 2xl:w-32 bg-gradient-to-b from-red-700 via-sky to-blue-800 fixed left-0 top-0 h-full -z-10"></div>

        <div className="relative lg:mx-48 p-6 bg-black/5 text-black rounded-lg shadow-[0px_10px_25px_rgba(0,0,0,0.25)]">
          {/* Contenido principal */}
          <div className="flex flex-col xl:flex-col lg:gap-6">
            <div className="w-full">
              <div className="mb-6 mt-5">
                <h2 className="text-5xl text-center font-extrabold text-red-500">Tu Bar, en la Mira</h2>
                <p className="text-lg text-center text-gray-400 mt-2">6 de marzo de 2023</p>
              </div>
              <p className="text-lg leading-relaxed md:px-8 text-center">
                Las luces neón LED se han convertido en un elemento diferenciador en el mundo de la hospitalidad. No solo son visualmente atractivos, sino que también refuerzan la identidad de tu negocio. En este artículo, exploraremos cómo las letras luminosas pueden marcar la diferencia en la experiencia de tus clientes.
              </p>
            </div>
            <figure className='flex justify-center w-full mt-4 md:mt-4'>
              <img src="/blog/blog-4.jpg" alt="Letrero de neón en un bar" className="w-80 xl:w-96 object-contain rounded-3xl shadow-lg border-2 border-red-500" />
            </figure>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 w-full mx-auto mt-16'>
            <div className="grid grid-cols-1 gap-8">
              {[{
                title: "El Factor Sorpresa y Distinción",
                text: "Las letras de neón LED permiten personalizar la imagen de tu local, haciendo que el nombre de tu bar sea visible desde lejos. Un diseño llamativo puede convertirse en un sello distintivo y en un punto de referencia para los clientes."
              }, {
                title: "Ambiente y Experiencia Visual",
                text: "La iluminación juega un papel crucial en la atmósfera de un bar. Los colores vibrantes y cálidos del neón LED pueden transformar un espacio ordinario en un entorno acogedor e instagrameable."
              }, {
                title: "Eficiencia Energética y Durabilidad",
                text: "A diferencia del neón tradicional, las luces LED son más eficientes, consumen menos energía y tienen una vida útil más prolongada."
              }, {
                title: "Marketing y Atracción de Clientes",
                text: "Un letrero de neón LED bien diseñado es una herramienta de marketing poderosa, capaz de captar la atención y aumentar la visibilidad de tu local."
              }].map((section, index) => (
                <div key={index} className="p-4 bg-gray-900 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold mb-2 text-blue-400">{section.title}</h3>
                  <p className="text-gray-100">{section.text}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col justify-center p-6 bg-gray-900  rounded-lg shadow-[0px_10px_25px_rgba(0,0,0,0.25)] text-center text-gray-100">
              <h3 className="text-4xl font-bold mb-3 text-green-400">
                Consejos para Elegir el Letrero Perfecto
              </h3>

              <ul className="text-2xl align-middle list-none text-black-600 space-y-2">

                <li className="flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 6L9 17l-5-5"></path>
                  </svg>
                  <span>Opta por colores que reflejen la personalidad de tu bar.</span>
                </li>

                <li className="flex items-top justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 6L9 17l-5-5"></path>
                  </svg>
                  <span>Considera el lugar de instalación para maximizar su impacto.</span>
                </li>

                <li className="flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 6L9 17l-5-5"></path>
                  </svg>
                  <span>Considera el lugar de instalación para maximizar su impacto.</span>
                </li>

              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
            {["/blog/blog4/image.png", "/blog/blog4/hepner1.png"].map((src, index) => (
              <div key={index} className="w-full h-64 overflow-hidden rounded-3xl shadow-xl border-2 border-purple-400">
                <img src={src} alt="Ejemplo de letrero" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          {
            isLoading ? (<h1></h1>) : (
              <Footer
                id_blog_footer={3}
              />
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Page;