"use client";

import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import Table from "../components/Table";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { getCookie } from "cookies-next";
import user_service from "../users/services/user.service";

const API_BASE_URL = "https://back.digimediamkt.com/api/contactanos";
// const API_BASE_URL = "http://127.0.0.1:8000/api/contactanos"

const headers = [
  "id",
  "nombre",
  "email",
  "servicio",
  "numero",
  "mensaje",
  "email mark",
  "new",
  "production",
  "fecha",
  "hora",
  "estado",
  "acciones",
];

export default function Page() {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") || 1;
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
          }
        });

        if (response.data.data.length === 0) {
          hasMorePages = false;
          break;
        }

        allData = [...allData, ...response.data.data];
        page++;

      } catch (error) {
        hasMorePages = false;
        console.error("Error al obtener los datos:", error.message);
      }
    }

    setData(allData);
    setTotalPages(Math.ceil(allData.length / 20));
    setIsLoading(false);

  }



  async function deleteContact(id) {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
        }
      });
      alert("Contacto eliminado exitosamente");
      fetchContacts(currentPage);
    } catch (error) {
      user_service.logoutClient(router);
    }
  }

  async function toggleContactStatus(id, currentState) {
    try {
      const newStatus = currentState === 0 ? 1 : 0;
      await axios.put(`${API_BASE_URL}/${id}`, {
        estado: newStatus,
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
        }
      });
      alert("Estado actualizado exitosamente");
      fetchContacts(currentPage);
    } catch (error) {
      user_service.logoutClient(router);
    }
  }

  useEffect(() => {
    fetchContacts(currentPage);
  }, [currentPage]);

  return (
    <main className="p-4 overflow-scroll flex flex-col w-full h-[100vh] flex-1">
      <h2 className="text-4xl font-bold mb-4">Sección principal</h2>
      {isLoading ? (
        <div className="text-center text-lg font-semibold">Cargando...</div>
      ) : (
        <>

          <Table
            headers={headers}
            onDelete={false}
            onUpdate={false}
            data={data.slice((currentPage - 1) * 20, currentPage * 20).map((contact) => {
              const [fecha, hora] = contact.fecha_hora.split(" ");
              return {
                ...contact,
                "email mark": contact.emailMarck,
                fecha,
                hora,
                estado: contact.estado === "0" ? "Pendiente" : "Listo",
                acciones: (
                  <div className="flex gap-2">
                    <button
                      onClick={() => deleteContact(contact.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700"
                    >
                      Eliminar
                    </button>
                    <button
                      onClick={() => toggleContactStatus(contact.id, contact.estado)}
                      className={`px-3 py-1 rounded-md ${contact.estado === "0"
                        ? "bg-yellow-500 hover:bg-yellow-700"
                        : "bg-green-500 hover:bg-green-700"
                        } text-white`}
                    >
                      {contact.estado === "0" ? "Marcar como Atendido" : "Marcar como Pendiente"}
                    </button>
                  </div>
                ),
              };
            })}

          />
          <Pagination count={data.length} />
        </>
      )}
    </main>
  );
}
