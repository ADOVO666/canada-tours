import React, { useState } from 'react';
import '../styles/Popular.css';
import TourCard from '../components/TourCard';
import ExcursionCard from '../components/ExcursionCard';
import T1IMG from "../images/tours/T1.png";
import T2IMG from "../images/tours/T2.png";
import T3IMG from "../images/tours/T3.png";
import T4IMG from "../images/tours/T4.png";
import T5IMG from "../images/tours/T5.png";
import T6IMG from "../images/tours/T6.png";
import T7IMG from "../images/tours/T7.png";
import T8IMG from "../images/tours/T8.png";
import E1IMG from "../images/excursions/E1.png";
import E2IMG from "../images/excursions/E2.png";
// Добавляем изображения экскурсий по аналогии

const Popular = () => {
    const [activeTab, setActiveTab] = useState("Туры");
    const [showAll, setShowAll] = useState(false);

    const tours = [
        { id: 1, title: "Страна 1", price: "$72.00 / день", image: T1IMG },
        { id: 2, title: "Страна 2", price: "$72.00 / день", image: T2IMG },
        { id: 3, title: "Страна 3", price: "$72.00 / день", image: T3IMG },
        { id: 4, title: "Страна 4", price: "$72.00 / день", image: T4IMG },
        { id: 5, title: "Страна 5", price: "$72.00 / день", image: T5IMG },
        { id: 6, title: "Страна 6", price: "$72.00 / день", image: T6IMG },
        { id: 7, title: "Страна 7", price: "$72.00 / день", image: T7IMG },
        { id: 8, title: "Страна 8", price: "$72.00 / день", image: T8IMG },
        { id: 9, title: "Страна 9", price: "$72.00 / день", image: T1IMG },
        { id: 10, title: "Страна 10", price: "$72.00 / день", image: T2IMG },
        { id: 11, title: "Страна 11", price: "$72.00 / день", image: T3IMG },
        { id: 12, title: "Страна 12", price: "$72.00 / день", image: T4IMG },
        { id: 13, title: "Страна 13", price: "$72.00 / день", image: T5IMG },
    ];

    const excursions = [
        { id: 1, title: "Экскурсия 1", price: "$50.00 / день", image: E1IMG },
        { id: 2, title: "Экскурсия 2", price: "$55.00 / день", image: E2IMG },
        // Добавляем ещё 12 экскурсий по аналогии
    ];

    const visibleTours = showAll ? tours : tours.slice(0, 8);
    const visibleExcursions = showAll ? excursions : excursions.slice(0, 8);

    return (
        <section className="popular-section">
            <h2>Специальное предложение!</h2>
            <div className="tabs">
                <button 
                    className={activeTab === "Туры" ? "active" : ""} 
                    onClick={() => setActiveTab("Туры")}
                >
                    Туры
                </button>
                <button 
                    className={activeTab === "Экскурсии" ? "active" : ""} 
                    onClick={() => setActiveTab("Экскурсии")}
                >
                    Экскурсии
                </button>
            </div>

            <div className="tours-grid">
                {activeTab === "Туры" && visibleTours.map(tour => (
                    <TourCard key={tour.id} title={tour.title} price={tour.price} image={tour.image} />
                ))}

                {activeTab === "Экскурсии" && visibleExcursions.map(excursion => (
                    <ExcursionCard key={excursion.id} title={excursion.title} price={excursion.price} image={excursion.image} />
                ))}
            </div>

            <button className="show-more-button" onClick={() => setShowAll(!showAll)}>
                {showAll ? "Скрыть" : "Показать больше"}
            </button>
        </section>
    );
};

export default Popular;
