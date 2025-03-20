"use client"
import { useEffect, useState } from "react"
import { getCookie, deleteCookie } from "cookies-next"
import { useSearchParams, useRouter } from "next/navigation"
import { User, Mail, Phone, BadgeIcon, Shield, ArrowLeft, Edit, KeyRound, Loader2 } from "lucide-react"

import ModalEmpleado from "../empleados/components/modal_empleado"
import ModalUpdatePass from "../empleados/components/modal_update_password"

import Swal from "sweetalert2"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function Page() {
  const [userData, setUserData] = useState(null)
  const [empleadoData, setEmpleadoData] = useState(null)
  const [userRole, setUserRole] = useState("Usuario")
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)

  const searchParams = useSearchParams()
  const router = useRouter()
  const empleadoId = searchParams.get("id_empleado")
  const api_url = "http://127.0.0.1:8000/api/empleados"

  useEffect(() => {
    setIsClient(true)

    const loadData = async () => {
      if (empleadoId) {
        const userRole = getCookie("rol")
        console.log("userRole:", userRole)
        if (userRole !== "administrador") {
          Swal.fire({
            icon: "error",
            title: "Acceso denegado",
            text: "No tienes permiso para ver este perfil.",
            confirmButtonColor: "#8c52ff",
          })
          setIsLoading(false)
          return
        }

        try {
          const token = getCookie("token")
          if (!token) {
            throw new Error("No se encontró el token de autenticación")
          }

          const response = await fetch(`${api_url}/${empleadoId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          })

          if (!response.ok) {
            if (response.status === 401) {
              deleteCookie("token")
              router.push("/login")
            }
            throw new Error(`Error ${response.status}: ${response.statusText}`)
          }

          const data = await response.json()

          if (data.status === 200) {
            setEmpleadoData(data.data)
            setUserRole(data.data.rol?.nombre || "Usuario")
          } else {
            console.error("Empleado no encontrado:", data.message)
          }
        } catch (error) {
          console.error("Error API:", error)
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un error al cargar el perfil del empleado.",
            confirmButtonColor: "#8c52ff",
          })
        } finally {
          setIsLoading(false)
        }
      } else {
        const userCookie = getCookie("user")
        const empleadoCookie = getCookie("empleado")
        const rolCookie = getCookie("rol")

        if (empleadoCookie) setEmpleadoData(JSON.parse(empleadoCookie))
        if (userCookie) setUserData(JSON.parse(userCookie))
        if (rolCookie) setUserRole(rolCookie)
        setIsLoading(false)
      }
    }

    loadData()
  }, [empleadoId, router])

  const handleUpdateSuccess = (updatedData) => {
    setEmpleadoData(updatedData)
  }

  if (isLoading) {
    return (
      <div className="w-full h-[70vh] flex flex-col justify-center items-center">
        <Loader2 className="h-10 w-10 text-[#8c52ff] animate-spin mb-3" />
        <p className="text-[#8c52ff] font-medium text-sm">Cargando perfil...</p>
      </div>
    )
  }

  const nombre = empleadoData?.nombre || userData?.nombre || "No disponible"
  const apellido = empleadoData?.apellido || userData?.apellido || "No disponible"
  const dni = empleadoData?.dni || userData?.dni || "No disponible"
  const displayName = `${nombre} ${apellido}`
  const email = empleadoData?.email || userData?.email || "No disponible"
  const telefono = empleadoData?.telefono || "No disponible"

  // Determine permissions based on role
  const getRolePermissions = (role) => {
    switch (role.toLowerCase()) {
      case "administrador":
        return ["Acceso Total", "Gestión de Empleados", "Reportes", "Configuración"]
      case "marketing":
        return ["Gestión de Contenido", "Campañas", "Análisis"]
      case "ventas":
        return ["Registro de Ventas", "Clientes", "Cotizaciones"]
      default:
        return ["Acceso Básico"]
    }
  }

  const permissions = getRolePermissions(userRole)

  return (
    <div className="container mx-auto py-6 px-4 max-w-5xl">
      <Card className="overflow-hidden border-none shadow-md">
        {/* Header con color morado claro */}
        <div className="bg-[#8c52ff] p-4 text-white">
          <div className="flex justify-between items-center">
            <h1 className="text-xl md:text-2xl font-bold">Perfil del Empleado</h1>
            {empleadoId && (
              <Button
                variant="secondary"
                size="sm"
                className="text-[#8c52ff] bg-white hover:bg-gray-100"
                onClick={() => router.push("/dashboard/empleados")}
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Volver
              </Button>
            )}
          </div>
        </div>

        <div className="p-4 md:p-5">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile sidebar */}
            <div className="md:w-1/3">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-[#8c52ff] flex items-center justify-center text-white text-3xl font-bold shadow-md transform transition-transform hover:scale-105 border-2 border-[#7a45e6]">
                    {nombre.charAt(0)}
                    {apellido.charAt(0)}
                  </div>
                  <Badge className="absolute -bottom-2 right-[0.1px] py-0.5 text-xs bg-[#4d2994] text-white">
                    {userRole}
                  </Badge>
                </div>

                <h2 className="mt-3 text-xl font-bold text-gray-800">{displayName}</h2>
                <p className="text-gray-500 text-sm">{email}</p>

                {!empleadoId && (
                  <div className="mt-4 w-full space-y-2">
                    <Button className="w-full text-sm" variant="outline" onClick={() => setShowEditModal(true)}>
                      <Edit className="mr-1.5 h-3.5 w-3.5" />
                      Editar Perfil
                    </Button>
                    <Button
                      className="w-full text-sm bg-[#f0ebff] text-[#8c52ff] hover:bg-[#e4d9ff] border-[#8c52ff] border"
                      variant="secondary"
                      onClick={() => setShowPasswordModal(true)}
                    >
                      <KeyRound className="mr-1.5 h-3.5 w-3.5" />
                      Cambiar Contraseña
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Main content */}
            <div className="md:w-2/3">
              <Card className="border border-gray-200">
                <CardHeader className="py-3 px-4">
                  <CardTitle className="text-base text-[#8c52ff]">Información Personal</CardTitle>
                </CardHeader>
                <CardContent className="py-3 px-4 space-y-3">
                  <div className="flex items-center">
                    <User className="h-4 w-4 text-[#8c52ff] mr-2.5" />
                    <div>
                      <p className="text-xs text-gray-500">Nombre Completo</p>
                      <p className="font-medium text-sm">{displayName}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <BadgeIcon className="h-4 w-4 text-[#8c52ff] mr-2.5" />
                    <div>
                      <p className="text-xs text-gray-500">DNI</p>
                      <p className="font-medium text-sm">{dni}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-[#8c52ff] mr-2.5" />
                    <div>
                      <p className="text-xs text-gray-500">Correo Electrónico</p>
                      <p className="font-medium text-sm">{email}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-[#8c52ff] mr-2.5" />
                    <div>
                      <p className="text-xs text-gray-500">Teléfono</p>
                      <p className="font-medium text-sm">{telefono}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-4 border border-gray-200">
                <CardHeader className="py-3 px-4">
                  <CardTitle className="text-base text-[#8c52ff]">Acceso al Sistema</CardTitle>
                </CardHeader>
                <CardContent className="py-3 px-4">
                  <div className="flex items-center mb-3">
                    <div className="h-8 w-8 rounded-full bg-[#f0ebff] flex items-center justify-center">
                      <Shield className="h-4 w-4 text-[#8c52ff]" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium">Rol de Usuario</h3>
                      <p className="text-[#8c52ff] font-semibold text-sm">{userRole}</p>
                    </div>
                  </div>

                  <Separator className="my-3" />

                  <div>
                    <h4 className="text-xs font-medium text-gray-500 mb-2">Permisos</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {permissions.map((permission, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="px-2 py-0.5 text-xs bg-[#f0ebff] text-[#8c52ff] border-[#d9c6ff]"
                        >
                          {permission}
                        </Badge>
                      ))}
                      <Badge
                        variant="outline"
                        className="px-2 py-0.5 text-xs bg-[#f0ebff] text-[#8c52ff] border-[#d9c6ff]"
                      >
                        Reclamaciones
                      </Badge>
                      <Badge
                        variant="outline"
                        className="px-2 py-0.5 text-xs bg-[#f0ebff] text-[#8c52ff] border-[#d9c6ff]"
                      >
                        Modales
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Card>

      {/* Modales */}
      {showEditModal && (
        <ModalEmpleado
          isVisible={showEditModal}
          onClose={() => setShowEditModal(false)}
          data={empleadoData}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
      {showPasswordModal && (
        <ModalUpdatePass
          isVisible={showPasswordModal}
          onClose={() => setShowPasswordModal(false)}
          empleadoId={empleadoData?.id_empleado}
        />
      )}
    </div>
  )
}

