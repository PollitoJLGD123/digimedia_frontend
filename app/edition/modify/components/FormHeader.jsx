"use client"
import { Type, AlignLeft, Quote, Image as IconImage, Loader2 } from "lucide-react";
import { useState } from "react";

export default function FormHeader({ dataHeader, setFormData, setFile }) {

    const [uploading, setUploading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            setUploading(true);

            const tempUrl = URL.createObjectURL(file);
            setFormData((prev) => ({
                ...prev,
                ["public_image"]: tempUrl,
            }));

            setFile(file);

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

    return (
        <div
            className="w-full h-screen md:h-[80vh] relative flex items-center justify-center text-center px-6 sm:px-12 bg-cover bg-center bg-no-repeat" id="file-name"
            style={{
                backgroundImage: `url(${dataHeader.public_image})`,
                backgroundSize: "cover",
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
                                    <IconImage className="w-5 h-5 mr-2 text-purple-400" /> Imagen Principal
                                    <h1 className="ml-3 mt-1 text-xs">1080x520 píxeles</h1>
                                </label>
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
                                                {dataHeader.public_image !== "/blog/fondo_blog_extend.png" ? (
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
                                            name="image"
                                            className="hidden"
                                            onChange={handleImage}
                                            disabled={uploading}
                                        />
                                    </label>
                                </div>
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}