// Home.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Popular from '../components/Popular';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';
import Landing from '../components/Landing';
import Planning from '../components/Planning';
import WhyWe from '../components/WhyWe';
import Construct from '../components/Construct'; 

import '../styles/Home.css'; 

const Home = () => {
    return (
        <div>
            <Navbar />

            <section id="landing" className="landing-section">
                <Landing />
                <div id='construct'>
                    <Construct />
                </div>
            </section>
            
            <section id="planning" className="planning-section">
                <Planning />
            </section>

            <section id="popular" className="popular-section">
                <Popular />
            </section>

            <section id="about-us" className="why-we-section">
                <WhyWe />
            </section>
            
            <section id="gallery" className="gallery-section">
                <Gallery />
            </section>

            <Footer />
        </div>
    );
};

export default Home;
