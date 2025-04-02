"use client"
import { Type, AlignLeft, Quote } from "lucide-react";
import {Image} from "lucide-react";

export default function FormHeader({ dataHeader, setFormData }) {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  return (
    <div
      className="w-full h-screen md:h-[80vh] relative flex items-center justify-center text-center px-6 sm:px-12 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${dataHeader.url_image.startsWith('http') ? dataHeader.url_image : "/blog/fondo_blog_extend.png"})`,
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative max-w-7xl text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center max-w-xl">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 neon-textov4">
            {dataHeader.titulo}
          </h1>
          <h2 className="text-2xl md:text-xl font-bold mb-4">
            {dataHeader.texto_frase}
          </h2>
          <p className="text-lg text-gray-300 font-light">
            {dataHeader.texto_descripcion}
          </p>
        </div>

        <div className="w-full md:w-auto flex justify-center md:justify-end">

          <div className="bg-black/5 backdrop-blur-md ml-8 rounded-2xl p-8 shadow-lg w-[450px] max-w-lg overflow-auto">
            <form className="space-y-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Editar Encabezado
              </h3>
              <div>
                <label className="flex items-center text-white text-sm font-medium mb-2">
                  <Type className="w-5 h-5 mr-2 text-purple-400" /> Título
                </label>
                <input
                  type="text"
                  name="titulo"
                  value={dataHeader.titulo}
                  onChange={handleChange}
                  className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Título principal"
                />
              </div>

              <div>
                <label className="flex items-center text-white text-sm font-medium mb-2">
                  <Quote className="w-5 h-5 mr-2 text-purple-400" /> Frase Destacada
                </label>
                <input
                  type="text"
                  name="texto_frase"
                  value={dataHeader.texto_frase}
                  onChange={handleChange}
                  className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Frase destacada"
                />
              </div>
              <div>
                <label className="flex items-center text-white text-sm font-medium mb-2">
                  <AlignLeft className="w-5 h-5 mr-2 text-purple-400" /> Frase Secundaria
                </label>
                <input
                  name="texto_descripcion"
                  value={dataHeader.texto_descripcion}
                  onChange={handleChange}
                  rows={4}
                  className="w-full  bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                  placeholder="Frase Secundaria"
                />
              </div>
              <div>
                <label className="flex items-center text-white text-sm font-medium mb-2">
                  <Quote className="w-5 h-5 mr-2 text-purple-400" /> Imagen
                </label>
                <div  className="relative w-full">
                    <input
                    accept="image/*"
                    type="file"
                    name="url_image"
                    onChange={handleChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex items-center justify-center w-full p-3 border-2 border-dashed border-gray-700 rounded-lg bg-gray-900 text-white transition-all hover:border-purple-500 hover:bg-gray-800">
                    <Image className="w-5 h-5 mr-2 text-purple-400" />
                    <span className="text-sm">Selecciona una imagen</span>
                </div>
                </div>
                
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}