import Header from './components/Header';
import Footer from './components/Footer';


export default function EditionLayout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />
      
      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-32 bg-purple-800 text-white p-4 space-y-4">
          <h2 className="text-lg">Estructura</h2>
          <div className="space-y-2">
            <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-center">Header</button>
            <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-center">Body</button>
            <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-center">Footer</button>
          </div>
          <button className="w-full py-2 mt-4 bg-black text-white hover:bg-gray-800 rounded-md">Guardar</button>
        </div>

        {/* Main Editing Area */}
        <div className="flex-1 p-8 bg-white">
          {children} {/* Aquí se renderiza el contenido de la página de edición */}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}