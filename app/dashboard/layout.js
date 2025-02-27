'use client';
import '../globals.css';
import Link from 'next/link';
import AuthGuard from './components/AuthGuard';
import user_service from './users/services/user.service';
import { usePathname, useRouter } from 'next/navigation';

export default function RootLayout({ children }) {
  const router = useRouter();

  const pathname = usePathname();

  const handleLogout = async () => {
    await user_service.logoutServer().then((data) => {
      user_service.logoutClient(router);
    });
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
        <div className="flex bg-[#f9f9f9] w-[100vw] overflow-hidden">
          <div className="flex flex-col shrink-0 p-2 bg-white">
            <nav>
              <ul className="flex flex-col gap-1">
                <TableLink title="Sección Principal" href="/dashboard/main" />
                <TableLink
                  title="Libro de Reclamaciones"
                  href="/dashboard/reclamaciones"
                />
                <TableLink title="Modales" href="/dashboard/modales" />
                {user_service.isAdmin() ? (
                  <TableLink title="Usuarios" href="/dashboard/users" />
                ) : null}
              </ul>
            </nav>

            <div className="flex mt-auto gap-2 items-center">
              <img src="/dashboard/user-icon.svg" alt="" width={40} />
              <p className="font-bold">
                Bienvenido
                <span className="font-normal block">Administrador</span>
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
