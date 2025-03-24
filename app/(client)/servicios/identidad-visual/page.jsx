
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
        Identidad Visual Corporativa 
        </h1>
      
        <p className="text-justify">Ofrece servicios de identidad visual corporativa que representan de manera coherente y única a una empresa o marca. Estos
        elementos son clave para construir una imagen sólida y memorable. La identidad visual corporativa se enfoca en crear una
        representación gráfica coherente y única de una marca o empresa, permitiendo transmitir su esencia, valores y personalidad a
        través de elementos visuales. Su objetivo es generar una representación gráfica distintiva que comunique los valores, la
        personalidad y el propósito de la marca, fomentando el reconocimiento y la confianza del público. Transforma la presencia de
        una empresa en algo inolvidable, capaz de <span className="text-black font-bold">conectar</span> y <span className="text-black font-bold">conquistar</span>  a su audiencia.</p>
      </div>
      <img className="max-w-[40%]" src="/servicios/visual/identidad1.jpg" alt="imagen" />
    </div>
    <div className="flex justify-center gap-10 flex-wrap p-8 ">
      {[
        { src: "/servicios/visual/identidad2.png", text: "Coherencia y Uniformidad" },
        { src: "/servicios/visual/identidad3.jpg", text: "Reconocimiento Instantáneo" },
        { src: "/servicios/visual/identidad4.jpg", text: "Conexión emocional" },
        { src: "/servicios/visual/identidad5.webp", text: "Diferenciación y Posicionamiento" },
      ].map((item, index) => (
        <div key={index} className=" bg-[#973cd1] p-1.5 rounded-lg w-60 text-center transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl flex flex-col items-center">
          <img src={item.src} alt={item.text} className="w-full h-56 object-cover rounded-lg" />
          <p className="mt-2 text-white font-bold text-center w-full px-2">{item.text}</p>
        </div>
      ))}
    </div>
      
    </>
  );
}
