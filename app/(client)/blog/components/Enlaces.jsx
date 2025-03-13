"use client"
import { useEffect, useState } from "react"



export default function Enlaces() {

    const data = [
        {
            image: "/blog-1.jpg",
            title: "¿Listo para conquistar el mercado digital?",
            category: "DESARROLLO WEB",
            description: "Desbloquea el potencial oculto, descubre cómo una página bien diseñada puede atraer más clientes e impulsar tu crecimiento",
            url: "https://943060409.blogspot.com/2024/07/por-que-tu-negocio-necesita-una-pagina.html"
        },
        {
            image: "/blog-2.jpg",
            title: "Beneficio de las redes sociales para nuevos emprendedores",
            category: "GESTIÓN DE LAS REDES SOCIALES",
            description: "Impulsa tu marca con nuestra gestión profesional de redes sociales. Conecta, interactúa y destaca en el mundo digital. ¡Descubre cómo podemos potenciar tu presencia hoy mismo!",
            url: "https://943060409.blogspot.com/2024/07/gestion-de-redes-sociales.html"
        },
        {
            image: "/blog-3.jpg",
            title: '“El Arte del Branding: Cómo construir una marca que resuene”',
            category: "BRANDING Y DISEÑO",
            description: "Atrévete a explorar el potencial ilimitado que tiene una estrategia de branding bien ejecutada y conquista el corazón y la mente de tus clientes.",
            url: "https://943060409.blogspot.com/2024/07/descubre-el-poder-del-branding-para.html"
        },
        {
            image: "/blog-4.jpg",
            title: "Las herramientas esenciales para crear una página web profesional",
            category: "DESARROLLO WEB",
            description: "Descubre las mejores herramientas para diseñar una página web que destaque en el mundo digital actual. Desde plataformas intuitivas hasta programas avanzados para profesionales, cada herramienta cuenta. ¡No te quedes atrás!",
            url: "https://943060409.blogspot.com/2024/07/los-mejores-programas-para-diseno-de.html"
        },
        {
            image: "/blog-5.jpg",
            title: "Transforma tu Marca: El Poder del Storytelling para Conectar con tu Audiencia",
            category: "GESTIÓN DE LAS REDES SOCIALES",
            description: "¿Sabías que una buena historia puede hacer más por tu marca que cualquier campaña publicitaria? El storytelling no solo captura la atención de tu audiencia, sino que también crea conexiones emocionales profundas y duraderas.",
            url: "https://943060409.blogspot.com/2024/07/como-utilizar-el-storytelling-para.html"
        },
        {
            image: "/blog-6.jpg",
            title: "¿Cómo crear Contenido Atractivo para Redes Sociales?",
            category: "GESTIÓN DE LAS REDES SOCIALES",
            description: "¡Destaca con contenido que atrapa! En un mundo saturado de información, captar la atención de tu audiencia es clave. Fortalece la identidad de tu marca, construye una comunidad leal y haz que tu página destaque. ",
            url: "https://943060409.blogspot.com/2024/07/como-estructurar-y-definir-tu.html"
        },
        {
            image: "/blog-7.jpg",
            title: "Herramientas de diseñador",
            category: "BRANDING Y DISEÑO",
            description: "El mundo del diseño está en constante evolución, y mantenerse al día con las últimas herramientas puede marcar una gran diferencia en tus proyectos.",
            url: "https://943060409.blogspot.com/2024/07/las-mejores-herramientas-de-diseno-que.html"
        },
        {
            image: "/blog-8.jpg",
            title: "Marketing de Influencers",
            category: "DISEÑO Y DESARROLLO WEB",
            description: "El marketing de influencers consiste en asociarse con personas influyentes para promover productos o servicios, utilizando su credibilidad y amplio alcance para conectar con audiencias específicas y potenciar la visibilidad y autenticidad de la marca.",
            url: "https://943060409.blogspot.com/2024/07/impulsa-tu-marca-con-marketing-de.html"
        },
        {
            image: "/blog-9.jpg",
            title: "¿Cómo los Influencers pueden amplificar tu mensaje de marca?",
            category: "GESTIÓN DE LAS REDES SOCIALES",
            description: "Haz que tu mensaje resuene más allá de los límites tradicionales. ¡Deja que los influencers te ayuden a amplificar tu voz y a conquistar nuevas audiencias! ",
            url: "https://943060409.blogspot.com/2024/08/potencia-tu-marca-con-el-impacto-de-los.html"
        },
        {
            image: "/blog-10.jpg",
            title: "¿Cómo Diseñar un Logotipo Impactante?",
            category: "BRANDING Y DISEÑO",
            description: "Un logotipo bien diseñado es crucial para captar la atención y transmitir la esencia de tu marca en un solo vistazo. Representa la identidad y valores de tu negocio, diferenciándote en un mercado competitivo.",
            url: "https://943060409.blogspot.com/2024/08/la-esencia-de-un-logotipo-impactante-tu.html"
        },
        {
            image: "/blog-1.jpg",
            title: "¿Tu página web está fallando? ¡Detecta y soluciona errores críticos ahora!",
            category: "DISEÑO Y DESARROLLO WEB",
            description: "Una página web con errores críticos no solo frustra a tus visitantes, sino que también perjudica tu reputación online. Descubre cómo identificar y resolver estos problemas para garantizar una experiencia de usuario óptima y mejorar tu posicionamiento en los motores de búsqueda.",
            url: "https://943060409.blogspot.com/2024/08/tu-pagina-web-esta-fallando-detecta-y.html"
        },
        {
            image: "/blog-2.jpg",
            title: "Marketing de Influencers",
            category: "MARKETING Y GESTIÓN DIGITAL",
            description: "Una estrategia SEO optimiza contenido y estructura web, utilizando palabras clave y enlaces para mejorar la visibilidad y atraer tráfico orgánico.",
            url: "https://943060409.blogspot.com/2024/08/como-optimizar-tu-sitio-web-tecnicas.html"
        },
        {
            image: "/blog-3.jpg",
            title: "¿Tu marca necesita un cambio? Señales de que es Tiempo de un Rebranding",
            category: "BRANDING Y DISEÑO",
            description: "¡Una manera refrescante de adaptarte a un nuevo público! Pero, ¿cómo saber cuándo es el momento?, aquí te lo explicamos.",
            url: "https://943060409.blogspot.com/2024/08/vuelve-ganar-el-interes-de-tu-publico.html"
        },
    ]
    let [page, setPage] = useState(1)
    let [datashow, setData] = useState([])
    let [searchTerm, setSearchTerm] = useState("");
    let [dataLt, setDataLt] = useState(data.length)
    let [noResults, setNoResults] = useState(false); // Estado para manejar si no hay resultados


    useEffect(() => {
        const filteredData = searchTerm !== "" ? articlesView(page, data.filter(
            (article) =>
                article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                article.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                article.description.toLowerCase().includes(searchTerm.toLowerCase())
        )) : articlesView(page);

        setNoResults(filteredData.length === 0); // Si no hay resultados, cambiar estado a true
        setData(filteredData);

    }, [searchTerm, page]);

    useEffect(() => {
        setPage(1);
    }, [searchTerm]);

    function buttonNext() {
        if (page * 4 < dataLt) {
            setPage(page + 1);
        }
    }

    function buttonBack() {
        if (page > 1) {
            setPage(page - 1);
        }
    }


    function articlesView(currentPage, dataOld = data) {
        setDataLt(dataOld.length)

        const start = (currentPage - 1) * 4;
        const end = start + 4;
        return dataOld.slice(start, end);
    }

    return (
        <>

            <section className=" bg-[#eeeeee] p-8">

                <div className="flex flex-col-reverse lg:flex-row gap-6 justify-between">
                    <div className="flex-[0.7] grid gap-6 grid-cols-1 md:grid-cols-2 ">

                    {noResults ? (
                            <div className="col-span-2 flex justify-center items-center text-center text-lg text-red-500 h-full">No se han encontrado resultados</div>
                        ) : (

                        datashow.map(({ image, title, category, description, url }, index) => (
                            <article key={index} className="rounded-2xl shadow-xl bg-white overflow-hidden flex flex-col">

                                <img src={`/blog/${image}`} className="w-full h-[150px] object-cover" />

                                <div className="lg:h-20 px-4 my-4 flex flex-col justify-center items-center">
                                    <h3 className="text-lg  text-center">{title}</h3>
                                </div>

                                <p className="text-sm  ml-4 bg-[rgba(123,34,179)] rounded-xl text-white py-2 font-bold px-4 w-max">{category}</p>

                                <div className="flex flex-col mt-4 justify-between gap-6 flex-1">
                                    <p className="px-4">{description}</p>

                                    <a href={url} target="_blank" className="text-white font-bold py-3 text-center bg-[#5c1787]">
                                        Leer más
                                    </a>
                                </div>
                            </article>
                        ))
                        )}
                        

                    </div>

                    <aside className="flex-[0.3] w-full flex flex-col gap-5 rounded-xl shadow-lg bg-[#810cfffe] h-[280px] p-6 mx-auto ">

                        <input
                            type="text" placeholder="Buscar ...."
                            className="w-full px-4 py-3 outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        <a className="text-white hover:font-medium transition-all duration-300" href="https://943060409.blogspot.com/search/label/Marketing%20y%20gesti%C3%B3n%20digital" target="_blank">Marketing y Gestión Digital</a>
                        <a className="text-white hover:font-medium transition-all duration-300" href="https://943060409.blogspot.com/search/label/Dise%C3%B1o%20y%20Desarrollo%20web" target="_blank">Diseño y Desarrollo Web</a>
                        <a className="text-white hover:font-medium transition-all duration-300" href="https://943060409.blogspot.com/search/label/Gestion%20de%20redes%20sociales" target="_blank">Gestión de Redes Sociales</a>
                        <a className="text-white hover:font-medium transition-all duration-300" href="https://943060409.blogspot.com/search/label/Branding%20y%20dise%C3%B1o" target="_blank">Branding y Diseño</a>

                    </aside>
                </div>

                <div className="flex gap-8 justify-center items-center my-6 mt-12">
                    <button className="p-2 px-6 bg-[rgba(123,34,179)] text-white font-bold rounded-xl hover:bg-[#3a1750] transition-all duration-300" onClick={buttonBack}>&lt;&lt; Regresar</button>
                    <button className="p-2 px-6 bg-[rgba(123,34,179)] text-white font-bold rounded-xl hover:bg-[#3a1750] transition-all duration-300" onClick={buttonNext}>Siquiente &gt;&gt;</button>
                </div>

            </section>



        </>
    )
}

