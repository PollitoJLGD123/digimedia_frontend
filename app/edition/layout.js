
"use client"
import Header from './components/Header';
import Footer from './components/Footer';
import React, { useState } from "react";
import "../globals.css"

export default function EditionLayout({ children }) {
  // Estado para controlar qué botón está seleccionado
  const [selectedSection, setSelectedSection] = useState(null);

  // Función para manejar la selección de una sección
  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />
      
      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Sidebar */}
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

          {/* Button "Guardar" */}
          <button className="w-full py-2 mt-4 bg-[#4CAF50] hover:bg-[#3cf743] text-white rounded-md">
            Guardar
          </button>
        </div>

        {/* Main Editing Area */}
        <div className="flex-1 p-8 bg-white">
          {children} {/* Aquí se renderiza el contenido de la página de edición */}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}