import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TourCardMedium from '../components/TourCardMedium'; 
import '../styles/SortedTours.css';

const SortedTours = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { filteredTours = [], searchType } = location.state || {};

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadItems = async () => {
            try {
                setLoading(true);
                const filtered = filteredTours.filter(item => 
                    searchType ? item.type === searchType : true
                );
                setItems(filtered);
            } catch (err) {
                setError("Ошибка загрузки данных");
            } finally {
                setLoading(false);
            }
        };
        loadItems();
    }, [filteredTours, searchType]);

    const handleLearnMore = (id) => {
        navigate(`/tour/${id}`);
    };

    const isTourSearch = searchType === 1;
    const isExcursionSearch = searchType === 2;
    const itemType = isTourSearch ? 'туры' : 'экскурсии';

    return (
        <div>
            <Navbar />
            <div className="sorted-tours-container">
                <h1>Возможные {itemType}</h1>

                {loading && <p>Загрузка...</p>}
                {error && <p className="error-message">{error}</p>}

                {!loading && !error && (
                    <>
                        {items.length > 0 ? (
                            items.map((item) => (
                                <TourCardMedium 
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    description={item.description}
                                    image={item.image} 
                                    onLearnMore={handleLearnMore}
                                    availableTickets={item.max_tickets-item.current_tickets}
                                />
                            ))
                        ) : (
                            <div className="no-tours-message">
                                <p>Подходящих {itemType} не найдено</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default SortedTours;