"use client";
import FormBody1 from '../components/FormBody1';
import FormFooter from '../components/FormFooter'
import FormHeader from '../components/FormHeader'
import { useState, useEffect } from 'react';
import Service from "../../services/Service"
import { Save } from "lucide-react"
import Swal from 'sweetalert2';
import { useRouter } from "next/navigation";

const PageContent = () => {

  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
    url_image2: "",
    public_image3: "blog-2.jpg",
    url_image3: "",
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


  async function guardarHeader() {
    const id = await Service.saveHeader(dataHeader);
    if (id && id > 0) {
      setFormSave((prev) => ({
        ...prev,
        id_blog_head: id,
      }));
      return id;
    }
    else {
      Swal.fire({
        title: "Error",
        text: "No se pudo guardar el encabezado",
        icon: "error",
        confirmButtonText: "OK",
      });
      return "error";
    }
  }

  async function guardarFooter() {
    const id = await Service.saveFooter(formFooter);
    if (id && id > 0) {
      setFormSave((prev) => ({
        ...prev,
        id_blog_footer: id,
      }));
      return id;
    }
    else {
      Swal.fire({
        title: "Error",
        text: "No se pudo guardar el pie de página",
        icon: "error",
        confirmButtonText: "OK",
      });
      return "error";
    }
  }

  async function guardarBody(commentId) {
    const formBody = {
      titulo: formEncabezadoBody.titulo,
      descripcion: formEncabezadoBody.descripcion,
      id_commend_tarjeta: commentId, // Use the directly passed ID
      public_image1: formEncabezadoBody.public_image1,
      url_image1: formEncabezadoBody.url_image1,
      public_image2: formGaleryBody.public_image2,
      url_image2: formGaleryBody.url_image2,
      public_image3: formGaleryBody.public_image3,
      url_image3: formGaleryBody.url_image3,
    }

    console.log("Formulario del body del blog:", formBody);

    const id = await Service.saveBody(formBody);
    if (id && id > 0) {
      setFormSave((prev) => ({
        ...prev,
        id_blog_body: id,
      }));
      return id;
    }
    else {
      Swal.fire({
        title: "Error",
        text: "No se pudo guardar el contenido",
        icon: "error",
        confirmButtonText: "OK",
      });
      return "error";
    }
  }

  async function guardarCommendTarjeta() {
    const id = await Service.saveCommendTarjeta(formCommendBody);
    if (id && id > 0) {
      setFormSave((prev) => ({
        ...prev,
        id_commend_tarjeta: id,
      }));
      
      console.log("Id del la tarjeta comentario:", id);
      return id;
    }
    else {
      Swal.fire({
        title: "Error",
        text: "No se pudo guardar la tarjeta de comentarios",
        icon: "error",
        confirmButtonText: "OK",
      });
      return "error";
    }
  }

  async function guardarBlog(headerID, footerID, bodyID) {
    const formBlog = {
      id_blog_head: headerID,
      id_blog_footer: footerID,
      id_blog_body: bodyID,
      fecha: formEncabezadoBody.fecha,
    }
    const id = await Service.saveBlog(formBlog);
    if (id && id > 0) {
      setFormSave((prev) => ({
        ...prev,
        id_blog: id,
      }));
      return id;
    }
    else {
      Swal.fire({
        title: "Error",
        text: "No se pudo guardar el blog",
        icon: "error",
        confirmButtonText: "OK",
      });
      return "error";
    }
  }

  async function guardarCard(blogId) {
    const formCard = {
      id_blog: blogId,
      titulo: dataHeader.titulo,
      descripcion: formEncabezadoBody.descripcion,
      public_image: dataHeader.public_image,
      url_image: dataHeader.url_image,
      id_plantilla: 1,
    }
    const id = await Service.saveCard(formCard);
    if (id && id > 0) {
      setFormSave((prev) => ({
        ...prev,
        id_card: id,
      }));
      return id;
    }
    else {
      Swal.fire({
        title: "Error",
        text: "No se pudo guardar la tarjeta",
        icon: "error",
        confirmButtonText: "OK",
      });
      return "error";
    }
  }

  async function guardarTarjetas(bodyId) {
    try {
      const resultados = await Promise.all(
        formInfoBody.map(async (section) => {
          const formTarjeta = {
            id_blog_body: bodyId,
            titulo: section.titulo,
            descripcion: section.descripcion,
          };
          const id = await Service.saveTarjeta(formTarjeta);
          if (!id || id <= 0) throw new Error("Error al guardar tarjeta");
          return id;
        })
      );
      return "succes";
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se pudo guardar una o más tarjetas",
        icon: "error",
        confirmButtonText: "OK",
      });
      return "error";
    }
  }

  async function executionFunction(functionSave, mensajeError) {
    const resultado = await functionSave();
    if (resultado === "error") {
      Swal.fire({
        title: "Error",
        text: mensajeError,
        icon: "error",
        confirmButtonText: "OK",
      });
      throw new Error(mensajeError);
    }
    return resultado;
  }

  async function HandleSave() {
    try {
      setLoading(true);

      const commentId = await executionFunction(guardarCommendTarjeta, "No se pudo guardar la tarjeta de comentarios");
      const bodyId = await executionFunction(() => guardarBody(commentId), "No se pudo guardar el contenido del blog");
      await executionFunction(() => guardarTarjetas(bodyId), "No se pudo guardar las tarjetas informativas");
      const headerId = await executionFunction(guardarHeader, "No se pudo guardar el encabezado");
      const footerId = await executionFunction(guardarFooter, "No se pudo guardar el pie de página");
      const blogId = await executionFunction(() => guardarBlog(headerId, footerId, bodyId), "No se pudo guardar el blog");
      await executionFunction(() => guardarCard(blogId), "No se pudo guardar la card");

      Swal.fire({
        title: "Guardado Correctamente",
        text: "¡Podrás ver tu blog en la sección de blogs de la página principal!",
        icon: "success",
        confirmButtonText: "OK",
      });

      setFormSave({
        id_blog_head: -1,
        id_blog_footer: -1,
        id_blog_body: -1,
        id_commend_tarjeta: -1,
        id_card: -1,
        id_blog: -1,
      })

      setFormFooter({
        titulo: "Titulo Footer",
        descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, voluptate.",
        public_image1: "blog-10.jpg",
        url_image1: "", //por esta vez url es la ruta para elimianr
        public_image2: "blog-1.jpg",
        url_image2: "",
        public_image3: "blog-2.jpg",
        url_image3: "",
      });

      setDataHeader({
        titulo: "Titulo Header",
        texto_frase: "Texto atractivo y llamativo para el cliente",
        texto_descripcion: "Texto destacado y secundario para el titulo",
        public_image: "/blog/fondo_blog_extend.jpg",
        url_image: "",
      });

      setFormEncabezadoBody({
        titulo: "Titulo del Blog",
        descripcion:
          "Las luces neón LED se han convertido en un elemento diferenciador en el mundo de la hospitalidad. No solo son visualmente atractivos, sino que también refuerzan la identidad de tu negocio. En este artículo, exploraremos cómo las letras luminosas pueden marcar la diferencia en la experiencia de tus clientes.",
        fecha: '2025-03-31',
        public_image1: "blog-4.jpg",
        url_image1: "",
      });

      setFormInfoBody([
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

      setFormCommendBody({
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

      setFormGaleryBody({
        public_image2: "/blog/blog-2.jpg",
        url_image2: "",
        public_image3: "/blog/blog-2.jpg",
        url_image3: "",
      });

      router.push("/blog");

    } catch (error) {
      console.error("Error al guardar:", error.message);
    } finally {
      setLoading(false);
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
        <FormBody1
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
        <button
          onClick={HandleSave}
          disabled={loading}
          className={`text-white rounded-xl flex items-center justify-center w-full transition-all duration-300 px-5 py-3 shadow-lg shadow-emerald-900/20 ${loading ? "bg-emerald-400 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-500"
            }`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              Guardando...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4 text-blue-950" />
              Guardar Cambios
            </>
          )}
        </button>
      </div>
    </>
  );
};

export default PageContent;