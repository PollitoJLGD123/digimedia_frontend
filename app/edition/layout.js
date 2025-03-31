import Header from './components/Header';
import Footer from './components/Footer';
import "../globals.css";

export default function EditionLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="edition-container">
                {children}
            </div>
            <Footer />
        </div>
    );
}