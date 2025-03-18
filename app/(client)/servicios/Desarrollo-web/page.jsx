import Contactanos from '../components/Contactanos';
import Description from '../components/Description';
import Main from '../components/Main';
import ModalScroll from '../components/ModalScroll';
import ModalButton from '../components/ModalButton';
import Servicios from '../components/Servicios';
import './globales.css';

export default function Web() {

  const servicios = [
    {
      title: 'DESARROLLO DE BRIEF',
      text: 'El briefing nos permite entender tu empresa para crear y definir tu marca.',
      icon: '/servicios/branding/icon1.svg',
    },
    {
      title: 'IDENTIDAD VISUAL CORPORATIVA',
      text: 'Creemos identidades visuales únicas que reflejan tu esencia y destacan en el mercado.',
      icon: '/servicios/branding/icon2.svg',
    },
    {
      title: 'NAMING, LOGO Y SLOGAN',
      text: 'Creamos elementos clave que representen tu marca y conecten con tu audiencia.',
      icon: '/servicios/branding/icon3.svg',
    },
    {
      title: 'MANUAL DE MARCA',
      text: 'Definimos las reglas que guiarán todas las estrategias de tu marca.',
      icon: '/servicios/branding/icon4.svg',
    },
  ];
  
  return (
    <div className="relative min-h-screen flex flex-col items-center bg-gray-100">
      
      {/* Imagen de fondo con mejor responsividad */}
      <div className="absolute inset-0 w-full h-full opacity-30 md:opacity-40 lg:opacity-50"
  style={{ 
    backgroundImage: "url('/servicios/DiseñoUI/Digimediaui.jpg')",
    backgroundSize: "cover", // La imagen se estira horizontalmente sin deformarse
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "100%", // Se expande a todo el ancho disponible
    height: "42%", // Asegura que ocupe el espacio del contenedor sin salir del límite
  }}>
      </div>

      <div className="relative z-10 w-full max-w-screen-lg px-4">
        <ModalScroll
          text="¡MEJORA TU EXPERIENCIA DIGITAL!"
          fondo="/servicios/desarrollo/modal-scroll/fondo.webp"
          title="Desarollo Web"
          serviceName="2"
        />

        <ModalButton
          title="Haz que tu sitio sea intuitivo y visualmente atractivo"
          fondo="/servicios/uxui/modal-button/imagen.webp"
          text="Solicita una asesoría gratuita"
          serviceName="2"
        />

<div className="flex justify-center md:justify-start w-full">
  <Main
    title="Desarrollo Web"
    subtitle="Vive la Experiencia en la Web"
    image="/servicios/uxui/img-main.png"
    className="custom-web2 py-10 md:py-20 text-center md:-ml-44"
  />
</div>

<div className="relative w-full h-full">
  {/* Texto flotante 2 */}
  <div className="floating-text2">
    <p className="font-montserrat text-black text-lg md:text-xl font-extrabold uppercase tracking-wide">
      Aquí se enfocan en el diseño y posicionamiento web, desarrollo de tiendas virtuales, desarrollo, optimización
      y Cloud Hosting para páginas web en Perú.
    </p>
  </div>

  {/* Lista de características en viñetas (Texto flotante 3) */}
  <div className="floating-text3">
    <ul className="features-list font-montserrat text-black text-lg md:text-xl font-extrabold uppercase tracking-wide">
      <li>Diseño responsivo</li>
      <li>Paquete de diseño web</li>
      <li>Diseño web WordPress</li>
    </ul>
  </div>
</div>

        {/* Nueva sección específica para esta página, colocada más abajo */}
        <div className="relative z-10 mt-[860px] md:mt-[300px] lg:mt-[550px] px-4">
        <Description
          title="Desarollo Web"
          text="Impulsamos tu presencia digital con soluciones de desarrollo web innovadoras, funcionales y optimizadas para el éxito."
        />

<Servicios servicios={servicios} />

        <Contactanos
          text="Optimiza la experiencia digital de tus clientes con nuestros servicios UX/UI"
          iconLeft="/servicios/uxui/icon-left.svg"
          iconRight="/servicios/uxui/icon-right.svg"
          />
        </div>
      </div>
    </div>
  );
}
