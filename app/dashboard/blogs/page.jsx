
import { useState, useEffect } from "react"
import Swal from "sweetalert2"
import axios from "axios"
import Link from "next/link"
import { getCookie } from "cookies-next"
import url from "../../../api/url"
import { Search, Eye, ToggleLeft, Trash2, Loader2, Filter, Download, RefreshCw, Contact } from "lucide-react"


export default function Page() {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const id_empleado = getCookie('empleado') ? JSON.parse(getCookie('empleado')).id_empleado : -1;
    const [url_send, setUrlSend] = useState("")
    const [isRefreshing, setIsRefreshing] = useState(false)

    const [filteredData, setFilteredData] = useState([])
    const [totalPages, setTotalPages] = useState(1)

    const [pageActual, setPageActual] = useState(1)

    const userRole = getCookie('rol') || 'administrador';

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        try {
            setIsRefreshing(true)
            if (userRole === "administrador") {
                setUrlSend(`${url}/api/cards`)
            }
            else {
                setUrlSend(`${url}/api/cards/${id_empleado}`)
            }

            const response = await axios.get(url_send, {
                headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                },
            })

            if (response.status === 200) {
                setData(response.data)
            }
            else {
                console.error("Error axios: ", response.status)
                Swal.fire({
                    title: "Error",
                    text: "Ocurrió un error inesperado.",
                    icon: "error",
                    confirmButtonText: "OK",
                })
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Ocurrió un error inesperado.",
                icon: "error",
                confirmButtonText: "OK",
            })
        } finally {
            setIsRefreshing(false)
        }
    }

    return (
        <>
            <main className="p-4 md:p-6 flex flex-col w-full h-[100vh] bg-gray-50 dark:bg-gray-900 overflow-y-auto">
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6 dark:bg-gray-800 dark:text-white">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{userRole === "administrador" ? "Gestión de Blogs" : "Tus Blogs Creados"}</h1>

                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            <div className="relative flex-grow">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Buscar por nombre, correo o ID..."
                                    className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8c52ff] focus:border-transparent"
                                    
                                    
                                />
                            </div>

                            <div className="flex gap-2">
                                <button
                                    
                                    className="flex items-center gap-2 px-3 py-2 bg-green-50 text-green-600 rounded-lg border border-green-100 hover:bg-green-100 transition-colors"
                                    title="Exportar a CSV"
                                >
                                    <Download size={18} />
                                    <span className="hidden sm:inline">Exportar</span>
                                </button>

                                <button
                                    onClick={() => fetchData()}
                                    disabled={isRefreshing}
                                    className={`flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors ${isRefreshing ? "opacity-70 cursor-not-allowed" : ""}`}
                                    title="Actualizar datos"
                                >
                                    {isRefreshing ? <Loader2 size={18} className="animate-spin" /> : <RefreshCw size={18} />}
                                    <span className="hidden sm:inline">Actualizar</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-16">
                            <Loader2 className="h-10 w-10 text-[#8c52ff] animate-spin mb-4" />
                            <p className="text-gray-500 font-medium">Cargando blogs...</p>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto rounded-lg border border-gray-100">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                ID
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Titulo
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Correo
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Servicio de Contrato
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Estado
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900">
                                        {filteredData.length > 0 ? (
                                            filteredData
                                                .slice((Number(currentPage) - 1) * 4, Number(currentPage) * 4)
                                                .map((modal) => (
                                                    <tr key={`${modal.id_modalservicio}-Row`} className="hover:bg-gray-50 transition-colors dark:hover:bg-gray-800 dark:text-white">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                            {modal.id_modalservicio}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-white">{modal.nombre}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-white">{modal.correo}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-white">{modal.servicio.nombre}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span
                                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${modal.estado ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                                                    }`}
                                                            >
                                                                {modal.estado ? "Activo" : "Inactivo"}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <div className="flex justify-end gap-2">
                                                                <button
                                                                    onClick={() => visualizar(modal.id_modalservicio)}
                                                                    title="Visualizar"
                                                                    className="p-1.5 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors"
                                                                >
                                                                    <Eye size={18} />
                                                                </button>

                                                                <button
                                                                    title="Emails y WhatsApp"
                                                                    className="p-1.5 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors"
                                                                >
                                                                    <Link href={`./mails?id_modal=${modal.id_modalservicio}`} >
                                                                        <Contact size={17} />
                                                                    </Link>
                                                                </button>

                                                                <button
                                                                    onClick={() =>
                                                                        confirmarCambiarEstado(modal.id_modalservicio, `${modal.estado ? 0 : 1}`)
                                                                    }
                                                                    title={`Cambiar a ${modal.estado ? "Inactivo" : "Activo"}`}
                                                                    className={`p-1.5 rounded-lg transition-colors ${modal.estado
                                                                            ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                                                                            : "bg-green-50 text-green-600 hover:bg-green-100"
                                                                        }`}
                                                                >
                                                                    <ToggleLeft size={18} />
                                                                </button>

                                                                {auth_service.hasRole("administrador") && (
                                                                    <button
                                                                        onClick={() => confirmarEliminacion(modal.id_modalservicio)}
                                                                        title="Eliminar"
                                                                        className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                                                    >
                                                                        <Trash2 size={18} />
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-16 text-center">
                                                    <div className="flex flex-col items-center">
                                                        <Filter className="h-12 w-12 text-gray-300 mb-3" />
                                                        <p className="text-gray-500 font-medium mb-1">No hay datos disponibles</p>
                                                        {searchTerm && (
                                                            <p className="text-gray-400 text-sm">No se encontraron resultados para "{searchTerm}"</p>
                                                        )}
                                                        {searchTerm && (
                                                            <button
                                                                onClick={() => setSearchTerm("")}
                                                                className="mt-3 text-[#8c52ff] text-sm font-medium hover:underline"
                                                            >
                                                                Limpiar búsqueda
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <Pagination1
                                filteredData={filteredData}
                                currentPage={currentPage}
                                totalPages={totalPages}
                            />
                        </>
                    )}
                </div>
            </main>
        </>
    )
}

