"use client";
import FormFooter from '../components/FormFooter'
import FormHeader from '../components/FormHeader'
import { useState } from 'react';
import Formulario from '../components/Formulario';

const PageContent = () => {

  const [formFooter, setFormFooter] = useState({
    titulo: "Titulo Footer",
    descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, voluptate.",
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

  return (
    <>
      <FormHeader dataHeader={dataHeader}>
        <Formulario formData={dataHeader} setFormData={setDataHeader}/>
      </FormHeader> 
      <FormFooter formFooter={formFooter} />
    </>
  );
};

export default PageContent;