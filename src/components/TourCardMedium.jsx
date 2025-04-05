// TourCardMedium.jsx
import React from 'react';
import '../styles/TourCardMedium.css';

const TourCardMedium = ({ id, title, description, image, onLearnMore, availableTickets }) => {
    return (
        <div className="tour-card-medium">
            <div className="tour-image-medium">
                <img src={image} alt={title} />
            </div>
            <div className="tour-details">
                <h3>{title}</h3>
                <p>{description}</p>
                <p>Мест: {availableTickets}</p>
                <button onClick={() => onLearnMore(id)} className="learn-more-button">
                    Узнать больше
                </button>
            </div>
        </div>
    );
};

export default TourCardMedium;