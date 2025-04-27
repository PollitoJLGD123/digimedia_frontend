"use client"
import { Image, Type, AlignLeft, Image as IconImage, Loader2 } from "lucide-react"
import { useState } from "react"

export default function FormFooter({ isLoading ,error, formFooter, setFormData, setFileFooterFile1, setFileFooterFile2, setFileFooterFile3, onDeleteFooterFile1, onDeleteFooterFile2, onDeleteFooterFile3 }) {
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const [uploading, setUploading] = useState(false);

    const handleImagenFooter = async (e) => {
        const file = e.target.files[0];
        const name = e.target.name;
        if (!file) return;
        try {
            setUploading(true);

            const tempUrl = URL.createObjectURL(file);
            setFormData((prev) => ({
                ...prev,
                [name]: tempUrl,
            }));

            if (name === "public_image1") {
                setFileFooterFile1(file);
            } 
            else 
                if (name === "public_image2") {
                    setFileFooterFile2(file);
                } 
                else {
                    setFileFooterFile3(file);
                }

        } catch (error) {
            console.error("Error al subir imagen:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Ocurrió un error al subir la imagen",
                confirmButtonColor: "#8c52ff",
            });
        } finally {
            setUploading(false);
        }
    }

    if (isLoading) {
        return (
            <div className="mt-12 max-w-[1000px] mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg shadow-[0px_8px_20px_rgba(0,0,0,0.3)] overflow-hidden">
                <div className="relative">
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500 animate-gradient-x"></div>

                    <div className="p-6 md:p-8">
                        <div className="h-8 bg-gradient-to-r from-yellow-400/20 to-yellow-500/30 w-2/3 mx-auto rounded-lg mb-4 animate-pulse"></div>
                        <div className="h-0.5 w-16 bg-yellow-400/50 mx-auto mt-2 mb-6"></div>

                        <div className="space-y-3 max-w-3xl mx-auto mb-6">
                            <div className="h-4 bg-gradient-to-r from-gray-100/20 to-gray-100/10 rounded w-full animate-pulse"></div>
                            <div className="h-4 bg-gradient-to-r from-gray-100/15 to-gray-100/5 rounded w-full animate-pulse delay-75"></div>
                            <div className="h-4 bg-gradient-to-r from-gray-100/10 to-gray-100/5 rounded w-5/6 animate-pulse delay-150"></div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-3 mt-6">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="w-48 h-36 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-700 rounded-lg border border-gray-600/50 animate-pulse delay-300 relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 flex items-center justify-center opacity-30">
                                        <IconImage className="h-12 w-12 text-gray-500" />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col items-center justify-center mt-8 mb-2">
                            <Loader2 className="h-8 w-8 text-yellow-400 animate-spin mb-2" />
                            <p className="text-gray-300 text-sm font-medium">Cargando contenido...</p>
                        </div>

                        <div className="flex justify-center mt-6">
                            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-sky-400 to-transparent rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (error && !formFooter) {
        return (
            <div className="mt-12 max-w-[1000px] mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg shadow-[0px_8px_20px_rgba(0,0,0,0.3)] overflow-hidden">
                <div className="relative">
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500"></div>

                    <div className="p-6 md:p-8 flex flex-col items-center">
                        <div className="text-red-400 mb-4 bg-red-400/10 p-3 rounded-full">
                            <AlertTriangle className="h-8 w-8" />
                        </div>
                        <h3 className="text-2xl md:text-3xl text-center font-bold mb-4 text-yellow-400">
                            No se pudo cargar el contenido
                            <span className="block h-0.5 w-16 bg-gradient-to-r from-yellow-400/30 via-yellow-400 to-yellow-400/30 mx-auto mt-2"></span>
                        </h3>

                        <p className="text-gray-100 text-base leading-relaxed max-w-3xl mx-auto mb-6">
                            Ocurrió un problema al cargar el pie de página. Por favor, intenta recargar la página.
                        </p>

                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 rounded-lg font-medium hover:from-yellow-500 hover:to-yellow-600 transition-colors shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/30"
                        >
                            Reintentar
                        </button>

                        <div className="flex justify-center mt-6">
                            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-sky-400 to-transparent rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
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
                            const imageUrl = image

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
                    <h1 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 mb-4">
                        Editar Pie de Página
                    </h1>
                    <form>
                        <div className="mb-3">
                            <label className="flex items-center text-gray-300 text-xs font-medium mb-1">
                                <Type className="w-4 h-4 mr-1.5 text-yellow-400" /> Título
                                <h1 className="ml-3 mt-1 text-xs">Máximo 30 caracteres</h1>
                            </label>
                            <input
                                type="text"
                                name="titulo"
                                maxLength={30}
                                autoComplete="off"
                                value={formFooter.titulo}
                                onChange={handleChange}
                                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                                placeholder="Título del pie de página"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="flex items-center text-gray-300 text-xs font-medium mb-1">
                                <AlignLeft className="w-4 h-4 mr-1.5 text-yellow-400" /> Descripción
                                <h1 className="ml-3 mt-1 text-xs">Máximo 300 caracteres</h1>
                            </label>
                            <textarea
                                name="descripcion"
                                value={formFooter.descripcion}
                                onChange={handleChange}
                                maxLength={300}
                                autoComplete="off"
                                rows={3}
                                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
                                placeholder="Descripción corta"
                                required
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label className="flex items-center text-gray-300 text-xs font-medium mb-1">
                                <Image className="w-4 h-4 mr-1.5 text-yellow-400" /> Imágenes
                                <h1 className="ml-3 mt-1 text-xs">200x170 píxeles</h1>
                            </label>
                            {["1", "2", "3"].map((num, index) => (
                                <div key={index} className="relative w-full mb-2">
                                    <div className="relative">
                                        <label
                                            className={`flex items-center justify-center w-full p-3 border-2 border-dashed rounded-lg text-white transition-all cursor-pointer ${uploading
                                                ? "border-gray-700 bg-gray-900 opacity-50 cursor-not-allowed"
                                                : "border-gray-700 bg-gray-900 hover:border-purple-500 hover:bg-gray-800"
                                                }`}
                                        >
                                            {uploading ? (
                                                <Loader2 className="w-5 h-5 animate-spin text-purple-400 mr-2" />
                                            ) : (
                                                <>
                                                    {formFooter[`public_image${num}`] !== "/blog/blog-10.jpg" ? (
                                                        <>
                                                            <IconImage className="w-5 h-5 mr-2 text-purple-400" />
                                                            <span className="text-sm">Cambiar imagen</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <IconImage className="w-5 h-5 mr-2 text-purple-400" />
                                                            <span className="text-sm">Seleccionar imagen</span>
                                                        </>
                                                    )}
                                                </>
                                            )}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                name={`public_image${num}`}
                                                className="hidden"
                                                onChange={handleImagenFooter}
                                                disabled={uploading}
                                            />
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
