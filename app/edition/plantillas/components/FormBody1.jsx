"use client";
import { Type, AlignLeft, Quote, Image } from "lucide-react";
import { Loader2, CheckCircle, ArrowRight } from "lucide-react"
import UploadImage from "./UploadImage";

export default function FormBody1(props) {
  const {
    formCommendBody,
    setFormCommendBody,
    formInfoBody,
    setFormInfoBody,
    formEncabezadoBody,
    setFormEncabezadoBody,
    formGaleryBody,
    setFormGaleryBody,
  } = props;

  const handleChange = (setter) => (e) => {
    const { name, value } = e.target;
    setter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeMap = (e, index, field) => {
    const { value } = e.target;
    setFormInfoBody(prevState => {
      const updatedState = [...prevState];
      updatedState[index] = { ...updatedState[index], [field]: value };
      return updatedState;
    });
  };

  console.log(formEncabezadoBody)

  return (
    <div className="relative p-0 text-black rounded-lg shadow-[0px_10px_25px_rgba(0,0,0,0.25)] overflow-hidden flex flex-row my-5 justify-center">
      <div className="w-[700px]">
        <div className="relative h-[400px] overflow-hidden">
          <div className="absolute bg-black/70"></div>
          <img
            src={
              formEncabezadoBody.public_image1
                ? formEncabezadoBody.public_image1.startsWith("http")
                  ? formEncabezadoBody.public_image1
                  : `/blog/${formEncabezadoBody.public_image1}`
                : "/blog/blog-4.jpg"
            }
            alt={formEncabezadoBody.titulo || "Imagen principal"}
            className="absolute w-full h-full object-cover"
          />
          <div className="relative h-full flex flex-col justify-end p-8 bg-black/70 backdrop-blur-sm">
            <p className="text-gray-400 mb-2 font-bold">{formEncabezadoBody.fecha}</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">{formEncabezadoBody.titulo}</h2>
          </div>
        </div>

        <div className="bg-black/5 p-8">
          <div className="relative mb-16 bg-white p-6 rounded-lg shadow-md -mt-12">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500"></div>
            <p className="text-lg leading-relaxed text-gray-700">{formEncabezadoBody.descripcion}</p>
          </div>

          <div className="mb-[100px]  p-10 px-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-[0px_10px_25px_rgba(0,0,0,0.25)] text-center text-gray-100">
            <div className="flex items-center justify-center mb-4">
              <div className="h-0.5 w-12 bg-green-400 mr-4"></div>
              <h3 className="text-2xl font-bold text-green-400">{formCommendBody.titulo || "Consejos"}</h3>
              <div className="h-0.5 w-12 bg-green-400 ml-4"></div>
            </div>

            <ul className="list-none text-black-600 space-y-3 max-w-2xl mx-auto">
              {formCommendBody &&
                [
                  formCommendBody.texto1,
                  formCommendBody.texto2,
                  formCommendBody.texto3,
                ]
                  .filter((text) => text)
                  .map((text, index) => (
                    <li key={`commend-${index}`} className="flex items-center gap-3 bg-gray-800/50 p-3 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                      <span className="text-left">{text}</span>
                    </li>
                  ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
            {[formGaleryBody.public_image2 || "/blog/blog-10.jpg", formGaleryBody.public_image3 || "/blog/blog-1.jpg"].map((src, index) => (
              <div key={index} className="group relative overflow-hidden rounded-xl shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                <img
                  src={src.startsWith("http") ? src : `${src}`}
                  alt={`Imagen ${index + 1} del artículo`}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                  <div className="flex items-center justify-center">
                    <span className="text-sm font-medium">Ver detalle</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-center">
              <div className="inline-block px-4 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
                Información Importante
              </div>
            </div>

            <div className="grid grid-cols-1 gap-28 pt-8">
              {formInfoBody.map((section, index) => {
                const styles = [
                  "bg-gradient-to-br from-gray-900 to-gray-800 border-l-4 border-blue-400",
                  "bg-gradient-to-br from-gray-800 to-gray-900 border-r-4 border-red-400",
                  "bg-gradient-to-br from-gray-900 to-gray-800 border-l-4 border-green-400",
                  "bg-gradient-to-br from-gray-800 to-gray-900 border-r-4 border-purple-400",
                ];

                return (
                  <div
                    key={`tarjeta-${index}`}
                    className={`p-5 rounded-lg shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${styles[index % styles.length]}`}
                  >
                    <h3 className="text-xl font-bold mb-3 text-blue-400">{section.titulo}</h3>
                    <p className="text-gray-100">{section.descripcion}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="w-[420px] flex flex-col justify-center gap-5 p-5">
        <div className="bg-black/5 backdrop-blur-md rounded-2xl p-8 shadow-lg w-full max-w-lg overflow-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <form className="space-y-6">
            <div>
              <label className="flex items-center text-white text-sm font-medium mb-2">
                <Type className="w-5 h-5 mr-2 text-purple-400" /> Título
              </label>
              <input
                type="text"
                name="titulo"
                value={formEncabezadoBody.titulo}
                onChange={handleChange(setFormEncabezadoBody)}
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Título principal"
                required
              />
            </div>
            <div>
              <label className="flex items-center text-white text-sm font-medium mb-2">
                <Quote className="w-5 h-5 mr-2 text-purple-400" /> Fecha
              </label>
              <input
                type="date"
                name="fecha"
                value={formEncabezadoBody.fecha}
                onChange={handleChange(setFormEncabezadoBody)}
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Fecha"
                required
              />
            </div>
            <div>
              <label className="flex items-center text-white text-sm font-medium mb-2">
                <Image className="w-5 h-5 mr-2 text-purple-400" /> Imagen
              </label>
              <UploadImage
                uploadPreset="nextjs_digimedia_blog_body"
                folder="blogs/bodies/"
                name_public="public_image1"
                name_url="url_image1"
                size_image={4 * 1024 * 1024}
                public_id={formEncabezadoBody.url_image1}
                setFormData={setFormEncabezadoBody}
              />
            </div>
            <div>
              <label className="flex items-center text-white text-sm font-medium mb-2">
                <AlignLeft className="w-5 h-5 mr-2 text-purple-400" /> Descripcion
              </label>
              <input
                name="descripcion"
                value={formEncabezadoBody.descripcion}
                onChange={handleChange(setFormEncabezadoBody)}
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                placeholder="Frase Secundaria"
              />
            </div>
          </form>
        </div>

        <div className="bg-black/5 backdrop-blur-md rounded-2xl p-8 shadow-lg w-full max-w-lg overflow-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <form className="space-y-6">
            <div>
              <label className="flex items-center text-white text-sm font-medium mb-2">
                <Type className="w-5 h-5 mr-2 text-purple-400" /> Título
              </label>
              <input
                type="text"
                name="titulo"
                value={formCommendBody.titulo}
                onChange={handleChange(setFormCommendBody)}
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Título principal"
              />
            </div>

            <div>
              <label className="flex items-center text-white text-sm font-medium mb-2">
                <Quote className="w-5 h-5 mr-2 text-purple-400" /> Texto1
              </label>
              <input
                type="text"
                name="texto1"
                value={formCommendBody.texto1}
                onChange={handleChange(setFormCommendBody)}
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="texto1"
              />
            </div>

            <div>
              <label className="flex items-center text-white text-sm font-medium mb-2">
                <Quote className="w-5 h-5 mr-2 text-purple-400" /> Texto2
              </label>
              <input
                type="text"
                name="texto2"
                value={formCommendBody.texto2}
                onChange={handleChange(setFormCommendBody)}
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="texto2"
              />
            </div>

            <div>
              <label className="flex items-center text-white text-sm font-medium mb-2">
                <Quote className="w-5 h-5 mr-2 text-purple-400" /> Texto3
              </label>
              <input
                type="text"
                name="texto3"
                value={formCommendBody.texto3}
                onChange={handleChange(setFormCommendBody)}
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="texto3"
              />
            </div>
          </form>
        </div>

        <div className="bg-black/5 backdrop-blur-md rounded-2xl p-8 shadow-lg w-full max-w-lg overflow-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <form className="space-y-6">
            <div>
              <label className="flex items-center text-white text-sm font-medium mb-2">
                <Image className="w-5 h-5 mr-2 text-purple-400" /> Imagen 1
              </label>
              <UploadImage
                uploadPreset="nextjs_digimedia_blog_body"
                folder="blogs/bodies/"
                name_public="public_image2"
                name_url="url_image2"
                size_image={3 * 900 * 900}
                public_id={formGaleryBody.url_image2}
                setFormData={setFormGaleryBody}
              />
            </div>

            <div>
              <label className="flex items-center text-white text-sm font-medium mb-2">
                <Image className="w-5 h-5 mr-2 text-purple-400" /> Imagen 2
              </label>

              <UploadImage
                  uploadPreset="nextjs_digimedia_blog_body"
                  folder="blogs/bodies/"
                  name_public = "public_image3"
                  name_url = "url_image3"
                  size_image = {3 * 900 * 900}
                  public_id={formGaleryBody.url_image3}
                  setFormData={setFormGaleryBody}
                />
            </div>
          </form>
        </div>

        <div className="bg-black/5 backdrop-blur-md rounded-2xl p-8 shadow-lg w-full max-w-lg overflow-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <form className="space-y-6">
            {
              formInfoBody.map((item, index) => (
                <div key={index}>
                  <div className="pb-4">
                    <label className="flex items-center text-white text-sm font-medium mb-2">
                      <Type className="w-5 h-5 mr-2 text-purple-400" /> Título
                    </label>
                    <input
                      type="text"
                      name="titulo"
                      value={item.titulo}
                      onChange={(e) => handleChangeMap(e, index, 'titulo')}
                      className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Título principal"
                      required
                    />
                  </div>
                  <div>
                    <label className="flex items-center text-white text-sm font-medium mb-2">
                      <Quote className="w-5 h-5 mr-2 text-purple-400" /> Descripción
                    </label>
                    <textarea
                      name="descripcion"
                      value={item.descripcion}
                      onChange={(e) => handleChangeMap(e, index, 'descripcion')}
                      className="w-full resize-none h-[100px] bg-gray-800 text-white border border-gray-700 rounded-lg p-2 text-sm"
                      placeholder="Descripción"
                    />
                  </div>
                </div>
              ))
            }
          </form>
        </div>
      </div>
    </div>

  );
}
