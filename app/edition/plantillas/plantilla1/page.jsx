"use client";
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

  return (
    <>
      <FormHeader 
        dataHeader={dataHeader} 
        setFormData={setDataHeader}
      />

      <FormFooter
        formFooter={formFooter}
        setFormData={setFormFooter}
      />
    </>
  );
};

export default PageContent;
