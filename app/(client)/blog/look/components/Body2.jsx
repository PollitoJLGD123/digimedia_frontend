"use client"

import { CheckCircle, Clock, Bookmark, Share2, Eye } from "lucide-react"
import { useState } from "react"

export default function Body2() {

    const [activeTab, setActiveTab] = useState("info")

    const tarjetas = [
        {
            titulo: "El Factor Sorpresa y Distinción",
            descripcion: "Las letras de neón LED permiten personalizar la imagen de tu local, haciendo que el nombre de tu bar sea visible desde lejos. Un diseño llamativo puede convertirse en un sello distintivo y en un punto de referencia para los clientes.",
        },

        {
            titulo: "Ambiente y Experiencia Visual",
            descripcion: "La iluminación juega un papel crucial en la atmósfera de un bar. Los colores vibrantes y cálidos del neón LED pueden transformar un espacio ordinario en un entorno acogedor e instagrameable.",
        },
        {
            titulo: "Eficiencia Energética y Durabilidad",
            descripcion: "A diferencia del neón tradicional, las luces LED son más eficientes, consumen menos energía y tienen una vida útil más prolongada.",
        },
        {
            titulo: "Marketing y Atracción de Clientes",
            descripcion: "Un letrero de neón LED bien diseñado es una herramienta de marketing poderosa, capaz de captar la atención y aumentar la visibilidad de tu local.",
        }
    ]

    return (
        <div className="relative lg:mx-48 bg-white text-black rounded-2xl shadow-[0px_10px_25px_rgba(0,0,0,0.15)] overflow-hidden">
            <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-2 text-gray-500 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>2025-03-31</span>
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
                    src="/blog/blog-4.jpg"
                    alt="Imagen principal"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 leading-tight">TU BAR EN LA MIRA</h1>
                    <div className="w-16 h-1 bg-teal-500 mb-4"></div>
                </div>
            </div>

            <div className="px-6 md:px-10 py-8">
                <div className="mb-10 text-lg text-gray-700 leading-relaxed">Las luces neón LED se han convertido en un elemento diferenciador en el mundo de la hospitalidad. No solo son visualmente atractivos, sino que también refuerzan la identidad de tu negocio. En este artículo, exploraremos cómo las letras luminosas pueden marcar la diferencia en la experiencia de tus clientes.</div>

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
                            {
                                tarjetas.map((section, index) => (
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
                                Consejos para Elegir el Letrero Perfecto
                            </h3>
                            <ul className="space-y-4">
                                {
                                [
                                    "Opta por colores que reflejen la personalidad de tu bar.",
                                    "Elige un diseño legible y atractivo.",
                                    "Considera el lugar de instalación para maximizar su impacto.",
                                    "Asegúrate de que la iluminación sea adecuada para resaltar el letrero.",
                                    "Utiliza materiales de alta calidad para garantizar la durabilidad.",
                                ].filter((text) => text)
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
                            {["/blog/blog-10.jpg", "/blog/blog-1.jpg"].map((src, index) => (
                                <div key={index} className="group relative rounded-xl overflow-hidden shadow-md">
                                    <img
                                        src={src}
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

