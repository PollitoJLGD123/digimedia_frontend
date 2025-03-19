"use client";

const api_url = "http://127.0.0.1:8000/api/empleados"; // URL base para las rutas de empleados
const api_def = "http://127.0.0.1:8000/api"
import { getCookie } from "cookies-next";
import Swal from 'sweetalert2';

const handlePermissionError = (response) => {
    if (response.status === 403) {
        Swal.fire({
            icon: 'error',
            title: 'Acceso denegado',
            text: 'No tienes los permisos necesarios para realizar esta acción.',
            confirmButtonColor: '#6f4be8'
        });
        return true;
    }
    return false;
};

const empleado_service = {
    empleadosByPage: async (page) => {
        try {
            console.log("Solicitando empleados, página:", page); // Log para depuración
            const response = await fetch(`${api_url}?page=${page}`, {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${getCookie('token')}`
                }
            });
    
            console.log("Respuesta del servidor:", response); // Log para depuración
    
            if (!response.ok) {
                return { status: response.status, error: true };
            }
    
            const data = await response.json();
            console.log("Datos recibidos:", data); // Log para depuración
            return data;
        } catch (error) {
            console.error("Error al obtener empleados:", error);
            return { error: true, message: error.message };
        }
    },

    empleadoById: async (id) => {
        try {
            if (!id) {
                return { status: 400, error: true, message: "ID no proporcionado" };
            }
            
            const response = await fetch(`${api_url}/${id}`, {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${getCookie('token')}`
                }
            });
    
            if (response.status === 500) {
                console.error("Error del servidor al obtener empleado:", id);
                return { status: 500, error: true, message: "Error interno del servidor" };
            }
    
            if (!response.ok) {
                return { status: response.status, error: true };
            }
    
            const data = await response.json();
            return data; 
        } catch (error) {
            console.error("Error al obtener empleado por ID:", error);
            return { error: true, message: error.message };
        }
    },

    create: async (form) => {
        try {
            const response = await fetch(`${api_url}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${getCookie('token')}`
                },
                body: JSON.stringify(form)
            });

            if (!response.ok) {
                return { status: response.status, error: true };
            }

            const data = await response.json();
            return data; 
        } catch (error) {
            console.error("Error al crear empleado:", error);
            return { status: 500, error: true, message: error.message };
        }
    },

    update: async (form, id) => {
        try {
            const response = await fetch(`${api_url}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${getCookie('token')}`
                },
                body: JSON.stringify(form)
            });

            if (!response.ok) {
                return { status: response.status, error: true };
            }

            const data = await response.json();
            return data; 
        } catch (error) {
            console.error("Error al actualizar empleado:", error);
            return { status: 500, error: true, message: error.message };
        }
    },

    updatePass: async (form, id) => {
        try {
            const response = await fetch(`${api_url}/pass/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${getCookie('token')}`
                },
                body: JSON.stringify(form)
            });

            if (!response.ok) {
                return { status: response.status, error: true };
            }

            const data = await response.json();
            return data; 
        } catch (error) {
            console.error("Error al actualizar contraseña del empleado:", error);
            return { status: 500, error: true, message: error.message };
        }
    },

    delete: async (id) => {
        try {
            const response = await fetch(`${api_url}/${id}`, {
                method: "DELETE",
                headers: {
                    "authorization": `Bearer ${getCookie('token')}`
                }
            });
    
            // verifica permisos
            if (handlePermissionError(response)) {
                return { error: true, status: 403 };
            }
    
            // éxito
            if (!response.ok) {
                return { status: response.status, error: true };
            }
    
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error al eliminar empleado:", error);
            return { error: true, message: error.message };
        }
    },

    
    getRoles: async () => {
        try {
            const response = await fetch(`${api_def}/roles`, {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${getCookie('token')}`
                }
            });

            if (!response.ok) {
                return { status: response.status, error: true };
            }

            const data = await response.json();
            return data; 
        } catch (error) {
            console.error("Error al obtener roles:", error);
            return { error: true, message: error.message };
        }
    }
    
};

export default empleado_service;