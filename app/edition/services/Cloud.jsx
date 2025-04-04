
import React from 'react'
import axios from 'axios'

const API_DELETE = "/api/delete_image";

const Cloud = {
    deleteImage: async function deleteImage(public_id) {
        try {
            const response = await axios.post(API_DELETE, 
                { 
                    "public_id": public_id
                },
                {   
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (response.status === 200) {
                console.log("Imagen eliminada de Cloudinary:", response.data.result);
                return response.data.result;
            }
            else {
                return null;
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

export default Cloud;