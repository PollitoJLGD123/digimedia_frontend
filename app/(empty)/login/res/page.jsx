'use client'

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Page () {
    
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(null);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const tokenParam = searchParams.get('token');
        if (!tokenParam) {
            Swal.fire("Error", "Token inválido o expirado", "error");
            router.push('/login');
        } else {
            setToken(tokenParam);
        }
    }, [searchParams, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password || !confirmPassword) {
            Swal.fire("Error", "Todos los campos son obligatorios", "error");
            return;
        }

        if (password !== confirmPassword) {
            Swal.fire("Error", "Las contraseñas no coinciden", "error");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/update_password', {
                token,
                password,
                password_confirmation: confirmPassword
            });

            Swal.fire({
                title: "Éxito",
                text: response.data.message,
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            });
            
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        } catch (error) {
            Swal.fire("Error","Hubo un problema, intenta de nuevo", "error");
            console.log(error.response?.data?.message);
        }
        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-blue-700 text-center mb-4">
                    Restablecer Contraseña
                </h1>
                <p className="text-gray-600 text-center mb-4">
                    Ingresa tu nueva contraseña.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                        type="password"
                        placeholder="Nueva Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input 
                        type="password"
                        placeholder="Confirmar Contraseña"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition flex justify-center items-center"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="animate-spin h-5 w-5 border-4 border-white border-t-transparent rounded-full"></span>
                        ) : (
                            "Actualizar Contraseña"
                        )}
                    </button>
                </form>
                <div className="text-center mt-4">
                    <a href="/login" className="text-blue-600 hover:underline">← Volver al login</a>
                </div>
            </div>
        </div>
    );
}
