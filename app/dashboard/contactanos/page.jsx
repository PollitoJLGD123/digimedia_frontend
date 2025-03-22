'use client';

import { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { setCookie, getCookie } from 'cookies-next';
import user_service from '../users/services/user.service';
import Swal from 'sweetalert2';
import auth_service from '../users/services/auth.service';

//const API_BASE_URL = 'https://back.digimediamkt.com/api/contactanos';
const API_BASE_URL = "http://127.0.0.1:8000/api/contactanos"


export default function Page() {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page') || 1;
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  async function fetchContacts() {
    let page = 1;
    let allData = [];
    let hasMorePages = true;

    while (hasMorePages) {
      try {
        const response = await axios.get(`${API_BASE_URL}?page=${page}`, { 
          headers: {
            Authorization: `Bearer ${getCookie('token')}`,
          },
        });

        if (response.data.data.length === 0) {
          hasMorePages = false;
          break;
        }

        allData = [...allData, ...response.data.data];
        page++;
      } catch (error) {
        hasMorePages = false;
        console.error('Error al obtener los datos:', error.message);
      }
    }

    setData(allData);
    setTotalPages(Math.ceil(allData.length / 20));
    setIsLoading(false);
  }

  async function deleteContact(id) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
        },
      });
  
      if (response.status === 200) {
        Swal.fire({
          title: "Eliminado",
          text: "El contacto ha sido eliminado exitosamente.",
          icon: "success",
          confirmButtonText: "OK",
        });
        fetchContacts(currentPage);
      } else {
        Swal.fire({
          title: "Error",
          text: "No se pudo eliminar el contacto.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Swal.fire({
          title: "Sesión Expirada",
          text: "Por favor, inicia sesión nuevamente.",
          icon: "warning",
          confirmButtonText: "OK",
        }).then(() => {
          user_service.logoutClient(router);
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Ocurrió un error inesperado.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  }

  function confirmarEliminacion(id) {
    Swal.fire({
        title: '¿Estás seguro en eliminar este registro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
          deleteContact(id);
        }
    });
  }

  function confirmarCambiarEstado(id, nuevoEstado) {
    Swal.fire({
        title: `¿Cambiar estado de contacto a ${nuevoEstado == 0 ? "Inactivo" : "Activo"}?`,
        text: "¡Puedes cambiarlo después nuevamente!",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, cambiar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
          cambiarEstado(id, nuevoEstado);
        }
    });
  }

  async function cambiarEstado(id,nuevoEstado){
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`,
        { estado: nuevoEstado },
        {
          headers: {
            Authorization: `Bearer ${getCookie('token')}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
      if (response.status === 200) {
        Swal.fire({
          title: "Estado Cambiado",
          text: `El estado del contacto se cambio a ${nuevoEstado == 0 ? "Inactivo" : "Activo"}`,
          icon: "success",
          confirmButtonText: "OK",
        });
        fetchContacts(currentPage);
      } else {
        Swal.fire({
          title: "Error",
          text: "No se pudo cambiar el estado del contacto.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }catch(error){
      if (error.response && error.response.status === 401) {
        Swal.fire({
          title: "Sesión Expirada",
          text: "Por favor, inicia sesión nuevamente.",
          icon: "warning",
          confirmButtonText: "OK",
        }).then(() => {
          user_service.logoutClient(router);
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Ocurrió un error inesperado.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  }

  async function visualizar(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`, {
          headers: {
              Authorization: `Bearer ${getCookie('token')}`,
          },
      });
      if (response.status === 200 && response.data) {
          setCookie("contacto", JSON.stringify(response.data.data), {
              maxAge: 30 * 24 * 60 * 60, path: "/"
          });
          router.push(`./view/`);
      }
    } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
              Swal.fire({
                  title: "No Encontrado",
                  text: "El contacto no existe en la base de datos.",
                  icon: "warning",
                  confirmButtonText: "OK",
              });
          } else if (error.response.status === 401) {
              Swal.fire({
                  title: "Sesión Expirada",
                  text: "Por favor, inicia sesión nuevamente.",
                  icon: "warning",
                  confirmButtonText: "OK",
              });
              router.push("/login");
          } else {
              Swal.fire({
                  title: "Error",
                  text: "Ocurrió un error al obtener los datos.",
                  icon: "error",
                  confirmButtonText: "OK",
              });
          }
        } 
        else {
            Swal.fire({
                title: "Error de conexión",
                text: "No se pudo conectar con el servidor.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    }
  }

  useEffect(() => {
    fetchContacts(currentPage);
  }, [currentPage]);

  return (
    <main className="p-4 overflow-scroll flex flex-col w-full h-[100vh] flex-1">
      {isLoading ? (
        <div className="text-center text-lg font-semibold">Cargando...</div>
      ) : (
        <>
          <table className="min-w-full bg-white border-separate border-spacing-1 font-medium">
      <thead>
        <tr>
          <th className="p-2 bg-[#8c52ff] text-white rounded-xl">ID</th>
          <th className="p-2 bg-[#8c52ff] text-white rounded-xl">Nombres</th>
          <th className="p-2 bg-[#8c52ff] text-white rounded-xl">Correo</th>
          <th className="p-2 bg-[#8c52ff] text-white rounded-xl">Estado</th>
          <th className="p-2 bg-[#8c52ff] text-white rounded-xl">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((contacto) => (
            <tr key={`${contacto.id_contactanos}-Row`} className="border-b">
              <td className="p-2 text-center">{contacto.id_contactanos}</td>
              <td className="p-2 text-center">{contacto.nombre}</td>
              <td className="p-2 text-center">{contacto.email}</td>
              <td className={`p-2 text-center ${contacto.estado ? "text-green-600" : "text-red-600"}`}>
                {contacto.estado ? "Activo" : "Inactivo"}
              </td>
              <td className="p-2 text-center">

                <button onClick={() => visualizar(contacto.id_contactanos)} title="Visualizar" className="bg-orange-600 text-white mr-2 px-2 py-1 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#000" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"/></svg>
                </button>
                
                <button onClick={() => confirmarCambiarEstado(contacto.id_contactanos,`${contacto.estado ? 0 : 1}` )} title='Cambiar Estado' className="bg-blue-500 text-white px-2 py-1 rounded-lg mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#000" d="m9.55 15.15l8.475-8.475q.3-.3.7-.3t.7.3t.3.713t-.3.712l-9.175 9.2q-.3.3-.7.3t-.7-.3L4.55 13q-.3-.3-.288-.712t.313-.713t.713-.3t.712.3z"/></svg>
                </button>
                {auth_service.hasRole('administrador') && (
                <button title="Eliminar" onClick={() => confirmarEliminacion(contacto.id_contactanos)} className="bg-red-500 text-white px-2 py-1 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.687 6.213L6.8 18.976a2.5 2.5 0 0 0 2.466 2.092h3.348m6.698-14.855L17.2 18.976a2.5 2.5 0 0 1-2.466 2.092h-3.348m-1.364-9.952v5.049m3.956-5.049v5.049M2.75 6.213h18.5m-6.473 0v-1.78a1.5 1.5 0 0 0-1.5-1.5h-2.554a1.5 1.5 0 0 0-1.5 1.5v1.78z"/></svg>
                </button>
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="text-center p-4 text-gray-500">
              No hay datos disponibles
            </td>
          </tr>
        )}
      </tbody>
    </table>
          <Pagination count={data.length} />
        </>
      )}
    </main>
  );
}




