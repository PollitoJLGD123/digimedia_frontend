
import React from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Image as IconImage, Loader2 } from "lucide-react";
import Cloud from "../../services/Cloud";
import { useState } from "react";
import Swal from "sweetalert2";

function UploadImage({ uploadPreset, folder, setFormData, public_id, size_image, name_public, name_url }) {

    const [uploading, setUploading] = useState(false);

    async function eliminarImagenAnterior(id_public) {

        console.log(id_public);

        if (!id_public) return;

        try {
            const response = await Cloud.deleteImage(id_public);
            if (response) {
                console.log("Imagen eliminada:", response);
                setFormData((prev) => ({
                    ...prev,
                    [name_public]: "",
                    [name_url]: "",
                }));
            } else {
                console.error("No se pudo eliminar la imagen anterior");
            }
        } catch (error) {
            console.error("Error al eliminar imagen:", error);
        }
    }

    async function handleUploadSuccess(result) {
        if (!result?.info?.public_id || !result?.info?.secure_url) {
            console.error("Información de carga incompleta:", result);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se recibió la información completa de la imagen",
                confirmButtonColor: "#8c52ff",
            });
            return;
        }

        console.log(result);
        console.log(public_id);
        
        if (public_id) {
            await eliminarImagenAnterior(public_id);
        }

        const info = result.info;
        setFormData((prev) => ({
            ...prev,
            [name_public]: info.secure_url,
            [name_url]: info.public_id,
        }));

        setUploading(false);
    }

    return (
        <div className="relative w-full text-white">
            <CldUploadWidget
                uploadPreset={uploadPreset}
                options={{
                    folder: folder,
                    sources: ["local", "google_drive", "url"],
                    resourceType: "image",
                    clientAllowedFormats: ["jpg", "png", "webp"],
                    maxFileSize: size_image,
                    cropping: true,
                    croppingAspectRatio: 1,
                    croppingDefaultSelectionRatio: 1,
                    showSkipCropButton: false,
                    multiple: false,
                    styles: {
                        palette: {
                            window: "#FFFFFF",
                            windowBorder: "#8c52ff",
                            tabIcon: "#8c52ff",
                            menuIcons: "#8c52ff",
                            textDark: "#000000",
                            textLight: "#FFFFFF",
                            link: "#8c52ff",
                            action: "#8c52ff",
                            inactiveTabIcon: "#555555",
                            error: "#F44235",
                            inProgress: "#8c52ff",
                            complete: "#20B832",
                            sourceBg: "#F5F5F5"
                        }
                    }
                }}
                onUploadAdded={() => setUploading(true)}
                onSuccess={(result) => {
                    handleUploadSuccess(result);
                }}
                onError={(error) => {
                    console.error("Error al subir imagen:", error);
                    setUploading(false);
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Ocurrió un error al subir la imagen a Cloudinary",
                        confirmButtonColor: "#8c52ff",
                    });
                }}
            >
                {({ open }) => (
                    <button
                        onClick={() => open()}
                        type="button"
                        name = {name_public}
                        disabled={uploading}
                        className="flex items-center justify-center w-full p-3 border-2 border-dashed border-gray-700 rounded-lg bg-gray-900 text-white transition-all hover:border-purple-500 hover:bg-gray-800"
                    >{uploading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <>
                            <IconImage className="w-5 h-5 mr-2 text-purple-400" />
                            <span className="text-sm">Selecciona una imagen</span>
                        </>
                    )}
                    </button>
                )}
            </CldUploadWidget>
        </div>
    );
}

export default UploadImage;
