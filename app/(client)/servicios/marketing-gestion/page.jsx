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
      title: 'ANÁLISIS Y BENCHMARKING',
      text: 'Evaluamos tu marca frente a la competencia para identificar oportunidades de mejora y crear estrategias más efectivas.',
      icon: '/servicios/marketing/icon1.svg',
    },
    {
      title: 'PLANIFICACIÓN ESTRATÉGICA',
      text: 'Aquí se diseñan estrategias personalizadas con objetivos claros, segmentación precisa y tácticas eficaces para alcanzar tus metas de negocio.',
      icon: '/servicios/marketing/icon2.svg',
    },
    {
      title: 'PUBLICIDAD DIGITAL',
      text: 'Desarrollamos campañas digitales de alto impacto para aumentar la visibilidad, captar audiencias y maximizar conversiones.',
      icon: '/servicios/marketing/icon3.svg',
    },
    {
      title: 'MONITOREO Y REPORTING',
      text: 'Implementamos un monitoreo continuo de tus campañas, recopilando y analizando métricas clave. Presentamos informes detallados que facilitan la toma de decisiones basadas en datos.',
      icon: '/servicios/marketing/icon4.svg',
    },
  ];

  return (
    <>
      <ModalScroll
        text="¡INCREMENTA TUS VENTAS!"
        fondo="/servicios/marketing/modal-scroll/fondo.webp"
        title="HAZLO Y CUMPLE TUS SUEÑOS ¡ASESORÍA GRATIS!"
        serviceName="3"
      />

      <ModalButton
        title="¡EXPLOTA EL CONTENIDO DE TUS REDES!"
        fondo="/servicios/marketing/modal-button/imagen.webp"
        text="¡Haz tu sitio web realidad, es GRATIS!"
        serviceName="3"
      />

      <Main
        title="MARKETING Y GESTIÓN DIGITAL"
        subtitle="¡Impulsa tu marca al éxito digital!"
        text="Creamos campañas que no solo se ven, sino que se sienten. Potenciamos tu presencia online con tácticas personalizadas, llevándote al siguiente nivel con resultados medibles y un impacto real. Tu éxito digital comienza aquí."
        image="/servicios/marketing/img-main.png"
      />

      <Description
        title="Marketing y Gestión Digital"
        text="El marketing y la gestión digital son tus aliados para potenciar el éxito de tu marca en el mundo digital. Te ayudarán a destacar en línea, alcanzar a una audiencia más amplia, captar clientes potenciales y fortalecer la relación con tus clientes. Todo esto se traduce en un impulso signiﬁcativo para aumentar las ventas y el crecimiento de tu negocio."
      />

      <Servicios servicios={servicios} />

      <Contactanos
        text="Aumenta tus ventas con marketing digital"
        iconLeft="/servicios/marketing/icon-left.svg"
        iconRight="/servicios/marketing/icon-right.svg"
      />
    </>
  );
}
