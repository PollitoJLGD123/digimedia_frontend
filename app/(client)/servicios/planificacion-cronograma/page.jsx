"use client";

import React from "react";

export default function PlanificacionCronograma() {
  return (
    <div>
      {/* Hero Section para Desktop */}
      <div
        className="relative bg-cover bg-no-repeat bg-center h-auto"
        style={{
          backgroundImage:
            'url("/servicios/planificacion/planificacion-background.png")',
        }}
      >
        {/* Fondo blanco transparente solo sobre la imagen */}
        <div className="absolute inset-0 bg-white bg-opacity-80 lg:hidden"></div>
        <SectionMain />
      </div>

      {/* Sección para Pantallas Móviles */}
      <MobileVersion />
      {/* Componentes debajo del Hero */}
      <div className="py-0 px-8 md:px-16"></div>
    </div>
  );
}
