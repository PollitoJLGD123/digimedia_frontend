
import { v2 as cloudinary } from "cloudinary";

export default async function DeleteImage(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ 
            message: "Metodo no permitido" 
        });
    }

    const { public_id } = req.body;

    cloudinary.config({
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    try {
        const result = await cloudinary.uploader.destroy(public_id);
        return res.status(200).json({ message: "Imagen eliminada", result });
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar", error });
    }
}