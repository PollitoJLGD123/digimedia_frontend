'use client';
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import { useSearchParams, useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function Page() {
    const [userData, setUserData] = useState(null);
    const [empleadoData, setEmpleadoData] = useState(null);
    const [userRole, setUserRole] = useState('Usuario');
    const [isClient, setIsClient] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const searchParams = useSearchParams();
    const router = useRouter();

    const empleadoId = searchParams.get('id_empleado');
    const api_url = "http://127.0.0.1:8000/api/empleados";

    useEffect(() => {
        setIsClient(true);
        
        const loadData = async () => {
            if (empleadoId) {
                const userRole = getCookie('rol'); 
                console.log("userRole:", userRole);
                if (userRole !== 'administrador') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Acceso denegado',
                        text: 'No tienes permiso para ver este perfil.',
                        confirmButtonColor: '#6f4be8'
                    });
                    setIsLoading(false); // detener loader
                    return;
                }
    
                try {
                    const token = getCookie('token');
                    if (!token) {
                        throw new Error('No se encontró el token de autenticación');
                    }
    
                    const response = await fetch(`${api_url}/${empleadoId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    });
    
                    if (!response.ok) {
                        if (response.status === 401) {
                            deleteCookie('token'); // Elimina el token de las cookies
                            router.push('/login'); // Redirige al usuario al login
                        }
                        throw new Error(`Error ${response.status}: ${response.statusText}`);
                    }
    
                    const data = await response.json();
                    
                    if (data.status === 200) {
                        setEmpleadoData(data.data);
                        setUserRole(data.data.rol?.nombre || 'Usuario');
                    } else {
                        console.error("Empleado no encontrado:", data.message);
                    }
                } catch (error) {
                    console.error("Error API:", error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Hubo un error al cargar el perfil del empleado.',
                        confirmButtonColor: '#6f4be8'
                    });
                } finally {
                    setIsLoading(false); // en cualquier caso, detener el loader
                }
            } else {
                // Solo cargar cookies si NO hay ID en la URL
                const userCookie = getCookie('user');
                const empleadoCookie = getCookie('empleado');
                const rolCookie = getCookie('rol');
                
                if (empleadoCookie) setEmpleadoData(JSON.parse(empleadoCookie));
                if (userCookie) setUserData(JSON.parse(userCookie));
                if (rolCookie) setUserRole(rolCookie);
                setIsLoading(false); //detener loader
            }
        };
    
        loadData();
    }, [empleadoId]);

    // renderiza un loader en lo que cargan los datos
    if (isLoading) {
        return (
            <div className="w-full p-8 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8c52ff]"></div>
                <p className="ml-4 text-[#8c52ff]">Cargando perfil...</p>
            </div>
        );
    }

    // user data
    const nombre = empleadoData?.nombre || userData?.nombre || 'No disponible';
    const apellido = empleadoData?.apellido || userData?.apellido || 'No disponible';
    const dni = empleadoData?.dni || userData?.dni || 'No disponible';
    const displayName = `${nombre} ${apellido}`;
    const email = empleadoData?.email || userData?.email || 'No disponible';
    const telefono = empleadoData?.telefono || 'No disponible';

    return (
        
        <div className="w-full p-8 bg-white rounded-xl shadow-lg">
            {empleadoId && (
                <button
                onClick={() => router.push('/dashboard/empleados')} 
                className="mb-4 bg-[#8c52ff] text-white py-2 px-6 rounded-full hover:bg-[#7a45e6] transition-colors duration-300 flex items-center gap-2"
            > 
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5" viewBox="0 0 1024 1024"><path fill="currentColor" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64"/><path fill="currentColor" d="m237.248 512l265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312z"/></svg>
                Atrás
            </button>
            
            )}
            <h1 className="text-3xl font-bold text-[#8c52ff] mb-8">Perfil del Empleado</h1>
            
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 text-center mb-8 md:mb-0">
                    <div className="bg-[#8c52ff] text-white rounded-full w-48 h-48 mx-auto mb-4 flex items-center justify-center border-4 border-indigo-800 transition-transform duration-300 hover:scale-105">
                        <span className="text-6xl font-bold">{nombre.charAt(0)}{apellido.charAt(0)}</span>
                    </div>
                    <h1 className="text-2xl font-bold text-[#8c52ff] mb-2">{displayName}</h1>
                    <p className="text-gray-600">{userRole}</p>
                </div>
                
                <div className="md:w-2/3 md:pl-8">
                    <h2 className="text-xl font-semibold text-[#8c52ff] mb-4">Información Personal</h2>
                    
                    <div className="bg-gray-100 rounded-lg p-6 mb-6">
                        <ul className="space-y-4 text-gray-700">
                            <li className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#8c52ff]" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                                <span className="font-semibold mr-2">Nombre:</span> {nombre}
                            </li>
                            <li className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#8c52ff]" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                                <span className="font-semibold mr-2">Apellido:</span> {apellido}
                            </li>
                            <li className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#8c52ff]" viewBox="0 0 24 24"><path fill="currentColor" d="M3 18h18V6H3zM1 5a1 1 0 0 1 1-1h20a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm8 5a1 1 0 1 0-2 0a1 1 0 0 0 2 0m2 0a3 3 0 1 1-6 0a3 3 0 0 1 6 0m-2.998 6c-.967 0-1.84.39-2.475 1.025l-1.414-1.414A5.5 5.5 0 0 1 8.002 14a5.5 5.5 0 0 1 3.889 1.61l-1.414 1.415A3.5 3.5 0 0 0 8.002 16M13 9v6h2V9zm4 0v6h2V9z"/>
                            </svg>
                                <span className="font-semibold mr-2">DNI:</span> {dni}
                            </li>
                            <li className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#8c52ff]" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                                <span className="font-semibold mr-2">Email:</span> {email}
                            </li>
                            <li className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#8c52ff]" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                <span className="font-semibold mr-2">Teléfono:</span> {telefono}
                            </li>
                        </ul>
                    </div>
                    
                    <h2 className="text-xl font-semibold text-[#8c52ff] mb-4">Acceso al Sistema</h2>
                    <div className="bg-gray-100 rounded-lg p-6">
                        <div className="flex items-center mb-4">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#8c52ff] flex items-center justify-center text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-medium text-gray-800">Rol de Usuario</h3>
                                <p className="text-[#8c52ff] font-semibold">{userRole}</p>
                            </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-4">
                            {userRole === 'administrador' && (
                                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">Acceso Total</span>
                            )}
                            {userRole === 'marketing' && (
                                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">Gestión de Contenido</span>
                            )}
                            {userRole === 'ventas' && (
                                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">Registro de Ventas</span>
                            )}
                            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">Reclamaciones</span>
                            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">Modales</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}