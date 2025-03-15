export default function Main({ title, subtitle, text, image, className = "" }) {
  return (
    <main className={`flex flex-col-reverse items-center justify-between max-w-6xl m-auto md:flex-row p-4 md:py-16 ${className}`}>
      <div className="text-center md:text-left max-w-xl">
        <h1 className="text-[#7b22b3] font-bold text-4xl my-4 font-title">
          {title}
        </h1>
        <h2 className="font-bold text-2xl my-2">{subtitle}</h2>
        <p>{text}</p>
      </div>
      <img className="max-w-[80%]" src={image} alt="" />
    </main>
  );
}
