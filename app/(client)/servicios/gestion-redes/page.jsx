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
      text: 'Planificamos tu estrategia en redes para mantenerte activo, relevante y siempre presente ante tu audiencia',
      icon: '/servicios/gestion/icon1.svg',
      ruta: '/servicios/planificacion-cronograma/'
    },
    {
      title: 'DISEÑO DE PAUTAS',
      text: 'Traducimos tu esencia de marca en pautas claras, creativas y listas para cautivar en redes',
      icon: '/servicios/gestion/icon3.svg',
      ruta: '/servicios/diseno-pautas/'
    },
    {
      title: 'PRODUCCIÓN DE PAUTAS',
      text: 'Creamos PAUTAS estratégicAS que habla el idioma de tu audiencia y fortalece tu marca',
      icon: '/servicios/gestion/icon2.svg',
    },
    {
      title: 'DISEÑO UX Y UI',
      text: 'Combinamos  (UI) y  (UX) para crear plataformas intuitivas, fáciles de usar y optimizadas para generar conversiones',
      icon: '/servicios/gestion/icon4.svg',
      ruta: '/servicios/ui/'
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
