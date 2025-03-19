"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import axios from 'axios';
import Swal from 'sweetalert2';
import { getCookie } from 'cookies-next';


//const API_BASE_URL = 'https://back.digimediamkt.com/api/contactanos';
const API_BASE_URL = "http://127.0.0.1:8000/api/contactanos"

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
      const response = await axios.post(`${API_BASE_URL}`, formData, {
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
          <button type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Enviar mensaje"} <span className="icon">📩</span>
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default ContactForm;
