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
                    <p>· Личный гид, говорящий на русском языке!</p>
                    <p>· Лучшая цена гарантирована!</p>
                    <p>· Огромный выбор туров и экскурсий</p>
                </div>
            </div>
        </section>
    );
};

export default WhyWe;
