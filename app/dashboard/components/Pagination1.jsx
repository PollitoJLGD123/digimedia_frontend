'use client'

import React from 'react'
import { useRouter } from "next/navigation"

export default function Pagination1({filteredData,currentPage, totalPages}) {

    const router = useRouter()
    
    return (
    <>
    {filteredData.length > 0 && (
        <div className="mt-6">
        <div className="flex justify-center items-center space-x-2">
           
            
            <div className="flex space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                key={page}
                onClick={() => router.push(`?page=${page}`)}
                className={`w-8 h-8 flex items-center justify-center rounded-md ${
                    Number(currentPage) === page
                    ? "bg-[#8c52ff] text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
                >
                {page}
                </button>
            ))}
            </div>
        </div>
        
        <p className="text-sm text-gray-500 mt-2 text-center">
            Mostrando {Math.min(4, filteredData.slice((currentPage - 1) * 4, currentPage * 4).length)} de {filteredData.length} contactos
        </p>
        </div>
    )}
    </>
    )
}
