import Servicios from '../components/Servicios';
import Contactanos from '../components/Contactanos';
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
      

  
    <div className="flex flex-col-reverse items-center justify-between max-w-6xl m-auto md:flex-row p-12 md:py-4 ">
      <div className="text-center md:text-left max-w-xl">
        <h1 className="text-[#7b22b3] font-bold text-4xl my-4 font-title">
        Desarrollo de Brief 
        </h1>
      
        <p className="text-justify">Ofrece servicios de desarrollo de brief para establecer los objetivos, las directrices y los detalles esenciales que guíen el
              trabajo de un equipo o agencia. El desarrollo de brief se enfoca principalmente en proporcionar una guía clara y concisa que
              sirva como base para la ejecución de un proyecto, campaña o estrategia. Su objetivo es alinear a todas las partes involucradas
              (clientes, equipos creativos, agencias, etc.) sobre los aspectos fundamentales que guiarán la toma de decisiones y el trabajo a
              realizar. Un brief bien desarrollado es el primer paso para convertir una visión en <span className="text-black font-bold">éxito</span> .</p>
      </div>
      <img className="max-w-[40%]" src="/servicios/brief/brief1.jpg" alt="imagen" />
    </div>
    <div className="flex justify-center gap-10 flex-wrap p-8 ">
      {[
        { src: "/servicios/brief/brief5.jpg", text: "Claridad y Precisión" },
        { src: "/servicios/brief/brief2.webp", text: "Enfoque Estratégico" },
        { src: "/servicios/brief/brief3.jpg", text: "Creatividad alineada con la marca" },
        { src: "/servicios/brief/brief4.webp", text: "Medición de resultados" },
      ].map((item, index) => (
        <div key={index} className=" bg-[#973cd1] p-1.5 rounded-lg w-60 text-center transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl flex flex-col items-center">
          <img src={item.src} alt={item.text} className="w-full h-56 object-cover rounded-lg" />
          <p className="mt-2 text-white font-bold text-center w-full px-2">{item.text}</p>
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
