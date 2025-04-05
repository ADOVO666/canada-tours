import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TourCardMedium from '../components/TourCardMedium'; 
import '../styles/SortedTours.css';
import { fetchTours } from '../api'; 

const SortedTours = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { destination } = location.state || {};

    const [tours, setTours] = useState([]);
    const [excursions, setExcursions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadTours = async () => {
            try {
                setLoading(true);
                const allTours = await fetchTours(destination); 
                setTours(allTours.filter(tour => tour.type === 1));
                setExcursions(allTours.filter(excursion => excursion.type === 2));
            } catch (err) {
                setError("Ошибка загрузки данных");
            } finally {
                setLoading(false);
            }
        };
        loadTours();
    }, [destination]);

    const handleLearnMore = (id) => {
        navigate(`/tour/${id}`);
    };

    return (
        <div>
            <Navbar />
            <div className="sorted-tours-container">
                <h1>Возможные туры и экскурсии</h1>

                {loading && <p>Загрузка...</p>}
                {error && <p className="error-message">{error}</p>}

                {!loading && !error && (
                    <>
                        {tours.length > 0 ? (
                            tours.map((tour) => (
                                <TourCardMedium 
                                    key={tour.id}
                                    id={tour.id}
                                    title={tour.title}
                                    description={tour.description}
                                    image={tour.image} 
                                    onLearnMore={handleLearnMore}
                                    availableTickets={tour.max_tickets-tour.current_tickets}
                                />
                            ))
                        ) : (
                            <div className="no-tours-message">
                                <p>Подходящих туров не найдено</p>
                            </div>
                        )}

                        {excursions.length > 0 ? (
                            excursions.map((excursion) => (
                                <TourCardMedium
                                    key={excursion.id}
                                    id={excursion.id}
                                    title={excursion.title}
                                    description={excursion.description}
                                    image={excursion.image} 
                                    onLearnMore={handleLearnMore}
                                    availableTickets={excursion.max_tickets-excursion.current_tickets}
                                />
                            ))
                        ) : (
                            <div className="no-tours-message">
                                <p>Подходящих экскурсий не найдено</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default SortedTours;
