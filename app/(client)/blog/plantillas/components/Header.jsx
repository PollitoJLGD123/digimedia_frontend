
import React from 'react'
import Swal from 'sweetalert2';
import Fetch from '../../services/fetch';
import { useEffect,  useState } from 'react';
import {Loader2} from "lucide-react"

export default function Header({ id_blog_head }) {

    const [data, setDataResponse] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function fetchData(){
        try{
            setIsLoading(true);
            const response = await Fetch.fetchBlogHead(id_blog_head);
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
            <div className="w-full h-screen md:h-[80vh] relative flex items-center justify-center text-center px-6 sm:px-12 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(/blog/${data.url_image})` }}>

                <div className="absolute inset-0 bg-black/60"></div>

                <div className="relative z-10 max-w-2xl text-white">

                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4 neon-textov4">
                        {data.titulo}
                    </h1>

                    <h1 className="text-2xl md:text-xl font-bold mb-4">
                        {data.texto_frase}
                    </h1>

                    <p className="text-lg text-gray-300 font-light">
                        {data.texto_descripcion}
                    </p>

                    <div className="w-20 h-1 bg-white mt-6 mx-auto"></div>
                </div>
            </div>
            )
        }
        </>
    )
}
