
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { Loader2, CheckCircle } from 'lucide-react'
import Fetch from '../../services/fetch'

export default function Body2() {

    const [data, setDataResponse] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                setIsLoading(true)
                setError(null)
                const response = await Fetch.fetchBlogBodyById(id_blog_body)
                setDataResponse(response)
            } catch (error) {
                console.error("Error fetching blog data:", error)
                setError("Ocurrió un error al cargar el contenido")
                Swal.fire({
                    title: "Error",
                    text: "Ocurrió un error inesperado.",
                    icon: "error",
                    confirmButtonText: "OK"
                })
            } finally {
                setIsLoading(false)
            }
        }

        fetchBlogData()
    }, [id_blog_body])

    if (isLoading) {
        return (
            <div className="relative lg:mx-48 p-6 bg-black/5 text-black rounded-lg shadow-[0px_10px_25px_rgba(0,0,0,0.15)] animate-pulse">
                <div className="flex flex-col xl:flex-col lg:gap-6">
                    <div className="w-full">
                        <div className="mb-6 mt-5 flex flex-col items-center">
                            <div className="h-12 bg-red-200 rounded-lg w-3/4 mb-3"></div>
                            <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                        </div>
                        <div className="h-24 bg-gray-200 rounded-lg mx-auto md:w-3/4"></div>
                    </div>
                    <div className="flex justify-center w-full mt-8">
                        <div className="w-80 xl:w-96 h-64 bg-red-100 rounded-3xl"></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full mx-auto mt-16">
                    <div className="grid grid-cols-1 gap-8">
                        {[1, 2, 3, 4].map((_, index) => (
                            <div key={index} className="p-4 bg-gray-800 rounded-lg h-32"></div>
                        ))}
                    </div>
                    <div className="flex flex-col justify-center p-6 bg-gray-800 rounded-lg h-80"></div>
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10 backdrop-blur-sm rounded-lg">
                    <div className="bg-white p-6 rounded-xl shadow-xl flex flex-col items-center">
                        <Loader2 className="h-12 w-12 text-red-500 animate-spin mb-4" />
                        <p className="text-gray-700 font-medium">Cargando contenido...</p>
                        <p className="text-gray-500 text-sm mt-1">Esto puede tomar unos segundos</p>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="relative lg:mx-48 p-12 bg-black/5 text-black rounded-lg shadow-[0px_10px_25px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center">
                <div className="text-red-500 text-6xl mb-4">⚠️</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">No se pudo cargar el contenido</h2>
                <p className="text-gray-600 mb-6">Por favor, intenta recargar la página</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                    Reintentar
                </button>
            </div>
        )
    }

    if (!data) {
        return (
            <div className="relative lg:mx-48 p-12 bg-black/5 text-black rounded-lg shadow-[0px_10px_25px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center">
                <div className="text-gray-400 text-6xl mb-4">📄</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">No hay contenido disponible</h2>
                <p className="text-gray-600">El artículo que buscas no está disponible en este momento</p>
            </div>
        )
    }

    return (
        <>
        
        </>
    )
}
