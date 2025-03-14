"use client"

const api_url = "http://127.0.0.1:8000/api/user";
import { getCookie } from "cookies-next";
import auth_service from "./auth.service";
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

const user_service = {
    login: async (form) => {
        try {
            const response = await fetch(`${api_url}/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Error en la autenticación");
            }
            return data;
        }   
        catch (error) {
            console.error("Error en login:", error);
            return { error: true, message: error.message };
        }
    },

    userByPage: async (page) => {
        return await fetch(`${api_url}?page=${page}`, {
            method: "GET",
            headers: {
                "authorization": `Bearer ${getCookie('token')}`
            }
        })
    },

    create: async (form) => {
        try {
            const response = await fetch(`${api_url}`, {
                method: "POST",
                body: form,
                headers: {
                    "authorization": `Bearer ${getCookie('token')}`
                }
            });
    
            if (!response.ok) {
                //siempre devuelve un objeto con estatus aunque la respuesta no se exitosa
                return { status: response.status, error: true };
            }
    
            const data = await response.json();
            return data; // json de la api
        } catch (error) {
            console.error("Error al crear usuario:", error);
            return { status: 500, error: true, message: error.message };
        }
    },

    userById: async (id) => {
        return await fetch(`${api_url}/${id}`, {
            method: "GET",
            headers: {
                "authorization": `Bearer ${getCookie('token')}`
            }
        })
    },

    update: async (form, id) => {
        return await fetch(`${api_url}/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${getCookie('token')}`
            },
            body: JSON.stringify(form)
        })
    },

    updatePass: async (form, id) => {
        return await fetch(`${api_url}/pass/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${getCookie('token')}`
            },
            body: JSON.stringify(form)
        })
    },

    delete: async (id) => {
        try {
            const response = await fetch(`${api_url}/${id}`, {
                method: "DELETE",
                headers: {
                    "authorization": `Bearer ${getCookie('token')}`
                }
            });
            
            //alerta de permisos
            if (handlePermissionError(response)) {
                return { error: true, status: 403 };
            }
            
            if (response.status === 500) {
                user_service.logoutClient(router);
                return { error: true, status: 500 };
            }
            
            return response;
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
            return { error: true, message: error.message };
        }
    },

    logoutServer: async () => {
        return await fetch(`${api_url}/logout`, {
            method: "GET",
            headers: {
                "authorization": `Bearer ${getCookie('token')}`
            }
        })
    },

    logoutClient: (router) => {
        auth_service.logoutClient(router);
    }
}

export default user_service;