'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import './Header.css';

export default function Header2() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const isActive = (path) => pathname === path || pathname === `${path}/`;

  const closeMenu = () => {
    setMenuOpen(false);
    setIsServiceOpen(false);
    setIsMoreOpen(false);
  };

  return (
    <header className="header">
      <div className="contenidoHeader">
        <div className="logoHeader flex items-center">
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

        <div className="seccionesHeader">
          <input type="checkbox" id="menucheckbox" checked={menuOpen} onChange={() => setMenuOpen(!menuOpen)} />
          <label htmlFor="menucheckbox">
            <img src="/headerFooter/menu.webp" alt="menú" className="menuIcono" width="25" height="25" />
          </label>
          <ul className="menuHorizontal">
            <li className={isActive('/') ? 'active' : ''} onClick={closeMenu}>
              <Link href="/">Inicio</Link>
            </li>
            <li className={isActive('/servicios') ? 'active' : ''} onClick={() => setIsServiceOpen(!isServiceOpen)}>
              <p>Servicios &#9660;</p>
              {isServiceOpen && (
                <ul className="menuVertical">
                  <li className={isActive('/servicios/desing-desarrollo') ? 'active-sub' : ''} onClick={closeMenu}>
                    <Link href="/servicios/desing-desarrollo">Diseño y Desarrollo Web</Link>
                  </li>
                  <li className={isActive('/servicios/gestion-redes') ? 'active-sub' : ''} onClick={closeMenu}>
                    <Link href="/servicios/gestion-redes">Gestión de Redes Sociales</Link>
                  </li>
                  <li className={isActive('/servicios/marketing-gestion') ? 'active-sub' : ''} onClick={closeMenu}>
                    <Link href="/servicios/marketing-gestion">Marketing y Gestión Digital</Link>
                  </li>
                  <li className={isActive('/servicios/branding-desing') ? 'active-sub' : ''} onClick={closeMenu}>
                    <Link href="/servicios/branding-desing">Branding y Diseño</Link>
                  </li>
                  <li className={isActive('/servicios/ui') ? 'active-sub' : ''} onClick={closeMenu}>
                    <Link href="/servicios/ui">Diseño UX/UI</Link>
                  </li>
                  <li className={isActive('/servicios/Desarrollo-web') ? 'active-sub' : ''} onClick={closeMenu}>
                    <Link href="/servicios/Desarrollo-web">Desarrollo Web</Link>
                  </li>
                  <li className={isActive('/servicios/planificacion-cronograma') ? 'active-sub' : ''} onClick={closeMenu}>
                    <Link href="/servicios/planificacion-cronograma">Planificacion y cronograma</Link>
                  </li>
                  <li className={isActive('/servicios/diseno-pautas') ? 'active-sub' : ''} onClick={closeMenu}>
                    <Link href="/servicios/diseno-pautas">Diseño de Pautas</Link>
                  </li>
                  <li className={isActive('/servicios/analisis-y-benchmarking') ? 'active-sub' : ''} onClick={closeMenu}>
                    <Link href="/servicios/analisis-y-benchmarking">Análisis de Benchmarking</Link>
                  </li>
                  <li className={isActive('/servicios/planificacion-estrategica') ? 'active-sub' : ''} onClick={closeMenu}>
                    <Link href="/servicios/planificacion-estrategica">Planificación Estratégica</Link>
                  </li>
                  <li className={isActive('/servicios/desarrollo-Brief') ? 'active-sub' : ''} onClick={closeMenu}>
                    <Link href="/servicios/desarrollo-Brief">Desarrollo Brief</Link>
                  </li>
                </ul>
              )}
            </li>
            <li className={isActive('/nosotros') ? 'active' : ''} onClick={closeMenu}>
              <Link href="/nosotros">Nosotros</Link>
            </li>
            <li className={isActive('/blog') || isActive('/preguntas') || isActive('/contactanos') ? 'active' : ''} 
                onClick={() => setIsMoreOpen(!isMoreOpen)}>
              <p>Más &#9660;</p>
              {isMoreOpen && (
                <ul className="menuVertical">
                  <li className={isActive('/blog') ? 'active-sub' : ''} onClick={closeMenu}>
                    <Link href="/blog">Blog</Link>
                  </li>
                  <li className={isActive('/preguntas') ? 'active-sub' : ''} onClick={closeMenu}>
                    <Link href="/preguntas">FQA</Link>
                  </li>
                  <li className={isActive('/contactanos') ? 'active-sub' : ''} onClick={closeMenu}>
                    <Link href="/contactanos">Contacto</Link>
                  </li>
                </ul>
              )}
            </li>
            <li className={isActive('/login') ? 'active' : ''} onClick={closeMenu}>
              <Link href="/login">Ingresar</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
