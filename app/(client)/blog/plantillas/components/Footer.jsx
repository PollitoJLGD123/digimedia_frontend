

import React from 'react'
import Fetch from '../../services/fetch';
import Swal from 'sweetalert2';
import { useEffect,  useState } from 'react';
import { Loader2 } from "lucide-react"

export default function Footer({ id_blog_footer }) {

    const [data, setDataResponse] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function fetchData(){
        try{
            setIsLoading(true);
            const response = await Fetch.fetchBlogFooter(id_blog_footer);
            console.log(response);
            setDataResponse(response);
        }catch(error){
            console.log(error)
            Swal.fire({title: "Error", 
                text: "Ocurrió un error inesperado.", 
                icon: "error", 
                confirmButtonText: "OK"
            })
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
        { isLoading ? (
            <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl shadow-sm">
                <Loader2 className="h-10 w-10 text-purple-600 animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Cargando artículos...</p>
            </div>
        ): (
            <div className="mt-10 p-6 bg-gray-900 rounded-lg shadow-lg">
                <h3 className="text-2xl text-center font-bold mb-3 text-yellow-400">{data.titulo}</h3>
                <p className="text-gray-100">
                    {data.descripcion}
                </p>

                {(data.url_image1 || data.url_image2 || data.url_image3) && (
                    <div className="flex justify-center">
                        {data.url_image1 && (
                            <img src={data.url_image1} alt="Imagen 1" className="w-24 h-24 object-contain" />
                        )}
                        {data.url_image2 && (
                            <img src={data.url_image2} alt="Imagen 2" className="w-24 h-24 object-contain" />
                        )}
                        {data.url_image3 && (
                            <img src={data.url_image3} alt="Imagen 3" className="w-24 h-24 object-contain" />
                        )}
                    </div>
                )}
            </div>
            )
        }
        </>
    )
}
