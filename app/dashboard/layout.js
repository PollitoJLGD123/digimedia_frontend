'use client';
import '../globals.css';
import Link from 'next/link';
import AuthGuard from './components/AuthGuard';
import auth_service from './users/services/auth.service';
import { usePathname, useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  
  // info usuario y rol
  const userRole = getCookie('rol') || 'Usuario';
  const userData = getCookie('user') ? JSON.parse(getCookie('user')) : { name: 'Usuario' };
  const empleadoData = getCookie('empleado') ? JSON.parse(getCookie('empleado')) : null;
  
  const displayName = empleadoData?.nombre || userData?.name || 'Usuario';

  const handleLogout = async () => {
    try {
      await auth_service.logout();
      auth_service.logoutClient(router);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      auth_service.logoutClient(router);
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
        <div className="flex w-[100vw] overflow-hidden">
          <div className="flex flex-col shrink-0 p-2 bg-[#e8e8e8]">
            <nav>
              <ul className="flex flex-col gap-1">
                {/* Enlaces publicos */}
                <TableLink title="Sección Principal" href="/dashboard/main" />
                
                {auth_service.hasRole('administrador') && (
                  <>
                    <TableLink title="Usuarios" href="/dashboard/users" />
                  </>
                )}
                
                {/* aun no existe */}
                {auth_service.hasRole('marketing') && (
                  <TableLink title="Gestión de Contenido" href="/dashboard/content" />
                )}

                {/* aun no existe */}
                {auth_service.hasRole('ventas') && (
                  <TableLink title="Mis Pedidos" href="/dashboard/ventas" />
                )}
                
                {/* links publicos */}
                <TableLink title="Libro de Reclamaciones" href="/dashboard/reclamaciones" />
                <TableLink title="Modales" href="/dashboard/modales" />
              </ul>
            </nav>

            <div className="flex mt-auto gap-2 items-center">
              <img src="/dashboard/user-icon.svg" alt="" width={40} />
              <p className="font-bold">
                Bienvenido
                <span className="font-normal block">{displayName} ({userRole})</span>
                { console.log(document.cookie) }
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex gap-2 bg-[#ff037f] text-white px-4 py-3 rounded-full justify-center my-3"
            >
              Cerrar sesión
            </button>
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