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
    <>
      <ModalScroll
        text="¡DISEÑA TU CAMINO AL ÉXITO!"
        fondo="/servicios/branding/modal-scroll/fondo.webp"
        title="TU PRIMERA CONSULTA ¡ES GRATIS!"
        serviceName="4"
      />

      <ModalButton
        title="¡DISEÑA TU CAMINO HACIA EL ÉXITO!"
        fondo="/servicios/branding/modal-button/imagen.webp"
        text="¡Haz tu sitio web realidad, es GRATIS!"
        serviceName="4"
      />

      <Main
        title="Desarrollo de Brief "
        subtitle="La Voz y la Cara de tu Marca"
        text="Ofrece servicios de desarrollo de brief para establecer los objetivos, las directrices y los detalles esenciales que guíen el
              trabajo de un equipo o agencia. El desarrollo de brief se enfoca principalmente en proporcionar una guía clara y concisa que
              sirva como base para la ejecución de un proyecto, campaña o estrategia. Su objetivo es alinear a todas las partes involucradas
              (clientes, equipos creativos, agencias, etc.) sobre los aspectos fundamentales que guiarán la toma de decisiones y el trabajo a
              realizar. Un brief bien desarrollado es el primer paso para convertir una visión en éxito."
        image="/servicios/branding/img-main.png"
      />

      
      
      <div className="flex justify-center gap-20 flex-wrap p-10 ">
      {[
        { src: "/blog/fondo-mobiles.webp", text: "Claridad y Precisión" },
        { src: "/blog/fondo-mobiles.webp", text: "Enfoque Estratégico" },
        { src: "/blog/fondo-mobiles.webp", text: "Creatividad alineada con la marca" },
        { src: "/blog/fondo-mobiles.webp", text: "Medición de resultados" },
      ].map((item, index) => (
        <div key={index} className="bg-purple-700 p-3 rounded-lg w-48 text-center">
          <img src={item.src} alt={item.text} className="w-full rounded-lg" />
          <p className="mt-2 text-white font-bold">{item.text}</p>
        </div>
      ))}
    </div>
      <Servicios servicios={servicios} />

      <Contactanos
        text="Conecta de manera creativa e innovadora con tu audiencia"
        iconLeft="/servicios/branding/icon-left.png"
        iconRight="/servicios/branding/icon-right.png"
      />
    </>
  );
}
