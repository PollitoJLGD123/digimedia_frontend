export default function Description2({ title, text }) {
    return (
      <section className="bg-[#973cd1] text-white">
        <div className="max-w-6xl m-auto p-4 md:py-16">
          <h3 className="font-bold text-xl mb-2 font-title">{title}</h3>
          <p className="text-justify">{text}</p>
        </div>
      </section>
    );
  }
  