"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Swal from "sweetalert2"
import Header from "../components/Header"
import Body1 from "../components/Body1"
import Footer from "../components/Footer"
import Fetch from "../../services/fetch"
import { Loader2 } from "lucide-react"

const Page = () => {
  const [data, setDataResponse] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const searchParams = useSearchParams()
  const id_blog = searchParams.get("id_blog")

  useEffect(() => {
    const fetchBlogData = async () => {
      if (!id_blog) {
        setError("ID de blog no proporcionado")
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError(null)
        const response = await Fetch.fetchBlogById(id_blog)
        setDataResponse(response)
      } catch (error) {
        console.error("Error fetching blog data:", error)
        setError("No se pudo cargar el contenido del blog")
        Swal.fire({
          title: "Error",
          text: "Ocurrió un error inesperado.",
          icon: "error",
          confirmButtonText: "OK",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlogData()
  }, [id_blog]) 

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">{error}</h1>
          <p className="text-gray-600 mb-6">No pudimos cargar el contenido del blog. Por favor, intenta nuevamente.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="w-full h-[80vh] relative bg-gradient-to-b from-gray-800 to-gray-900 animate-pulse">
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
            <div className="h-16 bg-white/20 rounded-lg w-3/4 max-w-xl mb-4"></div>
            <div className="h-8 bg-white/20 rounded-lg w-1/2 max-w-md mb-4"></div>
            <div className="h-24 bg-white/10 rounded-lg w-full max-w-lg"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 relative">
          <div className="hidden lg:block w-20 xl:w-24 2xl:w-32 bg-gradient-to-b from-red-700 via-sky to-blue-800 fixed left-0 top-0 h-full -z-10"></div>

          <div className="relative lg:mx-48 p-6 bg-black/5 rounded-lg shadow-[0px_10px_25px_rgba(0,0,0,0.15)] animate-pulse">
            <div className="flex flex-col xl:flex-col lg:gap-6">
              <div className="w-full">
                <div className="mb-6 mt-5 flex flex-col items-center">
                  <div className="h-12 bg-red-200 rounded-lg w-3/4 mb-3"></div>
                  <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                </div>
                <div className="h-24 bg-gray-200 rounded-lg mx-auto md:w-3/4"></div>
              </div>
              <div className="flex justify-center w-full mt-8">
                <div className="w-80 h-64 bg-red-100 rounded-3xl"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full mx-auto mt-16">
              <div className="grid grid-cols-1 gap-8">
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className="p-4 bg-gray-800 rounded-lg h-32"></div>
                ))}
              </div>
              <div className="flex flex-col justify-center p-6 bg-gray-800 rounded-lg h-80"></div>
            </div>
          </div>

          <div className="mt-12 max-w-[1000px] mx-auto bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg shadow-lg p-8 animate-pulse">
            <div className="h-8 bg-yellow-400/30 w-2/3 mx-auto rounded-lg mb-4"></div>
            <div className="space-y-3 max-w-3xl mx-auto mb-6">
              <div className="h-4 bg-gray-100/20 rounded w-full"></div>
              <div className="h-4 bg-gray-100/20 rounded w-full"></div>
              <div className="h-4 bg-gray-100/20 rounded w-5/6"></div>
            </div>
          </div>
        </div>

        <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-black/70 p-8 rounded-xl backdrop-blur-sm flex flex-col items-center">
            <Loader2 className="h-12 w-12 text-white animate-spin mb-4" />
            <p className="text-white font-medium">Cargando blog...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full text-center">
          <div className="text-gray-400 text-6xl mb-4">📄</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">Blog no encontrado</h1>
          <p className="text-gray-600 mb-6">El blog que estás buscando no existe o no está disponible.</p>
          <a
            href="/blog"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors inline-block"
          >
            Volver a blogs
          </a>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Header id_blog_head={data.id_blog_head} />

      <div className="container mx-auto px-4 py-12 relative bg-gradient-to-r text-black min-h-screen w-full">
        <div className="hidden lg:block w-20 xl:w-24 2xl:w-32 bg-gradient-to-b from-red-700 via-sky to-blue-800 fixed left-0 top-0 h-full -z-10"></div>

        <Body1 id_blog_body={data.id_blog_body} fecha={data.fecha} />

        <Footer id_blog_footer={data.id_blog} />
      </div>
    </div>
  )
}

export default Page

