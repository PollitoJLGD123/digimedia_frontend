"use client"

import { Type, AlignLeft, Quote } from "lucide-react";

export default function Formulario({ formData, setFormData }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="bg-black/5 backdrop-blur-md rounded-2xl p-8 shadow-lg w-full max-w-lg">
            <form className="space-y-6">
                <div>
                    <label className="flex items-center text-white text-sm font-medium mb-2">
                        <Type className="w-5 h-5 mr-2 text-purple-400" /> Título
                    </label>
                    <input
                        type="text"
                        name="titulo"
                        value={formData.titulo}
                        onChange={handleChange}
                        className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="Título principal"
                    />
                </div>

                <div>
                    <label className="flex items-center text-white text-sm font-medium mb-2">
                        <Quote className="w-5 h-5 mr-2 text-purple-400" /> Frase destacada
                    </label>
                    <input
                        type="text"
                        name="texto_frase"
                        value={formData.texto_frase}
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
                        name="frase_secundaria"
                        value={formData.texto_descripcion}
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
                    <input
                        type="image"
                        name="url_image"
                        value={formData.url_image}
                        onChange={handleChange}
                        className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="Frase destacada"
                    />
                </div>
            </form>
        </div>
    );
}