import Header from './components/Header';
import Footer from './components/Footer';
import "../globals.css";

export default function EditionLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="edition-container">
                {children}  {/* Aquí se renderiza el contenido de la página de edición */}
            </div>
            <Footer />
        </div>
    );
}