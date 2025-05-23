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
      title: 'DESARROLLO DE BRIEF',
      text: 'El brief nos permite entender tu empresa para crear y definir tu marca.',
      icon: '/servicios/branding/icon1.svg',
      ruta: '/servicios/desarrollo-briefs/'
    },
    {
      title: 'IDENTIDAD VISUAL CORPORATIVA',
      text: 'Creamos identidades visuales únicas que reflejan tu esencia que destacan en el mercado.',
      icon: '/servicios/branding/icon2.svg',
      ruta: '/servicios/identidad-visual/'
    },
    {
      title: 'NAMING, LOGO Y SLOGAN',
      text: 'Creamos elementos clave que representen tu marca y conecten con tu audencia.',
      icon: '/servicios/branding/icon3.svg',
    },
    {
      title: 'MANUAL DE MARCA',
      text: 'Definimos las reglas que guiarán todas las estrategias para tu marca.',
      icon: '/servicios/branding/icon4.svg',
    },
  ];

  return (
    <>
      <ModalScroll
        text="BRANDING Y DISEÑO"
        fondo="/servicios/branding/modal-scroll/fondo.webp"
        title="TU PRIMERA CONSULTA ¡ES GRATIS!"
        serviceName="4"
      />

      <ModalButton
        title="¡DISEÑA TU CAMINO HACIA EL ÉXITO!"
        fondo="/servicios/branding/modal-button/imagen.webp"
        text="BRANDING Y DISEÑO"
        serviceName="4"
      />

      <Main
        title="BRANDING Y DISEÑO"
        subtitle="La Voz y la Cara de tu Marca"
        text="Creamos marcas que hablan, emocionan y conectan. Desde una identidad visual memorable hasta mensajes que resuenan profundamente, hacemos que tu empresa sea tan única como inolvidable."
        image="/servicios/branding/img-main.png"
      />

      <Description
        title="Branding y Diseño"
        text="Juntos, crean una experiencia coherente y memorable para los clientes, construyendo una conexión emocional y diferenciando la marca en el mercado. Mientras que el branding establece la identidad, valores y personalidad de la marca, el diseño se encarga de transmitir estos elementos de manera visual a través de elementos como el logo, los colores, la tipografía y el estilo gráﬁco."
      />

      <Servicios servicios={servicios} />

      <Contactanos
        text="Conecta de manera creativa e innovadora con tu audiencia"
        iconLeft="/servicios/desarrollo/icon-left.svg"
        iconRight="/servicios/desarrollo/icon-right.svg"
      />
    </>
  );
}
