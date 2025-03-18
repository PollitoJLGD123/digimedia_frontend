'use client';
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';

export default function Page() {
    const [userData, setUserData] = useState(null);
    const [empleadoData, setEmpleadoData] = useState(null);
    const [userRole, setUserRole] = useState('Usuario');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // solo ejecuta codigo en el cliente
        setIsClient(true);
        
        // datos de cookies
        const userCookie = getCookie('user');
        const empleadoCookie = getCookie('empleado');
        const rolCookie = getCookie('rol');
        
        if (userCookie) {
            setUserData(JSON.parse(userCookie));
        }
        
        if (empleadoCookie) {
            setEmpleadoData(JSON.parse(empleadoCookie));
        }
        
        if (rolCookie) {
            setUserRole(rolCookie);
        }
    }, []);

    // renderiza un placeholder en lo que se cargan los datos (si no estamos en el cliente)
    if (!isClient) {
        return <div className="w-full p-8">Cargando perfil...</div>;
    }

    // user data
    const nombre = empleadoData?.nombre || userData?.nombre || 'No disponible';
    const apellido = empleadoData?.apellido || userData?.apellido || 'No disponible';
    const dni = empleadoData?.dni || userData?.dni || 'No disponible';
    const displayName = `${nombre} ${apellido}`;
    const email = empleadoData?.email || userData?.email || 'No disponible';
    const telefono = empleadoData?.telefono || 'No disponible';

    return (
        <div className="w-full p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold text-[#8c52ff] mb-8">Perfil del Empleado</h1>
            
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 text-center mb-8 md:mb-0">
                    <div className="bg-[#8c52ff] text-white rounded-full w-48 h-48 mx-auto mb-4 flex items-center justify-center border-4 border-indigo-800 transition-transform duration-300 hover:scale-105">
                        <span className="text-6xl font-bold">{nombre.charAt(0)}{apellido.charAt(0)}</span>
                    </div>
                    <h1 className="text-2xl font-bold text-[#8c52ff] mb-2">{displayName}</h1>
                    <p className="text-gray-600 dark:text-gray-300">{userRole}</p>
                </div>
                
                <div className="md:w-2/3 md:pl-8">
                    <h2 className="text-xl font-semibold text-[#8c52ff] mb-4">Información Personal</h2>
                    
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 mb-6">
                        <ul className="space-y-4 text-gray-700 dark:text-gray-300">
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
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#8c52ff]" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2-1a1 1 0 00-1 1v12a1 1 0 001 1h8a1 1 0 001-1V4a1 1 0 00-1-1H6z" clipRule="evenodd" />
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
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6">
                        <div className="flex items-center mb-4">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#8c52ff] flex items-center justify-center text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-medium text-gray-800 dark:text-white">Rol de Usuario</h3>
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