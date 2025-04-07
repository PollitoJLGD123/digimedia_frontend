"use client"
import { Eye, Pencil } from "lucide-react"
import Link from "next/link"

const templates = [
    {
        src: "/dashboard/blogs/plantilla1.png",
        viewLink: "/blog/look/blog-bar/",
        editLink: "/edition/plantillas/plantilla1",
        name: "Plantilla Moderna",
    },
    {
        src: "/dashboard/blogs/plantilla2.png",
        viewLink: "/blog/look/desarrollo-web/",
        editLink: "/edition/plantillas/plantilla2",
        name: "Plantilla Elegante",
    },
    {
        src: "/dashboard/blogs/plantilla3.png",
        viewLink: "/blog/look/gestion-redes/",
        editLink: "/edition/plantillas/plantilla3",
        name: "Plantilla Minimalista",
    },
]

export default function Page() {
    return (
        <div className="flex w-full justify-center items-center">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl shadow-xl w-full max-w-6xl overflow-hidden">
                <div className="py-1 px-10 text-center relative">
                    <div className="absolute top-0 left-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.1)_0,_rgba(255,255,255,0)_70%)]"></div>
                    <div className="relative z-10">
                        <h1 className="mt-5 mb-0 text-4xl md:text-5xl font-bold text-white tracking-tight">PLANTILLAS DE BLOGS</h1>
                        <p className="text-purple-100 text-lg max-w-2xl mx-auto">
                            Selecciona una de nuestras plantillas para crear tu blog
                        </p>
                    </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-8">
                    <div className="flex justify-between w-full items-center">
                        {templates.map((template, index) => (
                            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-xl transform transition duration-500 hover:scale-105">
                                <div className="px-8 py-5 relative bg-white rounded-xl overflow-hidden shadow-xl transform transition duration-500 hover:scale-105">
                                    <img
                                        src={template.src}
                                        alt={`Plantilla ${index + 1}`}
                                        className="w-full h-[19rem] object-cover"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/40 transition-opacity">
                                        <Link href={template.viewLink} target="_blank" className="z-10">
                                            <button title="Visualizar Plantilla" className="bg-white p-3 rounded-full shadow-md hover:bg-gray-200 transition">
                                                <Eye className="w-6 h-6 text-teal-600" />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="p-3 text-center">
                                    <h1 className="text-sm font-sans font-bold text-gray-700 mb-2">{template.name}</h1>
                                    <Link href={template.editLink}>
                                        <button className="flex items-center justify-center gap-2 w-full bg-teal-600 text-white py-2 rounded-lg shadow-md hover:bg-teal-700 transition">
                                            <Pencil className="w-4 h-4" /> Editar
                                        </button>
                                    </Link>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

