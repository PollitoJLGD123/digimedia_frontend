'use client';
import { useEffect, useState } from 'react';
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation"; 

export default function Page() {

  const router = useRouter();
  const [contacto, setContacto] = useState(null);

  useEffect(() => {
    const infoContactanos = getCookie('contacto');
    if (infoContactanos) {
      setContacto(JSON.parse(infoContactanos));
    }
  }, []);

  if (!contacto) {
    return <p className="text-center text-gray-500">Cargando datos...</p>;
  }

  return (
    <>
      <div className="mt-11 ml-4">
      <button 
        className="bg-blue-600 text-white px-3 py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center"
        onClick={() => router.push("/dashboard/contactanos/")}
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Volver a la lista
      </button>
    </div>

    <div className="my-5 mx-5 bg-white shadow-lg rounded-xl overflow-hidden p-8">
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center">
          <svg className='mr-2' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="6" cy="26" r="2" fill="#000"/><path fill="#000" d="M28 18h-3v-2a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2h-3a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2m-9-2h4v2h-4Zm9 12H14v-8h14Z"/><path fill="#000" d="M10 6h4v6h2V6h4v6h2V6h4v6h2V6.005A2.005 2.005 0 0 0 25.995 4H4.005A2.005 2.005 0 0 0 2 6.005v13.99A2.005 2.005 0 0 0 4.005 22H10ZM8 20H4V6h4Z"/>
          </svg>
          Detalles de la Reclamación
        </h1>
        <h1 className="font-bold text-lg text-gray-600">{contacto.fecha}</h1>
      </div>
  
      <div className="text-gray-700">
        <div className="grid grid-cols-2 gap-6">
          <p><strong className="text-blue-600">ID:</strong> {contacto.id_contactanos}</p>
          <p><strong className="text-blue-600">Nombre:</strong> {contacto.nombre}</p>
          <p><strong className="text-blue-600">Email:</strong> {contacto.email}</p>
          <p><strong className="text-blue-600">Teléfono:</strong> {contacto.numero}</p>
          <p><strong className="text-blue-600">Estado:</strong> {contacto.estado==1 ? "Activo":"Inactivo" }</p>
        </div>
      </div>

      <div className="mb-6 mt-5 p-4 bg-gray-100 rounded-lg overflow-x-scroll overflow-y-scroll w-[800px] h-60">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Mensaje de Reclamo</h2>
        <p className="text-gray-700 leading-relaxed">{contacto.mensaje}</p>
      </div>   
    </div>
    </>
  );
}
