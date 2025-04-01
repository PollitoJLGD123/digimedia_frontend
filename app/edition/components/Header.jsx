'use client';
import Link from 'next/link';

export default function Header() {
  const closeMenu = () => {
    setMenuOpen(false);
    setIsServiceOpen(false);
    setIsMoreOpen(false);
  };

  return (
    <header className="flex items-center justify-between bg-purple-800 text-white p-4">
      {/* Text "Modo Edición" */}
      <div className="text-lg font-semibold">MODO EDICIÓN</div>

      {/* Logo */}
      <div className="flex items-center">
        <Link href="/" onClick={closeMenu}>
          <img
            src="/headerFooter/logoblanco2.webp"
            alt="Digimedia"
            width="190px"
            height="65px"
            className="my-auto"
          />
        </Link>
      </div>

      {/* "Regresar" Button */}
      <div>
        <Link href="/dashboard/blogs" className="bg-[#D32F2F] text-white py-2 px-4 rounded-md hover:bg-gray-800">
          Regresar
        </Link>
      </div>
    </header>
  );
}
