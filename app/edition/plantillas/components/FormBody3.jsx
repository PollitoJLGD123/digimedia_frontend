"use client";

import React from "react";

import { useEffect, useState } from "react";
import { Type, AlignLeft, Quote, Image } from "lucide-react";
import {
  Loader2,
  CheckCircle,
  Calendar,
  ArrowDownCircle,
  ExternalLink,
} from "lucide-react";

import UploadImage from './UploadImage';

export default function FormBody3(props) {
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
    setFormInfoBody((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = { ...updatedState[index], [field]: value };
      return updatedState;
    });
  };
  return (
    <div className="relative p-0 text-black rounded-lg shadow-[0px_10px_25px_rgba(0,0,0,0.25)] overflow-hidden flex flex-row my-5 justify-center">
      <div className="w-[700px]">
        <div className="bg-gradient-to-r from-indigo-900 to-purple-900 py-3 px-6 flex justify-between items-center">
          <div className="flex items-center text-white">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">
              {formEncabezadoBody.fecha}
            </span>
          </div>
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-white/70"
              ></div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-100 to-transparent"></div>
          <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h1 className="text-4xl md:text-5xl font-black text-indigo-900 leading-tight mb-6">
                {formEncabezadoBody.titulo}
              </h1>
              <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mb-6"></div>
              <p className="text-lg text-gray-700 leading-relaxed">
                {formEncabezadoBody.descripcion}
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur"></div>
                <div className="relative">
                  <img
                    src={
                      formEncabezadoBody.public_image1
                        ? formEncabezadoBody.public_image1.startsWith("http")
                          ? formEncabezadoBody.public_image1
                          : `${formEncabezadoBody.public_image1}`
                        : "/blog/blog-4.jpg"
                    }
                    alt={formEncabezadoBody.titulo || "Imagen principal"}
                    className="w-[22rem] h-[22rem] rounded-2xl shadow-lg object-cover relative "
                  />
                </div>
                <div className="absolute -top-3 -left-3 w-16 h-16 bg-purple-100 rounded-full z-0"></div>
              </div>
            </div>
          </div>
        </div>

        <div
          id="content-details"
          className="p-8 md:p-12 bg-gradient-to-b from-white to-indigo-50"
        >
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <div className="w-8 h-8 rounded-full bg-indigo-900 flex items-center justify-center text-white font-bold mr-3">
                G
              </div>
              <h2 className="text-2xl font-bold text-indigo-900">Galería</h2>
              <div className="h-px flex-grow bg-indigo-200 ml-4"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                formGaleryBody.public_image2 || "/blog/blog-10.jpg",
                formGaleryBody.public_image3 || "/blog/blog-1.jpg",
              ].map((src, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-xl shadow-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 via-indigo-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img
                    src={src.startsWith("http") ? src : `${src}`}
                    alt={`Imagen ${index + 1} del artículo`}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 px-4 py-2 rounded-lg shadow-lg">
                      <ExternalLink className="w-6 h-6 text-indigo-600" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <div className="flex items-center mb-8">
              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold mr-3">
                C
              </div>
              <h2 className="text-2xl font-bold text-green-600">
                {formCommendBody.titulo || "Consejos"}
              </h2>
              <div className="h-px flex-grow bg-green-200 ml-4"></div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-indigo-50 rounded-xl p-6 shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formCommendBody &&
                  [
                    formCommendBody.texto1,
                    formCommendBody.texto2,
                    formCommendBody.texto3,
                  ]
                    .filter((text) => text)
                    .map((text, index) => (
                      <div
                        key={`commend-${index}`}
                        className="flex items-start p-4 bg-white rounded-lg shadow-sm border-l-4 border-green-500 hover:shadow-md transition-shadow"
                      >
                        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5 mr-3" />
                        <p className="text-gray-700">{text}</p>
                      </div>
                    ))}
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center mb-8">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-3">
                I
              </div>
              <h2 className="text-2xl font-bold text-blue-600">
                Información Detallada
              </h2>
              <div className="h-px flex-grow bg-blue-200 ml-4"></div>
            </div>

            <div className="relative">
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-blue-100 rounded-full opacity-70"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-indigo-100 rounded-full opacity-70"></div>

              <div className="relative">
                {formInfoBody &&
                  formInfoBody.map((section, index) => {
                    const isEven = index % 2 === 0;

                    return (
                      <div
                        key={`tarjeta-${index}`}
                        className={`mb-8 flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} bg-white rounded-xl overflow-hidden shadow-md`}
                      >
                        <div
                          className={`md:w-1/3 bg-gradient-to-br ${isEven ? "from-blue-600 to-indigo-700" : "from-indigo-700 to-purple-800"} p-6 flex items-center justify-center`}
                        >
                          <h3 className="text-2xl font-bold text-white text-center">
                            {section.titulo}
                          </h3>
                        </div>
                        <div className="md:w-2/3 p-6">
                          <p className="text-gray-700 leading-relaxed">
                            {section.descripcion}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>

        <div className="h-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>
      </div>

      <div className="w-[420px] flex flex-col justify-center gap-5 p-5">
        <div className="bg-black/5 backdrop-blur-md rounded-2xl p-8 shadow-lg w-full max-w-lg overflow-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 mt-24">
          <form className="space-y-6">
            <div>
              <label className="flex items-center text-white text-sm font-medium mb-2">
                <Type className="w-5 h-5 mr-2 text-purple-400" /> Título
                <h1 className="ml-3 mt-1 text-xs">Máximo 50 caracteres</h1>
              </label>
              <input
                type="text"
                name="titulo"
                maxLength={50}
                value={formEncabezadoBody.titulo}
                onChange={handleChange(setFormEncabezadoBody)}
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Título principal"
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
              />
            </div>

            <div>
              <label className="flex items-center text-white text-sm font-medium mb-2">
                <Image className="w-5 h-5 mr-2 text-purple-400" /> Imagen
                <h1 className="ml-3 mt-1 text-xs">360x360 píxeles</h1>
              </label>
              <UploadImage
                uploadPreset="nextjs_digimedia_blog_body"
                folder="blogs/bodies/"
                name_public="public_image1"
                name_url="url_image1"
                size_image={8 * 1400 * 1400}
                width={360}
                height={360}
                public_id={formEncabezadoBody.url_image1}
                setFormData={setFormEncabezadoBody}
              />
            </div>

            <div>
              <label className="flex items-center text-white text-sm font-medium mb-2">
                <AlignLeft className="w-5 h-5 mr-2 text-purple-400" /> Descripción
                <h1 className="ml-3 mt-1 text-xs">Máximo 400 caracteres</h1>
              </label>
              <input
                name="descripcion"
                value={formEncabezadoBody.descripcion}
                maxLength={400}
                onChange={handleChange(setFormEncabezadoBody)}
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                placeholder="Frase Secundaria"
              />
            </div>
          </form>
        </div>


        <div className="my-20 bg-black/5 backdrop-blur-md rounded-2xl p-8 shadow-lg w-full max-w-lg overflow-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 mt-28">
          <form className="space-y-6">
            <div>
              <label className="flex items-center text-white text-sm font-medium mb-2">
                <Image className="w-5 h-5 mr-2 text-purple-400" /> Imagen 1
                <h1 className="ml-3 mt-1 text-xs">260x260 píxeles</h1>
              </label>
              <UploadImage
                uploadPreset="nextjs_digimedia_blog_body"
                folder="blogs/bodies/"
                name_public="public_image2"
                name_url="url_image2"
                size_image={8 * 1400 * 1400}
                width={260}
                height={260}
                public_id={formGaleryBody.url_image2}
                setFormData={setFormGaleryBody}
              />
            </div>

            <div>
              <label className="flex items-center text-white text-sm font-medium mb-2">
                <Image className="w-5 h-5 mr-2 text-purple-400" /> Imagen 2
                <h1 className="ml-3 mt-1 text-xs">260x260 píxeles</h1>
              </label>
              <UploadImage
                uploadPreset="nextjs_digimedia_blog_body"
                folder="blogs/bodies/"
                name_public="public_image3"
                name_url="url_image3"
                size_image={8 * 1400 * 1400}
                width={260}
                height={260}
                public_id={formGaleryBody.url_image3}
                setFormData={setFormGaleryBody}
              />
            </div>
          </form>
        </div>


        <div className="bg-black/5 backdrop-blur-md rounded-2xl p-8 shadow-lg w-full max-w-lg overflow-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <form className="space-y-6">
            <div>
              <label className="flex items-center text-white text-sm font-medium mb-2">
                <Type className="w-5 h-5 mr-2 text-purple-400" /> Título
                <h1 className="ml-3 mt-1 text-xs">Máximo 50 caracteres</h1>
              </label>
              <input
                type="text"
                name="titulo"
                maxLength={50}
                value={formCommendBody.titulo}
                onChange={handleChange(setFormCommendBody)}
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Título principal"
              />
            </div>

            <div>
              <label className="flex items-center text-white text-sm font-medium mb-2">
                <Quote className="w-5 h-5 mr-2 text-purple-400" /> Texto1
                <h1 className="ml-3 mt-1 text-xs">Máximo 150 caracteres</h1>
              </label>
              <input
                type="text"
                name="texto1"
                maxLength={150}
                value={formCommendBody.texto1}
                onChange={handleChange(setFormCommendBody)}
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="texto1"
              />
            </div>

            <div>
              <label className="flex items-center text-white text-sm font-medium mb-2">
                <Quote className="w-5 h-5 mr-2 text-purple-400" /> Texto2
                <h1 className="ml-3 mt-1 text-xs">Máximo 150 caracteres</h1>
              </label>
              <input
                type="text"
                name="texto2"
                maxLength={150}
                value={formCommendBody.texto2}
                onChange={handleChange(setFormCommendBody)}
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="texto2"
              />
            </div>

            <div>
              <label className="flex items-center text-white text-sm font-medium mb-2">
                <Quote className="w-5 h-5 mr-2 text-purple-400" /> Texto3
                <h1 className="ml-3 mt-1 text-xs">Máximo 150 caracteres</h1>
              </label>
              <input
                type="text"
                name="texto3"
                maxLength={150}
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
            {formInfoBody.map((item, index) => (
              <div key={index}>
                <div className="pb-4">
                  <label className="flex items-center text-white text-sm font-medium mb-2">
                    <Type className="w-5 h-5 mr-2 text-purple-400" /> Título
                    <h1 className="ml-3 mt-1 text-xs">Máximo 50 caracteres</h1>
                  </label>
                  <input
                    type="text"
                    name="titulo"
                    maxLength={50}
                    value={item.titulo}
                    onChange={(e) => handleChangeMap(e, index, "titulo")}
                    className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Título principal"
                  />
                </div>
                <div>
                  <label className="flex items-center text-white text-sm font-medium mb-2">
                    <Quote className="w-5 h-5 mr-2 text-purple-400" />
                    Descripción
                    <h1 className="ml-3 mt-1 text-xs">Máximo 400 caracteres</h1>
                  </label>
                  <textarea
                    name="descripcion"
                    value={item.descripcion}
                    maxLength={400}
                    onChange={(e) => handleChangeMap(e, index, "descripcion")}
                    className="w-full resize-none h-[100px] bg-gray-800 text-white border border-gray-700 rounded-lg p-2 text-sm"
                    placeholder="Descripción"
                  />
                </div>
              </div>
            ))}
          </form>
        </div>
      </div>
    </div>
  );
}
