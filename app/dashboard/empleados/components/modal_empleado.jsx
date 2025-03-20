"use client";

import { useState, useEffect } from "react";
import empleado_service from "../services/empleado.service";
import user_service from '../../users/services/user.service';
import { useRouter } from "next/navigation";

export default function modal_empleado({ isVisible, onClose, data, onUpdateSuccess }) {
    console.log("Modal data:", data);
    if (!isVisible) return null;

    const router = useRouter();
    const [formData, setFormData] = useState({
        nombre: data ? data.nombre : "",
        apellido: data ? data.apellido : "",
        email: data ? data.email : "",
        dni: data ? data.dni : "",
        telefono: data ? data.telefono : "",
        id_rol: data ? data.id_rol : "",
    });
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState({ status: undefined, message: "" });
    const [button, setButtonStatus] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchRoles() {
            try {
                const response = await empleado_service.getRoles(); 
                if (response.status === 200) {
                    setRoles(response.data); 
                }
            } catch (error) {
                console.error("Error al obtener roles:", error);
            }
        }
    
        fetchRoles();
    }, []);

    useEffect(() => {
        if (data && roles.length > 0) {
            setFormData({
                nombre: data.nombre || "",
                apellido: data.apellido || "",
                email: data.email || "",
                dni: data.dni || "",
                telefono: data.telefono || "",
                id_rol: data.id_rol || roles.find(rol => rol.nombre.toLowerCase() === data.rol?.toLowerCase())?.id_rol || ""
            });
        }
    }, [data, roles]);
    
    


    function handleChange(e) {
        setFormData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    }

    function createEmpleado() {
        if (formData.nombre.length <= 2) return setError({ status: true, message: "Ingresar correctamente el nombre" });
        if (formData.apellido.length <= 2) return setError({ status: true, message: "Ingresar correctamente el apellido" });
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(formData.email)) return setError({ status: true, message: "Ingresar correctamente el email" });
        if (formData.dni.length < 8) return setError({ status: true, message: "DNI inválido" });

        const form = {
            nombre: formData.nombre,
            apellido: formData.apellido,
            email: formData.email,
            dni: formData.dni,
            telefono: formData.telefono,
            id_rol: formData.id_rol,
        };

        setButtonStatus(false);

        empleado_service.create(form)
            .then((response) => {
                if (response.error) {
                    setError({ status: true, message: "Hubo un error al crear el empleado" });
                    setButtonStatus(true);
                } else {
                    if (response.status === 200) {
                        setError({ status: false, message: "Empleado creado correctamente" });
                        setTimeout(() => {
                            if (typeof onClose === "function") {
                                onClose();
                            }
                        }, 1000);
                    } else {
                        setError({ status: true, message: "Hubo un error al crear el empleado" });
                        setButtonStatus(true);
                    }
                }
            })
            .catch((error) => {
                console.error("Error al crear empleado:", error);
                setError({ status: true, message: "Hubo un error al crear el empleado" });
                setButtonStatus(true);
            });
    }

    function updateEmpleado() {
        const form = {
            nombre: formData.nombre,
            apellido: formData.apellido,
            email: formData.email,
            dni: formData.dni,
            telefono: formData.telefono,
            id_rol: formData.id_rol
        };
    
        setButtonStatus(false);
        setIsLoading(true);
    
        empleado_service.update(form, data.id_empleado)
            .then((response) => {
                if (response.status == 500) {
                    user_service.logoutClient(router);
                } else {
                    if (parseInt(response.status) == 200) {
                        setError({ status: false, message: "Empleado actualizado correctamente" });
                        if (typeof onUpdateSuccess === "function") {
                            onUpdateSuccess({ ...data, ...form });
                        }
                        setTimeout(() => {
                            if (typeof onClose === "function") {
                                onClose();
                            }
                        }, 1000);
                    } else {
                        setError({ status: true, message: "Hubo un error al actualizar el empleado" });
                        setButtonStatus(true);
                    }
                }
            })
            .catch((error) => {
                console.error("Error al actualizar empleado:", error);
                setError({ status: true, message: "Hubo un error al actualizar el empleado" });
                setButtonStatus(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function guardarEmpleado() {
        if (!data) {
            createEmpleado();
        } else {
            updateEmpleado();
        }
    }

    return (
        <section className="fixed inset-0 bg-black bg-opacity-45 backdrop-blur-md flex justify-center items-center px-4">
            <div className="max-w-[400px] w-[400px] bg-white rounded-xl">
                <form className="p-6 flex flex-col gap-6">
                    <legend className="font-bold text-lg">Empleados</legend>
                    {error.status != undefined ? (
                        <div className={`border-l-4 p-2 rounded-r ${error.status == false ? "bg-green-100 border-green-500" : "bg-red-100 border-red-500"}`}>
                            <p className={`text-sm ${error.status == false ? "text-green-700" : "text-red-700"}`}>
                                {error.message}
                            </p>
                        </div>
                    ) : ""}
                    <fieldset className="flex flex-col gap-3">
                        <label className="font-medium text-md" htmlFor="nombre">
                            Nombre
                        </label>
                        <input
                            id="nombre"
                            onChange={handleChange}
                            value={formData.nombre}
                            className="border-solid border-gray-300 border-[0.5px] py-2 px-4 outline-none"
                            type="text"
                        />
                    </fieldset>

                    <fieldset className="flex flex-col gap-3">
                        <label className="font-medium text-md" htmlFor="apellido">
                            Apellido
                        </label>
                        <input
                            id="apellido"
                            onChange={handleChange}
                            value={formData.apellido}
                            className="border-solid border-gray-300 border-[0.5px] py-2 px-4 outline-none"
                            type="text"
                        />
                    </fieldset>

                    <fieldset className="flex flex-col gap-3">
                        <label className="font-medium text-md" htmlFor="email">
                            Correo
                        </label>
                        <input
                            id="email"
                            onChange={handleChange}
                            value={formData.email}
                            className="border-solid border-gray-300 border-[0.5px] py-2 px-4 outline-none"
                            type="email"
                        />
                    </fieldset>

                    <fieldset className="flex flex-col gap-3">
                        <label className="font-medium text-md" htmlFor="dni">
                            DNI
                        </label>
                        <input
                            id="dni"
                            onChange={handleChange}
                            value={formData.dni}
                            className="border-solid border-gray-300 border-[0.5px] py-2 px-4 outline-none"
                            type="text"
                        />
                    </fieldset>

                    <fieldset className="flex flex-col gap-3">
                        <label className="font-medium text-md" htmlFor="telefono">
                            Teléfono
                        </label>
                        <input
                            id="telefono"
                            onChange={handleChange}
                            value={formData.telefono}
                            className="border-solid border-gray-300 border-[0.5px] py-2 px-4 outline-none"
                            type="text"
                        />
                    </fieldset>

                    <fieldset className="flex flex-col gap-3">
                        <label className="font-medium text-md" htmlFor="id_rol">
                            Rol
                        </label>
                        <select
                            id="id_rol"
                            onChange={handleChange}
                            value={formData.id_rol}
                            className="border-solid border-gray-300 border-[0.5px] py-2 px-4 outline-none"
                        >
                            <option value="">Seleccione un rol</option>
                            {roles.map((rol) => (
                                <option key={rol.id_rol} value={rol.id_rol}>
                                    {rol.nombre.split(' ').map(word => 
                                        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                                    ).join(' ')}
                                </option>
                            ))}
                        </select>
                    </fieldset>

                    <div className="flex justify-around gap-2 mt-2">
                        <button
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg font-bold"
                            type="button"
                            onClick={guardarEmpleado}
                            disabled={!button || isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                    </svg>
                                    Guardando...
                                </span>
                            ) : (
                                "Aceptar"
                            )}
                        </button>
                        <button
                            className="bg-red-500 text-white py-2 px-4 rounded-lg font-bold"
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}