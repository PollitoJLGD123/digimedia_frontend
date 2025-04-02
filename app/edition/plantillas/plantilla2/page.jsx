"use client";
import FormFooter from '../components/FormFooter'
import FormHeader from '../components/FormHeader'
import { useState, useEffect } from 'react';
import FormBody2 from '../components/FormBody2';
import Service from "../../services/Service"
import Swal from 'sweetalert2';

const PageContent = () => {

  const [savedIds, setSavedIds] = useState({
    id_blog_head: -1,
    id_blog_footer: -1,
    id_blog_body: -1,
    id_commend_tarjeta: -1,
    id_card: -1,
    id_blog: -1,
  })

  const [headerData, setHeaderData] = useState({
    titulo: "Titulo Header",
    texto_frase: "Texto atractivo y llamativo para el cliente",
    texto_descripcion: "Texto destacado y secundario para el titulo",
    public_image: "/blog/fondo_blog_extend.jpg",
  })

  const [footerData, setFooterData] = useState({
    titulo: "Titulo Footer",
    descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, voluptate.",
    public_image1: "blog-10.jpg",
    public_image2: "blog-1.jpg",
    public_image3: "blog-2.jpg",
  })

  const [bodyHeaderData, setBodyHeaderData] = useState({
    titulo: "Titulo del Blog",
    descripcion:
      "Las luces neón LED se han convertido en un elemento diferenciador en el mundo de la hospitalidad. No solo son visualmente atractivos, sino que también refuerzan la identidad de tu negocio. En este artículo, exploraremos cómo las letras luminosas pueden marcar la diferencia en la experiencia de tus clientes.",
    fecha: "2025-03-31",
    public_image1: "blog-4.jpg",
  })

  const [bodySections, setBodySections] = useState([
    {
      titulo: "El Factor Sorpresa y Distinción",
      descripcion:
        "Las letras de neón LED permiten personalizar la imagen de tu local, haciendo que el nombre de tu bar sea visible desde lejos. Un diseño llamativo puede convertirse en un sello distintivo y en un punto de referencia para los clientes.",
    },
    {
      titulo: "Ambiente y Experiencia Visual",
      descripcion:
        "La iluminación juega un papel crucial en la atmósfera de un bar. Los colores vibrantes y cálidos del neón LED pueden transformar un espacio ordinario en un entorno acogedor e instagrameable.",
    },
    {
      titulo: "Eficiencia Energética y Durabilidad",
      descripcion:
        "A diferencia del neón tradicional, las luces LED son más eficientes, consumen menos energía y tienen una vida útil más prolongada.",
    },
    {
      titulo: "Marketing y Atracción de Clientes",
      descripcion:
        "Un letrero de neón LED bien diseñado es una herramienta de marketing poderosa, capaz de captar la atención y aumentar la visibilidad de tu local.",
    },
  ])

  const [tipsData, setTipsData] = useState({
    titulo: "Consejos para Elegir el Letrero Perfecto",
    texto1: "Opta por colores que reflejen la personalidad de tu bar.",
    texto2: "Elige un diseño legible y atractivo.",
    texto3: "Considera el lugar de instalación para maximizar su impacto.",
    texto4: "",
    texto5: "",
  })

  const [galleryData, setGalleryData] = useState({
    public_image2: "/blog/blog-2.jpg",
    public_image3: "/blog/blog-2.jpg",
  })

  useEffect(() => {
    const sections = document.querySelectorAll("#header, #body, #footer")
    sections.forEach((section) => {
      section.style.scrollMargin = "50px"
      if (section.id === "body" && section.clientHeight < 300) {
        section.style.minHeight = "300px"
      }
    })
  }, [])

  const saveData = async (saveFunction, data, idKey, errorMessage) => {
    try {
      const id = await saveFunction(data)

      if (id && id > 0) {
        setSavedIds((prev) => ({ ...prev, [idKey]: id }))
        return true
      } else {
        throw new Error(errorMessage)
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "OK",
      })
      console.error(`Error saving ${idKey}:`, error)
      return false
    }
  }

  const handleSave = async () => {
    try {
      const tipsSuccess = await saveData(
        Service.saveBody,
        tipsData,
        "id_commend_tarjeta",
        "No se pudo guardar la tarjeta de comentarios",
      )
      if (!tipsSuccess) return

      const bodyData = {
        ...bodyHeaderData,
        id_commend_tarjeta: savedIds.id_commend_tarjeta,
        public_image2: galleryData.public_image2,
        public_image3: galleryData.public_image3,
      }

      const bodySuccess = await saveData(Service.saveBody, bodyData, "id_blog_body", "No se pudo guardar el contenido")
      if (!bodySuccess) return

      const sectionsPromises = bodySections.map((section) => {
        const sectionData = {
          id_blog_body: savedIds.id_blog_body,
          titulo: section.titulo,
          descripcion: section.descripcion,
        }
        return Service.saveTarjeta(sectionData)
      })

      const sectionResults = await Promise.all(sectionsPromises)
      if (sectionResults.some((id) => !id || id <= 0)) {
        throw new Error("No se pudo guardar una o más secciones")
      }

      const headerSuccess = await saveData(
        Service.saveHeader,
        headerData,
        "id_blog_head",
        "No se pudo guardar el encabezado",
      )
      if (!headerSuccess) return

      const footerSuccess = await saveData(
        Service.saveFooter,
        footerData,
        "id_blog_footer",
        "No se pudo guardar el pie de página",
      )
      if (!footerSuccess) return

      const blogData = {
        id_blog_head: savedIds.id_blog_head,
        id_blog_footer: savedIds.id_blog_footer,
        id_blog_body: savedIds.id_blog_body,
      }

      const blogSuccess = await saveData(Service.saveBlog, blogData, "id_blog", "No se pudo guardar el blog")
      if (!blogSuccess) return

      const cardData = {
        id_blog: savedIds.id_blog,
        titulo: headerData.titulo,
        descripcion: bodyHeaderData.descripcion,
        public_image: headerData.public_image,
        id_plantilla: 1,
      }

      const cardSuccess = await saveData(Service.saveCard, cardData, "id_card", "No se pudo guardar la tarjeta")
      if (!cardSuccess) return

      Swal.fire({
        title: "Guardado Correctamente",
        text: "¡Gracias por compartir tus conocimientos!",
        icon: "success",
        confirmButtonText: "OK",
      })
    } catch (error) {
      console.error("Error in save process:", error)
      Swal.fire({
        title: "Error",
        text: error.message || "Ocurrió un error al guardar",
        icon: "error",
        confirmButtonText: "OK",
      })
    }
  }

  return (
    <>
      <div id="header" className="section-container mb-8">
        <FormHeader
          dataHeader={headerData}
          setFormData={setHeaderData}
        />
      </div>

      <div id="body" className="section-container my-8">
        <FormBody2
          formCommendBody={tipsData}
          setFormCommendBody={setTipsData}

          formInfoBody={bodySections}
          setFormInfoBody={setBodySections}

          formGaleryBody={galleryData}
          setFormGaleryBody={setGalleryData}

          formEncabezadoBody={bodyHeaderData}
          setFormEncabezadoBody={setBodyHeaderData}
        />
      </div>

      <div id="footer" className="section-container mt-8">
        <FormFooter
          formFooter={footerData}
          setFormData={setFooterData}
        />
      </div>
    </>
  );
};

export default PageContent;