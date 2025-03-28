"use client"

import { CldUploadWidget } from "next-cloudinary"
import { useState } from "react"
import { Loader2, Camera } from "lucide-react"
import { getCookie } from "cookies-next"
import Swal from "sweetalert2"
import url from "@/api/url"

export default function ProfileImageUpload({ empleadoId, onImageUpload }) {
  const [uploading, setUploading] = useState(false)

  const handleUploadSuccess = async (result) => {
    try {
      setUploading(true)

      const response = await fetch(`${url}/api/empleados/${empleadoId}/image`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("token")}`,
        },
        body: JSON.stringify({
          public_id: result.info.public_id,
          secure_url: result.info.secure_url,
          version: Date.now(), // Para evitar caché
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Error al actualizar la imagen")
      }

      onImageUpload(result.info.secure_url, result.info.public_id)

      Swal.fire({
        icon: "success",
        title: "¡Imagen actualizada!",
        text: "Tu foto de perfil se ha actualizado correctamente",
        confirmButtonColor: "#8c52ff",
      })
    } catch (error) {
      console.error("Error:", error)
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Ocurrió un error al actualizar la imagen",
        confirmButtonColor: "#8c52ff",
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <CldUploadWidget
      uploadPreset="nextjs_digimedia_unsigned"
      options={{
        folder: `empleados/perfiles/${empleadoId}`,
        resourceType: "image",
        clientAllowedFormats: ["jpg", "png", "webp"],
        maxFileSize: 5 * 1024 * 1024, // 5MB en bytes
        cropping: true,
        croppingAspectRatio: 1,
        croppingDefaultSelectionRatio: 1,
        showSkipCropButton: false,
        multiple: false,
        sources: ["local"],
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
            sourceBg: "#F5F5F5",
          },
        },
        singleUploadAutoClose: true,
        showAdvancedOptions: false,
        croppingShowDimensions: true,
        croppingCoordinatesMode: "custom",
        croppingValidateDimensions: true,
      }}
      onUploadAdded={() => setUploading(true)}
      onSuccess={handleUploadSuccess}
      onError={(error) => {
        console.error("Error al subir imagen:", error)
        setUploading(false)
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error al subir la imagen",
          confirmButtonColor: "#8c52ff",
        })
      }}
    >
      {({ open }) => (
        <div onClick={() => !uploading && open()} className="w-full h-full flex items-center justify-center">
          {uploading ? (
            <Loader2 className="h-8 w-8 text-white animate-spin" />
          ) : (
            <Camera className="h-8 w-8 text-white" />
          )}
        </div>
      )}
    </CldUploadWidget>
  )
}

