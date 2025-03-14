"use client";

import { useState, useEffect } from "react";
import user_service from "../services/user.service";
import { useRouter } from "next/navigation";

export default function Modal_usuario({ isVisible, onclose, data }) {
    if (!isVisible) return null;

    const router = useRouter()
    const [formData, setFormData] = useState({ name: data == false ? "" : data.name, email: "", password: "" });
    const [error, setError] = useState({ status: undefined, message: "" });
    const [button, setButtonStatus] = useState(true);

    function handleChange(e) {
        setFormData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    }

    function changePass() {

        if (formData.password.length < 4) return setError({ status: true, message: "Contraseña muy pequeña" })

        const form = {
            password: formData.password
        }

        user_service.updatePass(form, data.id).then((data) => {
            if (data.status == 500) {
                user_service.logoutClient(router);
            } else {
                return data.json()
            }
        }).then(data => {
            setButtonStatus(false)

            if (parseInt(data.status) == 200) {
                setError({ status: false, message: "Actualizado correctamente" })
                setTimeout(() => {
                    onclose()
                }, 3000);
            } else {
                setError({ status: true, message: "Hubo un error intentalo de nuevo" })
                setButtonStatus(true)
            }
        })
    }

    function createUser() {
        if (formData.name.length <= 2) return setError({ status: true, message: "Ingresar correctamente el nombre" });
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(formData.email)) return setError({ status: true, message: "Ingresar correctamente el email" });
        if (formData.password.length < 4) return setError({ status: true, message: "Contraseña muy pequeña" });
    
        const form = new FormData();
        form.append("name", formData.name);
        form.append("email", formData.email);
        form.append("password", formData.password);
    
        setButtonStatus(false);
    
        user_service.create(form)
            .then((response) => {
                if (response.error) {
                    setError({ status: true, message: "Hubo un error al crear el usuario" });
                    setButtonStatus(true);
                } else {
                    if (response.status === 200) {
                        setError({ status: false, message: "Usuario creado correctamente" });
                        setTimeout(() => {
                            onclose();
                        }, 3000);
                    } else {
                        setError({ status: true, message: "Hubo un error al crear el usuario" });
                        setButtonStatus(true);
                    }
                }
            })
            .catch((error) => {
                console.error("Error al crear usuario:", error);
                setError({ status: true, message: "Hubo un error al crear el usuario" });
                setButtonStatus(true);
            });
    }

    function updateUser() {

        const form = {
            name: formData.name
        }
        setButtonStatus(false)

        user_service.update(form, data.id).then((data) => {
            if (data.status == 500) {
                user_service.logoutClient(router);
            } else {
                return data.json()
            }
        }).then(data => {
            if (parseInt(data.status) == 200) {
                setError({ status: false, message: "Actualizado correctamente" })
                setTimeout(() => {
                    onclose()
                }, 3000);
            } else {
                setError({ status: true, message: "Hubo un error intentalo de nuevo" })
                setButtonStatus(true)
            }
        })
    }

    function guardarUser() {
        if (data == false) {
            createUser()
        } else {
            updateUser()
        }
    }

    return (
    
    <section className="fixed inset-0 bg-black bg-opacity-45 backdrop-blur-md flex justify-center items-center px-4">
            <div className="max-w-[400px] w-[400px] bg-white rounded-xl">
                <form className="p-6 flex flex-col gap-6 ">
                    <legend className="font-bold text-lg">Usuarios</legend>
                    {error.status != undefined ? (
                        <div className={`border-l-4 p-2 rounded-r  ${error.status == false ? "bg-green-100 " : "bg-red-100"} ${error.status == false ? "border-green-500 " : "border-red-500"}`}>
                            <p className={`text-sm ${error.status == false ? "text-green-700 " : "text-red-700 text-sm"}`}>
                                {error.message}
                            </p>
                        </div>
                    ) : ""}
                    <fieldset className="flex flex-col gap-3">
                        <label className="font-medium text-md" htmlFor="name">
                            Nombre
                        </label>
                        <input
                            id="name"
                            onChange={handleChange}
                            value={formData.name}
                            className="border-solid border-gray-300 border-[0.5px] py-2 px-4 outline-none"
                            type="text"
                        />
                    </fieldset>

                    <fieldset className="flex flex-col gap-3">
                        <label hidden={data != false} className="font-medium text-md" htmlFor="email">
                            Correo
                        </label>
                        <input
                            id="email"
                            onChange={handleChange}
                            value={formData.email}
                            hidden={data != false}
                            className="border-solid border-gray-300 border-[0.5px] py-2 px-4 outline-none"
                            type="email"
                        />
                    </fieldset>

                    <fieldset className="flex flex-col w-full gap-3">
                        <label className="font-medium text-md" htmlFor="password">
                            <span hidden={data == false}>Cambiar</span> Contraseña
                        </label>
                        <div className="flex border-solid border-gray-300 w-full border-[0.5px]">
                            <input
                                id="password"
                                onChange={handleChange}
                                value={formData.password || ""}
                                className="py-2 px-4 flex-1 outline-none "
                                type="password"
                            />
                            <button
                                className="border-solid border-l-gray-300 py-2 px-4 border-[0.5px]"
                                onClick={changePass}
                                type="button"
                                disabled={!button}
                                hidden={data == false}
                            >
                                Cambiar
                            </button>
                        </div>
                    </fieldset>

                    <div className="flex justify-around gap-2 mt-2 ">
                        <button
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg font-bold"
                            type="button"
                            onClick={guardarUser}
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
