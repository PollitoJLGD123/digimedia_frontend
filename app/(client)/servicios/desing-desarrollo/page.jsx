// Componentes
import Servicios from '../components/Servicios';
import Contactanos from '../components/Contactanos';
import Description from '../components/Description';
import Main from '../components/Main';
import ModalScroll from '../components/ModalScroll';
import ModalButton from '../components/ModalButton';

export default function Page() {
  const servicios = [
    {
      title: 'DISEÑOS UX Y UI',
      text: 'Creamos experiencias digitales atractivas, intuitivas y centradas en tus usuarios.',
      icon: '/servicios/desarrollo/icon1.svg',
      ruta: '/servicios/ui'
    },
    {
      title: 'DESARROLLO WEB',
      text: 'Construimos sitios web funcionales, modernos y a la medida de tus necesidades.',
      icon: '/servicios/desarrollo/icon2.svg',
      ruta: '/servicios/desarrollo-webs/'
    },
    {
      title: 'DOMINIO Y HOSTING',
      text: 'Aseguramos tu presencia en línea con dominios y hosting confiables.',
      icon: '/servicios/desarrollo/icon3.svg',
    },
    {
      title: 'SEO',
      text: 'Impulsamos tu sitio al tope de los resultados de búsqueda con estrategias efectivas.',
      icon: '/servicios/desarrollo/icon4.svg',
    },
  ];

  return (
    <>
      <ModalScroll
        text="DISEÑO Y DESARROLLO WEB"
        fondo="/servicios/desarrollo/modal-scroll/fondo.webp"
        title="OBTÉN UNA ASESORÍA ¡GRATIS!"
        serviceName="1"
      />

      <ModalButton
        title="Lleva tu negocio al siguiente nivel online"
        fondo="/servicios/desarrollo/modal-button/imagen.webp"
        text="DISEÑO Y DESARROLLO WEB"
        serviceName="1"
      />

      <Main
        title="DISEÑO Y DESARROLLO WEB"
        subtitle="¡Transforma tu presencia online!"
        text="Ofrecemos diseño y desarrollo web para ayudar a tu negocio a destacar en línea. Creamos sitios atractivos y funcionales que reflejan tu marca y mejoran la experiencia del usuario."
        image="/servicios/desarrollo/img-main.png"
      />

      <Description
        title="Diseño y Desarrollo Web"
        text="Consiste en la habilidad de presentar contenido de manera organizada en una página web con el objetivo de brindar una experiencia óptima al usuario. El diseño se centra en la estética visual, mientras que el desarrollo se dedica a la construcción y programación del sitio web. Ambos aspectos colaboran estrecha- mente para asegurar el éxito del sitio web."
      />

      <Servicios servicios={servicios} />

      <Contactanos
        text="Consolida tu presencia web, diseña con nosotros tu página web"
        iconLeft="/servicios/desarrollo/icon-left.svg"
        iconRight="/servicios/desarrollo/icon-right.svg"
      />
    </>
  );
}
