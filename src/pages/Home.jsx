// Home.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Popular from '../components/Popular';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';
import Landing from '../components/Landing';
import Planning from '../components/Planning';
import WhyWe from '../components/WhyWe';
import Construct from '../components/Construct'; // новый компонент

import '../styles/Home.css'; // файл стилей для страницы

const Home = () => {
    return (
        <div>
            <Navbar />

            {/* Секция Лэндинга */}
            <section id="landing" className="landing-section">
                <Landing />
            </section>

            {/* Секция Конструктора */}
            <section id="construct" className="construct-section">
                <Construct />
            </section>

            {/* Секция Плана */}
            <section id="planning" className="planning-section">
                <Planning />
            </section>

            {/* Секция Популярного */}
            <section id="popular" className="popular-section">
                <Popular />
            </section>

            {/* Секция О нас */}
            <section id="about-us" className="why-we-section">
                <WhyWe />
            </section>

            {/* Секция Галереи */}
            <section id="gallery" className="gallery-section">
                <Gallery />
            </section>

            <Footer />
        </div>
    );
};

export default Home;
