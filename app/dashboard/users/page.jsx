'use client';

import { useSearchParams } from 'next/navigation';
import Pagination from '../components/Pagination';
import Table from '../components/Table';
import { useEffect, useState } from 'react';
import Modal_usuario from './components/Modal_usuario';
import user_service from './services/user.service';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const headers = ['id', 'name', 'email', 'created_at'];

export default function Page() {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page') || 1;
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [modal, setModal] = useState(false);
  const [dataUpd, setdataUpdate] = useState(false);
  const router = useRouter();

  async function setProducts(page) {
    try {
        const response = await user_service.userByPage(page);
        
        if (response.status === 401) {
            Swal.fire({
                icon: 'error',
                title: 'Sesión expirada',
                text: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
                confirmButtonColor: '#6f4be8'
            }).then(() => {
                user_service.logoutClient(router); 
            });
            return;
        } else if (response.status === 500) {
            user_service.logoutClient(router);
            return;
        }

        const data = await response.json();
        
        if (parseInt(data.status) === 200) {
            if (data.total > 0) {
                data.data.map((item) => {
                    const fecha = new Date(item.created_at);
                    item.created_at = fecha.toLocaleDateString('es-ES');
                });

                setData(data.data);
                setCount(data.total);
            }
        } else {
            setError(true);
            setLoading(false);
        }
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al obtener los datos.',
            confirmButtonColor: '#6f4be8'
        });
    }
  }

  function onDelete(id) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#6f4be8',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            //console.log("Intentando eliminar usuario con ID:", id); 
            user_service
                .delete(id)
                .then((response) => {
                    //console.log("Respuesta del servidor:", response); 
                    if (response.error) {
                        //console.error("Error al eliminar usuario:", response); 
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Hubo un error al eliminar el usuario.',
                            confirmButtonColor: '#6f4be8'
                        });
                    } else if (response.status === 200) {
                        //console.log("Verificando si el usuario con ID:", id, "ya no existe"); 
                        user_service.userById(id)
                            .then((userResponse) => {
                                //console.log("Respuesta de verificación:", userResponse); 
                                if (userResponse.status === 404) {
                                    console.log("Usuario con ID:", id, "eliminado correctamente"); 
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Eliminado',
                                        text: 'El usuario ha sido eliminado correctamente.',
                                        confirmButtonColor: '#6f4be8'
                                    });
                                    fetchProducts(); // Actualiza la lista de usuarios
                                } else {
                                    //console.error("El usuario con ID:", id, "todavía existe"); 
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Error',
                                        text: 'El usuario no se eliminó correctamente.',
                                        confirmButtonColor: '#6f4be8'
                                    });
                                }
                            })
                            .catch((error) => {
                                //console.error("Error al verificar el usuario:", error); 
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error',
                                    text: 'Hubo un error al verificar la eliminación del usuario.',
                                    confirmButtonColor: '#6f4be8'
                                });
                            });
                    } else {
                        //console.error("Respuesta no exitosa:", response); 
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Hubo un error al eliminar el usuario.',
                            confirmButtonColor: '#6f4be8'
                        });
                    }
                })
                .catch((error) => {
                    //console.error("Error al eliminar usuario:", error); 
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Hubo un error al eliminar el usuario.',
                        confirmButtonColor: '#6f4be8'
                    });
                });
        }
    });
  }

  function onUpdate(idUpdate) {
    setdataUpdate(data.find((r) => r.id == idUpdate));
    setModal(true);
  }

  const fetchProducts = async () => {
    if (isNaN(currentPage)) {
      await setProducts(1);
      return;
    }

    await setProducts(parseInt(currentPage));
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]); // Re-ejecutar cuando cambia la query

  return (
    <>
      <main className="p-4 overflow-scroll flex flex-col w-full h-[100vh] flex-1">
        <Table
          headers={headers}
          data={data}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
        <Pagination count={count} />
        <Modal_usuario
          isVisible={modal}
          data={dataUpd}
          onclose={() => {
            setModal(false);
            setdataUpdate(false);
            fetchProducts();
          }}
        />
        <button
          className="bg-[#ff037f] text-white py-2 rounded-full my-4 font-bold w-fit px-10"
          onClick={() => {
            setModal(true);
          }}
        >
          Añadir dato
        </button>
      </main>
    </>
  );
}
