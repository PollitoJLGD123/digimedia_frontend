"use client"
import { Image, Type, AlignLeft } from "lucide-react"

export default function FormFooter({ formFooter, setFormData }) {
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    return (
        <div className="relative mt-12 flex flex-col md:flex-row justify-center items-stretch max-w-5xl mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg shadow-lg overflow-hidden p-6 gap-6">
            <div className="relative flex-1 p-6 md:p-8 min-w-0">
                <h3 className="text-3xl text-center font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
                    {formFooter.titulo}
                </h3>
                <p className="text-gray-100 text-base leading-relaxed max-w-full md:max-w-md mx-auto mb-6 text-center break-words overflow-hidden whitespace-normal">
                    {formFooter.descripcion}
                </p>

                {(formFooter.public_image1 || formFooter.public_image2 || formFooter.public_image3) && (
                    <div className="flex flex-wrap justify-center gap-3 mt-6">
                        {[formFooter.public_image1, formFooter.public_image2, formFooter.public_image3].map((image, index) => {
                            const imageUrl = image ? (image.startsWith("http") ? image : `/blog/${image}`) : "/blog/blog-2.jpg"

                            return (
                                <div key={index} className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 to-blue-500/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-blue-500 rounded-lg opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300"></div>

                                    <img
                                        src={imageUrl || "/placeholder.svg"}
                                        alt={"Imagenes" + (index + 1)}
                                        className="w-48 h-36 object-cover rounded-lg border border-white/10 group-hover:border-sky-400/50 transition-all duration-300 shadow-md relative z-10"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg z-20 pointer-events-none"></div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>

            <div className="relative w-full md:w-[450px] h-auto p-6">
                <div className="bg-black/75 backdrop-blur-md rounded-lg p-5 border border-white/10 shadow-lg">
                    <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 mb-4">
                        Editar Pie de Página
                    </h3>
                    <form>
                        <div className="mb-3">
                            <label className="flex items-center text-gray-300 text-xs font-medium mb-1">
                                <Type className="w-4 h-4 mr-1.5 text-yellow-400" /> Título
                            </label>
                            <input
                                type="text"
                                name="titulo"
                                value={formFooter.titulo}
                                onChange={handleChange}
                                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                                placeholder="Título del pie de página"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="flex items-center text-gray-300 text-xs font-medium mb-1">
                                <AlignLeft className="w-4 h-4 mr-1.5 text-yellow-400" /> Descripción
                            </label>
                            <textarea
                                name="descripcion"
                                value={formFooter.descripcion}
                                onChange={handleChange}
                                rows={3}
                                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
                                placeholder="Descripción corta"
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label className="flex items-center text-gray-300 text-xs font-medium mb-1">
                                <Image className="w-4 h-4 mr-1.5 text-yellow-400" /> Imágenes
                            </label>
                            {["public_image1", "public_image2", "public_image3"].map((imgField, index) => (
                                <div key={index} className="mb-2">
                                    <input
                                        type="text"
                                        name={imgField}
                                        value={formFooter[imgField] || ""}
                                        onChange={handleChange}
                                        className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                                        placeholder={`URL de la imagen ${index + 1}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
