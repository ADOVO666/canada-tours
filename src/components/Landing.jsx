// Landing.jsx
import React from 'react';
import '../styles/Landing.css';
import voc from "../images/voc.png";

function Landing() {
    return (
        <header className="header">
            <div className="header-content">
                <h1 className="project-name">CANADA TOURS</h1>
                <p className="description">Наша компания специализируется на организации уникальных туров по всем странам мира. Мы предлагаем увлекательные путешествия в самые живописные и экзотические уголки разных стран, учитывая индивидуальные предпочтения каждого клиента. Наши гиды — это настоящие эксперты, которые сделают ваш отдых не только комфортным, но и незабываемым. Откройте для себя множество новых мест с нами и получите яркие впечатления на всю жизнь!</p>
                <button className="cta-button">Попробовать тур!</button>
            </div>
            <img src={voc} alt="vocation" className="voc" />
        </header>
    );
};

export default Landing;
