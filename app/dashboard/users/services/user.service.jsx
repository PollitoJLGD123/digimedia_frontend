"use client"

//const api_url = "https://back.digimediamkt.com/api/user"
const api_url = "http://127.0.0.1:8000/api/user"
import { deleteCookie, getCookie } from "cookies-next";


const user_service = {
    login: async (form) => {
        try {
            console.log(form)
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
        return await fetch(`${api_url}`, {
            method: "POST",
            body: form,
            headers: {
                "authorization": `Bearer ${getCookie('token')}`
            }
        })
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
        return await fetch(`${api_url}/${id}`, {
            method: "DELETE",
            headers: {
                "authorization": `Bearer ${getCookie('token')}`
            }
        })
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
        deleteCookie('token');
        router.push('/login');
    },

    isAdmin: () => {

        if (!getCookie('user')) return false;

        return JSON.parse(getCookie('user')).admin == 1 ? true : false;
    }
}

export default user_service;