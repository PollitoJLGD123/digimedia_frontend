import Banner from './components/Home_Components/Banner';
import Servicios from './components/Home_Components/Servicios';
import Testimonios from './components/Home_Components/Testimonios';
import Clientes from './components/Home_Components/Clientes';

export default function Home() {
  return (
    <>
      <Banner />
      <Servicios />
      <Testimonios />
      <Clientes />
    </>
  );
}
