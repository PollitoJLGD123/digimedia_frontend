
import Main from '../components/Main';
import ModalScroll from '../components/ModalScroll';
import ModalButton from '../components/ModalButton';
import './globals.css';

export default function UXUI() {

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
    <div className="relative min-h-screen flex flex-col items-center bg-gray-100 overflow-x-hidden">
      
      {/* Imagen de fondo con mejor responsividad */}
      <div className="absolute inset-0 w-full h-full opacity-30 md:opacity-40 lg:opacity-50"
  style={{ 
    backgroundImage: "url('/servicios/DiseñoUI/Digimediaui.jpg')",
    backgroundSize: "cover", // La imagen se estira horizontalmente sin deformarse
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "100%", // Se expande a todo el ancho disponible
    height: "100%", // Asegura que ocupe el espacio del contenedor sin salir del límite
  }}>
      </div>

      <div className="relative z-10 w-full max-w-screen-lg px-4">
        <ModalScroll
          text="¡MEJORA TU EXPERIENCIA DIGITAL!"
          fondo="/servicios/desarrollo/modal-scroll/fondo.webp"
          title="DISEÑOS UX Y UI ATRACTIVOS"
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
    title="DISEÑOS UX Y UI"
    subtitle="Mejora la experiencia de tus usuarios"
    image="/servicios/uxui/img-main.png"
    className="custom-uxui py-10 md:py-20 text-center md:-ml-44"
  />
</div>

<div className="relative w-full h-full">
  {/* Texto flotante con nueva clase */}
  <div className="floating-text">
    
    <p className="font-montserrat text-black text-lg md:text-xl font-extrabold uppercase tracking-wide">
      Ofrecemos diseño UX para usabilidad y satisfacción, y UI para una interfaz atractiva.
      Juntos, creamos productos digitales intuitivos, agradables y efectivos.
    </p>
    
  </div>
</div>


        {/* Sección de características con Grid */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 px-4">
  {/* Primer bloque */}
  <div className="flex flex-col items-center md:items-start md:translate-x-[-70px] md:translate-y-[30px]">
    <p className="font-montserrat text-black text-lg md:text-xl font-extrabold uppercase tracking-wide"
    style={{
      fontWeight: "bold",
      color: "#6a0dad", // Morado vibrante
      textShadow: "3px 3px 10px rgba(106, 13, 173, 0.8)",
    }}
    
    >USABILIDAD Y SATISFACCIÓN</p>
    <img src="/servicios/DiseñoUI/servicio12.jpg" alt="Usabilidad y satisfacción" className="w-60 h-auto mt-4" />
  </div>

  {/* Segundo bloque */}
  <div className="flex flex-col items-center md:items-center md:translate-x-[10px] md:translate-y-[30px]">
    <p className="font-montserrat text-black text-lg md:text-xl font-extrabold uppercase tracking-wide"
    style={{
      fontWeight: "bold",
      color: "#6a0dad", // Morado vibrante
      textShadow: "3px 3px 10px rgba(106, 13, 173, 0.8)",
    }}
    >CREATIVIDAD</p>
    <img src="/servicios/DiseñoUI/servicios13.jpg" alt="Creatividad" className="w-60 h-auto mt-4" />
  </div>

  {/* Tercer bloque */}
  <div className="flex flex-col items-center md:items-end md:translate-x-[70px] md:translate-y-[30px]">
    <p className="font-montserrat text-black text-lg md:text-xl font-extrabold uppercase tracking-wide"
    style={{
      fontWeight: "bold",
      color: "#6a0dad", // Morado vibrante
      textShadow: "3px 3px 10px rgba(106, 13, 173, 0.8)",
    }}
    >INTERFAZ VISUAL</p>
    <img src="/servicios/DiseñoUI/servicio14.jpg" alt="Interfaz visual" className="w-60 h-auto mt-4" />
  </div>
</div>

      </div>
    </div>
  );
}