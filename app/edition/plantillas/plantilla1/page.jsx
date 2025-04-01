"use client";
import FormBody1 from '../components/FormBody1';
import FormFooter from '../components/FormFooter'
import FormHeader from '../components/FormHeader'
import { useState } from 'react';

const PageContent = () => {

  const [formFooter, setFormFooter] = useState({
    titulo: "Titulo Final del Blog",
    descripcion: "Reseña final del blog, incluye cosas acerca de la conclusión del proyecto y diferencias con el resto de blogs.",
    url_image1: "blog-10.jpg",
    url_image2: "blog-1.jpg",
    url_image3: "blog-2.jpg",
  });

  const [dataHeader, setDataHeader] = useState({
    titulo: "Tu título impactante aquí",
    texto_frase: "Una frase cautivadora",
    texto_descripcion:
      "Frase secundaria y llamativa",
    url_image: "/blog/fondo_blog_extend.png",
  });
  
  const [formEncabezadoBody, setFormEncabezadoBody] = useState({
    titulo: "Tu título impactante aquí",
    descripcion:
      "Frase secundaria y llamativa",
    fecha: '2025-03-31 12:00:57',
    url_image1: "/blog/fondo_blog_extend.png",
  });

  const [formInfoBody, setFormInfoBody] = useState({
    titulo: "El Factor Sorpresa y Distinción",
    descripcion:"Las letras de neón LED permiten personalizar la imagen de tu local, haciendo que el nombre de tu bar sea visible desde lejos. Un diseño llamativo puede convertirse en un sello distintivo y en un punto de referencia para los clientes.",
    titulo1: "Ambiente y Experiencia Visual",
    descripcion1:"La iluminación juega un papel crucial en la atmósfera de un bar. Los colores vibrantes y cálidos del neón LED pueden transformar un espacio ordinario en un entorno acogedor e instagrameable.",
    titulo2: "Eficiencia Energética y Durabilidad",
    descripcion2:"A diferencia del neón tradicional, las luces LED son más eficientes, consumen menos energía y tienen una vida útil más prolongada.",
    titulo3: "Marketing y Atracción de Clientes",
    descripcion3:"Un letrero de neón LED bien diseñado es una herramienta de marketing poderosa, capaz de captar la atención y aumentar la visibilidad de tu local.",
  });

  const [formCommendBody, setFormCommendBody] = useState({
    titulo: "Consejos para Elegir el Letrero Perfecto",
    texto1:
    "Opta por colores que reflejen la personalidad de tu bar.",
    texto2:
    "Elige un diseño legible y atractivo.",
    texto3:
    "Considera el lugar de instalación para maximizar su impacto.",
  });

  const [formGaleryBody, setFormGaleryBody] = useState({
    url_image2: "/blog/blog-2.jpg",
    url_image3: "/blog/blog-2.jpg"
  });

  return (
    <>
      <FormHeader 
        dataHeader={dataHeader} 
        setFormData={setDataHeader}
      />

      <FormBody1
        formCommendBody = {formCommendBody}
        setFormCommendBody = {setFormCommendBody}
        
        formInfoBody = {formInfoBody}
        setFormInfoBody = {setFormInfoBody}

        formGaleryBody = {formGaleryBody}
        setFormGaleryBody = {setFormGaleryBody}

        formEncabezadoBody = {formEncabezadoBody}
        setFormEncabezadoBody = {setFormEncabezadoBody}
      />

      <FormFooter
        formFooter={formFooter}
        setFormData={setFormFooter}
      />
    </>
  );
};

export default PageContent;