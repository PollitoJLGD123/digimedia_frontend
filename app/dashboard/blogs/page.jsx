"use client"
import React from 'react'
import { Eye, Pencil } from "lucide-react"
import Link from 'next/link'

const templates = [
    { src: "/dashboard/blogs/plantilla1.png", viewLink: "/blog/plantillas/plantilla1/?id_blog=1", editLink: "#" },
    { src: "/dashboard/blogs/plantilla2.png", viewLink: "/blog/plantillas/plantilla2/?id_blog=2", editLink: "#" },
    { src: "/dashboard/blogs/plantilla3.png", viewLink: "/blog/plantillas/plantilla3/?id_blog=3", editLink: "#" }
];

export default function Page() {
    return (
        <div className="flex w-full justify-center">
            <div className ="bg-gradient-to-r from-purple-500 to-indigo-600 text-center  rounded-xl shadow-lg my-8 px-10">
                <h1 className="text-5xl font-bold text-white my-5">PLANTILLAS de BLOGS</h1>
                <div className="flex justify-between gap-10 w-full max-w-6xl">
                    {templates.map((template, index) => (
                        <div key={index} className="bg-white rounded-xl overflow-hidden shadow-xl transform transition duration-500 hover:scale-105">
                            <div className="p-11 relative bg-white rounded-xl overflow-hidden shadow-xl transform transition duration-500 hover:scale-105">
                                <img
                                    src={template.src}
                                    alt={`Plantilla ${index + 1}`}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/40 transition-opacity">
                                    <Link href={template.viewLink} target="_blank" className="z-10">
                                        <button title="Visualizar Plantilla" className="bg-white p-3 rounded-full shadow-md hover:bg-gray-200 transition">
                                            <Eye  className="w-6 h-6 text-teal-600" />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            <div className="p-4 text-center">
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
    )
}
