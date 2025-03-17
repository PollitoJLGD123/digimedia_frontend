'use client';
import '../globals.css';
import Link from 'next/link';
import AuthGuard from './components/AuthGuard';
import auth_service from './users/services/auth.service';
import { usePathname, useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';
import { useState } from 'react';

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  
  // info usuario y rol
  const userRole = getCookie('rol') || 'Usuario';
  const userData = getCookie('user') ? JSON.parse(getCookie('user')) : { name: 'Usuario' };
  const empleadoData = getCookie('empleado') ? JSON.parse(getCookie('empleado')) : null;
  
  const displayName = empleadoData?.nombre || userData?.name || 'Usuario';

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await auth_service.logout();
      setTimeout(() => {
        auth_service.logoutClient(router);
      }, 350);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      setTimeout(() => {
        auth_service.logoutClient(router);
      }, 1000);
    }
  };
  
  return (
    <AuthGuard>
      <div className="flex flex-col h-screen">
        <header className="bg-[#8c52ff] h-24 flex items-center justify-between px-10 py-2">
          <img src="/dashboard/logo.png" className="h-full" alt="" />
          <h1 className="text-3xl text-white font-semibold">
            SECCIÓN:{' '}
            {pathname.slice(pathname.indexOf('/', 1) + 1, -1).toUpperCase()}
          </h1>
        </header>
        <div className="flex w-[100vw] overflow-hidden h-screen">
          <div className="flex flex-col shrink-0 p-2 bg-[#e8e8e8] justify-between">
            <nav>
              <ul className="flex flex-col gap-1">
                {/* Enlaces publicos */}
                <TableLink title="Sección Principal" href="/dashboard/main" />
                
                {auth_service.hasRole('administrador') && (
                    <TableLink title="Usuarios" href="/dashboard/users" />
                )}
                
                {auth_service.hasRole('marketing') && (
                  <TableLink title="Gestión de Contenido" href="/dashboard/content" />
                )}

                {auth_service.hasRole('ventas') && (
                  <TableLink title="Mis Pedidos" href="/dashboard/ventas" />
                )}

                <TableLink title="Contactanos" href="/dashboard/contactanos" />
                <TableLink title="Libro de Reclamaciones" href="/dashboard/reclamaciones" />
                <TableLink title="Modales" href="/dashboard/modales"/>
              </ul>
            </nav>

            <div>
              <div className="flex mt-auto gap-2 items-center">
                <img src="/dashboard/user-icon.svg" alt="" width={40} />
                <p className="font-bold">
                  Bienvenido
                  <span className="font-normal block">{displayName} ({userRole})</span>
                </p>
              </div>
              <div className="flex items-center justify-center">
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
              className=" bg-[#ff037f] text-white px-4 py-3 rounded-full justify-center my-3 transition-all duration-300 hover:bg-[#e0036f] disabled:opacity-70"
                >
                  {isLoggingOut ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Cerrando sesión...
                </span>
              ) : (
                'Cerrar sesión'
              )}
                </button>
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
    </AuthGuard>
  );
}

function TableLink({ href, title }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Link
        href={href}
        className={`flex gap-2 items-center rounded-lg px-4 py-3 
          hover:bg-[#eee] ${isActive ? 'bg-[#ddd] font-bold' : ''}`}
      >
        <img src="/dashboard/section-icon.svg" alt="" width={20} />
        {title}
      </Link>
    </li>
  );
}