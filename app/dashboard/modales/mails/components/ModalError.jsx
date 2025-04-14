

export default function ModalError() {

    const [error, setError] = useState("")

    return (
        <>
        <section className="fixed inset-0 bg-black bg-opacity-45 backdrop-blur-md flex justify-center items-center px-4 dark:text-white  ">
            <div className="flex flex-col items-center gap-2 bg-white p-6 rounded-lg shadow-lg">

                <h2 className="text-2xl font-bold text-center">Reportar Error</h2>

                <p> Recomendación: Intenta revisar el correo de DigiMedia, te llegara un correo de erro si el email enviado a este correo no existe
                    o no se pudo enviar el mensaje. Por otra parte es porque el correo llego correctamente a su bandeja de entrada del usuario o a su bandeja de spam.
                </p>

                <div className="flex items-center gap-2">
                    <XCircle className="h-5 w-5" />
                    <input type="text" className="text-lg font-semibold">Error</input>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <p className="text-sm text-gray-500">
                    {error}
                </p>
            </div>
        </section >
        </>
    )
}
