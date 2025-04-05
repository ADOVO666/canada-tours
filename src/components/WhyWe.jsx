// WhyWe.jsx
import React from 'react';
import '../styles/WhyWe.css';
import whyweImage from "../images/whywe.png";

const WhyWe = () => {
    return (
        <section className="why-we">
            <h2>Зачем стоит обратиться к нам?</h2>
            <div className="why-we-content">
                <img src={whyweImage} alt="Why Us" className="why-we-image" />
                <div className="why-we-list">
                    <li>Личный гид, говорящий на русском языке!</li>
                    <li>Лучшая цена гарантирована!</li>
                    <li>Огромный выбор туров и экскурсий</li>
                </div>
            </div>
        </section>
    );
};

export default WhyWe;
