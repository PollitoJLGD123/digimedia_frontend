'use client';

import { useSearchParams } from 'next/navigation';
import Pagination from '../components/Pagination';
import Table from '../components/Table';
import { useEffect, useState } from 'react';
import Modal_empleado from './components/modal_empleado';
import empleado_service from './services/empleado.service';
import user_service from '../users/services/user.service';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const headers = ['id_empleado', 'nombre', 'apellido', 'email', 'dni', 'telefono', 'id_rol'];

export default function Page() {
    const searchParams = useSearchParams();
    const currentPage = searchParams.get('page') || 1;
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);
    const [modal, setModal] = useState(false);
    const [dataUpd, setdataUpdate] = useState(null);
    const router = useRouter();

    async function setEmpleados(page) {
        
        try {
            const response = await empleado_service.empleadosByPage(page);
            console.log(response);

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
    
            console.log("Datos recibidos:", response);
    
            if (parseInt(response.status) === 200) {
                if (response.total > 0) {
                    setData(response.data);
                    setCount(response.total);
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
                empleado_service
                    .delete(id)
                    .then((response) => {
                        if (response.error) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'Hubo un error al eliminar el empleado.',
                                confirmButtonColor: '#6f4be8'
                            });
                        } else if (response.status === 200) {
                            empleado_service.empleadoById(id)
                                .then((empleadoResponse) => {
                                    if (empleadoResponse.status === 404) {
                                        Swal.fire({
                                            icon: 'success',
                                            title: 'Eliminado',
                                            text: 'El empleado ha sido eliminado correctamente.',
                                            confirmButtonColor: '#6f4be8'
                                        });
                                        fetchEmpleados(); 
                                    } else {
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Error',
                                            text: 'El empleado no se eliminó correctamente.',
                                            confirmButtonColor: '#6f4be8'
                                        });
                                    }
                                })
                                .catch((error) => {
                                    console.error("Error al verificar el empleado:", error);
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Error',
                                        text: 'Hubo un error al verificar la eliminación del empleado.',
                                        confirmButtonColor: '#6f4be8'
                                    });
                                });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'Hubo un error al eliminar el empleado.',
                                confirmButtonColor: '#6f4be8'
                            });
                        }
                    })
                    .catch((error) => {
                        console.error("Error al eliminar empleado:", error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Hubo un error al eliminar el empleado.',
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

    const fetchEmpleados = async () => {
        if (isNaN(currentPage)) {
            await setEmpleados(1);
            return;
        }

        await setEmpleados(parseInt(currentPage));
    };

    useEffect(() => {
        fetchEmpleados();
    }, [currentPage]); 

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
                <Modal_empleado
                    isVisible={modal}
                    data={dataUpd || null}
                    onclose={() => {
                        setModal(false);
                        setdataUpdate(null);
                        fetchEmpleados();
                    }}
                />
                <button
                    className="bg-[#ff037f] text-white py-2 rounded-full my-4 font-bold w-fit px-10"
                    onClick={() => {
                        setdataUpdate(null); 
                        setModal(true);
                    }}
                >
                    Añadir empleado
                </button>
            </main>
        </>
    );
}