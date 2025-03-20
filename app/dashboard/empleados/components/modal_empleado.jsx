"use client";

import { useState, useEffect } from "react";
import empleado_service from "../services/empleado.service";
import user_service from "../../users/services/user.service";
import { useRouter } from "next/navigation";
import { CheckCircleIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";

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
        id_rol: data.id_rol || roles.find((rol) => rol.nombre.toLowerCase() === data.rol?.toLowerCase())?.id_rol || "",
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

    empleado_service
      .create(form)
      .then((response) => {
        if (response.error) {
          setError({ status: true, message: "Hubo un error al crear el empleado" });
          setButtonStatus(true);
        } else {
          if (response.status === 200) {
            setError({ status: false, message: "Empleado creado correctamente" });
            setTimeout(() => {
              if (typeof onClose === "function") onClose();
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
      id_rol: formData.id_rol,
    };

    setButtonStatus(false);
    setIsLoading(true);

    empleado_service
      .update(form, data.id_empleado)
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
              if (typeof onClose === "function") onClose();
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
      <div
        className={`w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg">Empleados</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {error.status !== undefined && (
          <div
            className={`border-l-4 p-4 mb-4 rounded-r flex items-center ${
              error.status === false ? "bg-green-100 border-green-500" : "bg-red-100 border-red-500"
            }`}
          >
            {error.status === false ? (
              <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
            ) : (
              <XCircleIcon className="h-5 w-5 text-red-500 mr-2" />
            )}
            <p className={`text-sm ${error.status === false ? "text-green-700" : "text-red-700"}`}>
              {error.message}
            </p>
          </div>
        )}

        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <fieldset className="flex flex-col gap-2">
              <label className="font-semibold text-sm" htmlFor="nombre">
                Nombre
              </label>
              <input
                id="nombre"
                onChange={handleChange}
                value={formData.nombre}
                className="w-full border border-gray-300 py-3 px-4 outline-none rounded-md"
                type="text"
                placeholder="Ingrese el nombre"
              />
            </fieldset>

            <fieldset className="flex flex-col gap-2">
              <label className="font-semibold text-sm" htmlFor="apellido">
                Apellido
              </label>
              <input
                id="apellido"
                onChange={handleChange}
                value={formData.apellido}
                className="w-full border border-gray-300 py-3 px-4 outline-none rounded-md"
                type="text"
                placeholder="Ingrese el apellido"
              />
            </fieldset>

            <fieldset className="flex flex-col gap-2">
              <label className="font-semibold text-sm" htmlFor="email">
                Correo
              </label>
              <input
                id="email"
                onChange={handleChange}
                value={formData.email}
                className="w-full border border-gray-300 py-3 px-4 outline-none rounded-md"
                type="email"
                placeholder="Ingrese el correo"
              />
            </fieldset>

            <fieldset className="flex flex-col gap-2">
              <label className="font-semibold text-sm" htmlFor="dni">
                DNI
              </label>
              <input
                id="dni"
                onChange={handleChange}
                value={formData.dni}
                className="w-full border border-gray-300 py-3 px-4 outline-none rounded-md"
                type="text"
                placeholder="Ingrese el DNI"
              />
            </fieldset>

            <fieldset className="flex flex-col gap-2">
              <label className="font-semibold text-sm" htmlFor="telefono">
                Teléfono
              </label>
              <input
                id="telefono"
                onChange={handleChange}
                value={formData.telefono}
                className="w-full border border-gray-300 py-3 px-4 outline-none rounded-md"
                type="text"
                placeholder="Ingrese el teléfono"
              />
            </fieldset>

            <fieldset className="flex flex-col gap-2">
              <label className="font-semibold text-sm" htmlFor="id_rol">
                Rol
              </label>
              <select
                id="id_rol"
                onChange={handleChange}
                value={formData.id_rol}
                className="w-full border border-gray-300 py-3 px-4 outline-none rounded-md"
              >
                <option value="">Seleccione un rol</option>
                {roles.map((rol) => (
                  <option key={rol.id_rol} value={rol.id_rol}>
                    {rol.nombre
                      .split(" ")
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                      .join(" ")}
                  </option>
                ))}
              </select>
            </fieldset>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button
              className="bg-blue-500 text-white py-3 px-6 rounded-lg font-bold hover:bg-blue-600 transition-colors"
              type="button"
              onClick={guardarEmpleado}
              disabled={!button || isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Guardando...
                </span>
              ) : (
                "Aceptar"
              )}
            </button>
            <button
              className="bg-red-500 text-white py-3 px-6 rounded-lg font-bold hover:bg-red-600 transition-colors"
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