"use client";
import FormBody3 from '../components/FormBody3';
import FormFooter from '../components/FormFooter'
import FormHeader from '../components/FormHeader'
import { useState, useEffect } from 'react';
import Service from "../../services/Service"
import Swal from 'sweetalert2';
import { Save } from "lucide-react"

const PageContent = () => {

  const [formSave, setFormSave] = useState({
    id_blog_head: -1,
    id_blog_footer: -1,
    id_blog_body: -1,
    id_commend_tarjeta: -1,
    id_card: -1,
    id_blog: -1,
  });

  const [formFooter, setFormFooter] = useState({
    titulo: "Titulo Footer",
    descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, voluptate.",
    public_image1: "blog-10.jpg",
    url_image1: "", //por esta vez url es la ruta para elimianr
    public_image2: "blog-1.jpg",
    url_image1: "",
    public_image3: "blog-2.jpg",
    url_image1: "",
  });

  const [dataHeader, setDataHeader] = useState({
    titulo: "Titulo Header",
    texto_frase: "Texto atractivo y llamativo para el cliente",
    texto_descripcion: "Texto destacado y secundario para el titulo",
    public_image: "/blog/fondo_blog_extend.jpg",
    url_image: "",
  });

  const [formEncabezadoBody, setFormEncabezadoBody] = useState({
    titulo: "Titulo del Blog",
    descripcion:
      "Las luces neón LED se han convertido en un elemento diferenciador en el mundo de la hospitalidad. No solo son visualmente atractivos, sino que también refuerzan la identidad de tu negocio. En este artículo, exploraremos cómo las letras luminosas pueden marcar la diferencia en la experiencia de tus clientes.",
    fecha: '2025-03-31',
    public_image1: "blog-4.jpg",
    url_image1: "",
  });

  const [formInfoBody, setFormInfoBody] = useState([
    {
      titulo: "El Factor Sorpresa y Distinción",
      descripcion: "Las letras de neón LED permiten personalizar la imagen de tu local, haciendo que el nombre de tu bar sea visible desde lejos. Un diseño llamativo puede convertirse en un sello distintivo y en un punto de referencia para los clientes.",
    },

    {
      titulo: "Ambiente y Experiencia Visual",
      descripcion: "La iluminación juega un papel crucial en la atmósfera de un bar. Los colores vibrantes y cálidos del neón LED pueden transformar un espacio ordinario en un entorno acogedor e instagrameable.",
    },
    {
      titulo: "Eficiencia Energética y Durabilidad",
      descripcion: "A diferencia del neón tradicional, las luces LED son más eficientes, consumen menos energía y tienen una vida útil más prolongada.",
    },
    {
      titulo: "Marketing y Atracción de Clientes",
      descripcion: "Un letrero de neón LED bien diseñado es una herramienta de marketing poderosa, capaz de captar la atención y aumentar la visibilidad de tu local.",
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
    texto4:
      "",
    texto5:
      "",
  });

  const [formGaleryBody, setFormGaleryBody] = useState({
    public_image2: "/blog/blog-2.jpg",
    url_image2: "",
    public_image3: "/blog/blog-2.jpg",
    url_image3: "",
  });

  useEffect(() => {
    const sections = document.querySelectorAll("#header, #body, #footer");
    sections.forEach(section => {
      section.style.scrollMargin = "50px";
      if (section.id === "body" && section.clientHeight < 300) {
        section.style.minHeight = "300px";
      }
    });
  }, []);
  

  async function guardarHeader(){
    const id = await Service.saveHeader(dataHeader);
    if(id && id > 0){
      setFormSave((prev) => ({
        ...prev,
        id_blog_head: id,
      }));
      return "succes";
    }
    else{
      Swal.fire({
        title: "Error",
        text: "No se pudo guardar el encabezado",
        icon: "error",
        confirmButtonText: "OK",
      });
      return "error";
    }
  }

  async function guardarFooter(){
    const id = await Service.saveFooter(formFooter);
    if(id && id > 0){
      setFormSave((prev) => ({
        ...prev,
        id_blog_footer: id,
      }));
      return "succes";
    }
    else{
      Swal.fire({
        title: "Error",
        text: "No se pudo guardar el pie de página",
        icon: "error",
        confirmButtonText: "OK",
      });
      return "error";
    }
  }

  async function guardarBody(){
    const formBody = {
      titulo: formEncabezadoBody.titulo,
      descripcion: formEncabezadoBody.descripcion,
      fecha: formEncabezadoBody.fecha,
      id_commend_tarjeta: formSave.id_commend_tarjeta,
      public_image1: formEncabezadoBody.public_image1,
      public_image2: formGaleryBody.public_image2,
      public_image3: formGaleryBody.public_image3,
    }

    const id = await Service.saveBody(formBody);
    if(id && id > 0){
      setFormSave((prev) => ({
        ...prev,
        id_blog_body: id,
      }));
      return "succes";
    }
    else{
      Swal.fire({
        title: "Error",
        text: "No se pudo guardar el contenido",
        icon: "error",
        confirmButtonText: "OK",
      });
      return "error";
    }
  }

  async function guardarCommendTarjeta(){
    const id = await Service.saveBody(formCommendBody);
    if(id && id > 0){
      setFormSave((prev) => ({
        ...prev,
        id_commend_tarjeta: id,
      }));
      return "succes";
    }
    else{
      Swal.fire({
        title: "Error",
        text: "No se pudo guardar la tarjeta de comentarios",
        icon: "error",
        confirmButtonText: "OK",
      });
      return "error";
    }
  }

  async function guardarBlog(){
    const formBlog = {
      id_blog_head: formSave.id_blog_head,
      id_blog_footer: formSave.id_blog_footer,
      id_blog_body: formSave.id_blog_body,
    }
    const id = await Service.saveBlog(formBlog);
    if(id && id > 0){
      setFormSave((prev) => ({
        ...prev,
        id_blog: id,
      }));
      return "succes";
    }
    else{
      Swal.fire({
        title: "Error",
        text: "No se pudo guardar el blog",
        icon: "error",
        confirmButtonText: "OK",
      });
      return "error";
    }
  }

  async function guardarCard(){
    const formCard = {
      id_blog: formSave.id_blog,
      titulo: dataHeader.titulo,
      descripcion: formEncabezadoBody.descripcion,
      public_image: dataHeader.public_image,
      id_plantilla: 1,
    }
    const id = await Service.saveCard(formCard);
    if(id && id > 0){
      setFormSave((prev) => ({
        ...prev,
        id_card: id,
      }));
      return "succes";
    }
    else{
      Swal.fire({
        title: "Error",
        text: "No se pudo guardar la tarjeta",
        icon: "error",
        confirmButtonText: "OK",
      });
      return "error";
    }
  }

  async function guardarTarjetas(){
    formInfoBody.map((section) => {
      const formTarjeta = {
        id_blog_body: formSave.id_blog_body,
        titulo: section.titulo,
        descripcion: section.descripcion,
      }

      const id = Service.saveTarjeta(formTarjeta);
      if(id && id > 0){
        setFormSave((prev) => ({
          ...prev,
          id_card: id,
        }));
        return "succes";
      }
      else{
        Swal.fire({
          title: "Error",
          text: "No se pudo guardar la tarjeta",
          icon: "error",
          confirmButtonText: "OK",
        });
        return "error";
      }
    })
  }

  async function HandleSave(){
    const result_commend = await guardarCommendTarjeta();
    if(result_commend === "succes"){
      const result_body = await guardarBody();
      if(result_body === "succes"){
        const result_tarjetas = await guardarTarjetas();
        if(result_tarjetas === "succes"){
          const result_header = await guardarHeader();
          if(result_header === "succes"){
            const result_footer = await guardarFooter();
            if(result_footer === "succes"){
              const result_blog = await guardarBlog();
              if(result_blog === "succes"){
                const result_card = await guardarCard();
                if(result_card === "succes"){
                  Swal.fire({
                    title: "Guardado Correctamente",
                    text: "¡Gracias por compartir tus conocimientos!",
                    icon: "success",
                    confirmButtonText: "OK",
                  });
                }
              }
            }
          }
        }
      }
    }
  }


  return (
    <>
      <div id="header" className="section-container mb-8">
        <FormHeader 
          dataHeader={dataHeader} 
          setFormData={setDataHeader}
        />
      </div>

      <div id="body" className="section-container my-8">
        <FormBody3
          formCommendBody={formCommendBody}
          setFormCommendBody={setFormCommendBody}
          
          formInfoBody={formInfoBody}
          setFormInfoBody={setFormInfoBody}

          formGaleryBody={formGaleryBody}
          setFormGaleryBody={setFormGaleryBody}

          formEncabezadoBody={formEncabezadoBody}
          setFormEncabezadoBody={setFormEncabezadoBody}
        />
      </div>

      <div id="footer" className="section-container mt-8">
        <FormFooter 
          formFooter={formFooter}
          setFormData={setFormFooter}
        />
      </div>

      <div className="bottom-0 left-0 fixed p-6 border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <button className="text-white rounded-xl flex items-center justify-center w-full bg-emerald-600 hover:bg-emerald-500 transition-all duration-300 px-5 py-3 shadow-lg shadow-emerald-900/20">
          <Save className="mr-2 h-4 w-4 text-blue-950" />
          Guardar Cambios
        </button>
      </div>
    </>
  );
};

export default PageContent;