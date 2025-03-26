// Planning.jsx
import React from 'react';
import '../styles/Planning.css';
import loc from "../images/ChooseLocation.png";
import pick from "../images/PickUpDate.png";
import book from "../images/Booking.png";
import line from "../images/line.png";

const Planning = () => {
    const steps = [
        { title: "Выберите локацию", img: loc },
        {img: line},
        { title: "Определитесь с датой", img: pick },
        {img: line},
        { title: "Забронируйте тур!", img: book },
    ];

    return (
        <section className="planning">
            <h2>Всё очень просто!</h2>
            <div className="planning-steps">
                {steps.map((step, index) => (
                    <div key={index} className="planning-step">
                        <img src={step.img} alt={step.title} className="planning-image" />
                        <p className="planning-title">{step.title}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Planning;
