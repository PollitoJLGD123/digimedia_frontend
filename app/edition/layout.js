"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { Button } from "@/components/ui/button"
import { Save, Layout, Type, FootprintsIcon as FooterIcon, House, BookTemplate, Pencil } from "lucide-react"
import "../globals.css"

export default function EditionLayout({ children }) {
  const [selectedSection, setSelectedSection] = useState("")

  const handleSectionClick = (id) => {
    setSelectedSection(id)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  useEffect(() => {
      const sections = document.querySelectorAll("#header, #body, #footer")
      console.log(sections)
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setSelectedSection(entry.target.id);
              console.log(entry.target.id);
            }
          });
        },
        { threshold: 0.5 }
      );
  
      sections.forEach((section) => observer.observe(section));
  
      return () => sections.forEach((section) => observer.unobserve(section));
    }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex flex-1">
        <div className="w-64 bg-gradient-to-b from-slate-800 to-slate-900 text-white fixed top-0 left-0 h-full pt-20 shadow-xl">
          <div className="px-6 py-4 border-b border-slate-700/50">
            <div className="flex items-center justify-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
              <h1 className="text-lg tracking-wide font-extrabold">MODO EDICIÓN</h1>
              <Pencil className="mb-1 h-4 w-4" />
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-4 flex items-center">
              <span className="h-px flex-grow bg-slate-700 mr-2"></span>
              Estructura
              <span className="h-px flex-grow bg-slate-700 ml-2"></span>
            </h2>

            <div className="space-y-3 w-full mb-auto">
              <button
                className={`section group w-full py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 flex items-center
                  ${selectedSection === "header"
                    ? "bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg border-l-4 border-emerald-500"
                    : "bg-slate-800/30 hover:bg-slate-700/50 hover:translate-x-1"
                  }`}
                onClick={() => handleSectionClick("header")}
              >
                <Layout
                  className={`mr-3 h-4 w-4 ${selectedSection === "header" ? "text-emerald-400" : "text-slate-400 group-hover:text-white"}`}
                />
                Header
              </button>

              <button
                className={`section group w-full py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 flex items-center
                  ${selectedSection === "body"
                    ? "bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg border-l-4 border-emerald-500"
                    : "bg-slate-800/30 hover:bg-slate-700/50 hover:translate-x-1"
                  }`}
                onClick={() => handleSectionClick("body")}
              >
                <Layout
                  className={`mr-3 h-4 w-4 ${selectedSection === "body" ? "text-emerald-400" : "text-slate-400 group-hover:text-white"}`}
                />
                Body
              </button>

              <button
                className={`section group w-full py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 flex items-center
                  ${selectedSection === "footer"
                    ? "bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg border-l-4 border-emerald-500"
                    : "bg-slate-800/30 hover:bg-slate-700/50 hover:translate-x-1"
                  }`}
                onClick={() => handleSectionClick("footer")}
              >
                <FooterIcon
                  className={`mr-3 h-4 w-4 ${selectedSection === "footer" ? "text-emerald-400" : "text-slate-400 group-hover:text-white"}`}
                />
                Footer
              </button>
            </div>

            <h2 className="text-xs mt-3 font-medium uppercase tracking-wider text-slate-400 mb-4 flex items-center">
              <span className="h-px flex-grow bg-slate-700 mr-2"></span>
              OPCIONES
              <span className="h-px flex-grow bg-slate-700 ml-2"></span>
            </h2>

            <button
              className="group w-full py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 flex items-center bg-slate-800/30 hover:bg-slate-700/50 hover:translate-x-1"
            >
              <Link href="/dashboard/main" className="flex items-center">
                <House
                  className="mr-3 h-4 w-4 text-slate-400 group-hover:text-white"
                />
                Inicio
              </Link>
            </button>

            <button
              className="group w-full py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 flex items-center bg-slate-800/30 hover:bg-slate-700/50 hover:translate-x-1"
            >
              <Link href="/dashboard/blogs" className="flex items-center">
                <BookTemplate
                  className="mr-3 h-4 w-4 text-slate-400 group-hover:text-white"
                />
                Plantillas
              </Link>
            </button>
          </div>

          <div className="absolute bottom-0 left-0 w-full p-6 border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
            <Button className="w-full bg-emerald-600 hover:bg-emerald-500 transition-all duration-300 py-5 shadow-lg shadow-emerald-900/20">
              <Save className="mr-2 h-4 w-4" />
              Guardar Cambios
            </Button>
          </div>
        </div>
        <div className="flex-1 p-6 ml-64 bg-slate-50 overflow-auto">{children}</div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  )
}

