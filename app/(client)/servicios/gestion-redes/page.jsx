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
      title: 'PLANIFICACIÓN Y CRONOGRAMA',
      text: 'Creamos estrategias de redes sociales alineadas con tus objetivos para maximizar el impacto de tu marca.',
      icon: '/servicios/gestion/icon1.svg',
      ruta: '/servicios/planificacion-cronograma/'
    },
    {
      title: 'DISEÑO DE PAUTAS',
      text: 'Creamos documentos visuales que definen la identidad, voz y tono de tu marca en redes sociales.',
      icon: '/servicios/gestion/icon3.svg',
      ruta: '/servicios/diseno-pautas/'
    },
    {
      title: 'PRODUCCIÓN DE PAUTAS',
      text: 'Desarrollamos pautas claras para el contenido y la interacción en redes sociales, alineadas con tu marca.',
      icon: '/servicios/gestion/icon2.svg',
    },
    {
      title: 'DISEÑO UX Y UI',
      text: 'Diseñamos experiencias digitales centradas en el usuario, combinando estrategias de UX  con interfaces visualmente atractivas y funcionales (UI).',
      icon: '/servicios/gestion/icon4.svg',
    },
  ];

  return (
    <>
      <ModalScroll
        text="GESTIÓN DE REDES SOCIALES"
        fondo="/servicios/gestion/modal-scroll/fondo.webp"
        title="SOLO POR HOY ACCEDE A UNA ¡ASESORÍA GRATIS!"
        serviceName="2"
      />

      <ModalButton
        title="¡ELEVA TUS CAMPAÑAS A OTRO NIVEL!"
        fondo="/servicios/gestion/modal-button/imagen.webp"
        text="GESTIÓN DE REDES SOCIALES"
        serviceName="2"
      />

      <Main
        title="GESTIÓN DE REDES SOCIALES"
        subtitle="¡Gestionamos tu éxito en redes sociales!"
        text="Te ayudamos a construir una voz única para tu marca, interactúa de manera auténtica con tu audiencia y transforma tus seguidores en clientes fieles."
        image="/servicios/gestion/img-main.png"
      />

      <Description
        title="Gestión de Redes Sociales"
        text="La gestión de redes sociales es el proceso de administrar y optimizar la presencia de una marca en plataformas como Facebook, Instagram, Twitter, etc. Ayuda a tu marca a crear una voz consistente, interactuar con tu audiencia, aumentar el compromiso y la visibilidad, así como impulsar el tráﬁco y las conversiones hacia tu negocio."
      />

      <Servicios servicios={servicios} />

      <Contactanos
        text="Deja que tus redes estén en otro nivel"
        iconLeft="/servicios/gestion/icon-left.svg"
        iconRight="/servicios/gestion/icon-right.svg"
      />
    </>
  );
}
