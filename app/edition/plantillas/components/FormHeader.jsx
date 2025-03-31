
import React from 'react'
import { Loader2 } from "lucide-react"

export default function FormHeader({dataHeader}) {
  return (
    <div
        className="w-full h-screen md:h-[80vh] relative flex items-center justify-center text-center px-6 sm:px-12 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${dataHeader.url_image.startsWith('http') ? dataHeader.url_image : "/blog/fondo_blog_extend.png"})` 
        }}
    >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 max-w-2xl text-white">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 neon-textov4">{dataHeader.titulo}</h1>

            <h1 className="text-2xl md:text-xl font-bold mb-4">{dataHeader.texto_frase}</h1>

            <p className="text-lg text-gray-300 font-light">{dataHeader.texto_descripcion}</p>

            <div className="w-20 h-1 bg-white mt-6 mx-auto"></div>
        </div>
    </div>
  )
}
