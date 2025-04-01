<<<<<<< HEAD
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from './components/Header';
import Footer from './components/Footer';

const EditBlogPage = () => {
  // Recuperar estado de localStorage
  const [section, setSection] = useState(() => {
    return typeof window !== "undefined" ? localStorage.getItem("blogSection") || "body" : "body";
  });

  // Guardar estado en localStorage cuando cambia
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("blogSection", section);
    }
  }, [section]);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />

      <div className="flex flex-1">
        {/* Menú lateral izquierdo */}
        <aside className="w-1/5 bg-white p-6 space-y-4 shadow-md border-r">
          <button 
            className={`w-full p-3 text-left font-medium rounded-lg transition ${section === "header" ? "bg-indigo-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
            onClick={() => setSection("header")}
          >
            Header
          </button>
          <button 
            className={`w-full p-3 text-left font-medium rounded-lg transition ${section === "body" ? "bg-indigo-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
            onClick={() => setSection("body")}
          >
            Body
          </button>
          <button 
            className={`w-full p-3 text-left font-medium rounded-lg transition ${section === "footer" ? "bg-indigo-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
            onClick={() => setSection("footer")}
          >
            Footer
          </button>
          <button className="w-full p-3 text-white font-medium bg-green-600 rounded-lg hover:bg-green-700 transition">Guardar</button>
        </aside>

        {/* Área de edición */}
        <main className="flex-1 bg-gray-100 p-8">
          {section === "header" && <div className="p-6 bg-white shadow-md rounded-lg">Editando: Encabezado del Blog</div>}
          {section === "body" && <div className="p-6 bg-white shadow-md rounded-lg">Editando: Cuerpo del Blog</div>}
          {section === "footer" && <div className="p-6 bg-white shadow-md rounded-lg">Editando: Pie de Página del Blog</div>}
        </main>
      </div>

     {/* Footer */}
  <Footer className="mt-8 bg-gray-800 text-white py-4 text-center" />
</div>
  );
};

export default EditBlogPage;
=======

"use client"
import Header from './components/Header';
import Footer from './components/Footer';
import React, { useState } from "react";
import "../globals.css"

export default function EditionLayout({ children }) {
  const [selectedSection, setSelectedSection] = useState(null);
  
  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      
      <div className="flex flex-1">
        <div className="w-44 bg-purple-800 text-white p-4 flex flex-col justify-between">
          <div>
            <h2 className="text-lg text-center p-4">Estructura</h2>
            <div className="space-y-3">
              <button
                className={`w-full py-2 rounded-md text-center ${selectedSection === 'header' ? 'bg-black' : 'bg-purple-700'} 
                  hover:bg-yellow hover:scale-105 hover:shadow-lg transition-all duration-200`}
                onClick={() => handleSectionClick('header')}
              >
                Header
              </button>
              <button
                className={`w-full py-2 rounded-md text-center ${selectedSection === 'body' ? 'bg-black' : 'bg-purple-700'} 
                  hover:bg-purple-800 hover:scale-105 hover:shadow-lg transition-all duration-200`}
                onClick={() => handleSectionClick('body')}
              >
                Body
              </button>
              <button
                className={`w-full py-2 rounded-md text-center ${selectedSection === 'footer' ? 'bg-black' : 'bg-purple-700'} 
                  hover:bg-purple-800 hover:scale-105 hover:shadow-lg transition-all duration-200`}
                onClick={() => handleSectionClick('footer')}
              >
                Footer
              </button>
            </div>
          </div>

          <button className="w-full py-2 mt-4 bg-[#4CAF50] hover:bg-[#3cf743] text-white rounded-md">
            Guardar
          </button>
        </div>

        <div className="flex-1 p-4 bg-white">
          {children} 
        </div>
      </div>

      <Footer />
    </div>
  );
}
>>>>>>> origin/master
