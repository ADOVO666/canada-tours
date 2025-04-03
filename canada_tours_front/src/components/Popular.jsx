import React, { useState, useEffect } from 'react';
import '../styles/Popular.css';
import TourCard from '../components/TourCard';
import '../styles/TourCard.css';
import { useNavigate } from 'react-router-dom';
import { fetchTours } from '../api'; 

const Popular = () => {
    const [activeTab, setActiveTab] = useState("Туры");
    const [showAll, setShowAll] = useState(false);
    const [tours, setTours] = useState([]);
    const [excursions, setExcursions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadData = async () => {
            try {
                const allTours = await fetchTours();
                setTours(allTours.filter(tour => tour.type === 1));
                setExcursions(allTours.filter(excursion => excursion.type === 2));
            } catch (error) {
                console.error("Ошибка загрузки данных:", error);
            }
        };

        loadData();
    }, []);

    const visibleTours = showAll ? tours : tours.slice(0, 8);
    const visibleExcursions = showAll ? excursions : excursions.slice(0, 8);

    const handleLearnMore = (id, type) => {
        navigate(`/${type}/${id}`);
    };

    //console.log(visibleTours);
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
                    <TourCard
                        key={tour.id}
                        id={tour.id}
                        title={tour.title}
                        price={tour.price}
                        image={tour.image}
                        availableTickets={tour.max_tickets - tour.current_tickets}
                        type="tour"
                        onLearnMore={() => handleLearnMore(tour.id, "tour")}
                    />
                ))}

                {activeTab === "Экскурсии" && visibleExcursions.map(excursion => (
                    <TourCard
                        key={excursion.id}
                        id={excursion.id}
                        title={excursion.title}
                        price={excursion.price}
                        image={excursion.image}
                        availableTickets={excursion.max_tickets - excursion.current_tickets}
                        type="excursion"
                        onLearnMore={() => handleLearnMore(excursion.id, "excursion")}
                    />
                ))}
            </div>

            <button className="show-more-button" onClick={() => setShowAll(!showAll)}>
                {showAll ? "Скрыть" : "Показать больше"}
            </button>
        </section>
    );
};

export default Popular;
