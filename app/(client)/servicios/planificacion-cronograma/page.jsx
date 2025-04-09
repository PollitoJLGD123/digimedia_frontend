"use client";
import { SectionMain } from "./components/SectionMain";
import { MobileVersion } from "./components/MobileVersion";

export default function PlanificacionCronograma() {
  return (
    <div>
      <div
        className="relative bg-cover bg-no-repeat bg-center h-auto"
        style={{
          backgroundImage:
            'url("/servicios/planificacion/planificacion-background.png")',
        }}
      >
        <div className="absolute inset-0 bg-white bg-opacity-80 lg:hidden"></div>
        <SectionMain />
      </div>

      <MobileVersion />
      <div className="py-0 px-8 md:px-16"></div>
    </div>
  );
}
