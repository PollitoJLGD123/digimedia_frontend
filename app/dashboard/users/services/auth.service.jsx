"use client"

const api_url = "http://127.0.0.1:8000/api";
//const api_url = "https://back.digimediamkt.com/api";

import { deleteCookie, getCookie, setCookie } from "cookies-next";

const auth_service = {
    register: async (form) => {
        try {
            const response = await fetch(`${api_url}/register`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Error en el registro");
            }
            return data;
        } 
        catch (error) {
            console.error("Error en registro:", error);
            return { error: true, message: error.message };
        }
    },

    ogin: async (form) => {
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
    
            setCookie('token', data.token, { maxAge: 60 * 60 * 24 }); // Expira en 1 día
    
            return data;
        } 
        catch (error) {
            console.error("Error en login:", error);
            return { error: true, message: error.message };
        }
    },

    logout: async () => {
        try {
            const response = await fetch(`${api_url}/logout`, {
                method: "POST",
                headers: {
                    "authorization": `Bearer ${getCookie('token')}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Error al cerrar sesión");
            }
            return data;
        } 
        catch (error) {
            console.error("Error en logout:", error);
            return { error: true, message: error.message };
        }
    },

    me: async () => {
        try {
            const response = await fetch(`${api_url}/me`, {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${getCookie('token')}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Error al obtener información del usuario");
            }
            return data;
        } 
        catch (error) {
            console.error("Error al obtener información del usuario:", error);
            return { error: true, message: error.message };
        }
    },

    logoutClient: (router) => {
        deleteCookie('token');
        deleteCookie('user');
        deleteCookie('empleado');
        deleteCookie('rol');
        router.push('/login');
    },

    hasRole: (role) => {
        if (!getCookie('rol')) return false;
        return getCookie('rol') === role;
    },

    isAdmin: () => {
        return auth_service.hasRole('administrador');
    }
}

export default auth_service;