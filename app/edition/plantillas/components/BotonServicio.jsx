import { useState } from "react";

const servicios = [
  { label: "Diseño y Desarrollo Web", url: "/servicios/desing-desarrollo/" },
  { label: "Gestión de Redes Sociales", url: "/servicios/gestion-redes/" },
  { label: "Marketing de Gestión Digital", url: "/servicios/marketing-gestion/" },
  { label: "Branding y Diseño", url: "/servicios/branding-desing/" },
];

export default function BotonServicio({ onServiceChange, servicioSeleccionado }) {
  const [selectedService, setSelectedService] = useState(servicioSeleccionado || "");

  const handleSelectChange = (e) => {
    setSelectedService(e.target.value);
    if (onServiceChange) onServiceChange(e.target.value);
  };

  return (
    <div className="p-4 border rounded-md max-w-md">
      <label className="block mb-2 font-semibold">Selecciona servicio para el botón</label>
      <select
        className="w-full border rounded p-2 mb-4"
        value={selectedService}
        onChange={handleSelectChange}
      >
        <option value="">-- Ninguno --</option>
        {servicios.map((serv) => (
          <option key={serv.url} value={serv.url}>
            {serv.label}
          </option>
        ))}
      </select>

      {selectedService && (
        <a
          href={selectedService}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Conoce nuestro servicio
        </a>
      )}
    </div>
  );
}
