"use client"
import { useEffect, useState } from "react"
import { getCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { ArrowLeft, FileText, Mail, User, FileCheck, Clock, AlertTriangle, CheckCircle } from "lucide-react"

export default function Page() {
  const router = useRouter()
  const [reclamacion, setReclamacion] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const infoReclamacion = getCookie("reclamacion")
    if (infoReclamacion) {
      setReclamacion(JSON.parse(infoReclamacion))
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-t-[#8c52ff] border-gray-200 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 font-medium">Cargando datos...</p>
        </div>
      </div>
    )
  }

  if (!reclamacion) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <AlertTriangle className="w-16 h-16 text-amber-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No se encontraron datos</h2>
        <p className="text-gray-600 mb-6 text-center">No se pudo cargar la información de la reclamación</p>
        <button
          className="bg-[#8c52ff] text-white px-4 py-2 rounded-lg hover:bg-[#7b45e0] transition duration-300 flex items-center"
          onClick={() => router.push("/dashboard/reclamaciones/")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a la lista
        </button>
      </div>
    )
  }

  const getStatusColor = (status) => {
    return status === "ATENDIDO"
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-amber-100 text-amber-800 border-amber-200"
  }

  const getStatusIcon = (status) => {
    return status === "ATENDIDO" ? <CheckCircle className="w-4 h-4 mr-1.5" /> : <Clock className="w-4 h-4 mr-1.5" />
  }

  return (
    <div className="bg-gray-50 p-4 md:p-6 max-h-screen ">
      <div className=" mx-auto">
        <div className="mb-2">
          <button
            className="bg-white text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-300 flex items-center shadow-sm"
            onClick={() => router.push("/dashboard/reclamaciones/")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a la lista
          </button>
        </div>

        <div className="bg-white shadow-sm rounded-xl overflow-hidden">
          <div className="border-b border-gray-100 p-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div className="flex items-center">
                <div className="bg-[#8c52ff]/10 p-3 rounded-lg mr-4">
                  <FileText className="w-6 h-6 text-[#8c52ff]" />
                </div>
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                    Reclamación #{reclamacion.id_reclamacion}
                  </h1>
                  <p className="text-gray-500 text-sm">
                    {reclamacion.tipoReclamo} - {reclamacion.servicioContratado}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <span
                  className={`flex items-center px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusColor(reclamacion.estadoReclamo)}`}
                >
                  {getStatusIcon(reclamacion.estadoReclamo)}
                  {reclamacion.estadoReclamo}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4" >
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-[#8c52ff]" />
                Información del Cliente
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                <div className="flex items-start ">
                  <div className="flex-shrink-0 mr-1">
                    <span className="text-sm font-medium text-gray-500">Nombre:</span>
                  </div>
                  <div className="flex-grow">
                    <span className="text-sm text-gray-800 font-medium">
                      {reclamacion.nombre} {reclamacion.apellido}
                    </span>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-1">
                    <span className="text-sm font-medium text-gray-500">Email:</span>
                  </div>
                  <div className="flex-grow">
                    <a 
                      href={`mailto:${reclamacion.email}?subject=Respuesta%20a%20su%20contacto&body=Hola%20${reclamacion.nombre},%0A%0A`}
                      className="text-sm font-medium text-[#8c52ff] hover:underline break-all flex items-center group"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {reclamacion.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-1">
                    <span className="text-sm font-medium text-gray-500">Documento:</span>
                  </div>
                  <div className="flex-grow">
                    <span className="text-sm text-gray-800">
                      {reclamacion.documento}: {reclamacion.numeroDocumento}
                    </span>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-1">
                    <span className="text-sm font-medium text-gray-500">Teléfono:</span>
                  </div>
                  <div className="flex-grow">
                    {reclamacion.celular ? (
                    <a 
                      href={`https://wa.me/${reclamacion.celular.replace(/\D/g, '')}`}
                      className="text-sm font-medium text-[#8c52ff] hover:underline flex items-center group"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {reclamacion.celular}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-gray-800">No proporcionado</p>
                  )}
                  </div>
                </div>

                <div className="flex items-start md:col-span-2">
                  <div className="flex-shrink-0 mr-1">
                    <span className="text-sm font-medium text-gray-500">Dirección:</span>
                  </div>
                  <div className="flex-grow">
                    <span className="text-sm text-gray-800">
                      {reclamacion.direccion}, {reclamacion.distrito}, {reclamacion.ciudad}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FileCheck className="w-5 h-5 mr-2 text-[#8c52ff]" />
                Detalles de la Reclamación
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-1">
                    <span className="text-sm font-medium text-gray-500">Fecha Reclamo:</span>
                  </div>
                  <div className="flex-grow">
                    <span className="text-sm text-gray-800">{reclamacion.fechaReclamo}</span>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-1">
                    <span className="text-sm font-medium text-gray-500">Fecha Incidente:</span>
                  </div>
                  <div className="flex-grow">
                    <span className="text-sm text-gray-800">{reclamacion.fechaIncidente}</span>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-1">
                    <span className="text-sm font-medium text-gray-500">Tipo Reclamo:</span>
                  </div>
                  <div className="flex-grow">
                    <span className="text-sm text-gray-800">{reclamacion.tipoReclamo}</span>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-1 flex-shrink-0">
                    <span className="text-sm font-medium text-gray-500">Servicio:</span>
                  </div>
                  <div className="flex-grow">
                    <span className="text-sm text-gray-800">{reclamacion.servicioContratado}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Mail className="w-5 h-5 mr-2 text-[#8c52ff]" />
              Mensaje de Reclamo
            </h2>

            <div className="overflow-auto w-[1100px] h-32">
              <p className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed">{reclamacion.reclamoPerson}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

