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

const headers = ['id_empleado', 'nombre', 'apellido', 'email', 'dni', 'telefono', 'rol'];

export default function Page() {
    const searchParams = useSearchParams();
    const currentPage = searchParams.get('page') || 1;
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);
    const [modal, setModal] = useState(false);
    const [dataUpd, setDataUpdate] = useState(null);
    const router = useRouter();

    const handleShow = async (id) => {
        try {
            router.push(`/dashboard/main?id_empleado=${id}`);
        } catch (error) {
            console.error("Error al cargar el perfil del empleado:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al cargar el perfil del empleado.',
                confirmButtonColor: '#6f4be8'
            });
        }
    };

    async function setEmpleados(page) {
        try {
            const response = await empleado_service.empleadosByPage(page);
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

            if (parseInt(response.status) === 200) {
                if (response.total > 0) {
                    const transformedData = response.data.map(item => ({
                        ...item,
                        id: item.id_empleado,
                        id_rol: item.rol?.id_rol || "", 
                    }));
                    setData(transformedData);
                    setCount(response.total);
                }
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
                const deleteButton = document.querySelector(`button[data-id="${id}"]`);
                if (deleteButton) deleteButton.disabled = true;

                empleado_service.delete(id)
                    .then((response) => {
                        if (response.error) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'Hubo un error al eliminar el empleado.',
                                confirmButtonColor: '#6f4be8'
                            });
                        } else if (response.status === 200) {
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
                    })
                    .finally(() => {
                        if (deleteButton) deleteButton.disabled = false;
                    });
            }
        });
    }

    function onUpdate(idUpdate) {
        const selectedData = data.find((r) => r.id == idUpdate);
        
        const preparedData = {
            ...selectedData,
            id_empleado: selectedData.id || selectedData.id_empleado,
            id_rol: selectedData.rol?.id_rol ? String(selectedData.rol.id_rol) : ""
        };
        
        console.log("Datos preparados para el modal:", preparedData);
        setDataUpdate(preparedData);
        setModal(true);
    }

    const handleUpdateSuccess = (updatedData) => {
        setData((prevData) =>
            prevData.map((item) =>
                item.id === updatedData.id_empleado ? { ...item, ...updatedData } : item
            )
        );
    };

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
                    onShow={handleShow}
                />
                <Pagination count={count} />
                <Modal_empleado
                    isVisible={modal}
                    data={dataUpd || null}
                    onClose={() => {
                        setModal(false);
                        setDataUpdate(null);
                        fetchEmpleados();
                    }}
                    onUpdateSuccess={handleUpdateSuccess}
                />
                <button
                    className="bg-[#ff037f] text-white py-2 rounded-full my-4 font-bold w-fit px-10"
                    onClick={() => {
                        setDataUpdate(null);
                        setModal(true);
                    }}
                >
                    Añadir empleado
                </button>
            </main>
        </>
    );
}