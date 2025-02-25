'use client';
import { useEffect, useRef, useState } from 'react';
import './modal.css';

export default function ModalScroll({ text, fondo, title, serviceName }) {
  const modalRef = useRef(null);
  const backgroundRef = useRef(null);
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    servicio_id: serviceName,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (backgroundRef.current && modalRef.current) {
        backgroundRef.current.classList.remove('hidden');
        backgroundRef.current.classList.add('fade-in');
        modalRef.current.classList.add('modal-content');
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const hideModal = () => {
    if (backgroundRef.current && modalRef.current) {
      backgroundRef.current.classList.add('fade-out-bg');
      modalRef.current.classList.add('fade-out-modal');

      setTimeout(() => {
        backgroundRef.current.classList.add('hidden');
        backgroundRef.current.classList.remove('fade-in', 'fade-out-bg');
        modalRef.current.classList.remove('modal-content', 'fade-out-modal');
      }, 500);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://back.digimediamkt.com/api/modal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Formulario enviado correctamente');
        hideModal();
      } else {
        alert('Hubo un problema al enviar el formulario');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al enviar el formulario');
    }
  };

  return (
    <div
      ref={backgroundRef}
      onClick={hideModal}
      className="seccionA bg-[rgba(0,0,0,0.43)] w-screen h-screen flex items-center justify-center fixed top-0 left-0 z-[9998] hidden"
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="bg-black flex w-[95%] md:w-auto relative text-white rounded-2xl overflow-hidden"
      >
        <button onClick={hideModal} className="absolute top-4 right-4">
          X
        </button>
        <div className="relative w-[30%] md:w-64 overflow-hidden justify-center flex">
          <img className="w-full object-cover" src={fondo} alt="" />
          <img
            className="absolute top-4 left-4"
            src="/servicios/logo-modal.webp"
            alt=""
          />
          <p className="absolute hidden md:block bottom-10 right-6 text-2xl font-semibold text-right">
            {text}
          </p>
        </div>
        <div className="p-8 flex flex-col w-[70%] md:w-96 justify-between  gap-8 bg-gradient-to-b from-[#0095ff] to-[#ff037f]">
          <p className="text-3xl text-center font-bold">{title}</p>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <Input
              label="Nombre"
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
            <Input
              label="Teléfono"
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
            />
            <Input
              label="Correo"
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
            />
            <input
              type="hidden"
              name="servicio_id"
              value={formData.servicio_id}
              readOnly
            />
            <button className="bg-[#0095ff] p-2 text-2xl font-bold rounded-2xl mt-4">
              HAZLO YA
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Input({ label, type, name, value, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold" htmlFor={name}>
        {label}
      </label>
      <input
        className="p-1 outline-none rounded-md text-black"
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
