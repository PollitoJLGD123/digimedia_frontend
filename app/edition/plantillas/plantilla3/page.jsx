"use client";
import FormBody3 from '../components/FormBody3';
import FormFooter from '../components/FormFooter'
import FormHeader from '../components/FormHeader'
import { useState } from 'react';

const PageContent = () => {

  const [formFooter, setFormFooter] = useState({
    titulo: "Titulo Footer",
    descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, voluptate.",
    url_image1: "/blog/blog-10.jpg",
    url_image2: "/blog/blog-1.jpg",
    url_image3: "/blog/blog-2.jpg",
  });

  const [dataHeader, setDataHeader] = useState({
    titulo: "Titulo Header",
    texto_frase: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, voluptate.",
    texto_descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, voluptate.",
    url_image: "/blog/fondo_blog_extend",
  });

  const [formEncabezadoBody, setFormEncabezadoBody] = useState({
    titulo: "Tu Bar, en la Mira",
    descripcion:
      "Las luces neón LED se han convertido en un elemento diferenciador en el mundo de la hospitalidad. No solo son visualmente atractivos, sino que también refuerzan la identidad de tu negocio. En este artículo, exploraremos cómo las letras luminosas pueden marcar la diferencia en la experiencia de tus clientes.",
    fecha: '2025-04-01 09:41:33',
    url_image1: "/blog/blog-4.jpg",
  });

  const [formInfoBody, setFormInfoBody] = useState([
    {
      titulo: "El Factor Sorpresa y Distinción",
      descripcion:"Las letras de neón LED permiten personalizar la imagen de tu local, haciendo que el nombre de tu bar sea visible desde lejos. Un diseño llamativo puede convertirse en un sello distintivo y en un punto de referencia para los clientes.",
    },
    {
      titulo: "Ambiente y Experiencia Visual",
      descripcion:"La iluminación juega un papel crucial en la atmósfera de un bar. Los colores vibrantes y cálidos del neón LED pueden transformar un espacio ordinario en un entorno acogedor e instagrameable.",
    },
    {
      titulo: "Eficiencia Energética y Durabilidad",
      descripcion:"A diferencia del neón tradicional, las luces LED son más eficientes, consumen menos energía y tienen una vida útil más prolongada.",
    },
    {
      titulo: "Marketing y Atracción de Clientes",
      descripcion:"Un letrero de neón LED bien diseñado es una herramienta de marketing poderosa, capaz de captar la atención y aumentar la visibilidad de tu local.",
    }
  ]);

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

      <FormBody3
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