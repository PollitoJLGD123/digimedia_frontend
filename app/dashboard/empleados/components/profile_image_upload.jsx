"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCookie } from "cookies-next";
import Swal from "sweetalert2";
import url from "@/api/url";

export default function ProfileImageUpload({ empleadoId, onImageUpload }) {
  const [uploading, setUploading] = useState(false);

  const handleUploadSuccess = async (result) => {
    try {
      setUploading(true);
      
      const response = await fetch(`${url}/api/empleados/${empleadoId}/image`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("token")}`
        },
        body: JSON.stringify({
          public_id: result.info.public_id,
          secure_url: result.info.secure_url,
          version: Date.now() 
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Error al actualizar la imagen");
      }

      onImageUpload(result.info.secure_url, result.info.public_id);
      
      Swal.fire({
        icon: "success",
        title: "¡Imagen actualizada!",
        text: "Tu foto de perfil se ha actualizado correctamente",
        confirmButtonColor: "#8c52ff",
      });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Ocurrió un error al actualizar la imagen",
        confirmButtonColor: "#8c52ff",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-3">
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
          sources: ["local", "camera"],
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
        onSuccess={handleUploadSuccess}
        onError={(error) => {
          console.error("Error al subir imagen:", error);
          setUploading(false);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ocurrió un error al subir la imagen",
            confirmButtonColor: "#8c52ff",
          });
        }}
      >
        {({ open }) => (
          <Button
            variant="outline"
            size="sm"
            onClick={() => open()}
            disabled={uploading}
            className="text-xs hover:bg-[#f0ebff] hover:text-[#8c52ff]"
          >
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                Subiendo...
              </>
            ) : (
              "Cambiar foto de perfil"
            )}
          </Button>
        )}
      </CldUploadWidget>
    </div>
  );
}