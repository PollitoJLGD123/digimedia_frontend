"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ArrowLeft, Mail, MessageCircle, CheckCircle, XCircle, Clock, Loader2 } from "lucide-react"
import Swal from "sweetalert2"
import axios from "axios"
import url from "../../../../api/url"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import ModalError from "./components/ModalError"
import ModalEstado from "./components/ModalEstado"
import { getCookie } from "cookies-next"

const Page = () => {
    return (
        <Suspense
            fallback={
                <div className="flex justify-center items-center h-screen text-gray-700">
                    <div className="flex flex-col items-center gap-2">
                        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
                        <p>Cargando...</p>
                    </div>
                </div>
            }
        >
            <PageContent />
        </Suspense>
    )
}

function PageContent() {
    const [data, setData] = useState({ mails: [], wats: [] })
    const [isLoading, setIsLoading] = useState(true)
    const searchParams = useSearchParams()
    const router = useRouter()
    const id_modal = searchParams.get("id_modal")
    console.log("id_modal extraído:", id_modal);

    const [isLoadingMail, setIsLoadingMail] = useState(false)

    const [isModalError, setIsModalError] = useState(false);
    const [selectedEmailId, setSelectedEmailId] = useState(null);

    const [isLoadingWat, setIsLoadingWat] = useState(false);

    const [isModalWat, setIsModalWat] = useState(false);
    const [selectedWatId, setSelectedWatId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!id_modal) {
                setIsLoading(false)
                return
            }
            try {
                setIsLoading(true)

                const response = await axios.get(`${url}/api/modales/modals_emails_wats/${id_modal}`, {
                    headers: {
                        Authorization: `Bearer ${getCookie("token")}`,
                    },
                })

                if (response.status === 200) {
                    setData(response.data)
                } else {
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
                setIsLoading(false)
            }
        }

        fetchData()
    }, [id_modal])


    async function enviarMail(id_modal_email) {
        try {
            setIsLoadingMail(true)

            const response = await axios.get(`${url}/api/modales/send_mail/${id_modal_email}`
                , { headers: { Authorization: `Bearer ${getCookie("token")}` } }
            );

            if (response.status === 200) {
                await Swal.fire({
                    title: "Correo Enviado Correctamente",
                    text: "Es recomendable que revises el correo de DIGIMEDIA para ver si este correo existe.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
                window.location.reload();
            }
            else {
                Swal.fire({
                    title: "Error",
                    text: "No se pudo enviar el mensaje.",
                    icon: "error",
                    confirmButtonText: "OK",
                })
                console.log(response.message)
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: error.message,
                icon: "error",
                confirmButtonText: "OK",
            })
            console.log(error.message)
        } finally {
            setIsLoadingMail(false)
        }
    }

    async function enviarWat(id_modal_wat) {
        try {
            setIsLoadingWat(true)

            window.open(`${url}/api/modales/send_wat/${id_modal_wat}`, "_blank")

        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "No se pudo enviar el mensaje.",
                icon: "error",
                confirmButtonText: "OK",
            })
        } finally {
            setIsLoadingWat(false)
        }
    }

    const getStatusBadge = (estado, error) => {
        if (estado == 1 && (!error || error === "")) {
            return (
                <Badge variant="success" className="bg-green-100 text-green-800 hover:bg-green-200">
                    <CheckCircle className="w-3 h-3 mr-1" /> Enviado Correctamente
                </Badge>
            )
        } else if (estado == 1 && error) {
            return (
                <Badge variant="destructive">
                    <XCircle className="w-3 h-3 mr-1" /> Error de Envío
                </Badge>
            )
        } else if (estado == 0) {
            return (
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                    <Clock className="w-3 h-3 mr-1" /> Pendiente de Envío
                </Badge>
            )
        }
    }

    const getStatusBadgeWat = (estado, error) => {
        if (estado == 1 && !error) {
            return (
                <Badge variant="success" className="bg-green-100 text-green-800 hover:bg-green-200">
                    <CheckCircle className="w-3 h-3 mr-1" /> Enviado Correctamente
                </Badge>
            )
        } else if (error) {
            return (
                <Badge variant="destructive">
                    <XCircle className="w-3 h-3 mr-1" /> Error de Envío
                </Badge>
            )
        } else if (estado == 0 && !error) {
            return (
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                    <Clock className="w-3 h-3 mr-1" /> Pendiente de Envío
                </Badge>
            )
        }
    }

    const formatDate = (dateString) => {
        if (!dateString) return ""
        const date = new Date(dateString)
        return new Intl.DateTimeFormat("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(date)
    }

    function viewReportError(id_modal_email) {
        setSelectedEmailId(id_modal_email);
        setIsModalError(true);
    }

    function cambiarEstadoWat(id_modal_wat) {
        setSelectedWatId(id_modal_wat);
        setIsModalWat(true);
    }

    return (
        <div className="container mx-auto p-4 space-y-6">
            <button
                className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-sm group"
                onClick={() => router.push("/dashboard/modales/")}
            >
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                Volver a la lista
            </button>

            <h1 className="text-2xl font-bold text-center">Detalles de Comunicaciones</h1>

            {isLoading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="flex flex-col items-center gap-2">
                        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
                        <p>Cargando datos...</p>
                    </div>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    <Card className="shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader className="bg-blue-50 rounded-t-lg">
                            <CardTitle className="flex items-center gap-2 text-blue-700">
                                <Mail className="h-5 w-5" />
                                Correos Electrónicos Enviados
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <ScrollArea className="h-[400px] p-4">
                                {data.mails.map((mail, index) => {
                                    const email_pendientes = data.mails
                                        .slice(0, index)
                                        .some(prev => prev.estado == 0);

                                    return (
                                        <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors mb-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-medium">Email #{mail.number_message}</h3>
                                                {getStatusBadge(mail.estado, mail.error)}
                                            </div>
                                            <Separator className="my-2" />
                                            <div className="space-y-1 text-sm flex justify-between">
                                                {mail.error && (
                                                    <div className="text-red-600 bg-red-50 p-2 rounded-md mb-2">
                                                        <span className="font-semibold">Error:</span> {mail.error}
                                                    </div>
                                                )}

                                                {mail.estado != 0 && (
                                                    <div className="flex items-center gap-1 text-gray-600 mt-1">
                                                        <Clock className="h-4 w-4" />
                                                        <span>Enviado el {formatDate(mail.fecha)}</span>
                                                    </div>
                                                )}

                                                {mail.estado == 0 && (
                                                    <div>
                                                        <button
                                                            title={
                                                                email_pendientes
                                                                    ? "Primero debes enviar los correos anteriores"
                                                                    : "Enviar Mensaje de Email"
                                                            }
                                                            onClick={() => !email_pendientes && enviarMail(mail.id_modal_email)}
                                                            className={`mx-auto flex justify-center mt-1 py-2 px-4 rounded-lg text-center text-sm ${email_pendientes
                                                                ? "bg-gray-400 cursor-not-allowed"
                                                                : "bg-purple-700 text-white"
                                                                }`}
                                                            disabled={email_pendientes || isLoadingMail}
                                                        >
                                                            {email_pendientes ? "Pendiente anterior" : (isLoadingMail ?
                                                                (<Loader2 className="animate-spin h-4 w-4 mx-auto" />) : "Enviar Email")}
                                                        </button>
                                                    </div>
                                                )}
                                                {
                                                    (mail.estado == 1 && !mail.error) ? (
                                                        <div>
                                                            <button
                                                                title={
                                                                    email_pendientes
                                                                        ? "Primero debes enviar los correos anteriores"
                                                                        : "Reportar error en el correo Enviado"
                                                                }
                                                                onClick={() => !email_pendientes && viewReportError(mail.id_modal_email)}
                                                                className={`mx-auto mt-1 py-2 px-4 rounded-lg text-center text-sm ${email_pendientes
                                                                    ? "bg-gray-400 cursor-not-allowed"
                                                                    : "bg-red-700 text-white"
                                                                    }`}
                                                            >
                                                                {"Reportar error"}
                                                            </button>
                                                        </div>
                                                    ) : ("")
                                                }
                                            </div>
                                        </div>
                                    );
                                })}
                            </ScrollArea>
                        </CardContent>
                    </Card>

                    <Card className="shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader className="bg-green-50 rounded-t-lg">
                            <CardTitle className="flex items-center gap-2 text-green-700">
                                <MessageCircle className="h-5 w-5" />
                                Mensajes de WhatsApp Enviados
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <ScrollArea className="h-[400px] p-4">
                                {data.wats && data.wats.length > 0 ? (
                                    <div className="space-y-4">
                                        {data.wats.map((wat, index) => {
                                            const wat_pendientes = data.wats
                                                .slice(0, index)
                                                .some(prev => !prev.error && prev.estado == 0);

                                            return (
                                                <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h3 className="font-medium">Mensaje #{wat.number_message}</h3>
                                                        {getStatusBadgeWat(wat.estado, wat.error)}
                                                    </div>
                                                    <Separator className="my-2" />
                                                    <div className="space-y-1 text-sm flex justify-between gap-2">
                                                        {wat.error && (
                                                            <>
                                                                <div className="text-red-600 bg-red-50 p-2 rounded-md my-2 ">
                                                                    <span className="font-semibold">Error:</span> {wat.error}
                                                                </div>
                                                                <div className="flex items-center gap-1 text-gray-600">
                                                                    <Clock className="h-4 w-4" />
                                                                    <span>Reportado el {formatDate(wat.fecha)}</span>
                                                                </div>
                                                            </>
                                                        )}

                                                        {!wat.error && wat.estado == 1 && (
                                                            <div className="flex items-center gap-1 text-gray-600">
                                                                <Clock className="h-4 w-4" />
                                                                <span>Enviado el {formatDate(wat.fecha)}</span>
                                                            </div>
                                                        )}

                                                        {wat.estado == 0 && !wat.error && (
                                                            <div>
                                                                <button
                                                                    title={
                                                                        wat_pendientes
                                                                            ? "Primero debes enviar los mensajes anteriores"
                                                                            : "Enviar Mensaje de WhatsApp"
                                                                    }
                                                                    onClick={() => {
                                                                        if (!wat_pendientes) {
                                                                            enviarWat(wat.id_modal_wat);
                                                                        }
                                                                    }}
                                                                    className={`mx-auto mt-1 py-2 px-4 rounded-lg text-sm ${wat_pendientes
                                                                        ? "bg-gray-400 cursor-not-allowed"
                                                                        : "bg-purple-600 text-white hover:bg-purple-700"
                                                                        }`}
                                                                    disabled={wat_pendientes || isLoadingWat}
                                                                >
                                                                    {wat_pendientes ? "Pendiente anterior" : "Enviar Mensaje"}
                                                                </button>
                                                            </div>
                                                        )}
                                                        {(wat.estado == 0 && !wat.error) ? (
                                                            <div>
                                                                <button
                                                                    title={
                                                                        wat_pendientes
                                                                            ? "Primero debes enviar los reportar del anterior envío"
                                                                            : "Reportar estado de envío"
                                                                    }
                                                                    onClick={() => !wat_pendientes && cambiarEstadoWat(wat.id_modal_wat)}
                                                                    className={`mx-auto mt-1 py-2 px-4 rounded-lg text-center text-sm ${wat_pendientes
                                                                        ? "bg-gray-400 cursor-not-allowed"
                                                                        : "bg-blue-400 text-white"
                                                                        }`}
                                                                    disabled={wat_pendientes}
                                                                >
                                                                    {"Reportar Estado de Envío"}
                                                                </button>
                                                            </div>
                                                        ) : ("")}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-gray-500 p-6">
                                        <MessageCircle className="h-12 w-12 mb-2 text-gray-400" />
                                        <p>No hay mensajes de WhatsApp para mostrar</p>
                                    </div>
                                )}

                            </ScrollArea>
                        </CardContent>
                    </Card>
                    {
                        isModalError && (
                            <ModalError
                                id_modal_email={selectedEmailId}
                                isVisible={isModalError}
                                onClose={() => setIsModalError(false)}
                            />
                        )
                    }

                    {
                        isModalWat && (
                            <ModalEstado
                                id_modal_wat={selectedWatId}
                                isVisible={isModalWat}
                                onClose={() => setIsModalWat(false)}
                            />
                        )
                    }
                </div>
            )}
        </div>
    )
}

export default Page
