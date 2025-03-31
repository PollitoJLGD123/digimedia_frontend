"use client";

const PageContent = () => {
  return (
    <div className="w-[30rem] h-[30rem] md:w-[50rem] md:h-[50rem] bg-blue-600 relative overflow-hidden">
      <div
        className="bg-red-500 absolute inset-0 scale-[.55] md:scale-[.95] origin-top"
      >
        <div
          className="w-[40vh] h-[40vh] mx-auto relative flex items-center justify-center text-center px-6 sm:px-12 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(http/blog/imagen-estatico`,
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>

          <div className="relative z-10 max-w-2xl text-white">
            <h1 className="text-3xl md:text-2xl font-extrabold mb-4 neon-textov4">
              Titulo Header
            </h1>

            <h1 className="text-xl md:text-lg font-bold mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus,
              mollitia.
            </h1>

            <p className="text-sm text-gray-300 font-light">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa id
              quis aperiam fugit, ipsum veniam ad eligendi enim tempora
              aspernatur!
            </p>

            <div className="w-20 h-1 bg-white mt-6 mx-auto"></div>
          </div>
        </div>

        {/* Container Body - Footer */}
        <div className="w-[40vh] h-[60vh] mx-auto px-4 py-12 relative bg-gradient-to-r text-black">
          {/* Body */}
          {/* <Body1 id_blog_body={data.id_blog_body} fecha={data.fecha} /> */}
          <div className="bg-red-500">Body Prueba 1</div>

          {/* Footer */}
          <div className="mt-12 max-w-[1000px] mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg shadow-[0px_8px_20px_rgba(0,0,0,0.3)] overflow-hidden">
            <div className="relative">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500"></div>

              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-yellow-400/20 rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-500/20 rounded-tr-lg"></div>

              <div className="p-6 md:p-8">
                <h3 className="text-lg md:text-xl text-center font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 relative">
                  Titulo Footer
                  <span className="block h-0.5 w-16 bg-gradient-to-r from-yellow-400/30 via-yellow-400 to-yellow-400/30 mx-auto mt-2"></span>
                </h3>

                <p className="text-gray-100 text-sm leading-relaxed max-w-3xl mx-auto mb-6 text-center">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
                  corrupti officiis nemo culpa esse hic est dolores maiores
                  praesentium ut?
                </p>

                <div className="flex flex-wrap justify-center gap-3">
                  {/* 1 */}
                  <div className="w-20 h-20 relative flex flex-wrap justify-center group rounded-lg overflow-hidden bg-white">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 to-blue-500/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-blue-500 rounded-lg opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300"></div>

                    <img
                      src={"/blog/blog-2-estatico.jpg"}
                      alt={`Imagen1-estatico`}
                      className="w-full h-full object-cover rounded-lg border border-white/10 group-hover:border-sky-400/50 transition-all duration-300 shadow-md absolute z-10"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg z-20 pointer-events-none"></div>
                  </div>
                  {/* 2 */}
                  <div className="w-20 h-20 relative flex flex-wrap justify-center group rounded-lg overflow-hidden bg-white">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 to-blue-500/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-blue-500 rounded-lg opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300"></div>

                    <img
                      src={"/blog/blog-2-estatico.jpg"}
                      alt={`Imagen1-estatico`}
                      className="w-full h-full object-cover rounded-lg border border-white/10 group-hover:border-sky-400/50 transition-all duration-300 shadow-md absolute z-10"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg z-20 pointer-events-none"></div>
                  </div>
                  {/* 3 */}
                  <div className="w-20 h-20 relative flex flex-wrap justify-center group rounded-lg overflow-hidden bg-white">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 to-blue-500/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-blue-500 rounded-lg opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300"></div>

                    <img
                      src={"/blog/blog-2-estatico.jpg"}
                      alt={`Imagen1-estatico`}
                      className="w-full h-full object-cover rounded-lg border border-white/10 group-hover:border-sky-400/50 transition-all duration-300 shadow-md absolute z-10"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg z-20 pointer-events-none"></div>
                  </div>
                </div>

                <div className="flex justify-center mt-6">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-sky-400 to-transparent rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageContent;
