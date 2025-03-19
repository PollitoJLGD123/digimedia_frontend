"use client";

import { useState, useEffect } from "react";
import empleado_service from "../services/empleado.service";
import user_service from '../../users/services/user.service';
import { useRouter } from "next/navigation";

export default function modal_empleado({ isVisible, onclose, data }) {
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
        password: ""
    });
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState({ status: undefined, message: "" });
    const [button, setButtonStatus] = useState(true);

    useEffect(() => {
        const fetchRoles = async () => {
            const response = await empleado_service.getRoles();
            if (response.status === 200) {
                setRoles(response.data);
            } else {
                console.error("Error al cargar roles:", response);
            }
        };

        fetchRoles();
    }, []);

    function handleChange(e) {
        setFormData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    }

    function changePass() {
        if (formData.password.length < 4) {
            return setError({ status: true, message: "Contraseña muy pequeña" });
        }

        const form = {
            password: formData.password
        };

        setButtonStatus(false);

        empleado_service.updatePass(form, data.id_empleado)
            .then((response) => {
                if (response.status == 500) {
                    user_service.logoutClient(router);
                } else {
                    if (parseInt(response.status) == 200) {
                        setError({ status: false, message: "Contraseña actualizada correctamente" });
                        setTimeout(() => {
                            onclose();
                        }, 1000);
                    } else {
                        setError({ status: true, message: "Hubo un error al actualizar la contraseña" });
                        setButtonStatus(true);
                    }
                }
            })
            .catch((error) => {
                console.error("Error al actualizar contraseña:", error);
                setError({ status: true, message: "Hubo un error al actualizar la contraseña" });
                setButtonStatus(true);
            });
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
            password: formData.password
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
                            onclose();
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
    
        if (formData.password) {
            form.password = formData.password;
        }
    
        setButtonStatus(false);
    
        empleado_service.update(form, data.id_empleado)
            .then((response) => {
                if (response.status == 500) {
                    user_service.logoutClient(router);
                } else {
                    if (parseInt(response.status) == 200) {
                        setError({ status: false, message: "Empleado actualizado correctamente" });
                        setTimeout(() => {
                            onclose();
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

                    {data && (
                        <fieldset className="flex flex-col w-full gap-3">
                            <label className="font-medium text-md" htmlFor="password">
                                Cambiar Contraseña
                            </label>
                            <div className="flex border-solid border-gray-300 w-full border-[0.5px]">
                                <input
                                    id="password"
                                    onChange={handleChange}
                                    value={formData.password || ""}
                                    className="py-2 px-4 flex-1 outline-none"
                                    type="password"
                                />
                                <button
                                    className="border-solid border-l-gray-300 py-2 px-4 border-[0.5px]"
                                    onClick={changePass}
                                    type="button"
                                    disabled={!button}
                                >
                                    Cambiar
                                </button>
                            </div>
                        </fieldset>
                    )}

                    <div className="flex justify-around gap-2 mt-2">
                        <button
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg font-bold"
                            type="button"
                            onClick={guardarEmpleado}
                            disabled={!button}
                        >
                            Aceptar
                        </button>
                        <button
                            className="bg-red-500 text-white py-2 px-4 rounded-lg font-bold"
                            onClick={onclose}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}