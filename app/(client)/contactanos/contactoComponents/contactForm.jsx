"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import axios from 'axios';
import Swal from 'sweetalert2';
import { getCookie } from 'cookies-next';
import url from '../../../../api/url';


const URL_API = `${url}/api/contactanos`;
//console.log(API_BASE_URL);

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    numero: "",
    mensaje: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${URL_API}`, formData, {
          headers: {
            Authorization: `Bearer ${getCookie('token')}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        Swal.fire({
          title: "Mensaje Enviado Correctamente",
          text: "Nos pondremos en contacto contigo lo antes posible.",
          icon: "success",
          confirmButtonText: "OK",
        });
        setFormData({
          nombre: "",
          email: "",
          numero: "",
          mensaje: "",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "No se envio el contacto correctamente.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error inesperado.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="formContainer"
      initial={{ opacity: 0, x: "-100%" }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.5, delay: 0.2 }}
      style={{ overflow: "hidden" }}
    >
      <form onSubmit={handleSubmit}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <input
            type="text"
            id="numero"
            name="numero"
            placeholder="Teléfono"
            value={formData.numero}
            onChange={handleChange}
            required
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <textarea
            id="mensaje"
            name="mensaje"
            placeholder="Mensaje"
            rows="10"
            value={formData.mensaje}
            onChange={handleChange}
            required
          ></textarea>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          <button type="submit" disabled={loading} title={loading ? 'Guardando...' : 'Enviar Mensaje'}>
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
              </span>) : "Enviar mensaje"} <span className="icon">📩</span>
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default ContactForm;
