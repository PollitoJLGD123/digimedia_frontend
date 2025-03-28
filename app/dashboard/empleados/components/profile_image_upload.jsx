import { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Upload, Loader2 } from "lucide-react";
import url from "../../../../api/url"

const api_url = `${url}/api/empleados`;

const ProfileImageUpload = ({ empleadoId, onImageUpload }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  // components/profile_image_upload.jsx
  const handleImageUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('id_empleado', empleadoId);
      formData.append('file', file);
  
      const response = await axios.post(`${api_url}/upload-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
  
      if (response.data.image_url) {
        onImageUpload(response.data.image_url.replace('dl=0', 'raw=1'));
      }
    } catch (error) {
      console.error('Error detallado:', error.response?.data || error.message);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Button 
        variant="outline" 
        size="sm" 
        className="relative text-xs"
        disabled={isUploading}
      >
        <input 
          type="file" 
          accept="image/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImageUpload(file);
          }}
          disabled={isUploading}
        />
        {isUploading ? (
          <>
            <Loader2 className="mr-2 h-3 w-3 animate-spin" />
            Subiendo...
          </>
        ) : (
          <>
            <Upload className="mr-2 h-3 w-3" />
            Cambiar foto
          </>
        )}
      </Button>
      {error && (
        <p className="mt-1 text-xs text-red-500 text-center max-w-[150px]">
          {error}
        </p>
      )}
    </div>
  );
};

export default ProfileImageUpload;