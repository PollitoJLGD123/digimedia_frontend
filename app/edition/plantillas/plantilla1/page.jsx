"use client";
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

  return (
    <>
      <FormHeader dataHeader={dataHeader} />
      <FormFooter formFooter={formFooter} />
    </>
  );
};

export default PageContent;