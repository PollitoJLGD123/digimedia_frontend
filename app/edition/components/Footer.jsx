import Link from 'next/link';
import './Footer.css';

export default function Footer() {
  return (
    <>
      <footer>
        <div className="mainFooter">
          <div className="footerContenido">


            <div className="imgFooter my-4">
              <img
                src="/headerFooter/logoFooter.webp"
                alt="Digimedia"
                width="250px"
                height="120px"
                loading="lazy"
              />
            </div>
  </div>
          <div className="barraFooter">
            <hr />
          </div>
          <div className="rucFooter text-white">
            <div className="ruc">
              <p>RUC: 20605116559</p>
            </div>
            <div className="derechosFooter">
              <p>@digimedia.com. Derechos reservados</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> origin/master
