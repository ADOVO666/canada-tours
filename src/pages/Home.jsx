import React from 'react';
import Navbar from '../components/Navbar';
import TourCard from '../components/TourCard';
import ExcursionCard from '../components/ExcursionCard';
import Popular from '../components/Popular';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';
import Landing from '../components/Landing';
import Planning from '../components/Planning';
import WhyWe from '../components/WhyWe';
import Construct from '../components/Construct'; // добавим новый компонент

import '../styles/Home.css'; // создадим общий файл стилей для страницы

const Home = () => {
  const tours = []; // Массив туров
  const excursions = []; // Массив экскурсий
  const reviews = []; // Массив отзывов

  return (
    <div>
      <Navbar />
      
      <section id="landing" className="landing-section">
        <Landing />
      </section>

      <section id="construct" className="construct-section">
        <Construct /> {/* Компонент для выбора даты */}
      </section>

      <section id="planning" className="planning-section">
        <Planning />
      </section>

      <section id="popular" className="popular-section">
        <Popular />
      </section>


      <section id="WhyWe" className="WhyWe-section">
        <WhyWe />
      </section>


      <section id="Gallery" className="Gallery-section">
        <Gallery />
      </section>
      <Footer />
    </div>
  );
};

export default Home;
