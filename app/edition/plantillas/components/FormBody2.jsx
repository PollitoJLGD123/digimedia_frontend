
import React from 'react'
import { CheckCircle, Clock, Bookmark, Share2, Eye, Image, Type, AlignLeft, Clock1, BookType, Upload } from "lucide-react"
import { useState } from 'react';
import UploadImage from './UploadImage';

export default function FormBody2(props) {

  const [activeTab, setActiveTab] = useState("info")

  const {
    formCommendBody,
    setFormCommendBody,
    formInfoBody,
    setFormInfoBody,
    formEncabezadoBody,
    setFormEncabezadoBody,
    formGaleryBody,
    setFormGaleryBody
  } = props;

  const handleCommendBodyChange = (e) => {
    const { name, value } = e.target
    setFormCommendBody((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleInfoBodyChange = (e, index, field) => {
    const { value } = e.target;
    setFormInfoBody(prevState => {
      const updatedState = [...prevState];
      updatedState[index] = { ...updatedState[index], [field]: value };
      return updatedState;
    });
  };

  const handleEncabezadoBodyChange = (e) => {
    const { name, value } = e.target
    setFormEncabezadoBody((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleGaleryBodyChange = (e) => {
    const { name, value } = e.target
    setFormGaleryBody((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="relative bg-white text-black rounded-2xl shadow-[0px_10px_25px_rgba(0,0,0,0.15)] overflow-hidden">
      <div className='flex gap-4'>
        <div>
          <div className="top-0 z-30 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2 text-gray-500 text-sm">
              <Clock className="w-4 h-4" />
              <span>{formEncabezadoBody.fecha}</span>
            </div>
            <div className="flex space-x-3">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Bookmark className="w-5 h-5 text-teal-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Share2 className="w-5 h-5 text-teal-600" />
              </button>
            </div>
          </div>

          <div className="relative h-[300px] md:h-[400px] overflow-hidden">
            <img
              src={
                formEncabezadoBody.public_image1
                  ? formEncabezadoBody.public_image1.startsWith("http")
                    ? formEncabezadoBody.public_image1
                    : `/blog/${formEncabezadoBody.public_image1}`
                  : "/blog/blog-4.jpg"
              }
              alt={formEncabezadoBody.titulo || "Imagen principal"}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 leading-tight">{formEncabezadoBody.titulo}</h1>
              <div className="w-16 h-1 bg-teal-500 mb-4"></div>
            </div>
          </div>

          <div className="mx-10 my-5 text-lg text-gray-700 leading-relaxed">{formEncabezadoBody.descripcion}</div>
        </div>

        <div className='relative mt-28 w-full p-6'>
          <div className="">
            <div className="bg-black/90 backdrop-blur-md rounded-lg p-5 border border-white/10 shadow-lg">
              <form className="grid gap-5">
                <div className="mb-3">
                  <label className="flex items-center text-gray-300 text-xs font-medium mb-1">
                    <Type className="w-4 h-4 mr-1.5 text-blue-400" /> Título
                  </label>
                  <input
                    type="text"
                    name="titulo"
                    value={formEncabezadoBody.titulo}
                    onChange={handleEncabezadoBodyChange}
                    className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="Título del pie de página"
                  />
                </div>
                <div className="mb-3">
                  <label className="flex items-center text-gray-300 text-xs font-medium mb-1">
                    <AlignLeft className="w-4 h-4 mr-1.5 text-blue-400" /> Descripción
                  </label>
                  <textarea
                    name="descripcion"
                    value={formEncabezadoBody.descripcion}
                    onChange={handleEncabezadoBodyChange}
                    rows={3}
                    className="w-full h-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
                    placeholder="Descripción corta"
                  ></textarea>
                </div>
                <div className="mb-3 mt-3">
                  <label className="flex items-center text-gray-300 text-xs font-medium mb-1">
                    <Clock1 className="w-4 h-4 mr-1.5 text-blue-400" /> Fecha
                  </label>
                  <input
                    type="date"
                    name="fecha"
                    value={formEncabezadoBody.fecha}
                    onChange={handleEncabezadoBodyChange}
                    className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="Fecha de Creación página"
                  />
                </div>
                <div className="">
                  <label className="flex items-center text-gray-300 text-xs font-medium mb-1">
                    <Image className="w-4 h-4 mr-1.5 text-blue-400" /> Imagen de Fondo
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
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-10 pb-8">
        <div className="flex border-b border-gray-200 mb-8">
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === "info" ? "text-teal-600 border-b-2 border-teal-600" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("info")}
          >
            Información
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === "tips" ? "text-teal-600 border-b-2 border-teal-600" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("tips")}
          >
            Consejos
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === "gallery" ? "text-teal-600 border-b-2 border-teal-600" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("gallery")}
          >
            Galería
          </button>
        </div>

        <div className="mb-10">
          {activeTab === "info" && (
            <div className="space-y-6 ">
              {formInfoBody &&
                formInfoBody.map((section, index) => (
                  <div className="flex gap-5" key={`tarjeta-${index}`}>
                    <div
                      className="bg-gradient-to-r w-full  from-teal-50 to-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="p-1 bg-gradient-to-r from-teal-400 to-teal-600"></div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-3 text-teal-700">{section.titulo}</h3>
                        <p className="text-gray-700">{section.descripcion}</p>
                      </div>
                    </div>
                    <div className="bg-black/90 backdrop-blur-md rounded-lg p-5 border border-white/10 shadow-lg w-[650px] mr-4">
                      <form className="grid gap-5">
                        <div className="mb-3">
                          <label className="flex items-center text-gray-300 text-xs font-medium mb-1">
                            <Type className="w-4 h-4 mr-1.5 text-blue-400" /> {"Info Relevante " + (index + 1)}
                          </label>
                          <input
                            type="text"
                            name="titulo"
                            value={formInfoBody[index].titulo}
                            onChange={(e) => handleInfoBodyChange(e, index, 'titulo')}
                            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                            placeholder="Título del pie de página"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="flex items-center text-gray-300 text-xs font-medium mb-1">
                            <AlignLeft className="w-4 h-4 mr-1.5 text-blue-400" /> {"Descripción " + (index + 1)}
                          </label>
                          <textarea
                            name="descripcion"
                            value={formInfoBody[index].descripcion}
                            onChange={(e) => handleInfoBodyChange(e, index, 'descripcion')}
                            rows={3}
                            className="w-full h-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
                            placeholder="Descripción corta"
                          ></textarea>
                        </div>
                      </form>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {activeTab === "tips" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="bg-green-400/60 rounded-xl shadow-sm p-8 border border-slate-100 ">
                <h3 className="text-2xl font-semibold mb-8 text-slate-800 text-center">
                  {formCommendBody.titulo || "Consejos"}
                </h3>

                <ul className="space-y-5">
                  {formCommendBody &&
                    [
                      formCommendBody.texto1,
                      formCommendBody.texto2,
                      formCommendBody.texto3,
                      formCommendBody.texto4,
                      formCommendBody.texto5,
                    ]
                      .filter((text) => text)
                      .map((text, index) => (
                        <li
                          key={`commend-${index}`}
                          className="flex items-start group transition-all duration-300 hover:translate-x-1 bg-white rounded-xl p-2"
                        >
                          <div className="bg-emerald-50 p-2 rounded-full mr-4 group-hover:bg-emerald-100 transition-colors duration-300">
                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div className="pt-1.5">
                            <p className="text-slate-700 leading-relaxed">{text}</p>
                          </div>
                        </li>
                      ))}
                </ul>

                {(!formCommendBody ||
                  ![
                    formCommendBody.texto1,
                    formCommendBody.texto2,
                    formCommendBody.texto3,
                    formCommendBody.texto4,
                    formCommendBody.texto5,
                  ].some((text) => text)) && (
                    <div className="text-center py-8 text-slate-400">Agrega consejos utilizando el formulario</div>
                  )}
              </div>

              <div className="bg-white rounded-xl shadow-sm p-8 border border-slate-100 ">
                <h4 className="text-lg font-medium text-slate-800 mb-6 pb-2 border-b border-slate-100">Editar consejos</h4>

                <form className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Título de la sección</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="titulo"
                        value={formCommendBody.titulo || ""}
                        onChange={handleCommendBodyChange}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-sm transition-all duration-200 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 focus:bg-white"
                        placeholder="Ej: Consejos útiles"
                      />
                      <BookType className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-slate-700">Consejos</label>

                    {[1, 2, 3, 4, 5].map((num) => (
                      <div key={`tip-${num}`} className="relative">
                        <input
                          type="text"
                          name={`texto${num}`}
                          value={formCommendBody[`texto${num}`] || ""}
                          onChange={handleCommendBodyChange}
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-sm transition-all duration-200 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 focus:bg-white"
                          placeholder={`Consejo #${num}`}
                        />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium">
                          {num}
                        </div>
                      </div>
                    ))}
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeTab === "gallery" && (
            <div className="max-w-5xl mx-auto px-4">
              <h3 className="text-lg font-medium text-slate-700 mb-6 pb-2 border-b border-slate-200">
                Galería de imágenes
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {[
                  { id: 2, url: formGaleryBody.public_image2 || "/blog/blog-10.jpg", title: "Imagen destacada 1" },
                  { id: 3, url: formGaleryBody.public_image3 || "/blog/blog-1.jpg", title: "Imagen destacada 2" },
                ].map((image, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="relative h-64 bg-slate-100">
                      <img
                        src={image.url.startsWith("http") ? image.url : `${image.url}`}
                        alt={`${image.title}`}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-3">
                        <button className="bg-white/90 p-2 rounded-full shadow-lg">
                          <Eye className="w-4 h-4 text-slate-700" />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="text-sm font-medium text-slate-700 mb-3 flex items-center">
                        <Type className="w-4 h-4 mr-1.5 text-slate-400" />
                        {image.title}
                      </h4>

                      <UploadImage
                        uploadPreset="nextjs_digimedia_blog_body"
                        folder="blogs/bodies/"
                        name_public={`public_image${image.id}`}
                        name_url={`url_image${image.id}`}
                        size_image={3 * 900 * 900}
                        public_id={formGaleryBody[`url_image${image.id}`]}
                        setFormData={setFormGaleryBody}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="bg-gradient-to-r from-teal-600 to-teal-800 text-white p-6 text-center">
        <p className="text-sm">© {new Date().getFullYear()} - Todos los derechos reservados</p>
      </div>
    </div>
  )
}
