
import React from 'react'
import { Loader2, CheckCircle, Clock, Bookmark, Share2, Eye } from "lucide-react"
import { useState } from 'react';
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

  const handleInfoBodyChange = (e) => {
    const { name, value } = e.target
    setFormInfoBody((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

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
    <div className="relative lg:mx-48 bg-white text-black rounded-2xl shadow-[0px_10px_25px_rgba(0,0,0,0.15)] overflow-hidden">
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
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
            formEncabezadoBody.url_image1
              ? formEncabezadoBody.url_image1.startsWith("http")
                ? formEncabezadoBody.url_image1
                : `/blog/${formEncabezadoBody.url_image1}`
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

      <div className="px-6 md:px-10 py-8">
        <div className="mb-10 text-lg text-gray-700 leading-relaxed">{formEncabezadoBody.descripcion}</div>

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
            <div className="space-y-6">
              {formInfoBody &&
                formInfoBody.map((section, index) => (
                  <div
                    key={`tarjeta-${index}`}
                    className="bg-gradient-to-r from-teal-50 to-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="p-1 bg-gradient-to-r from-teal-400 to-teal-600"></div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 text-teal-700">{section.titulo}</h3>
                      <p className="text-gray-700">{section.descripcion}</p>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {activeTab === "tips" && (
            <div className="bg-gradient-to-br from-teal-50 to-gray-50 rounded-xl p-6">
              <h3 className="text-2xl font-bold mb-6 text-teal-700 text-center">
                {formCommendBody.titulo || "Consejos"}
              </h3>
              <ul className="space-y-4">
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
                      <li key={`commend-${index}`} className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                        <div className="bg-teal-100 p-2 rounded-full mr-4">
                          <CheckCircle className="w-5 h-5 text-teal-600" />
                        </div>
                        <div>
                          <p className="text-gray-700">{text}</p>
                        </div>
                      </li>
                    ))}
              </ul>
            </div>
          )}

          {activeTab === "gallery" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[formGaleryBody.url_image1 || "/blog/blog-10.jpg", formGaleryBody.url_image2 || "/blog/blog-1.jpg"].map((src, index) => (
                <div key={index} className="group relative rounded-xl overflow-hidden shadow-md">
                  <img
                    src={src.startsWith("http") ? src : `${src}`}
                    alt={`Imagen ${index + 1} del artículo`}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="bg-white/90 p-3 rounded-full">
                      <Eye className="w-6 h-6 text-teal-600" />
                    </button>
                  </div>
                </div>
              ))}
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
