"use client"
import { Type, AlignLeft, Quote } from "lucide-react";
import UploadImage from '../components/UploadImage'

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
        backgroundImage: `url(${dataHeader.public_image && dataHeader.public_image.startsWith('http') ? dataHeader.public_image : "/blog/fondo_blog_extend.png"})`,
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative max-w-7xl text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center max-w-xl">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 neon-textov4">
            {dataHeader.titulo || "Título del Blog"}
          </h1>
          <h2 className="text-2xl md:text-xl font-bold mb-4">
            {dataHeader.texto_frase || "Frase destacada"}
          </h2>
          <p className="text-lg text-gray-300 font-light">
            {dataHeader.texto_descripcion || "Descripción del blog"}
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
                  <h1 className="ml-3 mt-1 text-xs">Máximo 30 caracteres</h1>
                </label>
                <input
                  type="text"
                  name="titulo"
                  value={dataHeader.titulo || ""}
                  onChange={handleChange}
                  maxLength={30}
                  autoComplete="off"
                  className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Título principal"
                  required
                />
              </div>

              <div>
                <label className="flex items-center text-white text-sm font-medium mb-2">
                  <Quote className="w-5 h-5 mr-2 text-purple-400" /> Frase Destacada
                  <h1 className="ml-3 mt-1 text-xs">Máximo 50 caracteres</h1>
                </label>
                <input
                  type="text"
                  name="texto_frase"
                  value={dataHeader.texto_frase || ""}
                  onChange={handleChange}
                  maxLength={50}
                  autoComplete="off"
                  className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Frase destacada"
                  required
                />
              </div>
              <div>
                <label className="flex items-center text-white text-sm font-medium mb-2">
                  <AlignLeft className="w-5 h-5 mr-2 text-purple-400" /> Frase Secundaria
                  <h1 className="ml-3 mt-1 text-xs">Máximo 80 caracteres</h1>
                </label>
                <input
                  name="texto_descripcion"
                  value={dataHeader.texto_descripcion || ""}
                  onChange={handleChange}
                  rows={4}
                  maxLength={80}
                  autoComplete="off"
                  className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                  placeholder="Frase Secundaria"
                  required
                />
              </div>
              <div>
                <label className="flex items-center text-white text-sm font-medium mb-2">
                  <Quote className="w-5 h-5 mr-2 text-purple-400" /> Imagen
                  <h1 className="ml-3 mt-1 text-xs">1920x1080 píxeles</h1>
                </label>
                <UploadImage
                  uploadPreset="nextjs_digimedia_blog_head"
                  folder="blogs/headers/"
                  name_public="public_image"
                  name_url="url_image"
                  size_image={10 * 1024 * 1024}
                  width={1920}
                  height={1080}
                  public_id={dataHeader.url_image}
                  setFormData={setFormData}
                  crop="fill"
                />
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}