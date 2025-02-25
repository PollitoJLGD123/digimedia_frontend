"use client"

import { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import Table from '../components/Table';
//import Pagination from './componentes-modales/Pagination-modales';
import { useRouter, useSearchParams } from 'next/navigation';
import { getCookie } from "cookies-next";
import user_service from '../users/services/user.service';


const headers = ['id', 'nombre', 'telefono', 'email', 'servicio', "fecha_registro" ,'acciones'];

export default function Page() {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page') || 1;
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const API_URL = "https://back.digimediamkt.com/api/modal";
  // const API_URL = "http://127.0.0.1:8000/api/modal"
  const router = useRouter()

  // Función para obtener los datos paginados
  const fetchData = async (page) => {

    setLoading(true);
    await fetch(`${API_URL}?page=${page}`, {
      headers: {
        Authorization: `Bearer ${getCookie('token')}`,
      }
    }).then((data) => {
      if (data.status == 500) {
        user_service.logoutClient(router);
      } else {
        return data.json()
      }
    }).then(data => {
      // Mapea los datos para renombrar las claves
      const formattedData = data.data.map(item => ({
        ...item,
        email: item.correo, 
        servicio: item.servicio_nombre 
      }));

      setData(formattedData);
      setTotalItems(data.pagination.totalItems);
    }).catch(err => {

    }).finally(() => {
      setLoading(false)
    })
  };

  // Función para eliminar un registro por ID
  const handleDelete = async (id) => {

    if (!confirm('¿Estás seguro de que deseas eliminar este registro?')) return
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getCookie('token')}`,
      }
    }).then((data) => {
      if (data.status == 500) {
        user_service.logoutClient(router);
      } else {
        return data.json()
      }
    }).then(data => {

      fetchData(currentPage);

    }).catch(err => {
      console.error('Error al eliminar el registro:', result.message);
    }).finally(() => {
      setLoading(false)
    })


  };

  // Efecto para cargar los datos cuando cambia la página
  useEffect(() => {
    const page = isNaN(currentPage) ? 1 : parseInt(currentPage);
    fetchData(page);
  }, [currentPage]);

  return (
    <main className="p-4 overflow-scroll flex flex-col w-full h-[100vh] flex-1">
      <h2 className="text-4xl font-bold mb-4">Modales</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <Table
            onDelete={handleDelete}
            onUpdate={false}
            headers={headers}
            data={data}
          />
          <Pagination
            count={totalItems} // 20 es el límite de elementos por página
          />
        </>
      )}
    </main>
  );
}